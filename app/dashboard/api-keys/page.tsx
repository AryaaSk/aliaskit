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

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className="text-xl font-bold tracking-widest uppercase mb-1"
            style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
          >
            API Keys
          </h1>
          <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
            {loading ? '' : `${keys.filter(k => !k.revoked_at).length} active`}
          </p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-cyber px-5 py-2.5 text-xs">
            + NEW KEY
          </button>
        )}
      </div>

      {/* New key reveal */}
      {newKey && (
        <div className="glass-panel p-5 mb-6" style={{ borderColor: 'rgba(57, 255, 20, 0.3)' }}>
          <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#39FF14', fontFamily: 'var(--font-outfit)' }}>
            Key created — copy now, it won&apos;t be shown again
          </p>
          <div className="flex items-center gap-3">
            <code
              className="flex-1 text-xs px-4 py-2.5 rounded copy-field truncate"
              style={{
                background: 'rgba(5, 9, 20, 0.8)',
                border: '1px solid rgba(57, 255, 20, 0.2)',
                color: '#39FF14',
                fontFamily: 'var(--font-jetbrains-mono)',
              }}
            >
              {newKey}
            </code>
            <button
              onClick={copyKey}
              className="text-xs px-4 py-2.5 transition-all"
              style={{
                background: 'rgba(57, 255, 20, 0.1)',
                border: '1px solid rgba(57, 255, 20, 0.3)',
                borderRadius: 4,
                color: '#39FF14',
                fontFamily: 'var(--font-jetbrains-mono)',
              }}
            >
              {copied ? 'COPIED ✓' : 'COPY'}
            </button>
            <button
              onClick={() => setNewKey(null)}
              className="text-xs px-3 py-2.5"
              style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <div className="glass-panel p-6 mb-6">
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: '#E2E8F0', fontFamily: 'var(--font-outfit)' }}
          >
            New API Key
          </h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>
                Label
              </label>
              <input
                type="text"
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder="e.g. Production"
                className="w-full max-w-sm px-4 py-2.5 text-sm outline-none"
                style={{
                  background: 'rgba(5, 9, 20, 0.8)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  borderRadius: 4,
                  color: '#E2E8F0',
                  fontFamily: 'var(--font-jetbrains-mono)',
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium" style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}>
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
                      className="text-xs px-3 py-1.5 transition-all"
                      style={{
                        fontFamily: 'var(--font-jetbrains-mono)',
                        border: `1px solid ${active ? '#00F0FF' : 'rgba(100,116,139,0.3)'}`,
                        borderRadius: 4,
                        background: active ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                        color: active ? '#00F0FF' : '#64748B',
                      }}
                    >
                      {scope}
                    </button>
                  )
                })}
              </div>
            </div>
            {error && (
              <p className="text-xs" style={{ color: '#FF0055', fontFamily: 'var(--font-outfit)' }}>{error}</p>
            )}
            <div className="flex gap-3">
              <button type="submit" disabled={creating} className="btn-cyber px-5 py-2 text-xs disabled:opacity-50">
                {creating ? 'Creating…' : 'Create key'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm px-4 py-2"
                style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Keys table */}
      <div className="glass-panel overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>Loading…</p>
          </div>
        ) : keys.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
              No API keys yet — create one to start using the API
            </p>
          </div>
        ) : (
          <>
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  {['Label', 'Prefix', 'Scopes', 'Last Used', 'Status', ''].map((h, i) => (
                    <th
                      key={i}
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: '#475569', fontFamily: 'var(--font-outfit)', fontWeight: 500 }}
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
                    <td className="px-5 py-3 text-sm" style={{ color: '#E2E8F0', fontFamily: 'var(--font-outfit)' }}>
                      {key.label}
                    </td>
                    <td className="px-5 py-3">
                      <code className="text-xs" style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono)' }}>
                        {key.key_prefix}…
                      </code>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {key.scopes.map(s => (
                          <span
                            key={s}
                            className="text-xs px-2 py-0.5"
                            style={{
                              background: 'rgba(0, 240, 255, 0.07)',
                              border: '1px solid rgba(0, 240, 255, 0.15)',
                              borderRadius: 3,
                              color: '#64748B',
                              fontFamily: 'var(--font-jetbrains-mono)',
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                      {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className="text-xs"
                        style={{
                          color: key.revoked_at ? '#FF0055' : '#39FF14',
                          fontFamily: 'var(--font-jetbrains-mono)',
                        }}
                      >
                        {key.revoked_at ? 'REVOKED' : 'ACTIVE'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {!key.revoked_at && (
                        confirmingRevoke === key.id ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => revokeKey(key.id)}
                              className="text-xs transition-colors"
                              style={{ color: '#FF0055', fontFamily: 'var(--font-jetbrains-mono)' }}
                            >
                              confirm?
                            </button>
                            <button
                              onClick={() => setConfirmingRevoke(null)}
                              className="text-xs transition-colors"
                              style={{ color: '#475569', fontFamily: 'var(--font-jetbrains-mono)' }}
                            >
                              cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmingRevoke(key.id)}
                            className="text-xs transition-colors"
                            style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}
                            onMouseEnter={e => ((e.target as HTMLButtonElement).style.color = '#FF0055')}
                            onMouseLeave={e => ((e.target as HTMLButtonElement).style.color = '#64748B')}
                          >
                            revoke
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
                  style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}
                  onMouseEnter={e => ((e.target as HTMLButtonElement).style.color = '#94a3b8')}
                  onMouseLeave={e => ((e.target as HTMLButtonElement).style.color = '#475569')}
                >
                  {showRevoked
                    ? 'hide revoked'
                    : `+ show ${keys.filter(k => k.revoked_at).length} revoked`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
