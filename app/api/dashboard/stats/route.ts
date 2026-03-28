import { getSupabaseServerClient } from '@/lib/supabase-server'
import { requireDashboardAuth, isDashboardAuthContext } from '@/lib/auth'

export async function GET(request: Request) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const supabase = getSupabaseServerClient()

  const [identitiesRes, apiKeysRes] = await Promise.all([
    supabase.from('identities').select('status').neq('status', 'deleted'),
    supabase.from('api_keys').select('revoked_at'),
  ])

  const identities = identitiesRes.data ?? []
  const apiKeys = apiKeysRes.data ?? []

  return Response.json({
    totalIdentities: identities.length,
    activeIdentities: identities.filter(i => i.status === 'active').length,
    totalApiKeys: apiKeys.length,
    activeApiKeys: apiKeys.filter(k => !k.revoked_at).length,
  })
}
