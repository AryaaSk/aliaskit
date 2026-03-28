import { getSupabaseServerClient } from '@/lib/supabase-server'

type Ctx = { params: Promise<{ id: string }> }

export async function DELETE(_: Request, { params }: Ctx) {
  const { id } = await params
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('api_keys')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', id)
    .is('revoked_at', null)
    .select('id')
    .single()

  if (error || !data) return Response.json({ error: 'Key not found or already revoked' }, { status: 404 })
  return Response.json({ success: true })
}
