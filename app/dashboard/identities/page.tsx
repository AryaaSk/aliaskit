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

  useEffect(() => { loadIdentities() }, [])

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

  const statusColor = (s: string) =>
    s === 'active' ? '#39FF14' : s === 'suspended' ? '#FF0055' : '#64748B'

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className="text-xl font-bold tracking-widest uppercase mb-1"
            style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
          >
            Identities
          </h1>
          <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
            {loading ? '' : `${identities.length} total`}
          </p>
        </div>
        <button
          onClick={createIdentity}
          disabled={creating}
          className="btn-cyber px-5 py-2.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {creating ? 'PROVISIONING...' : '+ NEW IDENTITY'}
        </button>
      </div>

      {error && (
        <div className="glass-panel-alert px-4 py-3 mb-4">
          <p className="text-xs" style={{ color: '#FF0055', fontFamily: 'var(--font-jetbrains-mono)' }}>ERR: {error}</p>
        </div>
      )}

      {/* Table */}
      <div className="glass-panel overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
              Loading…
            </p>
          </div>
        ) : identities.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm font-medium mb-2" style={{ color: '#64748B', fontFamily: 'var(--font-outfit)' }}>
              No identities yet
            </p>
            <p className="text-sm" style={{ color: '#334155', fontFamily: 'var(--font-outfit)' }}>
              Click &quot;+ New identity&quot; to provision your first agent identity.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0, 240, 255, 0.1)' }}>
                {['Name', 'Email', 'Phone', 'Status', 'Created'].map(h => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: '#475569', fontFamily: 'var(--font-outfit)', fontWeight: 500 }}
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
                  style={{ borderColor: 'rgba(0, 240, 255, 0.05)' }}
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/dashboard/identities/${identity.id}`}
                      className="transition-colors hover:text-[#00F0FF]"
                      style={{ fontFamily: 'var(--font-jetbrains-mono)', color: '#E2E8F0' }}
                    >
                      {identity.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {identity.email}
                  </td>
                  <td className="px-5 py-3" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {identity.phone_number ?? '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs"
                      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: statusColor(identity.status) }}
                      />
                      <span style={{ color: statusColor(identity.status) }}>
                        {identity.status.toUpperCase()}
                      </span>
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>
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
