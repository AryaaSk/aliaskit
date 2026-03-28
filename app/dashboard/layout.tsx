'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { getSupabaseClient } from '@/lib/supabase'

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: 'grid_view' },
  { href: '/dashboard/identities', label: 'Identities', icon: 'fingerprint' },
  { href: '/dashboard/api-keys', label: 'API Keys', icon: 'key' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const supabase = getSupabaseClient()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        document.cookie = 'ak-session=; path=/; max-age=0'
        router.push('/login')
        return
      }
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session) {
          setUserEmail(session.user.email ?? null)
        } else if (event === 'INITIAL_SESSION') {
          document.cookie = 'ak-session=; path=/; max-age=0'
          router.push('/login')
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  async function handleLogout() {
    const supabase = getSupabaseClient()
    await supabase.auth.signOut()
    document.cookie = 'ak-session=; path=/; max-age=0'
    router.push('/login')
  }

  const initials = userEmail ? userEmail[0].toUpperCase() : '?'

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="w-[240px] flex-shrink-0 flex flex-col"
        style={{
          background: 'rgba(6, 10, 22, 0.99)',
          borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* Logo */}
        <div
          className="h-[64px] flex items-center px-5"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 flex items-center justify-center rounded-md flex-shrink-0"
              style={{
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#00F0FF' }}>
                fingerprint
              </span>
            </div>
            <span
              className="text-sm font-bold tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
            >
              Alias<span style={{ color: '#00F0FF' }}>Kit</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-0.5">
          {NAV.map(({ href, label, icon }) => {
            const active = href === '/dashboard' ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 py-2 rounded-lg transition-all text-sm ${active ? 'nav-item-active' : 'nav-item-inactive'}`}
                style={{
                  fontFamily: 'var(--font-outfit)',
                  color: active ? '#E2E8F0' : '#64748B',
                  marginLeft: 0,
                }}
              >
                <span
                  className="material-symbols-outlined flex-shrink-0"
                  style={{
                    fontSize: 17,
                    color: active ? '#00F0FF' : '#475569',
                    filter: active ? 'drop-shadow(0 0 6px rgba(0,240,255,0.5))' : 'none',
                  }}
                >
                  {icon}
                </span>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div
          className="px-4 py-4"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          {userEmail && (
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: 'rgba(0, 240, 255, 0.12)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  color: '#00F0FF',
                  fontFamily: 'var(--font-jetbrains-mono)',
                }}
              >
                {initials}
              </div>
              <p
                className="text-xs truncate flex-1 min-w-0"
                style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}
              >
                {userEmail}
              </p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-xs py-1.5 px-3 text-left transition-all rounded-lg flex items-center gap-2"
            style={{ fontFamily: 'var(--font-outfit)', color: '#475569' }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.color = '#94a3b8'
              el.style.background = 'rgba(255,255,255,0.04)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.color = '#475569'
              el.style.background = 'transparent'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>logout</span>
            Sign out
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
