import { getSupabaseServerClient } from '@/lib/supabase-server'
import { requireDashboardAuth, isDashboardAuthContext } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? ''

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

  const to = body.to as string | undefined
  const subject = (body.subject as string | undefined) ?? ''
  const bodyText = body.body_text as string | undefined

  if (!to) return Response.json({ error: 'Missing "to" field' }, { status: 400 })
  if (!bodyText) return Response.json({ error: 'Missing "body_text" field' }, { status: 400 })

  const supabase = getSupabaseServerClient()

  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id, email')
    .eq('id', id)
    .eq('user_id', auth.userId)
    .neq('status', 'deleted')
    .single()

  if (idErr || !identity) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  if (!RESEND_API_KEY) {
    return Response.json({ error: 'Outbound email not configured' }, { status: 503 })
  }

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: identity.email, to, subject, text: bodyText }),
  })

  if (!resendRes.ok) {
    const err = await resendRes.json().catch(() => ({}))
    return Response.json({ error: 'Failed to send email', detail: err }, { status: 502 })
  }

  const { error: storeErr } = await supabase
    .from('email_messages')
    .insert({
      identity_id: id,
      direction: 'outbound',
      from: identity.email,
      to,
      subject,
      body_text: bodyText,
      body_html: null,
      headers: {},
      attachments: [],
    })

  if (storeErr) {
    return Response.json({ error: storeErr.message }, { status: 500 })
  }

  return Response.json({ ok: true }, { status: 201 })
}
