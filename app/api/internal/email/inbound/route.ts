import type { NextRequest } from 'next/server'
import { Webhook } from 'svix'
import { getSupabaseServerClient } from '@/lib/supabase-server'

const RESEND_WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET ?? ''

interface ResendInboundAttachment {
  filename?: string
  content?: string
  content_type?: string
}

interface ResendInboundData {
  email_id?: string
  from: string
  to: string[]
  subject?: string
  text?: string | null
  html?: string | null
  headers?: Array<{ name: string; value: string }>
  attachments?: ResendInboundAttachment[]
}

interface ResendWebhookPayload {
  type: string
  created_at: string
  data: ResendInboundData
}

export async function POST(request: NextRequest) {
  if (!RESEND_WEBHOOK_SECRET) {
    console.error('RESEND_WEBHOOK_SECRET is not configured')
    return Response.json({ error: 'Inbound email not configured' }, { status: 500 })
  }

  // Read raw body for signature verification
  const rawBody = await request.text()

  // Verify Resend webhook signature (svix)
  const svixId = request.headers.get('svix-id') ?? ''
  const svixTimestamp = request.headers.get('svix-timestamp') ?? ''
  const svixSignature = request.headers.get('svix-signature') ?? ''

  const wh = new Webhook(RESEND_WEBHOOK_SECRET)
  let payload: ResendWebhookPayload
  try {
    payload = wh.verify(rawBody, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as ResendWebhookPayload
  } catch {
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }

  // Only handle inbound email events
  if (payload.type !== 'email.received') {
    return Response.json({ received: true, stored: false })
  }

  const { from, to, subject, text, html, headers, attachments } = payload.data

  // Resend delivers to as an array; match against all recipient addresses
  const toAddresses = (to ?? []).map((addr) => addr.toLowerCase())
  if (toAddresses.length === 0) {
    return Response.json({ error: 'Missing "to" field' }, { status: 400 })
  }

  const supabase = getSupabaseServerClient()

  // Look up identity by any matching email address
  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id')
    .in('email', toAddresses)
    .neq('status', 'deleted')
    .limit(1)
    .single()

  if (idErr || !identity) {
    // No identity for this address — ack so Resend doesn't retry
    return Response.json({ received: true, stored: false })
  }

  // Normalise headers array → object
  const headersObj: Record<string, string> = {}
  for (const h of headers ?? []) {
    headersObj[h.name] = h.value
  }

  const { error: insertErr } = await supabase.from('email_messages').insert({
    identity_id: identity.id,
    direction: 'inbound',
    from: from ?? '',
    to: toAddresses[0],
    subject: subject ?? '',
    body_text: text ?? null,
    body_html: html ?? null,
    headers: headersObj,
    attachments: attachments ?? [],
  })

  if (insertErr) {
    console.error('Failed to store inbound email:', insertErr)
    return Response.json({ error: insertErr.message }, { status: 500 })
  }

  return Response.json({ received: true, stored: true })
}
