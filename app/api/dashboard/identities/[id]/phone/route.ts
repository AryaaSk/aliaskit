import { getSupabaseServerClient } from '@/lib/supabase-server'
import { requireDashboardAuth, isDashboardAuthContext } from '@/lib/auth'
import twilio from 'twilio'

const APP_URL = process.env.APP_URL ?? 'https://aliaskit.to'

async function provisionTwilioNumber(): Promise<{ phoneNumber: string } | null> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  if (!accountSid || !authToken) return null

  const client = twilio(accountSid, authToken)
  const smsWebhookUrl = `${APP_URL}/api/internal/sms/inbound`

  try {
    // Search for an available US local number
    const available = await client.availablePhoneNumbers('US').local.list({ limit: 1 })
    if (!available.length) return null

    const purchased = await client.incomingPhoneNumbers.create({
      phoneNumber: available[0].phoneNumber,
      smsUrl: smsWebhookUrl,
      smsMethod: 'POST',
    })

    return { phoneNumber: purchased.phoneNumber }
  } catch {
    return null
  }
}

type Ctx = { params: Promise<{ id: string }> }

export async function POST(request: Request, { params }: Ctx) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const { id } = await params
  const supabase = getSupabaseServerClient()

  // Fetch the identity and verify ownership
  const { data: identity, error } = await supabase
    .from('identities')
    .select('*')
    .eq('id', id)
    .eq('user_id', auth.userId)
    .neq('status', 'deleted')
    .single()

  if (error || !identity) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  // Check that the identity doesn't already have a phone number
  if (identity.phone_number) {
    return Response.json({ error: 'Identity already has a phone number' }, { status: 409 })
  }

  // Provision a Twilio number
  const result = await provisionTwilioNumber()
  if (!result) {
    return Response.json({ error: 'Failed to provision phone number' }, { status: 502 })
  }

  // Update the identity with the new phone number
  const { data: updated, error: updateError } = await supabase
    .from('identities')
    .update({ phone_number: result.phoneNumber, phone_provider: 'twilio' })
    .eq('id', id)
    .select('*')
    .single()

  if (updateError || !updated) {
    return Response.json({ error: 'Failed to update identity' }, { status: 500 })
  }

  return Response.json(updated)
}
