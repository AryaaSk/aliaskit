import { getSupabaseServerClient } from '@/lib/supabase-server'
import { requireDashboardAuth, isDashboardAuthContext } from '@/lib/auth'

export async function GET(request: Request) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const supabase = getSupabaseServerClient()

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const [identitiesRes, apiKeysRes, emailsTodayRes, smsTodayRes] = await Promise.all([
    supabase.from('identities').select('status').neq('status', 'deleted'),
    supabase.from('api_keys').select('revoked_at'),
    supabase.from('email_messages').select('id', { count: 'exact', head: true }).gte('received_at', todayStart.toISOString()),
    supabase.from('sms_messages').select('id', { count: 'exact', head: true }).gte('received_at', todayStart.toISOString()),
  ])

  if (identitiesRes.error || apiKeysRes.error) {
    return Response.json(
      { error: (identitiesRes.error ?? apiKeysRes.error)?.message },
      { status: 500 }
    )
  }

  const identities = identitiesRes.data ?? []
  const apiKeys = apiKeysRes.data ?? []
  const messagesToday = (emailsTodayRes.count ?? 0) + (smsTodayRes.count ?? 0)

  return Response.json({
    totalIdentities: identities.length,
    activeIdentities: identities.filter(i => i.status === 'active').length,
    totalApiKeys: apiKeys.length,
    activeApiKeys: apiKeys.filter(k => !k.revoked_at).length,
    messagesToday,
  })
}
