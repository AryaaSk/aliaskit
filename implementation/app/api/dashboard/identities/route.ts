import { randomBytes, createHash } from 'crypto'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import { generateName, generateDateOfBirth, generateEmailUsername } from '@/lib/names'
import { requireDashboardAuth, isDashboardAuthContext } from '@/lib/auth'

const DEFAULT_DOMAIN = process.env.EMAIL_DEFAULT_DOMAIN ?? 'aliaskit.to'

export async function GET(request: Request) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('identities')
    .select('*')
    .eq('user_id', auth.userId)
    .neq('status', 'deleted')
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ data, total: data.length })
}

export async function POST(request: Request) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth
  const name = generateName()
  const date_of_birth = generateDateOfBirth()
  const email = `${generateEmailUsername(name)}@${DEFAULT_DOMAIN}`

  const supabase = getSupabaseServerClient()

  // Get the first active API key belonging to this user
  const { data: keyRow } = await supabase
    .from('api_keys')
    .select('id')
    .eq('user_id', auth.userId)
    .is('revoked_at', null)
    .order('created_at', { ascending: true })
    .limit(1)
    .single()

  let apiKeyId: string
  if (!keyRow) {
    // No API key exists yet — auto-create a default one for this user
    const raw = `ak_live_${randomBytes(16).toString('hex')}`
    const key_prefix = raw.slice(0, 16)
    const key_hash = createHash('sha256').update(raw).digest('hex')
    const { data: newKey, error: keyError } = await supabase
      .from('api_keys')
      .insert({ key_hash, key_prefix, label: 'Default', scopes: ['identities:read', 'identities:write', 'messages:read'], rate_limit: 60, user_id: auth.userId })
      .select('id')
      .single()
    if (keyError || !newKey) {
      return Response.json({ error: 'Failed to create default API key' }, { status: 500 })
    }
    apiKeyId = newKey.id
  } else {
    apiKeyId = keyRow.id
  }

  const { data, error } = await supabase
    .from('identities')
    .insert({ name, date_of_birth, email, email_domain: DEFAULT_DOMAIN, phone_number: null, phone_provider: null, status: 'active', metadata: {}, api_key_id: apiKeyId, user_id: auth.userId })
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data, { status: 201 })
}
