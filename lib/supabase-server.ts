import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _serverClient: SupabaseClient | null = null

export function getSupabaseServerClient(): SupabaseClient {
  if (_serverClient) return _serverClient
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Prefer service role key for server-side writes; fall back to anon key in dev
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }
  _serverClient = createClient(url, key, { auth: { persistSession: false } })
  return _serverClient
}
