import { getSupabaseServerClient } from '@/lib/supabase-server'
import { requireDashboardAuth, isDashboardAuthContext } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string; msgId: string }> }

export async function GET(request: Request, { params }: Ctx) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const { id, msgId } = await params
  const supabase = getSupabaseServerClient()

  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id')
    .eq('id', id)
    .eq('user_id', auth.userId)
    .neq('status', 'deleted')
    .single()

  if (idErr || !identity) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  const { data: email, error } = await supabase
    .from('email_messages')
    .select('*')
    .eq('id', msgId)
    .eq('identity_id', id)
    .single()

  if (error || !email) {
    return Response.json({ error: 'Email not found' }, { status: 404 })
  }

  if (!email.read) {
    await supabase
      .from('email_messages')
      .update({ read: true })
      .eq('id', msgId)
  }

  return Response.json({ ...email, read: true })
}

export async function PATCH(request: Request, { params }: Ctx) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const { id, msgId } = await params

  let body: Record<string, unknown>
  try {
    body = await (request as Request & { json(): Promise<Record<string, unknown>> }).json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const read = body.read as boolean | undefined
  if (typeof read !== 'boolean') {
    return Response.json({ error: 'Missing or invalid "read" field (must be boolean)' }, { status: 400 })
  }

  const supabase = getSupabaseServerClient()

  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id')
    .eq('id', id)
    .eq('user_id', auth.userId)
    .neq('status', 'deleted')
    .single()

  if (idErr || !identity) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  const { data, error } = await supabase
    .from('email_messages')
    .update({ read })
    .eq('id', msgId)
    .eq('identity_id', id)
    .select()
    .single()

  if (error || !data) {
    return Response.json({ error: 'Email not found' }, { status: 404 })
  }

  return Response.json(data)
}

export async function DELETE(request: Request, { params }: Ctx) {
  const auth = await requireDashboardAuth(request)
  if (!isDashboardAuthContext(auth)) return auth

  const { id, msgId } = await params
  const supabase = getSupabaseServerClient()

  const { data: identity, error: idErr } = await supabase
    .from('identities')
    .select('id')
    .eq('id', id)
    .eq('user_id', auth.userId)
    .neq('status', 'deleted')
    .single()

  if (idErr || !identity) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  const { data, error } = await supabase
    .from('email_messages')
    .delete()
    .eq('id', msgId)
    .eq('identity_id', id)
    .select('id')
    .single()

  if (error || !data) {
    return Response.json({ error: 'Email not found' }, { status: 404 })
  }

  return Response.json({ success: true })
}
