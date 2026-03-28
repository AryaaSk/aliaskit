'use client'

import { useEffect, useState, FormEvent } from 'react'
import { getSupabaseClient } from '@/lib/supabase'

export default function SettingsPage() {
  const [email, setEmail] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [createdAt, setCreatedAt] = useState<string | null>(null)

  // Password change
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwLoading, setPwLoading] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState(false)

  useEffect(() => {
    const supabase = getSupabaseClient()
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) return
      setEmail(data.session.user.email ?? null)
      setUserId(data.session.user.id)
      setCreatedAt(data.session.user.created_at ?? null)
    })
  }, [])

  async function handlePasswordChange(e: FormEvent) {
    e.preventDefault()
    setPwError('')
    setPwSuccess(false)
    if (newPassword !== confirmPassword) {
      setPwError('Passwords do not match.')
      return
    }
    if (newPassword.length < 8) {
      setPwError('Password must be at least 8 characters.')
      return
    }
    setPwLoading(true)
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPwLoading(false)
    if (error) {
      setPwError(error.message)
    } else {
      setPwSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-xl font-bold tracking-widest uppercase mb-1"
          style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
        >
          Settings
        </h1>
        <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
          Account and configuration
        </p>
      </div>

      {/* Account section */}
      <section className="mb-8">
        <h2
          className="text-xs font-medium uppercase tracking-wider mb-4"
          style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}
        >
          Account
        </h2>
        <div className="glass-panel divide-y divide-white/[0.04]">
          {[
            { label: 'Email', value: email ?? '—' },
            { label: 'User ID', value: userId ?? '—' },
            {
              label: 'Member since',
              value: createdAt ? new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—',
            },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between px-5 py-4">
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                {label}
              </span>
              <span
                className="text-sm"
                style={{
                  color: '#94a3b8',
                  fontFamily: label === 'User ID' ? 'var(--font-jetbrains-mono)' : 'var(--font-outfit)',
                  fontSize: label === 'User ID' ? '0.7rem' : undefined,
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Change password section */}
      <section className="mb-8">
        <h2
          className="text-xs font-medium uppercase tracking-wider mb-4"
          style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}
        >
          Change Password
        </h2>
        <div className="glass-panel p-6">
          <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                className="px-3 py-2 rounded-lg text-sm outline-none transition-colors"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#E2E8F0',
                  fontFamily: 'var(--font-outfit)',
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>
                Confirm new password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                required
                className="px-3 py-2 rounded-lg text-sm outline-none transition-colors"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#E2E8F0',
                  fontFamily: 'var(--font-outfit)',
                }}
              />
            </div>
            {pwError && (
              <p className="text-xs" style={{ color: '#FF0055', fontFamily: 'var(--font-outfit)' }}>{pwError}</p>
            )}
            {pwSuccess && (
              <p className="text-xs" style={{ color: '#39FF14', fontFamily: 'var(--font-outfit)' }}>Password updated.</p>
            )}
            <div>
              <button
                type="submit"
                disabled={pwLoading}
                className="btn-cyber px-5 py-2 text-xs disabled:opacity-50"
              >
                {pwLoading ? 'Updating…' : 'Update password'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Webhooks section */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h2
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}
          >
            Webhooks
          </h2>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider"
            style={{
              background: 'rgba(0, 240, 255, 0.07)',
              color: '#00F0FF',
              fontFamily: 'var(--font-outfit)',
              border: '1px solid rgba(0, 240, 255, 0.15)',
            }}
          >
            Coming soon
          </span>
        </div>
        <div
          className="glass-panel p-6"
          style={{ opacity: 0.6 }}
        >
          <p className="text-sm mb-4" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
            Receive real-time notifications when identities receive emails or SMS messages.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>
                Endpoint URL
              </label>
              <input
                type="url"
                disabled
                placeholder="https://your-server.com/webhook"
                className="px-3 py-2 rounded-lg text-sm cursor-not-allowed"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  color: '#475569',
                  fontFamily: 'var(--font-outfit)',
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>
                Events
              </p>
              <div className="flex flex-wrap gap-2">
                {['email.received', 'sms.received'].map(event => (
                  <label
                    key={event}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-not-allowed"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <input type="checkbox" disabled className="opacity-40" />
                    <code
                      className="text-xs"
                      style={{ color: '#475569', fontFamily: 'var(--font-jetbrains-mono)' }}
                    >
                      {event}
                    </code>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <button
                disabled
                className="btn-cyber px-5 py-2 text-xs opacity-30 cursor-not-allowed"
              >
                Add webhook
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
