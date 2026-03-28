import { getSupabaseServerClient } from '@/lib/supabase-server'
import { requireDashboardAuth, isDashboardAuthContext } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(request: Request, { params }: Ctx) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const { id } = await params
  const url = new URL(request.url)
  const channel = url.searchParams.get('channel') ?? 'email'
  const offset = parseInt(url.searchParams.get('offset') ?? '0', 10)
  const limit = parseInt(url.searchParams.get('limit') ?? '21', 10)

  const supabase = getSupabaseServerClient()

  // Check if messages table exists; gracefully return empty if not yet provisioned
  const table = channel === 'sms' ? 'sms_messages' : 'email_messages'
  const columns = channel === 'sms' ? 'id, from, body, received_at' : 'id, from, subject, body, received_at'
  const { data, error } = await supabase
    .from(table)
    .select(columns)
    .eq('identity_id', id)
    .order('received_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    // Table may not exist yet in this phase; return empty gracefully
    return Response.json({ data: [] })
  }

  return Response.json({ data: (data ?? []).map((m: any) => ({ ...m, channel })) })
}
