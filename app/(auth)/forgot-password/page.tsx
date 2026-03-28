'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { getSupabaseClient } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = getSupabaseClient()
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
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
          Reset your password
        </p>
      </div>

      <div className="glass-panel p-8">
        {sent ? (
          <div className="text-center">
            <div className="mb-4">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto mb-4"
              >
                <rect width="40" height="40" rx="4" fill="rgba(0, 240, 255, 0.05)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" />
                <path d="M12 20l6 6 10-12" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2
              className="text-base font-semibold mb-2"
              style={{ fontFamily: 'var(--font-outfit)', color: '#E2E8F0' }}
            >
              Check your email
            </h2>
            <p className="text-sm mb-6" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
              We sent a password reset link to <span style={{ color: '#94a3b8' }}>{email}</span>. Follow the link to set a new password.
            </p>
            <Link
              href="/login"
              className="text-sm transition-colors"
              style={{ color: '#00F0FF', fontFamily: 'var(--font-outfit)' }}
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1
              className="text-base font-semibold mb-2"
              style={{ fontFamily: 'var(--font-outfit)', color: '#E2E8F0' }}
            >
              Forgot password?
            </h1>
            <p className="text-sm mb-6" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
              Enter your email and we&apos;ll send you a reset link.
            </p>

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
                  placeholder="you@example.com"
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
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
              <Link href="/login" className="transition-colors" style={{ color: '#00F0FF' }}>
                Back to sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
