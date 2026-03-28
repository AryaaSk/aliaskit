import type { NextRequest } from 'next/server'
import { requireAuth, isAuthContext } from '@/lib/auth'
import { getSupabaseServerClient } from '@/lib/supabase-server'

type Ctx = { params: Promise<{ id: string; emailId: string }> }

export async function GET(request: NextRequest, { params }: Ctx) {
  const auth = await requireAuth(request)
  if (!isAuthContext(auth)) return auth

  const { id, emailId } = await params
  const supabase = getSupabaseServerClient()

  // Verify identity belongs to caller
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

  const { data: email, error } = await supabase
    .from('email_messages')
    .select('*')
    .eq('id', emailId)
    .eq('identity_id', id)
    .single()

  if (error || !email) {
    return Response.json({ error: 'Email not found' }, { status: 404 })
  }

  // Mark as read if not already
  if (!email.read) {
    await supabase
      .from('email_messages')
      .update({ read: true })
      .eq('id', emailId)
  }

  return Response.json({ ...email, read: true })
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const auth = await requireAuth(request)
  if (!isAuthContext(auth)) return auth

  const { id, emailId } = await params
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

  const { data, error } = await supabase
    .from('email_messages')
    .delete()
    .eq('id', emailId)
    .eq('identity_id', id)
    .select('id')
    .single()

  if (error || !data) {
    return Response.json({ error: 'Email not found' }, { status: 404 })
  }

  return Response.json({ success: true })
}
