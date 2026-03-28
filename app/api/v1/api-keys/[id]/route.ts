import type { NextRequest } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'

function checkAdminAuth(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false
  return request.headers.get('x-admin-secret') === secret
}

type Ctx = { params: Promise<{ id: string }> }

export async function DELETE(request: NextRequest, { params }: Ctx) {
  if (!checkAdminAuth(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('api_keys')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', id)
    .is('revoked_at', null)
    .select('id')
    .single()

  if (error || !data) {
    return Response.json({ error: 'API key not found or already revoked' }, { status: 404 })
  }

  return Response.json({ success: true })
}
