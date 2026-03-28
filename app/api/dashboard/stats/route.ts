import { getSupabaseServerClient } from '@/lib/supabase-server'
import { requireDashboardAuth, isDashboardAuthContext } from '@/lib/auth'

export async function GET(request: Request) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const supabase = getSupabaseServerClient()

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  // Get identity IDs for this user to scope message counts
  const { data: userIdentities } = await supabase
    .from('identities')
    .select('id')
    .eq('user_id', auth.userId)
    .neq('status', 'deleted')

  const identityIds = (userIdentities ?? []).map(i => i.id)

  const [identitiesRes, apiKeysRes, emailsTodayRes, smsTodayRes] = await Promise.all([
    supabase.from('identities').select('status').eq('user_id', auth.userId).neq('status', 'deleted'),
    supabase.from('api_keys').select('revoked_at').eq('user_id', auth.userId),
    identityIds.length > 0
      ? supabase.from('email_messages').select('id', { count: 'exact', head: true }).in('identity_id', identityIds).gte('received_at', todayStart.toISOString())
      : Promise.resolve({ count: 0, error: null }),
    identityIds.length > 0
      ? supabase.from('sms_messages').select('id', { count: 'exact', head: true }).in('identity_id', identityIds).gte('received_at', todayStart.toISOString())
      : Promise.resolve({ count: 0, error: null }),
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
