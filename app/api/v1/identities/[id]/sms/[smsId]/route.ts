import type { NextRequest } from 'next/server'
import { requireAuth, isAuthContext } from '@/lib/auth'
import { getSupabaseServerClient } from '@/lib/supabase-server'

type Ctx = { params: Promise<{ id: string; smsId: string }> }

export async function GET(request: NextRequest, { params }: Ctx) {
  const auth = await requireAuth(request)
  if (!isAuthContext(auth)) return auth

  const { id, smsId } = await params
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

  const { data: sms, error } = await supabase
    .from('sms_messages')
    .select('*')
    .eq('id', smsId)
    .eq('identity_id', id)
    .single()

  if (error || !sms) {
    return Response.json({ error: 'SMS not found' }, { status: 404 })
  }

  if (!sms.read) {
    await supabase
      .from('sms_messages')
      .update({ read: true })
      .eq('id', smsId)
  }

  return Response.json({ ...sms, read: true })
}
