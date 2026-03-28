import { getSupabaseServerClient } from '@/lib/supabase-server'
import { generateName, generateDateOfBirth, generateEmailUsername } from '@/lib/names'

const DEFAULT_DOMAIN = process.env.EMAIL_DEFAULT_DOMAIN ?? 'aliaskit.to'

export async function GET() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('identities')
    .select('*')
    .neq('status', 'deleted')
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ data })
}

export async function POST() {
  const name = generateName()
  const date_of_birth = generateDateOfBirth()
  const email = `${generateEmailUsername(name)}@${DEFAULT_DOMAIN}`

  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('identities')
    .insert({ name, date_of_birth, email, email_domain: DEFAULT_DOMAIN, phone_number: null, phone_provider: null, status: 'active', metadata: {} })
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data, { status: 201 })
}
