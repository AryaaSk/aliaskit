export default function AgentNode() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050914', color: '#E2E8F0', backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(6,232,249,0.05) 0%, transparent 50%)' }}>
      {/* Header */}
      <header className="w-full h-16 flex items-center justify-between px-6 sticky top-0 z-50" style={{ background: 'rgba(11,18,33,0.7)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,240,255,0.15)' }}>
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-[rgba(6,232,249,0.1)]" style={{ color: '#64748B' }}>
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </a>
          <div className="h-6 w-px opacity-30" style={{ background: '#64748B' }} />
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full pulse-dot" style={{ background: '#39FF14' }} />
            <h1 className="text-xl font-bold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>NODE-A7X9</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase" style={{ background: 'rgba(57,255,20,0.1)', color: '#39FF14', border: '1px solid rgba(57,255,20,0.2)', fontFamily: 'var(--font-syncopate), sans-serif' }}>Active</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>System Uptime</span>
            <span className="text-sm" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#00F0FF' }}>94h 12m 44s</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded transition-all group" style={{ background: 'rgba(255,0,85,0.1)', border: '1px solid #FF0055', color: '#FF0055', boxShadow: '0 0 24px rgba(255,0,85,0.2)' }}>
            <span className="material-symbols-outlined text-sm">warning</span>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>Kill Switch</span>
          </button>
        </div>
      </header>

      {/* 3-col layout */}
      <main className="flex-1 p-6 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6 items-start">
          {/* Left: Identity */}
          <div className="flex flex-col gap-6">
            <section className="glass-panel rounded-lg p-5 flex flex-col gap-5">
              <h2 className="text-xs font-bold uppercase tracking-widest pb-2" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif', borderBottom: '1px solid rgba(0,240,255,0.1)' }}>Identity Matrix</h2>
              <div className="flex flex-col items-center gap-4 pt-2">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-full p-1 relative overflow-hidden group" style={{ border: '1px solid #00F0FF', boxShadow: '0 0 24px rgba(0,240,255,0.1)' }}>
                  <div className="absolute inset-0 rounded-full z-10 mix-blend-overlay transition-opacity" style={{ background: 'rgba(0,240,255,0.2)' }} />
                  <div className="w-full h-full rounded-full" style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.3), rgba(255,0,85,0.2), rgba(5,9,20,1))' }} />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg text-white">Project_Aries</h3>
                  <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B' }}>ID: a7x9-4b2c-9f81</p>
                </div>
                {/* Copyable fields */}
                <div className="flex flex-col gap-3 mt-4 w-full">
                  {[
                    { label: 'Provisioned Email', value: 'agent-a7x9@aliaskit.network' },
                    { label: 'Virtual Phone', value: '+1-555-0199' },
                    { label: 'Public Key', value: '0x71C...4b92' },
                  ].map((f) => (
                    <div key={f.label} className="copy-field group cursor-pointer border rounded p-3 flex justify-between items-center" style={{ borderColor: 'rgba(100,116,139,0.2)', background: 'rgba(0,0,0,0.2)' }}>
                      <div className="flex flex-col gap-1 z-10">
                        <span className="text-[10px] uppercase font-bold" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>{f.label}</span>
                        <span className="text-sm text-white truncate max-w-[180px]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>{f.value}</span>
                      </div>
                      <span className="material-symbols-outlined text-sm transition-colors group-hover:text-primary" style={{ color: '#64748B' }}>content_copy</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            {/* Capabilities */}
            <section className="glass-panel rounded-lg p-5 flex flex-col gap-4">
              <h2 className="text-xs font-bold uppercase tracking-widest pb-2" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif', borderBottom: '1px solid rgba(0,240,255,0.1)' }}>Capabilities</h2>
              <ul className="flex flex-col gap-3">
                {[
                  { icon: 'public', label: 'Web Browsing', status: 'ENABLED', ok: true },
                  { icon: 'terminal', label: 'Shell Execution', status: 'RESTRICTED', ok: false },
                  { icon: 'credit_card', label: 'Financial TX', status: 'ENABLED', ok: true },
                ].map((c) => (
                  <li key={c.label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2" style={{ color: '#64748B' }}>
                      <span className="material-symbols-outlined text-sm text-primary">{c.icon}</span>
                      {c.label}
                    </span>
                    <span className="text-xs" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: c.ok ? '#39FF14' : '#FF0055' }}>{c.status}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Center: Cognitive Map */}
          <div className="flex flex-col gap-6 h-full">
            <section className="glass-panel rounded-lg flex flex-col overflow-hidden" style={{ height: 600 }}>
              <div className="p-5 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(0,240,255,0.1)', background: 'rgba(0,0,0,0.3)' }}>
                <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>Cognitive Map</h2>
                <div className="flex gap-4">
                  {[{ color: '#00F0FF', label: 'Core' }, { color: '#39FF14', label: 'Active Task' }].map((l) => (
                    <div key={l.label} className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full" style={{ background: l.color, boxShadow: `0 0 8px ${l.color}` }} />
                      <span style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Graph area */}
              <div className="flex-1 relative bg-grid scanline cursor-crosshair flex items-center justify-center" style={{ background: '#03050a' }}>
                <div className="absolute top-4 left-4 text-[10px] opacity-50" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B' }}>
                  ZOOM: 1.4x<br />NODES: 1,402<br />EDGES: 3,891
                </div>
                {/* Central node */}
                <div className="absolute w-12 h-12 rounded-full flex items-center justify-center z-20" style={{ background: 'rgba(0,240,255,0.1)', border: '2px solid #00F0FF', boxShadow: '0 0 24px rgba(0,240,255,0.1)', left: 'calc(50% - 24px)', top: 'calc(50% - 24px)' }}>
                  <span className="material-symbols-outlined text-lg" style={{ color: '#00F0FF' }}>smart_toy</span>
                </div>
                {/* SVG edges */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ stroke: 'rgba(0,240,255,0.2)', strokeWidth: 1 }}>
                  <line x1="50%" y1="50%" x2="30%" y2="30%" />
                  <line x1="50%" y1="50%" x2="70%" y2="20%" />
                  <line x1="50%" y1="50%" x2="75%" y2="60%" />
                  <line x1="50%" y1="50%" x2="40%" y2="75%" />
                  <line x1="50%" y1="50%" x2="20%" y2="60%" />
                  <line x1="30%" y1="30%" x2="20%" y2="20%" />
                  <line x1="30%" y1="30%" x2="40%" y2="15%" />
                </svg>
                {/* Node dots */}
                <div className="absolute group cursor-pointer" style={{ top: '30%', left: '30%', transform: 'translate(-50%,-50%)', zIndex: 10 }}>
                  <div className="w-4 h-4 rounded-full hover:scale-150 transition-transform" style={{ background: '#39FF14', boxShadow: '0 0 12px rgba(57,255,20,0.2)' }} />
                  <div className="absolute hidden group-hover:block bottom-full mb-2 glass-panel p-2 rounded text-[10px] whitespace-nowrap z-30" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', left: '50%', transform: 'translateX(-50%)' }}>
                    <span style={{ color: '#00F0FF' }}>Task:</span> Data Scraping<br />
                    <span style={{ color: '#64748B' }}>Status: Running</span>
                  </div>
                </div>
                {[{ t: '20%', l: '70%' }, { t: '60%', l: '75%' }, { t: '75%', l: '40%' }, { t: '60%', l: '20%' }].map((p, i) => (
                  <div key={i} className="absolute w-3 h-3 rounded-full" style={{ top: p.t, left: p.l, transform: 'translate(-50%,-50%)', background: '#00F0FF', opacity: 0.6, zIndex: 10 }} />
                ))}
                {[{ t: '20%', l: '20%' }, { t: '15%', l: '40%' }].map((p, i) => (
                  <div key={i} className="absolute w-2 h-2 rounded-full" style={{ top: p.t, left: p.l, transform: 'translate(-50%,-50%)', background: '#00F0FF', opacity: 0.4, zIndex: 10 }} />
                ))}
              </div>
              {/* Log stream */}
              <div className="h-32 overflow-y-auto scanline" style={{ background: '#020308', borderTop: '1px solid rgba(0,240,255,0.1)', padding: '1rem' }}>
                <div className="flex flex-col gap-1 text-[11px] leading-relaxed" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
                  {[
                    ['10:42:01', '#00F0FF', 'SYS: Ingesting contextual block 0x9f2a...', '#64748B'],
                    ['10:42:05', '#00F0FF', 'ACT: Navigating to target URI...', '#64748B'],
                    ['10:42:12', '#39FF14', 'MEM: Association created → "Vendor Pricing" : "Database"', '#E2E8F0'],
                    ['10:42:14', '#00F0FF', 'AWAITING NEXT DIRECTIVE... _', '#64748B'],
                  ].map(([time, tc, msg, mc]) => (
                    <div key={time as string} style={{ color: mc as string }}>
                      <span style={{ color: tc as string }}>[{time}]</span> {msg}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right: Financial */}
          <div className="flex flex-col gap-6">
            <section className="glass-panel rounded-lg p-5 flex flex-col gap-5">
              <h2 className="text-xs font-bold uppercase tracking-widest pb-2 flex justify-between items-center" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif', borderBottom: '1px solid rgba(0,240,255,0.1)' }}>
                Neural Wallet
                <span className="material-symbols-outlined text-base text-primary">account_balance_wallet</span>
              </h2>
              {/* Mini card */}
              <div className="h-32 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(11,18,33,0.9))', border: '1px solid rgba(0,240,255,0.3)', boxShadow: '0 0 24px rgba(0,240,255,0.1)' }}>
                <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full" style={{ background: '#00F0FF', filter: 'blur(50px)', opacity: 0.2 }} />
                <div className="flex justify-between items-start z-10 relative">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">AliasCorp</span>
                  <span className="material-symbols-outlined text-white opacity-50">contactless</span>
                </div>
                <div className="z-10 relative">
                  <div className="text-lg text-white tracking-widest" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>**** 8492</div>
                  <div className="flex justify-between items-end mt-1">
                    <span className="text-[10px] uppercase" style={{ color: '#64748B' }}>Project_Aries</span>
                    <span className="text-xs font-bold text-white uppercase">Valid</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Daily Limit', value: '$500.00', color: '#fff' },
                  { label: 'Current Spend', value: '$142.50', color: '#00F0FF' },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center pb-2" style={{ borderBottom: '1px solid rgba(100,116,139,0.1)' }}>
                    <span className="text-xs uppercase" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>{r.label}</span>
                    <span className="text-sm" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: r.color }}>{r.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>Status</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-1 rounded" style={{ background: 'rgba(57,255,20,0.1)', color: '#39FF14' }}>Active</span>
                </div>
              </div>
              <button className="w-full py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors mt-2" style={{ border: '1px solid rgba(0,240,255,0.3)', color: '#00F0FF', fontFamily: 'var(--font-syncopate), sans-serif' }}>
                Manage Limits
              </button>
            </section>
            {/* Recent execution */}
            <section className="glass-panel rounded-lg p-5 flex flex-col gap-4">
              <h2 className="text-xs font-bold uppercase tracking-widest pb-2" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif', borderBottom: '1px solid rgba(0,240,255,0.1)' }}>Recent Execution</h2>
              <div className="flex flex-col gap-3">
                {[
                  { icon: 'api', label: 'AWS API Auth', time: 'Today, 09:14 AM' },
                  { icon: 'payment', label: 'DigitalOcean TX', time: 'Yesterday, 14:20 PM' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-start p-2 rounded" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(100,116,139,0.1)' }}>
                    <div className="flex gap-2">
                      <span className="material-symbols-outlined text-sm mt-0.5" style={{ color: '#64748B' }}>{item.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-xs text-white">{item.label}</span>
                        <span className="text-[10px]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B' }}>{item.time}</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-base" style={{ color: '#39FF14' }}>check_circle</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
