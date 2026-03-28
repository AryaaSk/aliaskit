import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 0 10 L 40 10 M 10 0 L 10 40' fill='none' stroke='rgba(100,116,139,0.04)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E\")",
        }}
      />
      <Navigation />
      <div className="pt-[80px] flex min-h-screen">
        {/* Sidebar */}
        <aside
          className="hidden md:flex flex-col w-56 shrink-0 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto px-4 py-8"
          style={{ borderRight: '1px solid rgba(0, 240, 255, 0.07)' }}
        >
          <nav className="flex flex-col gap-1">
            <span
              className="text-[10px] uppercase tracking-widest mb-2"
              style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}
            >
              Getting Started
            </span>
            <Link
              href="/docs"
              className="text-sm px-3 py-1.5 rounded transition-colors"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              Quickstart
            </Link>

            <span
              className="text-[10px] uppercase tracking-widest mt-4 mb-2"
              style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}
            >
              Reference
            </span>
            <Link
              href="/docs/api-reference"
              className="text-sm px-3 py-1.5 rounded transition-colors"
              style={{ color: '#94A3B8', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              API Reference
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 md:px-12 py-12 max-w-3xl">
          {children}
        </main>
      </div>
    </>
  )
}
