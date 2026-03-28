'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

/**
 * Safety net for Supabase OAuth redirects.
 *
 * When the Supabase project's "Site URL" is the app root ("/"), Google OAuth
 * may redirect back to "/" (the landing page) with ?code=... instead of going
 * to /auth/callback. This component detects that situation on any page and
 * forwards the user to the proper callback route so the PKCE code exchange
 * can proceed.
 */
export default function OAuthRedirectHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    const code = searchParams.get('code')
    // Only redirect if there's an OAuth code AND we're not already on the callback page
    if (code && pathname !== '/auth/callback') {
      router.replace(`/auth/callback?${searchParams.toString()}`)
    }
  }, [pathname, router, searchParams])

  return null
}
