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

function TableSkeleton() {
  return (
    <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          {['Label', 'Prefix', 'Scopes', 'Last Used', 'Status', ''].map((h, i) => (
            <th
              key={i}
              className="px-5 py-3 text-left text-[10px] font-medium uppercase tracking-wider"
              style={{ color: '#334155', fontFamily: 'var(--font-outfit)', fontWeight: 500 }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(2)].map((_, i) => (
          <tr key={i} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
            <td className="px-5 py-3.5"><div className="skeleton h-3.5 w-24" /></td>
            <td className="px-5 py-3.5"><div className="skeleton h-3 w-20" /></td>
            <td className="px-5 py-3.5"><div className="flex gap-1"><div className="skeleton h-5 w-24 rounded-full" /><div className="skeleton h-5 w-20 rounded-full" /></div></td>
            <td className="px-5 py-3.5"><div className="skeleton h-3 w-16" /></td>
            <td className="px-5 py-3.5"><div className="skeleton h-4 w-12" /></td>
            <td className="px-5 py-3.5" />
          </tr>
        ))}
      </tbody>
    </table>
  )
}

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
    return () => { active = false }
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
    if (res.ok) await loadKeys()
  }

  function copyKey() {
    if (!newKey) return
    navigator.clipboard.writeText(newKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const activeCount = keys.filter(k => !k.revoked_at).length

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className="text-lg font-bold tracking-widest uppercase mb-1 page-title"
            style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
          >
            API Keys
          </h1>
          <p className="text-xs mt-3" style={{ color: '#334155', fontFamily: 'var(--font-outfit)' }}>
            {loading ? '\u00a0' : `${activeCount} active`}
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-cyber px-5 py-2.5 text-xs flex items-center gap-2"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>
            New Key
          </button>
        )}
      </div>

      {/* New key reveal */}
      {newKey && (
        <div className="glass-panel p-5 mb-6" style={{ borderColor: 'rgba(57, 255, 20, 0.25)', boxShadow: '0 0 20px rgba(57,255,20,0.04)' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#39FF14' }}>check_circle</span>
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: '#39FF14', fontFamily: 'var(--font-outfit)' }}>
              Key created — copy now, it won&apos;t be shown again
            </p>
          </div>
          <div className="flex items-center gap-3">
            <code
              className="flex-1 text-xs px-4 py-2.5 rounded copy-field truncate"
              style={{
                background: 'rgba(5, 9, 20, 0.8)',
                border: '1px solid rgba(57, 255, 20, 0.15)',
                color: '#39FF14',
                fontFamily: 'var(--font-jetbrains-mono)',
              }}
            >
              {newKey}
            </code>
            <button
              onClick={copyKey}
              className="text-xs px-4 py-2.5 transition-all flex items-center gap-1.5"
              style={{
                background: copied ? 'rgba(57, 255, 20, 0.15)' : 'rgba(57, 255, 20, 0.08)',
                border: '1px solid rgba(57, 255, 20, 0.25)',
                borderRadius: 4,
                color: '#39FF14',
                fontFamily: 'var(--font-jetbrains-mono)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 13 }}>{copied ? 'check' : 'content_copy'}</span>
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={() => setNewKey(null)}
              className="text-xs px-2.5 py-2.5 transition-colors"
              style={{ color: '#334155', fontFamily: 'var(--font-jetbrains-mono)' }}
              onMouseEnter={e => ((e.currentTarget).style.color = '#64748B')}
              onMouseLeave={e => ((e.currentTarget).style.color = '#334155')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>close</span>
            </button>
          </div>
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <div className="glass-panel p-6 mb-6" style={{ borderColor: 'rgba(0, 240, 255, 0.12)' }}>
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit)' }}
            >
              New API Key
            </h2>
            <button
              onClick={() => setShowForm(false)}
              style={{ color: '#334155' }}
              onMouseEnter={e => ((e.currentTarget).style.color = '#64748B')}
              onMouseLeave={e => ((e.currentTarget).style.color = '#334155')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
            </button>
          </div>
          <form onSubmit={handleCreate} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: '#64748B', fontFamily: 'var(--font-outfit)' }}>
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
                  border: '1px solid rgba(0, 240, 255, 0.15)',
                  borderRadius: 4,
                  color: '#E2E8F0',
                  fontFamily: 'var(--font-jetbrains-mono)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.15)')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium" style={{ color: '#64748B', fontFamily: 'var(--font-outfit)' }}>
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
                      className="text-xs px-3 py-1.5 transition-all flex items-center gap-1.5"
                      style={{
                        fontFamily: 'var(--font-jetbrains-mono)',
                        border: `1px solid ${active ? 'rgba(0, 240, 255, 0.35)' : 'rgba(100,116,139,0.2)'}`,
                        borderRadius: 4,
                        background: active ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
                        color: active ? '#00F0FF' : '#475569',
                      }}
                    >
                      {active && (
                        <span className="material-symbols-outlined" style={{ fontSize: 11 }}>check</span>
                      )}
                      {scope}
                    </button>
                  )
                })}
              </div>
            </div>
            {error && (
              <p className="text-xs flex items-center gap-1.5" style={{ color: '#FF0055', fontFamily: 'var(--font-outfit)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 13 }}>error</span>
                {error}
              </p>
            )}
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={creating} className="btn-cyber px-5 py-2 text-xs disabled:opacity-50">
                {creating ? 'Creating…' : 'Create key'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm px-4 py-2 transition-colors"
                style={{ color: '#334155', fontFamily: 'var(--font-outfit)' }}
                onMouseEnter={e => ((e.currentTarget).style.color = '#64748B')}
                onMouseLeave={e => ((e.currentTarget).style.color = '#334155')}
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
          <TableSkeleton />
        ) : keys.length === 0 ? (
          <div className="py-16 px-8 flex flex-col items-center text-center">
            <div className="empty-state-icon">
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#00F0FF', opacity: 0.7 }}>key</span>
            </div>
            <p className="text-sm font-medium mb-1.5" style={{ color: '#64748B', fontFamily: 'var(--font-outfit)' }}>
              No API keys yet
            </p>
            <p className="text-xs mb-6" style={{ color: '#334155', fontFamily: 'var(--font-outfit)', maxWidth: 280 }}>
              Create an API key to start making authenticated requests to the AliasKit API.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-cyber px-5 py-2 text-xs"
            >
              Create first key
            </button>
          </div>
        ) : (
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                {['Label', 'Prefix', 'Scopes', 'Last Used', 'Status', ''].map((h, i) => (
                  <th
                    key={i}
                    className="px-5 py-3 text-left text-[10px] font-medium uppercase tracking-wider"
                    style={{ color: '#334155', fontFamily: 'var(--font-outfit)', fontWeight: 500 }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {keys.map(key => (
                <tr
                  key={key.id}
                  className="agent-row border-b"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.03)',
                    opacity: key.revoked_at ? 0.4 : 1,
                  }}
                >
                  <td className="px-5 py-3.5 text-sm font-medium" style={{ color: '#CBD5E1', fontFamily: 'var(--font-outfit)' }}>
                    {key.label}
                  </td>
                  <td className="px-5 py-3.5">
                    <code className="text-xs" style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono)' }}>
                      {key.key_prefix}…
                    </code>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {key.scopes.map(s => (
                        <span
                          key={s}
                          className="text-[10px] px-2 py-0.5"
                          style={{
                            background: 'rgba(0, 240, 255, 0.05)',
                            border: '1px solid rgba(0, 240, 255, 0.12)',
                            borderRadius: 3,
                            color: '#475569',
                            fontFamily: 'var(--font-jetbrains-mono)',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                    {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : (
                      <span style={{ color: '#1e293b' }}>Never</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`status-badge ${key.revoked_at ? 'status-suspended' : 'status-active'}`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: key.revoked_at ? '#FF0055' : '#39FF14' }}
                      />
                      {key.revoked_at ? 'Revoked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {!key.revoked_at && (
                      <button
                        onClick={() => revokeKey(key.id)}
                        className="text-[10px] px-2.5 py-1 transition-all rounded"
                        style={{
                          color: '#475569',
                          fontFamily: 'var(--font-jetbrains-mono)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget
                          el.style.color = '#FF0055'
                          el.style.borderColor = 'rgba(255,0,85,0.3)'
                          el.style.background = 'rgba(255,0,85,0.05)'
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget
                          el.style.color = '#475569'
                          el.style.borderColor = 'rgba(255,255,255,0.06)'
                          el.style.background = 'transparent'
                        }}
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
