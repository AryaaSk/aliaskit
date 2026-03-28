'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Stats = {
  totalIdentities: number
  activeIdentities: number
  totalApiKeys: number
  activeApiKeys: number
  messagesToday: number
}

async function fetchStats(): Promise<Stats> {
  const res = await fetch('/api/dashboard/stats')
  if (!res.ok) return { totalIdentities: 0, activeIdentities: 0, totalApiKeys: 0, activeApiKeys: 0, messagesToday: 0 }
  return res.json()
}

function StatSkeleton() {
  return (
    <div className="glass-panel p-6">
      <div className="skeleton h-3 w-24 mb-4" />
      <div className="skeleton h-9 w-16" />
    </div>
  )
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
        { label: 'Total Identities', value: stats.totalIdentities, accent: '#00F0FF', icon: 'fingerprint', href: '/dashboard/identities' },
        { label: 'Active Identities', value: stats.activeIdentities, accent: '#39FF14', icon: 'check_circle', href: '/dashboard/identities' },
        { label: 'Messages Today', value: stats.messagesToday, accent: '#00F0FF', icon: 'mail', href: '/dashboard/identities' },
        { label: 'Active API Keys', value: stats.activeApiKeys, accent: '#39FF14', icon: 'key', href: '/dashboard/api-keys' },
      ]
    : []

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-lg font-bold tracking-widest uppercase mb-1 page-title"
          style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
        >
          Overview
        </h1>
        <p className="text-xs mt-3" style={{ color: '#334155', fontFamily: 'var(--font-outfit)' }}>
          {today}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {loading
          ? [...Array(4)].map((_, i) => <StatSkeleton key={i} />)
          : cards.map(({ label, value, accent, icon, href }) => (
            <Link key={label} href={href}>
              <div
                className="glass-panel p-5 stat-card cursor-pointer"
                style={{ '--stat-accent': accent } as React.CSSProperties}
              >
                <div className="flex items-center justify-between mb-3">
                  <p
                    className="text-[10px] uppercase tracking-wider"
                    style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}
                  >
                    {label}
                  </p>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 14, color: accent, opacity: 0.6 }}
                  >
                    {icon}
                  </span>
                </div>
                <p
                  className="text-3xl font-bold tabular-nums"
                  style={{ color: accent, fontFamily: 'var(--font-jetbrains-mono)' }}
                >
                  {value.toLocaleString()}
                </p>
              </div>
            </Link>
          ))
        }
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <h2
          className="text-[10px] uppercase tracking-[0.2em] mb-4"
          style={{ color: '#334155', fontFamily: 'var(--font-outfit)' }}
        >
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/dashboard/identities">
            <div className="glass-panel p-5 transition-all cursor-pointer group hover:border-white/10 hover:bg-white/[0.02]">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.12)' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#00F0FF' }}>fingerprint</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#E2E8F0', fontFamily: 'var(--font-outfit)' }}>
                    Identities
                  </span>
                </div>
                <span
                  className="text-sm transition-all group-hover:text-[#00F0FF] group-hover:translate-x-0.5"
                  style={{ color: '#334155' }}
                >
                  →
                </span>
              </div>
              <p className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                Manage agent identities — email, phone, metadata
              </p>
            </div>
          </Link>

          <Link href="/dashboard/api-keys">
            <div className="glass-panel p-5 transition-all cursor-pointer group hover:border-white/10 hover:bg-white/[0.02]">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.12)' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#00F0FF' }}>key</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#E2E8F0', fontFamily: 'var(--font-outfit)' }}>
                    API Keys
                  </span>
                </div>
                <span
                  className="text-sm transition-all group-hover:text-[#00F0FF] group-hover:translate-x-0.5"
                  style={{ color: '#334155' }}
                >
                  →
                </span>
              </div>
              <p className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                Create and revoke API keys with scoped permissions
              </p>
            </div>
          </Link>

          <Link href="/dashboard/settings">
            <div className="glass-panel p-5 transition-all cursor-pointer group hover:border-white/10 hover:bg-white/[0.02]">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.12)' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#00F0FF' }}>settings</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#E2E8F0', fontFamily: 'var(--font-outfit)' }}>
                    Settings
                  </span>
                </div>
                <span
                  className="text-sm transition-all group-hover:text-[#00F0FF] group-hover:translate-x-0.5"
                  style={{ color: '#334155' }}
                >
                  →
                </span>
              </div>
              <p className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                Manage your account, password, and webhook settings
              </p>
            </div>
          </Link>

          <a href="https://aliaskit.com/docs" target="_blank" rel="noopener noreferrer">
            <div className="glass-panel p-5 transition-all cursor-pointer group hover:border-white/10 hover:bg-white/[0.02]">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.12)' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#00F0FF' }}>auto_stories</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#E2E8F0', fontFamily: 'var(--font-outfit)' }}>
                    Documentation
                  </span>
                </div>
                <span
                  className="text-sm transition-all group-hover:text-[#00F0FF]"
                  style={{ color: '#334155' }}
                >
                  ↗
                </span>
              </div>
              <p className="text-xs" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
                API reference, quickstart guides, and examples
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
