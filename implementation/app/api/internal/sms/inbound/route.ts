import type { NextRequest } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import twilio from 'twilio'

const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? ''

export async function POST(request: NextRequest) {
  // Twilio sends application/x-www-form-urlencoded
  const rawBody = await request.text()

  // Validate Twilio request signature
  const twilioSignature = request.headers.get('x-twilio-signature') ?? ''
  const requestUrl = request.url

  const isValid = twilio.validateRequest(
    TWILIO_AUTH_TOKEN,
    twilioSignature,
    requestUrl,
    Object.fromEntries(new URLSearchParams(rawBody))
  )

  if (!isValid) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const params = Object.fromEntries(new URLSearchParams(rawBody))
  const toNumber = params['To']
  const fromNumber = params['From']
  const body = params['Body'] ?? ''

  if (!toNumber) {
    return Response.json({ error: 'Missing To field' }, { status: 400 })
  }

  const supabase = getSupabaseServerClient()

  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id')
    .eq('phone_number', toNumber)
    .neq('status', 'deleted')
    .single()

  if (idErr || !identity) {
    // No identity — ack to Twilio so it doesn't retry
    return new Response('<Response></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    })
  }

  await supabase.from('sms_messages').insert({
    identity_id: identity.id,
    direction: 'inbound',
    from: fromNumber ?? '',
    to: toNumber,
    body,
  })

  return new Response('<Response></Response>', {
    headers: { 'Content-Type': 'text/xml' },
  })
}
