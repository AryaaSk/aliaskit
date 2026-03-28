'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSupabaseServerClient } from '@/lib/supabase-server'

type Stats = {
  totalIdentities: number
  activeIdentities: number
  totalApiKeys: number
  activeApiKeys: number
}

// This fetches via a server action (we call our own API route)
async function fetchStats(): Promise<Stats> {
  const res = await fetch('/api/dashboard/stats')
  if (!res.ok) return { totalIdentities: 0, activeIdentities: 0, totalApiKeys: 0, activeApiKeys: 0 }
  return res.json()
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats().then(s => {
      setStats(s)
      setLoading(false)
    })
  }, [])

  const cards = stats
    ? [
        { label: 'Total Identities', value: stats.totalIdentities, color: '#00F0FF', href: '/dashboard/identities' },
        { label: 'Active Identities', value: stats.activeIdentities, color: '#39FF14', href: '/dashboard/identities' },
        { label: 'API Keys', value: stats.totalApiKeys, color: '#00F0FF', href: '/dashboard/api-keys' },
        { label: 'Active Keys', value: stats.activeApiKeys, color: '#39FF14', href: '/dashboard/api-keys' },
      ]
    : []

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-xl font-bold tracking-widest uppercase mb-1"
          style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
        >
          Control Panel
        </h1>
        <p className="text-xs tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>
          System overview — {new Date().toISOString().split('T')[0]}
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-panel p-6 animate-pulse">
              <div className="h-3 w-20 rounded mb-4" style={{ background: 'rgba(0, 240, 255, 0.1)' }} />
              <div className="h-8 w-12 rounded" style={{ background: 'rgba(0, 240, 255, 0.1)' }} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map(({ label, value, color, href }) => (
            <Link key={label} href={href}>
              <div className="glass-panel p-6 transition-all hover:border-[rgba(0,240,255,0.3)] cursor-pointer">
                <p
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}
                >
                  {label}
                </p>
                <p
                  className="text-3xl font-bold tabular-nums"
                  style={{ color, fontFamily: 'var(--font-jetbrains-mono)', textShadow: `0 0 12px ${color}55` }}
                >
                  {value.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/identities">
          <div
            className="glass-panel p-6 transition-all cursor-pointer"
            style={{ borderColor: 'rgba(0, 240, 255, 0.1)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0, 240, 255, 0.3)')}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0, 240, 255, 0.1)')}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs tracking-widest uppercase" style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono)' }}>
                ◎ Identities
              </span>
              <span className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>→</span>
            </div>
            <p className="text-sm" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>
              Manage synthetic identities — email, phone, metadata
            </p>
          </div>
        </Link>

        <Link href="/dashboard/api-keys">
          <div
            className="glass-panel p-6 transition-all cursor-pointer"
            style={{ borderColor: 'rgba(0, 240, 255, 0.1)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0, 240, 255, 0.3)')}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0, 240, 255, 0.1)')}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs tracking-widest uppercase" style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono)' }}>
                ⌗ API Keys
              </span>
              <span className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>→</span>
            </div>
            <p className="text-sm" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}>
              Create and revoke API access keys with scoped permissions
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
