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

    // onAuthStateChange fires once the token in the URL hash is exchanged for a session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        document.cookie = `ak-access-token=${session.access_token}; path=/; max-age=3600; SameSite=Lax`
        document.cookie = 'ak-session=1; path=/; max-age=86400; SameSite=Lax'
        router.replace('/dashboard')
      }
    })

    // Also check for an existing session in case the exchange already happened
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setErrorMsg(error.message)
        setStatus('error')
        return
      }
      if (session) {
        document.cookie = `ak-access-token=${session.access_token}; path=/; max-age=3600; SameSite=Lax`
        document.cookie = 'ak-session=1; path=/; max-age=86400; SameSite=Lax'
        router.replace('/dashboard')
      }
    })

    // If no session event fires within 5 s, surface an error
    const timeout = setTimeout(() => {
      setErrorMsg('Verification link expired or invalid.')
      setStatus('error')
    }, 5000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
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
