'use client'

import { useState } from 'react'

export default function WaitlistSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.duplicate) {
        setStatus('duplicate')
      } else if (data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="waitlist"
      className="w-full py-28 px-6 relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(0, 240, 255, 0.08)' }}
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,240,255,0.07), transparent)',
        }}
      />

      <div className="max-w-[560px] mx-auto relative z-10 text-center flex flex-col items-center gap-10">
        {/* Heading */}
        <div className="flex flex-col items-center gap-4">
          <h2
            className="text-3xl lg:text-[42px] font-bold text-white uppercase leading-tight"
            style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
          >
            Sign Up to Be Part of Beta Testing
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: '#64748B', fontFamily: 'var(--font-outfit), sans-serif' }}
          >
            We&apos;re opening access to a limited number of early operators.
            Register below and we&apos;ll reach out when your spot is ready.
          </p>
        </div>

        {/* Form */}
        {status === 'success' ? (
          <div
            className="w-full flex flex-col items-center gap-3 py-6"
            style={{
              border: '1px solid rgba(57, 255, 20, 0.2)',
              borderRadius: 8,
              background: 'rgba(57, 255, 20, 0.04)',
            }}
          >
            <span
              className="text-2xl"
              style={{ color: '#39FF14', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              ✓
            </span>
            <p
              className="text-sm"
              style={{ color: '#39FF14', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              You&apos;re on the list. We&apos;ll be in touch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              className="w-full h-[52px] px-5 text-sm text-white placeholder-[#64748B] outline-none transition-all"
              style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                background: 'rgba(11, 18, 33, 0.8)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                borderRadius: 6,
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.2)')}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-cyber w-full h-[52px] text-sm disabled:opacity-60"
            >
              {status === 'loading' ? 'Submitting...' : 'Request Beta Access'}
            </button>

            {status === 'duplicate' && (
              <p
                className="text-xs text-center"
                style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                Already registered — you&apos;re on the list.
              </p>
            )}
            {status === 'error' && (
              <p
                className="text-xs text-center"
                style={{ color: '#FF0055', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
