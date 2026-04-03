'use client'

import { useEffect, useState, FormEvent } from 'react'

type ApiKey = {
  id: string
  key_prefix: string
  label: string
  scopes: string[]
  rate_limit: number
  created_at: string
  last_used_at: string | null
  revoked_at: string | null
}

const ALL_SCOPES = ['identities:read', 'identities:write', 'messages:read']

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [label, setLabel] = useState('')
  const [selectedScopes, setSelectedScopes] = useState<string[]>([...ALL_SCOPES])
  const [creating, setCreating] = useState(false)
  const [newKey, setNewKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [confirmingRevoke, setConfirmingRevoke] = useState<string | null>(null)
  const [showRevoked, setShowRevoked] = useState(false)

  async function loadKeys() {
    const res = await fetch('/api/dashboard/api-keys')
    if (res.ok) {
      const { data } = await res.json()
      setKeys(data ?? [])
    }
    setLoading(false)
  }

  useEffect(() => {
    let active = true

    async function loadInitialKeys() {
      const res = await fetch('/api/dashboard/api-keys')
      if (!active) return

      if (res.ok) {
        const { data } = await res.json()
        if (!active) return
        setKeys(data ?? [])
      }
      setLoading(false)
    }

    void loadInitialKeys()
    return () => {
      active = false
    }
  }, [])

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    setCreating(true)
    setError('')
    const res = await fetch('/api/dashboard/api-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: label || 'Default', scopes: selectedScopes }),
    })
    const body = await res.json()
    if (!res.ok) {
      setError(body.error ?? 'Failed to create key')
    } else {
      setNewKey(body.key)
      setLabel('')
      setSelectedScopes([...ALL_SCOPES])
      setShowForm(false)
      await loadKeys()
    }
    setCreating(false)
  }

  async function revokeKey(id: string) {
    const res = await fetch(`/api/dashboard/api-keys/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setConfirmingRevoke(null)
      await loadKeys()
    }
  }

  function copyKey() {
    if (!newKey) return
    navigator.clipboard.writeText(newKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 6,
    color: '#FFFFFF',
    fontFamily: 'var(--font-jetbrains-mono)',
    outline: 'none',
    transition: 'border-color 0.15s',
  } as const

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className="text-lg font-semibold mb-1"
            style={{ fontFamily: 'var(--font-outfit)', color: '#FFFFFF' }}
          >
            API Keys
          </h1>
          <p className="text-sm" style={{ color: '#525252', fontFamily: 'var(--font-outfit)' }}>
            {loading ? '' : `${keys.filter(k => !k.revoked_at).length} active`}
          </p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary">
            + New key
          </button>
        )}
      </div>

      {/* New key reveal */}
      {newKey && (
        <div
          className="panel p-5 mb-6"
          style={{ borderColor: 'rgba(34,197,94,0.25)' }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.06em] mb-3" style={{ color: '#22C55E', fontFamily: 'var(--font-outfit)' }}>
            Key created — copy now, it won&apos;t be shown again
          </p>
          <div className="flex items-center gap-3">
            <code
              className="flex-1 text-xs px-4 py-2.5 rounded truncate"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(34,197,94,0.25)',
                color: '#22C55E',
                fontFamily: 'var(--font-jetbrains-mono)',
              }}
            >
              {newKey}
            </code>
            <button
              onClick={copyKey}
              className="btn-ghost text-xs px-4 py-2.5"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
            <button
              onClick={() => setNewKey(null)}
              className="text-xs px-3 py-2.5"
              style={{ color: '#525252', fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <div className="panel p-6 mb-6">
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: '#FFFFFF', fontFamily: 'var(--font-outfit)' }}
          >
            New API Key
          </h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: '#A1A1A1', fontFamily: 'var(--font-outfit)' }}>
                Label
              </label>
              <input
                type="text"
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder="e.g. Production"
                className="w-full max-w-sm px-4 py-2.5 text-sm"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'rgba(99,102,241,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.10)')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium" style={{ color: '#A1A1A1', fontFamily: 'var(--font-outfit)' }}>
                Scopes
              </p>
              <div className="flex flex-wrap gap-2">
                {ALL_SCOPES.map(scope => {
                  const active = selectedScopes.includes(scope)
                  return (
                    <button
                      key={scope}
                      type="button"
                      onClick={() =>
                        setSelectedScopes(prev =>
                          active ? prev.filter(s => s !== scope) : [...prev, scope]
                        )
                      }
                      className="text-xs px-2 py-1 transition-all"
                      style={{
                        fontFamily: 'var(--font-jetbrains-mono)',
                        border: `1px solid ${active ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 4,
                        background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                        color: active ? '#FFFFFF' : '#525252',
                      }}
                    >
                      {scope}
                    </button>
                  )
                })}
              </div>
            </div>
            {error && (
              <p className="text-xs" style={{ color: '#EF4444', fontFamily: 'var(--font-outfit)' }}>{error}</p>
            )}
            <div className="flex gap-3">
              <button type="submit" disabled={creating} className="btn-primary disabled:opacity-50">
                {creating ? 'Creating…' : 'Create key'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-ghost"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Keys table */}
      <div className="panel overflow-hidden">
        {loading ? (
          <div className="p-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 py-3" style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : undefined }}>
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-4 w-24" />
                <div className="skeleton h-4 w-48" />
                <div className="skeleton h-4 w-16" />
              </div>
            ))}
          </div>
        ) : keys.length === 0 ? (
          <div className="py-12 text-center">
            <span className="material-symbols-outlined mb-4 block" style={{ fontSize: 32, color: '#525252' }}>key</span>
            <p className="text-sm font-medium mb-1" style={{ color: '#FFFFFF', fontFamily: 'var(--font-outfit)' }}>
              No API keys yet
            </p>
            <p className="text-sm mb-4" style={{ color: '#A1A1A1', fontFamily: 'var(--font-outfit)' }}>
              Create one to start using the API
            </p>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              + New key
            </button>
          </div>
        ) : (
          <>
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  {['Label', 'Prefix', 'Scopes', 'Last Used', 'Status', ''].map((h, i) => (
                    <th
                      key={i}
                      className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-[0.05em]"
                      style={{ color: '#525252', fontFamily: 'var(--font-outfit)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keys.filter(k => showRevoked || !k.revoked_at).map(key => (
                  <tr
                    key={key.id}
                    className="border-b"
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.04)',
                      opacity: key.revoked_at ? 0.4 : 1,
                    }}
                  >
                    <td className="px-5 py-2.5 text-sm" style={{ color: '#FFFFFF', fontFamily: 'var(--font-outfit)' }}>
                      {key.label}
                    </td>
                    <td className="px-5 py-2.5">
                      <code className="text-xs" style={{ color: '#A1A1A1', fontFamily: 'var(--font-jetbrains-mono)' }}>
                        {key.key_prefix}…
                      </code>
                    </td>
                    <td className="px-5 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {key.scopes.map(s => (
                          <span
                            key={s}
                            className="text-[11px] px-1.5 py-0.5"
                            style={{
                              background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.10)',
                              borderRadius: 4,
                              color: '#525252',
                              fontFamily: 'var(--font-jetbrains-mono)',
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-2.5 text-sm" style={{ color: '#525252', fontFamily: 'var(--font-outfit)' }}>
                      {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-5 py-2.5">
                      <span className={key.revoked_at ? 'badge-neutral' : 'badge-active'}>
                        {key.revoked_at ? 'Revoked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-5 py-2.5">
                      {!key.revoked_at && (
                        confirmingRevoke === key.id ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => revokeKey(key.id)}
                              className="text-xs transition-colors"
                              style={{ color: '#EF4444', fontFamily: 'var(--font-outfit)' }}
                            >
                              Confirm revoke
                            </button>
                            <button
                              onClick={() => setConfirmingRevoke(null)}
                              className="text-xs transition-colors"
                              style={{ color: '#525252', fontFamily: 'var(--font-outfit)' }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmingRevoke(key.id)}
                            className="btn-ghost text-xs px-3 py-1.5"
                            style={{
                              fontSize: 12,
                              padding: '4px 10px',
                            }}
                            onMouseEnter={e => {
                              const btn = e.currentTarget as HTMLButtonElement
                              btn.style.borderColor = 'rgba(239,68,68,0.3)'
                              btn.style.color = '#EF4444'
                              btn.style.background = 'rgba(239,68,68,0.08)'
                            }}
                            onMouseLeave={e => {
                              const btn = e.currentTarget as HTMLButtonElement
                              btn.style.borderColor = 'rgba(255,255,255,0.12)'
                              btn.style.color = '#A1A1A1'
                              btn.style.background = 'transparent'
                            }}
                          >
                            Revoke
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {keys.some(k => k.revoked_at) && (
              <div className="px-5 py-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <button
                  onClick={() => setShowRevoked(v => !v)}
                  className="text-xs transition-colors"
                  style={{ color: '#525252', fontFamily: 'var(--font-outfit)' }}
                  onMouseEnter={e => ((e.target as HTMLButtonElement).style.color = '#A1A1A1')}
                  onMouseLeave={e => ((e.target as HTMLButtonElement).style.color = '#525252')}
                >
                  {showRevoked
                    ? 'Hide revoked'
                    : `+ Show ${keys.filter(k => k.revoked_at).length} revoked`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
