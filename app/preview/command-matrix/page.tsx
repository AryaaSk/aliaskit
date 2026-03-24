const LogoSvg = () => (
  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width={22} height={22}>
    <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor" />
    <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd" />
  </svg>
)

export default function CommandMatrix() {
  return (
    <div className="text-gray-200 min-h-screen flex overflow-hidden" style={{ background: '#050914', backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(6,232,249,0.05) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(255,0,85,0.03) 0%, transparent 50%)', backgroundAttachment: 'fixed' }}>
      {/* Sidebar */}
      <aside className="w-[240px] flex-shrink-0 h-screen glass-panel border-y-0 border-l-0 border-r flex flex-col z-20 relative shadow-glow" style={{ borderRadius: 0 }}>
        <div className="flex flex-col h-full p-4">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-10 px-2 py-2 text-primary">
            <LogoSvg />
            <h1 className="text-white text-xl font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>AliasKit</h1>
          </div>
          {/* Nav */}
          <nav className="flex flex-col gap-2 flex-1">
            <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-lg" style={{ background: 'rgba(6,232,249,0.1)', border: '1px solid rgba(6,232,249,0.3)', boxShadow: 'inset 0 0 12px rgba(6,232,249,0.1)' }}>
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>Command Matrix</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted hover:text-white transition-colors" style={{ color: '#64748B' }}>
              <span className="material-symbols-outlined">account_balance_wallet</span>
              <span className="text-sm font-medium uppercase tracking-wider" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>Neural Wallet</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted hover:text-white transition-colors" style={{ color: '#64748B' }}>
              <span className="material-symbols-outlined">security</span>
              <span className="text-sm font-medium uppercase tracking-wider" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>Boundary Control</span>
            </a>
          </nav>
          {/* Bottom */}
          <div className="mt-auto flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
              <div className="size-10 rounded-full border flex items-center justify-center overflow-hidden" style={{ borderColor: 'rgba(6,232,249,0.3)', background: '#050914' }}>
                <div className="w-full h-full" style={{ background: 'linear-gradient(to top right, rgba(6,232,249,0.2), rgba(255,0,85,0.2))' }} />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-bold uppercase tracking-wider">Operator_01</span>
                <span className="text-xs" style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>SYS_ADMIN</span>
              </div>
            </div>
            <button className="w-full rounded-lg h-12 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.1em] transition-all" style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid #00F0FF', color: '#00F0FF', fontFamily: 'var(--font-syncopate), sans-serif', boxShadow: '0 0 24px rgba(0,240,255,0.1)' }}>
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Initialize Node
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Stats Header */}
        <header className="h-[120px] glass-panel border-t-0 border-x-0 border-b flex items-center px-8 gap-8 shrink-0 z-10" style={{ borderRadius: 0 }}>
          {/* Trust Score */}
          <div className="flex items-center gap-6 pr-8" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="relative size-20 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#39FF14" strokeWidth="8" strokeDasharray="283" strokeDashoffset="14" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.6))' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#39FF14', textShadow: '0 0 5px rgba(57,255,20,0.8)' }}>98</span>
                <span className="text-[10px]" style={{ color: 'rgba(57,255,20,0.7)', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>%</span>
              </div>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>System Trust Score</h2>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full pulse-dot" style={{ background: '#39FF14' }} />
                <span className="text-sm" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#d1d5db' }}>NOMINAL_STATE</span>
              </div>
            </div>
          </div>
          {/* Stat widgets */}
          <div className="flex gap-12 flex-1">
            {[{ label: 'Active Nodes', value: '12', unit: '' }, { label: 'Global Memory', value: '14.2', unit: 'TB' }, { label: 'Network Uptime', value: '99.99', unit: '%' }].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>{s.label}</span>
                <span className="text-3xl font-bold glow-text" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
                  {s.value}
                  {s.unit && <span className="text-lg ml-1" style={{ color: 'rgba(0,240,255,0.7)' }}>{s.unit}</span>}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden p-6 gap-6 z-10">
          {/* Agent Roster */}
          <section className="w-[45%] flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2 px-1">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: '#00F0FF', fontFamily: 'var(--font-syncopate), sans-serif' }}>
                <span className="material-symbols-outlined text-lg">memory</span>
                Active Agent Nodes
              </h3>
              <span className="text-xs" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B' }}>SORT: UPTIME</span>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 terminal-scroll flex flex-col gap-3 pb-4">
              {/* Agent 1 - Idle */}
              <div className="agent-row glass-panel p-4 rounded-lg border group relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1 rounded-l-lg" style={{ background: '#39FF14', boxShadow: '0 0 8px #39FF14' }} />
                <div className="flex justify-between items-start mb-3 pl-2">
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
                      Alpha-01_Sentinel
                      <span className="px-2 py-0.5 rounded text-[10px]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', background: 'rgba(57,255,20,0.1)', color: '#39FF14', border: '1px solid rgba(57,255,20,0.3)' }}>IDLE</span>
                    </h4>
                    <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B' }}>Hash: 0x8f...4e2a</p>
                  </div>
                  <span className="material-symbols-outlined text-muted group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
                <div className="grid grid-cols-3 gap-4 pl-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {[['Uptime', '142h 12m'], ['Memory', '1.2 GB'], ['Task', 'Awaiting Cmd']].map(([l, v]) => (
                    <div key={l}>
                      <span className="block text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>{l}</span>
                      <span className="text-sm text-gray-200" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Agent 2 - Executing */}
              <div className="agent-row glass-panel p-4 rounded-lg border group relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1 rounded-l-lg" style={{ background: '#00F0FF', boxShadow: '0 0 8px #00F0FF' }} />
                <div className="flex justify-between items-start mb-3 pl-2">
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
                      Beta-09_Scraper
                      <span className="px-2 py-0.5 rounded text-[10px] animate-pulse" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.3)' }}>EXEC</span>
                    </h4>
                    <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B' }}>Hash: 0x3b...9c1f</p>
                  </div>
                  <span className="material-symbols-outlined text-muted group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
                <div className="grid grid-cols-3 gap-4 pl-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {[['Uptime', '48h 05m'], ['Memory', '4.8 GB'], ['Task', 'Yield Agg...']].map(([l, v]) => (
                    <div key={l}>
                      <span className="block text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>{l}</span>
                      <span className="text-sm" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: l === 'Task' ? '#00F0FF' : '#e5e7eb' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Agent 3 - Halted */}
              <div className="glass-panel p-4 rounded-lg group relative overflow-hidden" style={{ border: '1px solid rgba(255,0,85,0.3)', background: 'rgba(255,0,85,0.05)' }}>
                <div className="absolute inset-y-0 left-0 w-1 rounded-l-lg" style={{ background: '#FF0055', boxShadow: '0 0 8px #FF0055' }} />
                <div className="flex justify-between items-start mb-3 pl-2">
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
                      Gamma-44_Trader
                      <span className="px-2 py-0.5 rounded text-[10px]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', background: 'rgba(255,0,85,0.2)', color: '#FF0055', border: '1px solid rgba(255,0,85,0.5)' }}>HALTED</span>
                    </h4>
                    <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B' }}>Hash: 0xaa...11bb</p>
                  </div>
                  <span className="material-symbols-outlined" style={{ color: '#FF0055' }}>warning</span>
                </div>
                <div className="grid grid-cols-3 gap-4 pl-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {[['Uptime', '00h 00m', true], ['Memory', '0.0 GB', false], ['Task', 'ERR_BOUND', true]].map(([l, v, isAlert]) => (
                    <div key={l as string}>
                      <span className="block text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>{l}</span>
                      <span className="text-sm" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: isAlert ? 'rgba(255,0,85,0.8)' : '#e5e7eb' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Telemetry Stream */}
          <section className="w-[55%] flex flex-col h-full relative">
            <div className="absolute inset-0 glass-panel rounded-lg border flex flex-col">
              <div className="h-10 flex items-center px-4 justify-between rounded-t-lg shrink-0" style={{ borderBottom: '1px solid rgba(0,240,255,0.15)', background: 'rgba(0,0,0,0.2)' }}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" style={{ color: '#64748B' }}>terminal</span>
                  <span className="text-xs tracking-widest" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B' }}>LIVE_TELEMETRY_STREAM</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full" style={{ background: 'rgba(255,0,85,0.5)', border: '1px solid rgba(255,0,85,0.8)' }} />
                  <div className="size-2.5 rounded-full" style={{ background: 'rgba(234,179,8,0.5)', border: '1px solid rgba(234,179,8,0.8)' }} />
                  <div className="size-2.5 rounded-full" style={{ background: 'rgba(57,255,20,0.5)', border: '1px solid rgba(57,255,20,0.8)' }} />
                </div>
              </div>
              <div className="flex-1 p-4 overflow-hidden relative">
                <div className="absolute top-2 right-4 p-2 rounded flex items-center gap-2 z-10" style={{ background: 'rgba(5,9,20,0.8)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 10, color: '#00F0FF' }}>
                  <span className="size-1.5 rounded-full animate-ping" style={{ background: '#00F0FF' }} />
                  STREAMING
                </div>
                <div className="h-full overflow-y-auto terminal-scroll telemetry-stream flex flex-col justify-end" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 13 }}>
                  <div className="flex flex-col gap-1 pb-8">
                    {[
                      ['10:42:01', 'SYS', '#00F0FF', 'Handshake verified for node 0x8f...4e2a', '#9ca3af'],
                      ['10:42:05', 'OK', '#39FF14', 'Wallet API connection established. Bal: $1,240.00', '#9ca3af'],
                      ['10:42:12', 'LOG', '#6b7280', 'Beta-09 initiated HTTP GET → https://defi-api.eth/v1/yields', '#9ca3af'],
                      ['10:42:13', 'OK', '#39FF14', 'Response 200 OK. Parsing payload (14.2kb)', '#9ca3af'],
                      ['10:42:28', 'LOG', '#6b7280', 'Alpha-01 heartbeat ACK. Latency 12ms.', '#9ca3af'],
                      ['10:42:45', 'ERR', '#FF0055', 'Gamma-44 attempted unauthorized POST to internal subnet.', 'rgba(255,0,85,0.8)'],
                      ['10:42:46', 'SYS', '#FF0055', 'Isolating node Gamma-44...', '#9ca3af'],
                      ['10:42:47', 'OK', '#39FF14', 'Node Gamma-44 successfully halted. Awaiting operator review.', '#9ca3af'],
                      ['10:43:01', 'LOG', '#6b7280', 'Beta-09 parsing complete. Executing trade parameters.', '#9ca3af'],
                      ['10:43:05', 'TXN', '#00F0FF', 'Sign request generated: 0x99f...2b1c', '#fff'],
                    ].map(([time, tag, tagColor, msg, msgColor]) => (
                      <div key={time as string} className="flex gap-3">
                        <span style={{ color: '#4b5563' }}>[{time}]</span>
                        <span style={{ color: tagColor as string }}>{tag}</span>
                        <span style={{ color: msgColor as string }}>{msg}</span>
                      </div>
                    ))}
                    <div className="flex gap-3 opacity-50">
                      <span style={{ color: '#4b5563' }}>[10:43:08]</span>
                      <span style={{ color: '#6b7280' }}>...</span>
                      <span>Awaiting network confirmation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
