import { randomBytes, createHash } from 'crypto'
import type { NextRequest } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'

/** Admin-only route protected by ADMIN_SECRET env var (dashboard auth added in Phase 4) */
function checkAdminAuth(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false
  return request.headers.get('x-admin-secret') === secret
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown> = {}
  try {
    body = await request.json()
  } catch {
    // defaults below
  }

  const label = (body.label as string | undefined) ?? 'Default'
  const scopes = (body.scopes as string[] | undefined) ?? [
    'identities:read',
    'identities:write',
    'messages:read',
  ]
  const rate_limit = (body.rate_limit as number | undefined) ?? 60

  // Generate key: ak_live_<32 random hex chars>
  const raw = `ak_live_${randomBytes(16).toString('hex')}`
  const key_prefix = raw.slice(0, 16)
  const key_hash = createHash('sha256').update(raw).digest('hex')

  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('api_keys')
    .insert({ key_hash, key_prefix, label, scopes, rate_limit })
    .select('id, key_prefix, label, scopes, rate_limit, created_at')
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  // Return the raw key only once — it cannot be retrieved again
  return Response.json({ ...data, key: raw }, { status: 201 })
}

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('api_keys')
    .select('id, key_prefix, label, scopes, rate_limit, created_at, last_used_at, revoked_at')
    .order('created_at', { ascending: false })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ data })
}
