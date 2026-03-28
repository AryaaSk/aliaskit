import type { NextRequest } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import { Webhook } from 'svix'

const RESEND_WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET ?? ''

export async function POST(request: NextRequest) {
  // --- Verify Resend webhook signature via Svix ---
  const svixId = request.headers.get('svix-id') ?? ''
  const svixTimestamp = request.headers.get('svix-timestamp') ?? ''
  const svixSignature = request.headers.get('svix-signature') ?? ''

  if (!RESEND_WEBHOOK_SECRET) {
    console.error('RESEND_WEBHOOK_SECRET is not set')
    return Response.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  let rawBody: string
  try {
    rawBody = await request.text()
  } catch {
    return Response.json({ error: 'Failed to read body' }, { status: 400 })
  }

  let payload: Record<string, unknown>
  try {
    const wh = new Webhook(RESEND_WEBHOOK_SECRET)
    payload = wh.verify(rawBody, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as Record<string, unknown>
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }

  // --- Parse Resend inbound email payload ---
  // Resend wraps the email data inside a `data` envelope
  const eventType = payload.type as string | undefined
  if (eventType !== 'email.received') {
    // Acknowledge non-inbound events gracefully
    return Response.json({ received: true, stored: false })
  }

  const data = payload.data as Record<string, unknown> | undefined
  if (!data) {
    return Response.json({ error: 'Missing data in payload' }, { status: 400 })
  }

  // Resend sends `to` as an array of strings
  const toArr = data.to as string[] | undefined
  const to = toArr?.[0]?.toLowerCase()
  if (!to) {
    return Response.json({ error: 'Missing "to" field' }, { status: 400 })
  }

  const from = (data.from as string) ?? ''
  const subject = (data.subject as string) ?? ''
  const bodyText = (data.text as string | null) ?? null
  const bodyHtml = (data.html as string | null) ?? null
  const headers = (data.headers as Record<string, unknown>) ?? {}

  const supabase = getSupabaseServerClient()

  // Look up identity by email address
  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id')
    .eq('email', to)
    .neq('status', 'deleted')
    .single()

  if (idErr || !identity) {
    // No identity found — acknowledge but don't error (could be spam)
    return Response.json({ received: true, stored: false })
  }

  const { error: insertErr } = await supabase.from('email_messages').insert({
    identity_id: identity.id,
    direction: 'inbound',
    from,
    to,
    subject,
    body_text: bodyText,
    body_html: bodyHtml,
    headers,
    attachments: [],
  })

  if (insertErr) {
    return Response.json({ error: insertErr.message }, { status: 500 })
  }

  return Response.json({ received: true, stored: true })
}
