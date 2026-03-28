import { getSupabaseServerClient } from '@/lib/supabase-server'
import { requireDashboardAuth, isDashboardAuthContext } from '@/lib/auth'
import twilio from 'twilio'

type Ctx = { params: Promise<{ id: string }> }

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID ?? ''
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? ''

export async function GET(request: Request, { params }: Ctx) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const { id } = await params
  const url = new URL(request.url)
  const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') ?? '20', 10)))
  const offset = (page - 1) * limit

  const supabase = getSupabaseServerClient()

  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id, phone_number')
    .eq('id', id)
    .eq('user_id', auth.userId)
    .neq('status', 'deleted')
    .single()

  if (idErr || !identity) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  if (!identity.phone_number) {
    return Response.json({ error: 'Identity has no phone number' }, { status: 400 })
  }

  const { data, error, count } = await supabase
    .from('sms_messages')
    .select('*', { count: 'exact' })
    .eq('identity_id', id)
    .order('received_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ data: data ?? [], total: count ?? 0, page, limit })
}

export async function POST(request: Request, { params }: Ctx) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const { id } = await params

  let body: Record<string, unknown>
  try {
    body = await (request as Request & { json(): Promise<Record<string, unknown>> }).json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const toOverride = body.to as string | undefined
  const message = (body.body ?? body.message) as string | undefined

  if (!message) return Response.json({ error: 'Missing "body" field' }, { status: 400 })

  const supabase = getSupabaseServerClient()

  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id, phone_number')
    .eq('id', id)
    .eq('user_id', auth.userId)
    .neq('status', 'deleted')
    .single()

  if (idErr || !identity) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  if (!identity.phone_number) {
    return Response.json({ error: 'Identity has no phone number' }, { status: 400 })
  }

  // Resolve recipient: explicit override or last inbound sender
  let to = toOverride
  if (!to) {
    const { data: lastInbound } = await supabase
      .from('sms_messages')
      .select('from')
      .eq('identity_id', id)
      .eq('direction', 'inbound')
      .order('received_at', { ascending: false })
      .limit(1)
      .single()
    to = lastInbound?.from ?? undefined
  }

  if (!to) {
    return Response.json({ error: 'No recipient — specify "to" or receive an inbound SMS first' }, { status: 400 })
  }

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    return Response.json({ error: 'Outbound SMS not configured' }, { status: 503 })
  }

  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

  let twilioMessage
  try {
    twilioMessage = await client.messages.create({
      from: identity.phone_number,
      to,
      body: message,
    })
  } catch (err: unknown) {
    const detail = err instanceof Error ? err.message : String(err)
    return Response.json({ error: 'Failed to send SMS', detail }, { status: 502 })
  }

  const { data: stored, error: storeErr } = await supabase
    .from('sms_messages')
    .insert({
      identity_id: id,
      direction: 'outbound',
      from: identity.phone_number,
      to,
      body: message,
      twilio_sid: twilioMessage.sid,
    })
    .select()
    .single()

  if (storeErr) {
    return Response.json({ error: storeErr.message }, { status: 500 })
  }

  return Response.json(stored, { status: 201 })
}
