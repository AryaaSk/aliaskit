import type { NextRequest } from 'next/server'
import { requireAuth, isAuthContext } from '@/lib/auth'
import { getSupabaseServerClient } from '@/lib/supabase-server'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: Ctx) {
  const auth = await requireAuth(request)
  if (!isAuthContext(auth)) return auth

  const { id } = await params
  const url = request.nextUrl
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50', 10), 100)
  const offset = parseInt(url.searchParams.get('offset') ?? '0', 10)
  const unreadOnly = url.searchParams.get('unread') === 'true'

  const supabase = getSupabaseServerClient()

  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id')
    .eq('id', id)
    .eq('api_key_id', auth.apiKeyId)
    .neq('status', 'deleted')
    .single()

  if (idErr || !identity) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  let query = supabase
    .from('sms_messages')
    .select('*', { count: 'exact' })
    .eq('identity_id', id)
    .order('received_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (unreadOnly) {
    query = query.eq('read', false)
  }

  const { data, error, count } = await query

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ data, total: count ?? 0, limit, offset })
}
