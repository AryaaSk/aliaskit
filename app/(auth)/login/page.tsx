'use client'

import { useState, FormEvent, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getSupabaseClient } from '@/lib/supabase'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/dashboard'
  const registered = searchParams.get('registered') === 'true'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleGoogleSignIn() {
    setError('')
    setGoogleLoading(true)
    const supabase = getSupabaseClient()
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (authError) {
      setError(authError.message)
      setGoogleLoading(false)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = getSupabaseClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      if (authError.message.toLowerCase().includes('email not confirmed')) {
        setError('Please confirm your email before signing in — check your inbox for the verification link.')
      } else {
        setError(authError.message)
      }
      setLoading(false)
      return
    }

    // Set a session flag cookie readable by proxy
    document.cookie = 'ak-session=1; path=/; max-age=86400; SameSite=Lax'
    router.push(next)
  }

  return (
    <div className="w-full max-w-[420px]">
      {/* Logo */}
      <div className="mb-8 text-center">
        <span
          className="text-2xl font-bold tracking-[0.15em] uppercase"
          style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
        >
          Alias<span style={{ color: '#00F0FF' }}>Kit</span>
        </span>
        <p className="mt-2 text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
          Sign in to your account
        </p>
      </div>

      <div className="glass-panel p-8">
        <h1
          className="text-base font-semibold mb-6"
          style={{ fontFamily: 'var(--font-outfit)', color: '#E2E8F0' }}
        >
          Sign in
        </h1>

        {registered && (
          <div className="glass-panel px-4 py-3 mb-4">
            <p className="text-xs" style={{ color: '#39FF14', fontFamily: 'var(--font-outfit)' }}>
              Account created — check your email and confirm before signing in.
            </p>
          </div>
        )}

        {/* Google OAuth */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full py-2.5 text-sm flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'rgba(5, 9, 20, 0.8)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            borderRadius: 4,
            color: '#E2E8F0',
            fontFamily: 'var(--font-outfit)',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0, 240, 255, 0.5)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0, 240, 255, 0.2)')}
        >
          {!googleLoading && (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
          )}
          {googleLoading ? 'Redirecting…' : 'Continue with Google'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px" style={{ background: 'rgba(0, 240, 255, 0.1)' }} />
          <span className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>or</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(0, 240, 255, 0.1)' }} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-2.5 text-sm outline-none transition-all"
              style={{
                background: 'rgba(5, 9, 20, 0.8)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                borderRadius: 4,
                color: '#E2E8F0',
                fontFamily: 'var(--font-jetbrains-mono)',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(0, 240, 255, 0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0, 240, 255, 0.2)')}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2.5 text-sm outline-none transition-all"
              style={{
                background: 'rgba(5, 9, 20, 0.8)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                borderRadius: 4,
                color: '#E2E8F0',
                fontFamily: 'var(--font-jetbrains-mono)',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(0, 240, 255, 0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0, 240, 255, 0.2)')}
            />
          </div>

          {error && (
            <div className="glass-panel-alert px-4 py-3">
              <p className="text-xs" style={{ color: '#FF0055', fontFamily: 'var(--font-outfit)' }}>
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-cyber w-full py-3 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="transition-colors" style={{ color: '#00F0FF' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
