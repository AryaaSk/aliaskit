'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { getSupabaseClient } from '@/lib/supabase'

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: '◈' },
  { href: '/dashboard/identities', label: 'Identities', icon: '◎' },
  { href: '/dashboard/api-keys', label: 'API Keys', icon: '⌗' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const supabase = getSupabaseClient()
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        // Clear cookie and redirect
        document.cookie = 'ak-session=; path=/; max-age=0'
        router.push('/login')
        return
      }
      setUserEmail(data.session.user.email ?? null)
    })
  }, [router])

  async function handleLogout() {
    const supabase = getSupabaseClient()
    await supabase.auth.signOut()
    document.cookie = 'ak-session=; path=/; max-age=0'
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="w-[240px] flex-shrink-0 flex flex-col"
        style={{
          background: 'rgba(5, 9, 20, 0.95)',
          borderRight: '1px solid rgba(0, 240, 255, 0.1)',
        }}
      >
        {/* Logo */}
        <div
          className="h-[64px] flex items-center px-6"
          style={{ borderBottom: '1px solid rgba(0, 240, 255, 0.08)' }}
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <span
              className="text-base font-bold tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
            >
              Alias<span style={{ color: '#00F0FF' }}>Kit</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map(({ href, label, icon }) => {
            const active = href === '/dashboard' ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded transition-all text-sm"
                style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  color: active ? '#00F0FF' : '#64748B',
                  background: active ? 'rgba(0, 240, 255, 0.07)' : 'transparent',
                  border: active ? '1px solid rgba(0, 240, 255, 0.15)' : '1px solid transparent',
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>{icon}</span>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div
          className="px-4 py-4"
          style={{ borderTop: '1px solid rgba(0, 240, 255, 0.08)' }}
        >
          {userEmail && (
            <p
              className="text-xs mb-3 truncate"
              style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              {userEmail}
            </p>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-xs py-2 px-3 text-left transition-colors rounded"
            style={{
              fontFamily: 'var(--font-jetbrains-mono)',
              color: '#64748B',
              border: '1px solid rgba(255, 0, 85, 0.2)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#FF0055'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255, 0, 85, 0.5)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#64748B'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255, 0, 85, 0.2)'
            }}
          >
            [ DISCONNECT ]
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto" style={{ background: '#050914' }}>
        {children}
      </main>
    </div>
  )
}
