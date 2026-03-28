import type { NextRequest } from 'next/server'
import { requireAuth, isAuthContext } from '@/lib/auth'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import { generateName, generateDateOfBirth, generateEmailUsername } from '@/lib/names'
import twilio from 'twilio'

const DEFAULT_DOMAIN = process.env.EMAIL_DEFAULT_DOMAIN ?? 'aliaskit.to'
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

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request)
  if (!isAuthContext(auth)) return auth

  let body: Record<string, unknown> = {}
  try {
    body = await request.json()
  } catch {
    // empty body is fine
  }

  const name = (body.name as string | undefined) ?? generateName()
  const date_of_birth = generateDateOfBirth()
  const emailDomain = (body.email_domain as string | undefined) ?? DEFAULT_DOMAIN
  const emailUsername =
    (body.email_username as string | undefined) ?? generateEmailUsername(name)
  const email = `${emailUsername}@${emailDomain}`
  const metadata = (body.metadata as Record<string, unknown> | undefined) ?? {}
  const provisionPhone = body.provision_phone === true

  let phone_number: string | null = null
  let phone_provider: string | null = null

  if (provisionPhone) {
    const provisioned = await provisionTwilioNumber()
    if (!provisioned) {
      return Response.json(
        { error: 'Phone provisioning failed — no numbers available or credentials missing' },
        { status: 503 }
      )
    }
    phone_number = provisioned.phoneNumber
    phone_provider = 'twilio'
  }

  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('identities')
    .insert({
      name,
      date_of_birth,
      email,
      email_domain: emailDomain,
      phone_number,
      phone_provider,
      status: 'active',
      metadata,
      api_key_id: auth.apiKeyId,
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return Response.json({ error: 'Email address already in use' }, { status: 409 })
    }
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data, { status: 201 })
}

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request)
  if (!isAuthContext(auth)) return auth

  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('identities')
    .select('*')
    .eq('api_key_id', auth.apiKeyId)
    .neq('status', 'deleted')
    .order('created_at', { ascending: false })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ data })
}
