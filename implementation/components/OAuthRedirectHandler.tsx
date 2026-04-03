'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

/**
 * Safety net for Supabase OAuth redirects.
 *
 * Supabase may redirect back to "/" (the landing page) instead of
 * /auth/callback. This handles both:
 *   - PKCE flow: ?code=... in query params
 *   - Implicit flow: #access_token=... in hash fragment
 */
export default function OAuthRedirectHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/auth/callback') return

    const code = searchParams.get('code')
    if (code) {
      router.replace(`/auth/callback?${searchParams.toString()}`)
      return
    }

    // Implicit flow: hash fragment contains access_token
    const hash = window.location.hash
    if (hash && hash.includes('access_token')) {
      // Use window.location to preserve the hash fragment (Next.js router strips it)
      window.location.replace(`/auth/callback${hash}`)
    }
  }, [pathname, router, searchParams])

  return null
}
