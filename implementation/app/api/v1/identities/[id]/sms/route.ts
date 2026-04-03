import type { NextRequest } from 'next/server'
import { requireAuth, isAuthContext } from '@/lib/auth'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import twilio from 'twilio'

type Ctx = { params: Promise<{ id: string }> }

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID ?? ''
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? ''

export async function GET(request: NextRequest, { params }: Ctx) {
  const auth = await requireAuth(request)
  if (!isAuthContext(auth)) return auth

  const { id } = await params
  const url = request.nextUrl
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50', 10), 100)
  const offset = parseInt(url.searchParams.get('offset') ?? '0', 10)
  const unreadOnly = url.searchParams.get('unread') === 'true'

  const supabase = getSupabaseServerClient()

  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id')
    .eq('id', id)
    .eq('api_key_id', auth.apiKeyId)
    .neq('status', 'deleted')
    .single()

  if (idErr || !identity) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  let query = supabase
    .from('sms_messages')
    .select('*', { count: 'exact' })
    .eq('identity_id', id)
    .order('received_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (unreadOnly) {
    query = query.eq('read', false)
  }

  const { data, error, count } = await query

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ data, total: count ?? 0, limit, offset })
}

export async function POST(request: NextRequest, { params }: Ctx) {
  const auth = await requireAuth(request)
  if (!isAuthContext(auth)) return auth

  const { id } = await params

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const to = body.to as string | undefined
  const message = body.body as string | undefined

  if (!to) return Response.json({ error: 'Missing "to" field' }, { status: 400 })
  if (!message) return Response.json({ error: 'Missing "body" field' }, { status: 400 })

  const supabase = getSupabaseServerClient()

  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id, phone_number')
    .eq('id', id)
    .eq('api_key_id', auth.apiKeyId)
    .neq('status', 'deleted')
    .single()

  if (idErr || !identity) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  if (!identity.phone_number) {
    return Response.json({ error: 'Identity has no phone number' }, { status: 400 })
  }

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    return Response.json({ error: 'Outbound SMS not configured' }, { status: 503 })
  }

  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

  try {
    await client.messages.create({
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
    })
    .select()
    .single()

  if (storeErr) {
    return Response.json({ error: storeErr.message }, { status: 500 })
  }

  return Response.json(stored, { status: 201 })
}
