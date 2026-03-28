'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Identity = {
  id: string
  name: string
  email: string
  phone_number: string | null
  status: string
  created_at: string
}

function TableSkeleton() {
  return (
    <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          {['Name', 'Email', 'Phone', 'Status', 'Created'].map(h => (
            <th
              key={h}
              className="px-5 py-3 text-left text-[10px] font-medium uppercase tracking-wider"
              style={{ color: '#334155', fontFamily: 'var(--font-outfit)', fontWeight: 500 }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(3)].map((_, i) => (
          <tr key={i} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
            <td className="px-5 py-3.5"><div className="skeleton h-3.5 w-28" /></td>
            <td className="px-5 py-3.5"><div className="skeleton h-3 w-40" /></td>
            <td className="px-5 py-3.5"><div className="skeleton h-3 w-28" /></td>
            <td className="px-5 py-3.5"><div className="skeleton h-5 w-16 rounded-full" /></td>
            <td className="px-5 py-3.5"><div className="skeleton h-3 w-20" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function statusClass(s: string): string {
  if (s === 'active') return 'status-badge status-active'
  if (s === 'suspended') return 'status-badge status-suspended'
  return 'status-badge status-inactive'
}

function statusDotColor(s: string): string {
  if (s === 'active') return '#39FF14'
  if (s === 'suspended') return '#FF0055'
  return '#64748B'
}

export default function IdentitiesPage() {
  const [identities, setIdentities] = useState<Identity[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  async function loadIdentities() {
    const res = await fetch('/api/dashboard/identities')
    if (res.ok) {
      const { data } = await res.json()
      setIdentities(data ?? [])
    }
    setLoading(false)
  }

  useEffect(() => {
    let active = true

    async function loadInitialIdentities() {
      const res = await fetch('/api/dashboard/identities')
      if (!active) return

      if (res.ok) {
        const { data } = await res.json()
        if (!active) return
        setIdentities(data ?? [])
      }
      setLoading(false)
    }

    void loadInitialIdentities()
    return () => { active = false }
  }, [])

  async function createIdentity() {
    setCreating(true)
    setError('')
    const res = await fetch('/api/dashboard/identities', { method: 'POST' })
    if (res.ok) {
      await loadIdentities()
    } else {
      const body = await res.json()
      setError(body.error ?? 'Failed to create identity')
    }
    setCreating(false)
  }

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className="text-lg font-bold tracking-widest uppercase mb-1 page-title"
            style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
          >
            Identities
          </h1>
          <p className="text-xs mt-3" style={{ color: '#334155', fontFamily: 'var(--font-outfit)' }}>
            {loading ? '\u00a0' : `${identities.length} provisioned`}
          </p>
        </div>
        <button
          onClick={createIdentity}
          disabled={creating}
          className="btn-cyber px-5 py-2.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {creating ? (
            <>
              <span className="material-symbols-outlined" style={{ fontSize: 14, animation: 'spin 1s linear infinite' }}>progress_activity</span>
              Provisioning…
            </>
          ) : (
            <>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>
              New identity
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="glass-panel-alert px-4 py-3 mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: 14, color: '#FF0055' }}>error</span>
          <p className="text-xs" style={{ color: '#FF0055', fontFamily: 'var(--font-jetbrains-mono)' }}>
            {error}
          </p>
        </div>
      )}

      {/* Table */}
      <div className="glass-panel overflow-hidden">
        {loading ? (
          <TableSkeleton />
        ) : identities.length === 0 ? (
          <div className="py-16 px-8 flex flex-col items-center text-center">
            <div className="empty-state-icon">
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#00F0FF', opacity: 0.7 }}>fingerprint</span>
            </div>
            <p className="text-sm font-medium mb-1.5" style={{ color: '#64748B', fontFamily: 'var(--font-outfit)' }}>
              No identities provisioned yet
            </p>
            <p className="text-xs mb-6" style={{ color: '#334155', fontFamily: 'var(--font-outfit)', maxWidth: 280 }}>
              Each identity gets a unique email address and optional phone number for your agents to use.
            </p>
            <button
              onClick={createIdentity}
              disabled={creating}
              className="btn-cyber px-5 py-2 text-xs disabled:opacity-50"
            >
              Provision first identity
            </button>
          </div>
        ) : (
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                {['Name', 'Email', 'Phone', 'Status', 'Created'].map(h => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-[10px] font-medium uppercase tracking-wider"
                    style={{ color: '#334155', fontFamily: 'var(--font-outfit)', fontWeight: 500 }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {identities.map(identity => (
                <tr
                  key={identity.id}
                  className="agent-row border-b"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.03)' }}
                >
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/dashboard/identities/${identity.id}`}
                      className="transition-colors hover:text-[#00F0FF] font-medium"
                      style={{ fontFamily: 'var(--font-jetbrains-mono)', color: '#CBD5E1', fontSize: 13 }}
                    >
                      {identity.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: '#475569', fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {identity.email}
                  </td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: '#475569', fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {identity.phone_number ?? (
                      <span style={{ color: '#1e293b' }}>—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={statusClass(identity.status)}>
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: statusDotColor(identity.status) }}
                      />
                      {identity.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: '#334155', fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {new Date(identity.created_at).toLocaleDateString()}
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
