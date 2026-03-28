'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

type Identity = {
  id: string
  name: string
  email: string
  phone_number: string | null
  status: string
  created_at: string
  date_of_birth: string
  metadata: Record<string, unknown>
}

type Message = {
  id: string
  from: string
  subject?: string
  body: string
  received_at: string
  channel: 'email' | 'sms'
}

const PAGE_SIZE = 20

export default function IdentityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [identity, setIdentity] = useState<Identity | null>(null)
  const [tab, setTab] = useState<'email' | 'sms'>('email')
  const [messages, setMessages] = useState<Message[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loadingIdentity, setLoadingIdentity] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)

  // Compose state
  const [showCompose, setShowCompose] = useState(false)
  const [composeTo, setComposeTo] = useState('')
  const [composeSubject, setComposeSubject] = useState('')
  const [composeBody, setComposeBody] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [sendSuccess, setSendSuccess] = useState(false)

  useEffect(() => {
    fetch(`/api/dashboard/identities/${id}`)
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!data) { router.push('/dashboard/identities'); return }
        setIdentity(data)
        setLoadingIdentity(false)
      })
  }, [id, router])

  useEffect(() => {
    setMessages([])
    setPage(0)
    loadMessages(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, tab])

  async function loadMessages(p: number) {
    setLoadingMessages(true)
    const res = await fetch(`/api/dashboard/identities/${id}/messages?channel=${tab}&offset=${p * PAGE_SIZE}&limit=${PAGE_SIZE + 1}`)
    if (res.ok) {
      const { data } = await res.json()
      const items: Message[] = data ?? []
      setHasMore(items.length > PAGE_SIZE)
      setMessages(prev => p === 0 ? items.slice(0, PAGE_SIZE) : [...prev, ...items.slice(0, PAGE_SIZE)])
    }
    setLoadingMessages(false)
  }

  function loadMore() {
    const nextPage = page + 1
    setPage(nextPage)
    loadMessages(nextPage)
  }

  async function handleSendEmail(e: FormEvent) {
    e.preventDefault()
    setSending(true)
    setSendError('')
    setSendSuccess(false)
    const res = await fetch(`/api/dashboard/identities/${id}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: composeTo, subject: composeSubject, body_text: composeBody }),
    })
    setSending(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setSendError((data as { error?: string }).error ?? 'Failed to send')
    } else {
      setSendSuccess(true)
      setComposeTo('')
      setComposeSubject('')
      setComposeBody('')
      setTimeout(() => {
        setShowCompose(false)
        setSendSuccess(false)
        setMessages([])
        setPage(0)
        loadMessages(0)
      }, 1500)
    }
  }

  const statusColor = (s: string) =>
    s === 'active' ? '#39FF14' : s === 'suspended' ? '#FF0055' : '#64748B'

  if (loadingIdentity) {
    return (
      <div className="p-8">
        <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
          Loading…
        </p>
      </div>
    )
  }

  if (!identity) return null

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm" style={{ fontFamily: 'var(--font-outfit)', color: '#475569' }}>
        <Link href="/dashboard/identities" className="hover:text-[#94a3b8] transition-colors">Identities</Link>
        <span>/</span>
        <span style={{ color: '#94a3b8' }}>{identity.name}</span>
      </div>

      {/* Identity card */}
      <div className="glass-panel p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1
              className="text-xl font-bold tracking-widest uppercase mb-1"
              style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
            >
              {identity.name}
            </h1>
            <span
              className="inline-flex items-center gap-1.5 text-xs"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor(identity.status) }} />
              <span style={{ color: statusColor(identity.status) }}>{identity.status.toUpperCase()}</span>
            </span>
          </div>
          <code className="text-xs px-3 py-1" style={{
            background: 'rgba(0,240,255,0.05)',
            border: '1px solid rgba(0,240,255,0.1)',
            borderRadius: 4,
            color: '#64748B',
            fontFamily: 'var(--font-jetbrains-mono)',
          }}>
            {identity.id}
          </code>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Email', value: identity.email },
            { label: 'Phone', value: identity.phone_number ?? '—' },
            { label: 'Date of Birth', value: identity.date_of_birth ?? '—' },
            { label: 'Created', value: new Date(identity.created_at).toLocaleDateString() },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                {label}
              </p>
              <p className="text-sm" style={{ color: '#E2E8F0', fontFamily: 'var(--font-jetbrains-mono)' }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Inbox tabs + compose button */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1">
          {(['email', 'sms'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setShowCompose(false) }}
              className="px-4 py-2 text-sm transition-all rounded-lg"
              style={{
                fontFamily: 'var(--font-outfit)',
                background: tab === t ? 'rgba(255, 255, 255, 0.07)' : 'transparent',
                color: tab === t ? '#E2E8F0' : '#475569',
              }}
            >
              {t === 'email' ? 'Email' : 'SMS'}
            </button>
          ))}
        </div>
        {tab === 'email' && (
          <button
            onClick={() => { setShowCompose(v => !v); setSendError(''); setSendSuccess(false) }}
            className="btn-cyber px-4 py-1.5 text-xs"
          >
            {showCompose ? 'Cancel' : 'Compose'}
          </button>
        )}
      </div>

      {/* Compose form */}
      {tab === 'email' && showCompose && (
        <div className="glass-panel p-6 mb-4">
          <h3
            className="text-xs font-medium uppercase tracking-wider mb-4"
            style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}
          >
            New email from <span style={{ color: '#94a3b8' }}>{identity.email}</span>
          </h3>
          <form onSubmit={handleSendEmail} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>To</label>
              <input
                type="email"
                value={composeTo}
                onChange={e => setComposeTo(e.target.value)}
                required
                placeholder="recipient@example.com"
                className="px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#E2E8F0',
                  fontFamily: 'var(--font-outfit)',
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>Subject</label>
              <input
                type="text"
                value={composeSubject}
                onChange={e => setComposeSubject(e.target.value)}
                placeholder="(optional)"
                className="px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#E2E8F0',
                  fontFamily: 'var(--font-outfit)',
                }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>Message</label>
              <textarea
                value={composeBody}
                onChange={e => setComposeBody(e.target.value)}
                required
                rows={5}
                placeholder="Write your message…"
                className="px-3 py-2 rounded-lg text-sm outline-none resize-y"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#E2E8F0',
                  fontFamily: 'var(--font-outfit)',
                }}
              />
            </div>
            {sendError && (
              <p className="text-xs" style={{ color: '#FF0055', fontFamily: 'var(--font-outfit)' }}>{sendError}</p>
            )}
            {sendSuccess && (
              <p className="text-xs" style={{ color: '#39FF14', fontFamily: 'var(--font-outfit)' }}>Email sent.</p>
            )}
            <div>
              <button type="submit" disabled={sending} className="btn-cyber px-5 py-2 text-xs disabled:opacity-50">
                {sending ? 'Sending…' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Messages */}
      <div className="glass-panel overflow-hidden">
        {loadingMessages && messages.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>Loading…</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
              No {tab} messages
            </p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'rgba(0, 240, 255, 0.05)' }}>
            {messages.map(msg => (
              <div key={msg.id} className="px-5 py-4 agent-row">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm font-medium" style={{ color: '#E2E8F0', fontFamily: 'var(--font-outfit)' }}>
                    {msg.from}
                  </span>
                  <span className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                    {new Date(msg.received_at).toLocaleString()}
                  </span>
                </div>
                {msg.subject && (
                  <p className="text-sm mb-1" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>
                    {msg.subject}
                  </p>
                )}
                <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)', whiteSpace: 'pre-wrap' }}>
                  {msg.body}
                </p>
              </div>
            ))}
            {hasMore && (
              <div className="p-4 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMessages}
                  className="text-xs transition-colors"
                  style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono)' }}
                >
                  {loadingMessages ? 'Loading…' : 'Load more'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
