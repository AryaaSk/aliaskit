import type { NextRequest } from 'next/server'
import { requireAuth, isAuthContext } from '@/lib/auth'
import { getSupabaseServerClient } from '@/lib/supabase-server'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: Ctx) {
  const auth = await requireAuth(request)
  if (!isAuthContext(auth)) return auth

  const { id } = await params
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('identities')
    .select('*')
    .eq('id', id)
    .eq('api_key_id', auth.apiKeyId)
    .neq('status', 'deleted')
    .single()

  if (error || !data) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  return Response.json(data)
}

export async function PATCH(request: NextRequest, { params }: Ctx) {
  const auth = await requireAuth(request)
  if (!isAuthContext(auth)) return auth

  const { id } = await params

  let body: Record<string, unknown> = {}
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const updates: Record<string, unknown> = {}
  if (body.metadata !== undefined) updates.metadata = body.metadata
  if (body.name !== undefined) updates.name = body.name
  if (
    body.status !== undefined &&
    ['active', 'suspended'].includes(body.status as string)
  ) {
    updates.status = body.status
  }

  if (Object.keys(updates).length === 0) {
    return Response.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('identities')
    .update(updates)
    .eq('id', id)
    .eq('api_key_id', auth.apiKeyId)
    .neq('status', 'deleted')
    .select()
    .single()

  if (error || !data) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  return Response.json(data)
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  const auth = await requireAuth(request)
  if (!isAuthContext(auth)) return auth

  const { id } = await params
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('identities')
    .update({ status: 'deleted' })
    .eq('id', id)
    .eq('api_key_id', auth.apiKeyId)
    .neq('status', 'deleted')
    .select('id')
    .single()

  if (error || !data) {
    return Response.json({ error: 'Identity not found' }, { status: 404 })
  }

  return Response.json({ success: true })
}
