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

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats().then(s => {
      setStats(s)
      setLoading(false)
    })
  }, [])

  const cards: { label: string; value: number; href: string | null }[] = stats
    ? [
        { label: 'Total Identities', value: stats.totalIdentities, href: '/dashboard/identities' },
        { label: 'Active Identities', value: stats.activeIdentities, href: '/dashboard/identities' },
        { label: 'Messages Today', value: stats.messagesToday, href: null },
        { label: 'Active Keys', value: stats.activeApiKeys, href: '/dashboard/api-keys' },
      ]
    : []

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-lg font-semibold mb-1"
          style={{ fontFamily: 'var(--font-outfit)', color: '#FFFFFF' }}
        >
          Overview
        </h1>
        <p className="text-sm" style={{ color: '#525252', fontFamily: 'var(--font-outfit)' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="panel p-5">
              <div className="skeleton h-3 w-20 mb-4" />
              <div className="skeleton h-8 w-12" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cards.map(({ label, value, href }) => {
            const cardContent = (
              <div
                className={`panel p-5 transition-all ${href ? 'cursor-pointer' : ''}`}
                style={href ? undefined : undefined}
                onMouseEnter={href ? e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.14)'
                } : undefined}
                onMouseLeave={href ? e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'
                } : undefined}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.06em] mb-3 font-medium"
                  style={{ color: '#525252', fontFamily: 'var(--font-outfit)' }}
                >
                  {label}
                </p>
                <p
                  className="text-[28px] font-semibold tabular-nums"
                  style={{ color: '#FFFFFF', fontFamily: 'var(--font-outfit)' }}
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
          <div
            className="panel p-6 cursor-pointer transition-all"
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.14)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#A1A1A1' }}>fingerprint</span>
                <span className="text-sm font-medium" style={{ color: '#FFFFFF', fontFamily: 'var(--font-outfit)' }}>
                  Identities
                </span>
              </div>
              <span className="text-sm" style={{ color: '#525252', fontFamily: 'var(--font-outfit)' }}>→</span>
            </div>
            <p className="text-sm" style={{ color: '#A1A1A1', fontFamily: 'var(--font-outfit)' }}>
              Manage agent identities — email, phone, metadata
            </p>
          </div>
        </Link>

        <Link href="/dashboard/api-keys">
          <div
            className="panel p-6 cursor-pointer transition-all"
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.14)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#A1A1A1' }}>key</span>
                <span className="text-sm font-medium" style={{ color: '#FFFFFF', fontFamily: 'var(--font-outfit)' }}>
                  API Keys
                </span>
              </div>
              <span className="text-sm" style={{ color: '#525252', fontFamily: 'var(--font-outfit)' }}>→</span>
            </div>
            <p className="text-sm" style={{ color: '#A1A1A1', fontFamily: 'var(--font-outfit)' }}>
              Create and revoke API keys with scoped permissions
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
