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

  const { data: keyRow } = await supabase
    .from('api_keys')
    .select('id')
    .is('revoked_at', null)
    .order('created_at', { ascending: true })
    .limit(1)
    .single()

  if (!keyRow) {
    return Response.json(
      { error: 'Create an API key before provisioning identities' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('identities')
    .insert({ name, date_of_birth, email, email_domain: DEFAULT_DOMAIN, phone_number: null, phone_provider: null, status: 'active', metadata: {}, api_key_id: keyRow.id })
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data, { status: 201 })
}
