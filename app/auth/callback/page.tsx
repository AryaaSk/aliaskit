'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const supabase = getSupabaseClient()

    function setSessionCookies(session: { access_token: string }) {
      document.cookie = `ak-access-token=${session.access_token}; path=/; max-age=3600; SameSite=Lax`
      document.cookie = 'ak-session=1; path=/; max-age=86400; SameSite=Lax'
    }

    async function handleCallback() {
      // Detect recovery flow from query param set by resetPasswordForEmail redirectTo
      const searchParams = new URLSearchParams(window.location.search)
      const flowType = searchParams.get('type')

      // 1. Try to parse tokens directly from hash fragment (implicit flow)
      const hash = window.location.hash.substring(1)
      if (hash) {
        const params = new URLSearchParams(hash)
        const accessToken = params.get('access_token')
        const refreshToken = params.get('refresh_token')

        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })
          if (!error && data.session) {
            setSessionCookies(data.session)
            // Clear the hash from URL before navigating
            window.history.replaceState(null, '', window.location.pathname)
            // If this is a password recovery flow, send to reset-password page
            if (flowType === 'recovery') {
              router.replace('/reset-password')
            } else {
              router.replace('/dashboard')
            }
            return
          }
          if (error) {
            setErrorMsg(error.message)
            setStatus('error')
            return
          }
        }
      }

      // 2. Fallback: check for existing session (e.g. already exchanged, email confirm)
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        setErrorMsg(error.message)
        setStatus('error')
        return
      }
      if (session) {
        setSessionCookies(session)
        if (flowType === 'recovery') {
          router.replace('/reset-password')
        } else {
          router.replace('/dashboard')
        }
        return
      }

      // 3. Nothing worked
      setErrorMsg('Sign-in failed — please try again.')
      setStatus('error')
    }

    handleCallback()
  }, [router])

  if (status === 'error') {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 0 10 L 40 10 M 10 0 L 10 40' fill='none' stroke='rgba(100,116,139,0.06)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E\")",
        }}
      >
        <div className="w-full max-w-[420px]">
          <div className="mb-8 text-center">
            <span
              className="text-2xl font-bold tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
            >
              Alias<span style={{ color: '#00F0FF' }}>Kit</span>
            </span>
          </div>
          <div className="glass-panel p-8 text-center">
            <p
              className="text-sm mb-4"
              style={{ color: '#FF0055', fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              {errorMsg}
            </p>
            <a
              href="/login"
              className="text-sm"
              style={{ color: '#00F0FF', fontFamily: 'var(--font-outfit)' }}
            >
              Back to login
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 0 10 L 40 10 M 10 0 L 10 40' fill='none' stroke='rgba(100,116,139,0.06)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E\")",
      }}
    >
      <div className="w-full max-w-[420px]">
        <div className="mb-8 text-center">
          <span
            className="text-2xl font-bold tracking-[0.15em] uppercase"
            style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
          >
            Alias<span style={{ color: '#00F0FF' }}>Kit</span>
          </span>
        </div>
        <div className="glass-panel p-8 text-center">
          <p
            className="text-sm"
            style={{ color: '#94a3b8', fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            Verifying… redirecting to dashboard
          </p>
        </div>
      </div>
    </div>
  )
}
