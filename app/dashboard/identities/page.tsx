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
    return () => {
      active = false
    }
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

  function statusBadgeClass(s: string) {
    if (s === 'active') return 'badge-active'
    if (s === 'suspended') return 'badge-error'
    return 'badge-neutral'
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className="text-lg font-semibold mb-1"
            style={{ fontFamily: 'var(--font-outfit)', color: '#FFFFFF' }}
          >
            Identities
          </h1>
          <p className="text-sm" style={{ color: '#525252', fontFamily: 'var(--font-outfit)' }}>
            {loading ? '' : `${identities.length} total`}
          </p>
        </div>
        <button
          onClick={createIdentity}
          disabled={creating}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {creating ? 'Provisioning…' : '+ New identity'}
        </button>
      </div>

      {error && (
        <div
          className="px-4 py-3 mb-4 rounded-md"
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
          }}
        >
          <p className="text-xs" style={{ color: '#EF4444', fontFamily: 'var(--font-jetbrains-mono)' }}>{error}</p>
        </div>
      )}

      {/* Table */}
      <div className="panel overflow-hidden">
        {loading ? (
          <div className="p-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4 py-3" style={{ borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : undefined }}>
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-4 w-48" />
                <div className="skeleton h-4 w-24" />
                <div className="skeleton h-4 w-16" />
              </div>
            ))}
          </div>
        ) : identities.length === 0 ? (
          <div className="py-12 text-center">
            <span className="material-symbols-outlined mb-4 block" style={{ fontSize: 32, color: '#525252' }}>fingerprint</span>
            <p className="text-sm font-medium mb-1" style={{ color: '#FFFFFF', fontFamily: 'var(--font-outfit)' }}>
              No identities yet
            </p>
            <p className="text-sm mb-4" style={{ color: '#A1A1A1', fontFamily: 'var(--font-outfit)' }}>
              Provision your first agent identity to get started.
            </p>
            <button
              onClick={createIdentity}
              disabled={creating}
              className="btn-primary disabled:opacity-50"
            >
              + New identity
            </button>
          </div>
        ) : (
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                {['Name', 'Email', 'Phone', 'Status', 'Created'].map(h => (
                  <th
                    key={h}
                    className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-[0.05em]"
                    style={{ color: '#525252', fontFamily: 'var(--font-outfit)' }}
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
                  style={{ borderColor: 'rgba(255, 255, 255, 0.04)' }}
                >
                  <td className="px-5 py-2.5">
                    <Link
                      href={`/dashboard/identities/${identity.id}`}
                      className="transition-colors hover:text-white"
                      style={{ fontFamily: 'var(--font-jetbrains-mono)', color: '#FFFFFF' }}
                    >
                      {identity.name}
                    </Link>
                  </td>
                  <td className="px-5 py-2.5 text-sm" style={{ color: '#A1A1A1', fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {identity.email}
                  </td>
                  <td className="px-5 py-2.5 text-sm" style={{ color: '#A1A1A1', fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {identity.phone_number ?? '—'}
                  </td>
                  <td className="px-5 py-2.5">
                    <span className={statusBadgeClass(identity.status)}>
                      {identity.status}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-xs" style={{ color: '#525252', fontFamily: 'var(--font-jetbrains-mono)' }}>
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
