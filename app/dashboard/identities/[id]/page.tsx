'use client'

import { useEffect, useState } from 'react'
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

  const statusColor = (s: string) =>
    s === 'active' ? '#39FF14' : s === 'suspended' ? '#FF0055' : '#64748B'

  if (loadingIdentity) {
    return (
      <div className="p-8">
        <p className="text-xs tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>
          LOADING...
        </p>
      </div>
    )
  }

  if (!identity) return null

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-xs" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: '#64748B' }}>
        <Link href="/dashboard/identities" className="hover:text-[#00F0FF] transition-colors">Identities</Link>
        <span>/</span>
        <span style={{ color: '#E2E8F0' }}>{identity.name}</span>
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
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>
                {label}
              </p>
              <p className="text-sm" style={{ color: '#E2E8F0', fontFamily: 'var(--font-jetbrains-mono)' }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Inbox tabs */}
      <div className="mb-4 flex gap-1">
        {(['email', 'sms'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 text-xs tracking-widest uppercase transition-all"
            style={{
              fontFamily: 'var(--font-jetbrains-mono)',
              border: `1px solid ${tab === t ? '#00F0FF' : 'rgba(0,240,255,0.1)'}`,
              borderRadius: 4,
              background: tab === t ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
              color: tab === t ? '#00F0FF' : '#64748B',
            }}
          >
            {t === 'email' ? '✉ Email' : '📱 SMS'}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="glass-panel overflow-hidden">
        {loadingMessages && messages.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-xs tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>LOADING...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-xs tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>
              NO {tab.toUpperCase()} MESSAGES
            </p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'rgba(0, 240, 255, 0.05)' }}>
            {messages.map(msg => (
              <div key={msg.id} className="px-5 py-4 agent-row">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs font-bold" style={{ color: '#E2E8F0', fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {msg.from}
                  </span>
                  <span className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {new Date(msg.received_at).toLocaleString()}
                  </span>
                </div>
                {msg.subject && (
                  <p className="text-xs mb-1" style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {msg.subject}
                  </p>
                )}
                <p className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)', whiteSpace: 'pre-wrap' }}>
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
                  {loadingMessages ? 'LOADING...' : 'LOAD MORE'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
