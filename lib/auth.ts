import { createHash } from 'crypto'
import type { NextRequest } from 'next/server'
import { getSupabaseServerClient } from './supabase-server'

export interface AuthContext {
  apiKeyId: string
  scopes: string[]
}

/**
 * Validates the Bearer token in the Authorization header.
 * Returns an AuthContext on success, or a Response on failure (401).
 */
export async function requireAuth(
  request: NextRequest
): Promise<AuthContext | Response> {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return Response.json(
      { error: 'Missing or invalid Authorization header' },
      { status: 401 }
    )
  }

  const token = authHeader.slice(7).trim()
  const keyHash = createHash('sha256').update(token).digest('hex')

  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('api_keys')
    .select('id, scopes, revoked_at')
    .eq('key_hash', keyHash)
    .single()

  if (error || !data) {
    return Response.json({ error: 'Invalid API key' }, { status: 401 })
  }

  if (data.revoked_at) {
    return Response.json({ error: 'API key has been revoked' }, { status: 401 })
  }

  // Update last_used_at fire-and-forget (no await — don't block the request)
  supabase
    .from('api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', data.id)
    .then(() => {})

  return { apiKeyId: data.id as string, scopes: data.scopes as string[] }
}

export function isAuthContext(v: AuthContext | Response): v is AuthContext {
  return !(v instanceof Response)
}

export interface DashboardAuthContext {
  userId: string
}

/**
 * Validates dashboard session from cookies.
 * Returns a DashboardAuthContext on success, or a Response on failure (401).
 */
export async function requireDashboardAuth(
  request: Request
): Promise<DashboardAuthContext | Response> {
  const cookieHeader = request.headers.get('cookie') ?? ''
  const hasCookie = cookieHeader.includes('ak-session=1')

  if (!hasCookie) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // TODO: In production, validate the session with Supabase to ensure it's still valid
  // For now, trusting the cookie presence as a basic check
  return { userId: 'authenticated' }
}

export function isDashboardAuthContext(v: DashboardAuthContext | Response): v is DashboardAuthContext {
  return !(v instanceof Response)
}
