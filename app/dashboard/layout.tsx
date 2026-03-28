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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const supabase = getSupabaseClient()

    // onAuthStateChange fires immediately with INITIAL_SESSION so we get the
    // current auth state reliably, even right after an OAuth redirect where
    // getSession() could race against the PKCE code exchange completing.
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
          // No session on first check — redirect to login
          document.cookie = 'ak-session=; path=/; max-age=0'
          router.push('/login')
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  // Close sidebar on route change (mobile nav)
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  async function handleLogout() {
    const supabase = getSupabaseClient()
    await supabase.auth.signOut()
    document.cookie = 'ak-session=; path=/; max-age=0'
    router.push('/login')
  }

  const sidebarContent = (
    <>
      {/* Logo */}
      <div
        className="h-[64px] flex items-center px-6 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
      >
        <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
          <span
            className="text-base font-bold tracking-[0.15em] uppercase"
            style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
          >
            Alias<span style={{ color: '#00F0FF' }}>Kit</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon }) => {
          const active = href === '/dashboard' ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-sm"
              style={{
                fontFamily: 'var(--font-outfit)',
                color: active ? '#E2E8F0' : '#64748B',
                background: active ? 'rgba(255, 255, 255, 0.07)' : 'transparent',
              }}
            >
              <span
                className="material-symbols-outlined flex-shrink-0"
                style={{ fontSize: 18, color: active ? '#00F0FF' : '#64748B' }}
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
        className="px-4 py-4 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
      >
        {userEmail && (
          <p
            className="text-xs mb-3 truncate"
            style={{ color: '#475569', fontFamily: 'var(--font-outfit)' }}
          >
            {userEmail}
          </p>
        )}
        <button
          onClick={handleLogout}
          className="w-full text-xs py-2 px-3 text-left transition-colors rounded-lg"
          style={{
            fontFamily: 'var(--font-outfit)',
            color: '#475569',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8'
            ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.color = '#475569'
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
          }}
        >
          Sign out
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar — hidden below md */}
      <aside
        className="hidden md:flex w-[240px] flex-shrink-0 flex-col"
        style={{
          background: 'rgba(8, 12, 26, 0.98)',
          borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(2px)' }}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className="fixed top-0 left-0 h-full z-50 flex flex-col md:hidden transition-transform duration-300"
        style={{
          width: 240,
          background: 'rgba(8, 12, 26, 0.99)',
          borderRight: '1px solid rgba(255, 255, 255, 0.06)',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
        aria-label="Navigation"
      >
        {sidebarContent}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto flex flex-col" style={{ background: '#050914' }}>
        {/* Mobile top bar */}
        <div
          className="flex items-center h-[64px] px-4 flex-shrink-0 md:hidden"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(8, 12, 26, 0.98)' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
            style={{ color: '#64748B' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#E2E8F0'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#64748B'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>menu</span>
          </button>
          <Link href="/dashboard" className="ml-3">
            <span
              className="text-base font-bold tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-syncopate)', color: '#E2E8F0' }}
            >
              Alias<span style={{ color: '#00F0FF' }}>Kit</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
