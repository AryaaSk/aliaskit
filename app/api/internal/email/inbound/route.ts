import type { NextRequest } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'

const INBOUND_EMAIL_SECRET = process.env.INBOUND_EMAIL_SECRET ?? ''

export async function POST(request: NextRequest) {
  // Verify shared secret — any inbound email forwarder (Cloudflare Worker, etc.)
  // must send: Authorization: Bearer <INBOUND_EMAIL_SECRET>
  if (!INBOUND_EMAIL_SECRET) {
    console.error('INBOUND_EMAIL_SECRET is not configured')
    return Response.json({ error: 'Inbound email not configured' }, { status: 500 })
  }

  const authHeader = request.headers.get('authorization') ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (token !== INBOUND_EMAIL_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // Expected fields from the Cloudflare Email Worker (or any forwarder)
  const to = (payload.to as string | undefined)?.toLowerCase()
  const from = (payload.from as string) ?? ''
  const subject = (payload.subject as string) ?? ''
  const bodyText = (payload.text as string | null) ?? null
  const bodyHtml = (payload.html as string | null) ?? null
  const headers = (payload.headers as Record<string, unknown>) ?? {}

  if (!to) {
    return Response.json({ error: 'Missing "to" field' }, { status: 400 })
  }

  const supabase = getSupabaseServerClient()

  // Look up identity by email address
  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id')
    .eq('email', to)
    .neq('status', 'deleted')
    .single()

  if (idErr || !identity) {
    // No identity for this address — ack so the caller doesn't retry
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
    console.error('Failed to store inbound email:', insertErr)
    return Response.json({ error: insertErr.message }, { status: 500 })
  }

  return Response.json({ received: true, stored: true })
}
