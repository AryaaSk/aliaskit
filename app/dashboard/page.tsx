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

// This fetches via a server action (we call our own API route)
async function fetchStats(): Promise<Stats> {
  const res = await fetch('/api/dashboard/stats')
  if (!res.ok) return { totalIdentities: 0, activeIdentities: 0, totalApiKeys: 0, activeApiKeys: 0, messagesToday: 0 }
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

  const cards: { label: string; value: number; color: string; href: string | null }[] = stats
    ? [
        { label: 'Total Identities', value: stats.totalIdentities, color: '#00F0FF', href: '/dashboard/identities' },
        { label: 'Active Identities', value: stats.activeIdentities, color: '#39FF14', href: '/dashboard/identities' },
        { label: 'Messages Today', value: stats.messagesToday, color: '#00F0FF', href: null },
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
          Overview
        </h1>
        <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
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
          {cards.map(({ label, value, color, href }) => {
            const cardContent = (
              <div className={`glass-panel p-6 transition-all ${href ? 'cursor-pointer hover:border-white/10' : ''}`}>
                <p
                  className="text-xs uppercase tracking-wider mb-3"
                  style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}
                >
                  {label}
                </p>
                <p
                  className="text-3xl font-bold tabular-nums"
                  style={{ color, fontFamily: 'var(--font-jetbrains-mono)' }}
                >
                  {value.toLocaleString()}
                </p>
              </div>
            )
            return href ? (
              <Link key={label} href={href}>{cardContent}</Link>
            ) : (
              <div key={label}>{cardContent}</div>
            )
          })}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/identities">
          <div className="glass-panel p-6 transition-all cursor-pointer hover:border-white/10 group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#00F0FF' }}>fingerprint</span>
                <span className="text-sm font-medium" style={{ color: '#E2E8F0', fontFamily: 'var(--font-outfit)' }}>
                  Identities
                </span>
              </div>
              <span className="text-sm transition-colors" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>→</span>
            </div>
            <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
              Manage agent identities — email, phone, metadata
            </p>
          </div>
        </Link>

        <Link href="/dashboard/api-keys">
          <div className="glass-panel p-6 transition-all cursor-pointer hover:border-white/10 group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#00F0FF' }}>key</span>
                <span className="text-sm font-medium" style={{ color: '#E2E8F0', fontFamily: 'var(--font-outfit)' }}>
                  API Keys
                </span>
              </div>
              <span className="text-sm transition-colors" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>→</span>
            </div>
            <p className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}>
              Create and revoke API keys with scoped permissions
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
