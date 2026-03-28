import type { NextRequest } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import { timingSafeEqual, createHmac } from 'crypto'

const WEBHOOK_SECRET = process.env.CLOUDFLARE_EMAIL_WEBHOOK_SECRET ?? ''

function verifySecret(provided: string): boolean {
  if (!WEBHOOK_SECRET) return false
  try {
    const a = Buffer.from(provided)
    const b = Buffer.from(WEBHOOK_SECRET)
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret') ?? ''
  if (!verifySecret(secret)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const to = (body.to as string | undefined)?.toLowerCase()
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
    // No identity found — acknowledge but don't error (could be spam)
    return Response.json({ received: true, stored: false })
  }

  const { error: insertErr } = await supabase.from('email_messages').insert({
    identity_id: identity.id,
    direction: 'inbound',
    from: (body.from as string) ?? '',
    to,
    subject: (body.subject as string) ?? '',
    body_text: (body.body_text as string | null) ?? null,
    body_html: (body.body_html as string | null) ?? null,
    headers: (body.headers as Record<string, unknown>) ?? {},
    attachments: (body.attachments as unknown[]) ?? [],
  })

  if (insertErr) {
    return Response.json({ error: insertErr.message }, { status: 500 })
  }

  return Response.json({ received: true, stored: true })
}
