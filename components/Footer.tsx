const LogoSvg = () => (
  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width={22} height={22}>
    <path
      d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
      fill="currentColor"
    />
    <path
      clipRule="evenodd"
      d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)

export default function Footer() {
  return (
    <footer
      className="w-full border-t py-16 relative overflow-hidden"
      style={{
        background: '#03060C',
        borderColor: 'rgba(0, 240, 255, 0.12)',
      }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cdefs%3E%3Cpattern id='g' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 0 5 L 20 5 M 5 0 L 5 20' fill='none' stroke='rgba(100,116,139,0.04)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 text-primary mb-6">
              <LogoSvg />
              <span
                className="text-xl font-bold uppercase tracking-widest text-[#E2E8F0]"
                style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
              >
                AliasKit
              </span>
            </div>
            <p
              className="text-sm max-w-sm leading-relaxed"
              style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              OPERATIONAL PROTOCOL_<br />
              Establishing zero-trust boundaries for non-human entities.
            </p>
          </div>

          {/* Platform links */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-white text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
            >
              Platform
            </h4>
            {['Command Matrix', 'Neural Wallet', 'API Specs'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm transition-colors hover:text-primary"
                style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* System links */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-white text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
            >
              System
            </h4>
            <a
              href="#"
              className="text-sm transition-colors hover:text-primary flex items-center gap-2"
              style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              Status
              <span className="w-2 h-2 rounded-full bg-success inline-block" />
            </a>
            {['Security', 'Terms of Execution'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm transition-colors hover:text-primary"
                style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex justify-between items-center"
          style={{ borderTop: '1px solid rgba(0, 240, 255, 0.08)' }}
        >
          <span
            className="text-xs"
            style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            © 2025 ALIASKIT SYSTEMS INC.
          </span>
          <div className="flex gap-4">
            {['code', 'terminal'].map((icon) => (
              <span
                key={icon}
                className="material-symbols-outlined text-xl cursor-pointer transition-colors hover:text-primary"
                style={{ color: '#64748B' }}
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
