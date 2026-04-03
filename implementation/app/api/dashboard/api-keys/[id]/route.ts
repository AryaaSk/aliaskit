import { getSupabaseServerClient } from '@/lib/supabase-server'
import { requireDashboardAuth, isDashboardAuthContext } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

export async function DELETE(request: Request, { params }: Ctx) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const { id } = await params
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('api_keys')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', auth.userId)
    .is('revoked_at', null)
    .select('id')
    .single()

  if (error || !data) return Response.json({ error: 'Key not found or already revoked' }, { status: 404 })
  return Response.json({ success: true })
}
