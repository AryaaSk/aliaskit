import type { NextRequest } from 'next/server'
import { requireAuth, isAuthContext } from '@/lib/auth'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import { generateName, generateDateOfBirth, generateEmailUsername } from '@/lib/names'

const DEFAULT_DOMAIN = process.env.EMAIL_DEFAULT_DOMAIN ?? 'aliaskit.to'

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

  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('identities')
    .insert({
      name,
      date_of_birth,
      email,
      email_domain: emailDomain,
      phone_number: null,
      phone_provider: null,
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
