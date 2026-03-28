'use client'

import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getSupabaseClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = getSupabaseClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
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
