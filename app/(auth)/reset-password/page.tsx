'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSupabaseClient } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Supabase sets the session from the recovery hash before this page loads
    // (handled by auth/callback). We just need to confirm a session exists.
    const supabase = getSupabaseClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true)
      } else {
        // No session — the recovery link may have expired or already been used
        router.replace('/forgot-password?expired=true')
      }
    })
  }, [router])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    const supabase = getSupabaseClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    // Redirect to dashboard on success
    router.replace('/dashboard')
  }

  if (!ready) {
    return (
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
          <p className="text-sm" style={{ color: '#94a3b8', fontFamily: 'var(--font-jetbrains-mono)' }}>
            Verifying reset link…
          </p>
        </div>
      </div>
    )
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
          Set a new password
        </p>
      </div>

      <div className="glass-panel p-8">
        <h1
          className="text-base font-semibold mb-2"
          style={{ fontFamily: 'var(--font-outfit)', color: '#E2E8F0' }}
        >
          New password
        </h1>
        <p className="text-sm mb-6" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
          Choose a strong password for your account.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>
              New password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="At least 8 characters"
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
              Confirm password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
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
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
          <Link href="/login" className="transition-colors" style={{ color: '#00F0FF' }}>
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
