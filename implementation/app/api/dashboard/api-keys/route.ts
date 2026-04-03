import { randomBytes, createHash } from 'crypto'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import { requireDashboardAuth, isDashboardAuthContext } from '@/lib/auth'

export async function GET(request: Request) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('api_keys')
    .select('id, key_prefix, label, scopes, rate_limit, created_at, last_used_at, revoked_at')
    .eq('user_id', auth.userId)
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ data })
}

export async function POST(request: Request) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth
  let body: Record<string, unknown> = {}
  try { body = await request.json() } catch { /* defaults */ }

  const label = (body.label as string | undefined) ?? 'Default'
  const scopes = (body.scopes as string[] | undefined) ?? ['identities:read', 'identities:write', 'messages:read']
  const rate_limit = (body.rate_limit as number | undefined) ?? 60

  const raw = `ak_live_${randomBytes(16).toString('hex')}`
  const key_prefix = raw.slice(0, 16)
  const key_hash = createHash('sha256').update(raw).digest('hex')

  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('api_keys')
    .insert({ key_hash, key_prefix, label, scopes, rate_limit, user_id: auth.userId })
    .select('id, key_prefix, label, scopes, rate_limit, created_at')
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ ...data, key: raw }, { status: 201 })
}
