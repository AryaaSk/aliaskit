'use client'

import { useEffect, useState, FormEvent, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

type Identity = {
  id: string
  name: string
  email: string
  phone_number: string | null
  status: string
  created_at: string
  date_of_birth: string | null
  metadata: Record<string, unknown>
}

type Email = {
  id: string
  from: string
  to?: string
  subject?: string
  body_text?: string
  body_html?: string | null
  received_at: string
  direction: 'inbound' | 'outbound'
  read: boolean
}

type SmsMessage = {
  id: string
  from?: string
  to?: string
  body: string
  received_at: string
  direction: 'inbound' | 'outbound'
}

const PAGE_LIMIT = 20

function inputStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#E2E8F0',
    fontFamily: 'var(--font-outfit)',
    borderRadius: 8,
    outline: 'none',
    ...extra,
  }
}

export default function IdentityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [identity, setIdentity] = useState<Identity | null>(null)
  const [loadingIdentity, setLoadingIdentity] = useState(true)
  const [tab, setTab] = useState<'overview' | 'email' | 'sms'>('overview')

  // --- Email state ---
  const [emails, setEmails] = useState<Email[]>([])
  const [emailPage, setEmailPage] = useState(1)
  const [emailTotal, setEmailTotal] = useState(0)
  const [loadingEmails, setLoadingEmails] = useState(false)
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null)

  // Compose/reply
  const [showCompose, setShowCompose] = useState(false)
  const [composeTo, setComposeTo] = useState('')
  const [composeSubject, setComposeSubject] = useState('')
  const [composeBody, setComposeBody] = useState('')
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailSendError, setEmailSendError] = useState('')
  const [emailSendSuccess, setEmailSendSuccess] = useState(false)

  // --- SMS state ---
  const [smsMessages, setSmsMessages] = useState<SmsMessage[]>([])
  const [smsPage, setSmsPage] = useState(1)
  const [smsTotal, setSmsTotal] = useState(0)
  const [loadingSms, setLoadingSms] = useState(false)
  const [smsBody, setSmsBody] = useState('')
  const [sendingSms, setSendingSms] = useState(false)
  const [smsSendError, setSmsSendError] = useState('')
  const smsChatRef = useRef<HTMLDivElement>(null)

  // Load identity
  useEffect(() => {
    fetch(`/api/dashboard/identities/${id}`)
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!data) { router.push('/dashboard/identities'); return }
        setIdentity(data)
        setLoadingIdentity(false)
      })
  }, [id, router])

  // Load emails when tab switches to email or page changes
  useEffect(() => {
    if (tab !== 'email') return
    loadEmails(emailPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, emailPage, id])

  // Load SMS when tab switches to sms or page changes
  useEffect(() => {
    if (tab !== 'sms') return
    loadSms(smsPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, smsPage, id])

  // Scroll SMS chat to bottom on new messages
  useEffect(() => {
    if (tab === 'sms' && smsChatRef.current) {
      smsChatRef.current.scrollTop = smsChatRef.current.scrollHeight
    }
  }, [smsMessages, tab])

  async function loadEmails(page: number) {
    setLoadingEmails(true)
    try {
      const res = await fetch(`/api/dashboard/identities/${id}/emails?page=${page}&limit=${PAGE_LIMIT}`)
      if (res.ok) {
        const json = await res.json()
        setEmails(json.data ?? [])
        setEmailTotal(json.total ?? 0)
      }
    } finally {
      setLoadingEmails(false)
    }
  }

  async function loadSms(page: number) {
    setLoadingSms(true)
    try {
      const res = await fetch(`/api/dashboard/identities/${id}/sms?page=${page}&limit=${PAGE_LIMIT}`)
      if (res.ok) {
        const json = await res.json()
        setSmsMessages(json.data ?? [])
        setSmsTotal(json.total ?? 0)
      }
    } finally {
      setLoadingSms(false)
    }
  }

  async function handleMarkRead(emailId: string, read: boolean) {
    await fetch(`/api/dashboard/identities/${id}/emails/${emailId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    })
    setEmails(prev => prev.map(e => e.id === emailId ? { ...e, read } : e))
  }

  async function handleDeleteEmail(emailId: string) {
    await fetch(`/api/dashboard/identities/${id}/emails/${emailId}`, { method: 'DELETE' })
    setEmails(prev => prev.filter(e => e.id !== emailId))
    setEmailTotal(t => t - 1)
    if (expandedEmailId === emailId) setExpandedEmailId(null)
  }

  async function handleDeleteSms(msgId: string) {
    await fetch(`/api/dashboard/identities/${id}/sms/${msgId}`, { method: 'DELETE' })
    setSmsMessages(prev => prev.filter(m => m.id !== msgId))
    setSmsTotal(t => t - 1)
  }

  function openReply(email: Email) {
    setComposeTo(email.from)
    setComposeSubject(email.subject ? `Re: ${email.subject.replace(/^Re:\s*/i, '')}` : '')
    setComposeBody('')
    setShowCompose(true)
    setEmailSendError('')
    setEmailSendSuccess(false)
  }

  async function handleSendEmail(e: FormEvent) {
    e.preventDefault()
    setSendingEmail(true)
    setEmailSendError('')
    setEmailSendSuccess(false)
    const res = await fetch(`/api/dashboard/identities/${id}/emails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: composeTo, subject: composeSubject, body_text: composeBody }),
    })
    setSendingEmail(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setEmailSendError((data as { error?: string }).error ?? 'Failed to send')
    } else {
      setEmailSendSuccess(true)
      setComposeTo('')
      setComposeSubject('')
      setComposeBody('')
      setTimeout(() => {
        setShowCompose(false)
        setEmailSendSuccess(false)
        setEmailPage(1)
        loadEmails(1)
      }, 1200)
    }
  }

  async function handleSendSms(e: FormEvent) {
    e.preventDefault()
    if (!smsBody.trim()) return
    setSendingSms(true)
    setSmsSendError('')
    const res = await fetch(`/api/dashboard/identities/${id}/sms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: smsBody }),
    })
    setSendingSms(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setSmsSendError((data as { error?: string }).error ?? 'Failed to send')
    } else {
      setSmsBody('')
      setSmsPage(1)
      loadSms(1)
    }
  }

  function switchTab(t: 'overview' | 'email' | 'sms') {
    setTab(t)
    setShowCompose(false)
    setExpandedEmailId(null)
    if (t === 'email') { setEmailPage(1) }
    if (t === 'sms') { setSmsPage(1) }
  }

  const statusColor = (s: string) =>
    s === 'active' ? '#39FF14' : s === 'suspended' ? '#FF0055' : '#64748B'

  const emailPageCount = Math.ceil(emailTotal / PAGE_LIMIT)
  const smsPageCount = Math.ceil(smsTotal / PAGE_LIMIT)

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

      {/* Tabs */}
      <div className="flex gap-1 mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0px' }}>
        {(['overview', 'email', 'sms'] as const).map(t => {
          const labels = { overview: 'Overview', email: 'Email Inbox', sms: 'SMS Messages' }
          return (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className="px-4 py-2.5 text-sm transition-all relative"
              style={{
                fontFamily: 'var(--font-outfit)',
                color: tab === t ? '#E2E8F0' : '#475569',
                borderBottom: tab === t ? '2px solid #00F0FF' : '2px solid transparent',
                marginBottom: -1,
                background: 'transparent',
              }}
            >
              {labels[t]}
            </button>
          )
        })}
      </div>

      {/* ─── Overview tab ─── */}
      {tab === 'overview' && (
        <div className="glass-panel p-6">
          <div className="flex items-start justify-between mb-6">
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
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

          {Object.keys(identity.metadata ?? {}).length > 0 && (
            <>
              <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                Metadata
              </p>
              <pre
                className="text-xs p-4 rounded-lg overflow-auto"
                style={{
                  background: 'rgba(0,240,255,0.03)',
                  border: '1px solid rgba(0,240,255,0.06)',
                  color: '#64748B',
                  fontFamily: 'var(--font-jetbrains-mono)',
                  maxHeight: 200,
                }}
              >
                {JSON.stringify(identity.metadata, null, 2)}
              </pre>
            </>
          )}
        </div>
      )}

      {/* ─── Email Inbox tab ─── */}
      {tab === 'email' && (
        <div>
          {/* Compose button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setComposeTo('')
                setComposeSubject('')
                setComposeBody('')
                setEmailSendError('')
                setEmailSendSuccess(false)
                setShowCompose(v => !v)
              }}
              className="btn-cyber px-4 py-1.5 text-xs"
            >
              {showCompose ? 'Cancel' : 'Compose'}
            </button>
          </div>

          {/* Compose form */}
          {showCompose && (
            <div className="glass-panel p-6 mb-4">
              <h3 className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
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
                    className="px-3 py-2 text-sm"
                    style={inputStyle()}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>Subject</label>
                  <input
                    type="text"
                    value={composeSubject}
                    onChange={e => setComposeSubject(e.target.value)}
                    placeholder="(optional)"
                    className="px-3 py-2 text-sm"
                    style={inputStyle()}
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
                    className="px-3 py-2 text-sm resize-y"
                    style={inputStyle()}
                  />
                </div>
                {emailSendError && (
                  <p className="text-xs" style={{ color: '#FF0055', fontFamily: 'var(--font-outfit)' }}>{emailSendError}</p>
                )}
                {emailSendSuccess && (
                  <p className="text-xs" style={{ color: '#39FF14', fontFamily: 'var(--font-outfit)' }}>Email sent.</p>
                )}
                <div>
                  <button type="submit" disabled={sendingEmail} className="btn-cyber px-5 py-2 text-xs disabled:opacity-50">
                    {sendingEmail ? 'Sending…' : 'Send'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Email list */}
          <div className="glass-panel overflow-hidden">
            {loadingEmails && emails.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>Loading…</p>
              </div>
            ) : emails.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>No emails yet</p>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: 'rgba(0,240,255,0.05)' }}>
                {emails.map(email => {
                  const expanded = expandedEmailId === email.id
                  return (
                    <div key={email.id}>
                      {/* Row */}
                      <div
                        className="px-5 py-4 cursor-pointer transition-colors"
                        style={{ background: expanded ? 'rgba(0,240,255,0.03)' : undefined }}
                        onClick={() => {
                          setExpandedEmailId(expanded ? null : email.id)
                          if (!email.read) handleMarkRead(email.id, true)
                        }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-2.5 min-w-0">
                            {/* Unread dot */}
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: email.read ? 'transparent' : '#00F0FF' }}
                            />
                            <div className="min-w-0">
                              <p
                                className="text-sm truncate"
                                style={{
                                  color: email.read ? '#94a3b8' : '#E2E8F0',
                                  fontFamily: 'var(--font-outfit)',
                                  fontWeight: email.read ? 400 : 600,
                                }}
                              >
                                {email.direction === 'outbound' ? `To: ${email.to ?? ''}` : email.from}
                              </p>
                              {email.subject && (
                                <p className="text-xs truncate mt-0.5" style={{ color: '#64748B', fontFamily: 'var(--font-outfit)' }}>
                                  {email.subject}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            {email.direction === 'outbound' && (
                              <span className="text-xs px-1.5 py-0.5 rounded" style={{
                                background: 'rgba(0,240,255,0.08)',
                                color: '#00F0FF',
                                fontFamily: 'var(--font-jetbrains-mono)',
                                fontSize: 10,
                              }}>
                                sent
                              </span>
                            )}
                            <span className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                              {new Date(email.received_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Expanded body */}
                      {expanded && (
                        <div className="px-5 pb-5" style={{ borderTop: '1px solid rgba(0,240,255,0.05)' }}>
                          {/* Actions */}
                          <div className="flex items-center gap-3 py-3">
                            <button
                              onClick={(e) => { e.stopPropagation(); openReply(email) }}
                              className="text-xs px-3 py-1 rounded transition-colors"
                              style={{
                                background: 'rgba(255,255,255,0.05)',
                                color: '#94a3b8',
                                fontFamily: 'var(--font-outfit)',
                                border: '1px solid rgba(255,255,255,0.08)',
                              }}
                            >
                              Reply
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleMarkRead(email.id, !email.read) }}
                              className="text-xs px-3 py-1 rounded transition-colors"
                              style={{
                                background: 'rgba(255,255,255,0.05)',
                                color: '#94a3b8',
                                fontFamily: 'var(--font-outfit)',
                                border: '1px solid rgba(255,255,255,0.08)',
                              }}
                            >
                              Mark {email.read ? 'unread' : 'read'}
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteEmail(email.id) }}
                              className="text-xs px-3 py-1 rounded transition-colors"
                              style={{
                                background: 'rgba(255,0,85,0.08)',
                                color: '#FF0055',
                                fontFamily: 'var(--font-outfit)',
                                border: '1px solid rgba(255,0,85,0.15)',
                              }}
                            >
                              Delete
                            </button>
                          </div>

                          {/* Email body */}
                          {email.body_html ? (
                            <div
                              className="text-sm rounded-lg p-4 overflow-auto"
                              style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                color: '#94a3b8',
                                maxHeight: 400,
                              }}
                              dangerouslySetInnerHTML={{ __html: email.body_html }}
                            />
                          ) : (
                            <pre
                              className="text-sm rounded-lg p-4 overflow-auto whitespace-pre-wrap"
                              style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                color: '#94a3b8',
                                fontFamily: 'var(--font-outfit)',
                                maxHeight: 400,
                              }}
                            >
                              {email.body_text ?? '(no body)'}
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Pagination */}
            {emailPageCount > 1 && (
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ borderTop: '1px solid rgba(0,240,255,0.05)' }}
              >
                <button
                  onClick={() => setEmailPage(p => Math.max(1, p - 1))}
                  disabled={emailPage === 1 || loadingEmails}
                  className="text-xs px-3 py-1.5 rounded disabled:opacity-30 transition-colors"
                  style={{
                    color: '#00F0FF',
                    fontFamily: 'var(--font-jetbrains-mono)',
                    border: '1px solid rgba(0,240,255,0.2)',
                  }}
                >
                  ← Prev
                </button>
                <span className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                  {emailPage} / {emailPageCount}
                </span>
                <button
                  onClick={() => setEmailPage(p => Math.min(emailPageCount, p + 1))}
                  disabled={emailPage === emailPageCount || loadingEmails}
                  className="text-xs px-3 py-1.5 rounded disabled:opacity-30 transition-colors"
                  style={{
                    color: '#00F0FF',
                    fontFamily: 'var(--font-jetbrains-mono)',
                    border: '1px solid rgba(0,240,255,0.2)',
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── SMS Messages tab ─── */}
      {tab === 'sms' && (
        <div className="flex flex-col" style={{ height: 'calc(100vh - 220px)', minHeight: 400 }}>
          {identity.phone_number === null ? (
            <div className="glass-panel p-12 text-center flex-1 flex items-center justify-center">
              <div>
                <p className="text-sm mb-1" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>
                  No phone number
                </p>
                <p className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                  Provision a phone number for this identity to enable SMS.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat area */}
              <div
                ref={smsChatRef}
                className="glass-panel flex-1 overflow-y-auto p-5 flex flex-col gap-3"
                style={{ marginBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              >
                {/* Pagination — prev */}
                {smsPageCount > 1 && smsPage < smsPageCount && (
                  <div className="text-center">
                    <button
                      onClick={() => setSmsPage(p => p + 1)}
                      disabled={loadingSms}
                      className="text-xs"
                      style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono)' }}
                    >
                      {loadingSms ? 'Loading…' : 'Load older messages'}
                    </button>
                  </div>
                )}

                {loadingSms && smsMessages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>Loading…</p>
                  </div>
                ) : smsMessages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>No messages yet</p>
                  </div>
                ) : (
                  smsMessages.map(msg => {
                    const isOutbound = msg.direction === 'outbound'
                    return (
                      <div key={msg.id} className={`flex ${isOutbound ? 'justify-end' : 'justify-start'} group`}>
                        <div className="flex flex-col gap-0.5 max-w-[70%]">
                          <div
                            className="px-4 py-2.5 rounded-2xl text-sm"
                            style={{
                              background: isOutbound
                                ? 'rgba(0,240,255,0.12)'
                                : 'rgba(255,255,255,0.07)',
                              color: '#E2E8F0',
                              fontFamily: 'var(--font-outfit)',
                              borderBottomRightRadius: isOutbound ? 4 : undefined,
                              borderBottomLeftRadius: !isOutbound ? 4 : undefined,
                            }}
                          >
                            {msg.body}
                          </div>
                          <div className={`flex items-center gap-2 ${isOutbound ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                              {new Date(msg.received_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <button
                              onClick={() => handleDeleteSms(msg.id)}
                              className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: '#FF0055', fontFamily: 'var(--font-outfit)' }}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* SMS compose */}
              <div
                className="glass-panel"
                style={{
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderTop: '1px solid rgba(0,240,255,0.08)',
                  padding: '12px 16px',
                }}
              >
                {smsSendError && (
                  <p className="text-xs mb-2" style={{ color: '#FF0055', fontFamily: 'var(--font-outfit)' }}>
                    {smsSendError}
                  </p>
                )}
                <form onSubmit={handleSendSms} className="flex items-end gap-3">
                  <textarea
                    value={smsBody}
                    onChange={e => setSmsBody(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendSms(e as unknown as FormEvent)
                      }
                    }}
                    rows={2}
                    placeholder="Type a message… (Enter to send)"
                    className="flex-1 px-3 py-2 text-sm resize-none"
                    style={inputStyle({ borderRadius: 10 })}
                  />
                  <button
                    type="submit"
                    disabled={sendingSms || !smsBody.trim()}
                    className="btn-cyber px-4 py-2 text-xs flex-shrink-0 disabled:opacity-40"
                  >
                    {sendingSms ? '…' : 'Send'}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
