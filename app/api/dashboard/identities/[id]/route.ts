import { getSupabaseServerClient } from '@/lib/supabase-server'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Ctx) {
  const { id } = await params
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('identities')
    .select('*')
    .eq('id', id)
    .neq('status', 'deleted')
    .single()

  if (error || !data) return Response.json({ error: 'Identity not found' }, { status: 404 })
  return Response.json(data)
}
