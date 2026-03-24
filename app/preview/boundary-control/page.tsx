export default function BoundaryControl() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#050914', color: '#E2E8F0', fontFamily: 'var(--font-body), Outfit, sans-serif' }}>
      {/* Sidebar */}
      <div className="relative flex h-full w-[280px] flex-col flex-shrink-0 z-20" style={{ background: '#111818', borderRight: '1px solid rgba(0,240,255,0.15)' }}>
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col px-3 py-2">
              <h1 className="text-xl font-bold uppercase tracking-widest text-gradient" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>AliasKit</h1>
              <p className="text-xs tracking-wider opacity-80" style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>CYBER-SPATIAL OS</p>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { icon: 'grid_view', label: 'Command Matrix', active: false },
                { icon: 'memory', label: 'Agent Nodes', active: false },
                { icon: 'account_balance_wallet', label: 'Neural Wallet', active: false },
                { icon: 'shield', label: 'Boundary Control', active: true },
              ].map((item) => (
                <a key={item.label} href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors`}
                  style={item.active ? { background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.2)', boxShadow: '0 0 24px rgba(0,240,255,0.15)' } : { color: '#64748B' }}>
                  <span className="material-symbols-outlined text-xl" style={item.active ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                  <p className="text-sm font-medium leading-normal tracking-wide">{item.label}</p>
                </a>
              ))}
            </div>
          </div>
          <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(0,240,255,0.15)' }}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: '#39FF14', boxShadow: '0 0 8px #39FF14', animation: 'pulse 2s infinite' }} />
              <span className="text-xs" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#39FF14' }}>SYS_ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full pointer-events-none z-0" style={{ background: 'rgba(0,240,255,0.05)', filter: 'blur(120px)', transform: 'translate(33%, -50%)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0" style={{ background: 'rgba(255,0,85,0.05)', filter: 'blur(100px)', transform: 'translate(-25%, 33%)' }} />

        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 z-10 sticky top-0" style={{ background: 'rgba(11,18,33,0.7)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,240,255,0.15)' }}>
          <div className="flex items-center gap-4 text-white">
            <span className="material-symbols-outlined text-2xl text-primary">security</span>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>Boundary Control</h2>
              <p className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>Zero-Trust Active · Global Directives</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ border: '1px solid rgba(57,255,20,0.3)', background: 'rgba(57,255,20,0.1)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#39FF14', boxShadow: '0 0 5px #39FF14' }} />
              <span className="text-[10px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#39FF14' }}>Enforcement Active</span>
            </div>
            <button className="flex items-center justify-center h-10 px-6 rounded transition-all hover:bg-white text-sm font-bold uppercase tracking-wider" style={{ background: '#00F0FF', color: '#050914', fontFamily: 'var(--font-syncopate), sans-serif', borderRadius: 4 }}>
              Deploy Policies
            </button>
          </div>
        </header>

        {/* Scrollable */}
        <main className="flex-1 overflow-y-auto p-8 z-10 relative terminal-scroll">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
            {/* Global Security Posture */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>
                <span className="material-symbols-outlined text-lg">public</span>
                Global Security Posture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Network Lockdown', desc: 'Block all outbound non-whitelisted traffic.', checked: true, status: 'ACTIVE FOR 244 NODES', statusOk: true },
                  { title: 'Freeze Wallets', desc: 'Suspend all virtual card transactions globally.', checked: false, status: '0/42 CARDS FROZEN', statusOk: false },
                  { title: 'Autonomous Exec', desc: 'Allow agents to initiate unprompted actions.', checked: true, status: 'SUPERVISED MODE ACTIVE', statusOk: true },
                ].map((card) => (
                  <div key={card.title} className="glass-panel p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-primary/40 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-body), sans-serif' }}>{card.title}</h4>
                        <p className="text-xs mt-1" style={{ color: '#64748B' }}>{card.desc}</p>
                      </div>
                      {/* Toggle */}
                      <div className="relative inline-block w-12 align-middle select-none">
                        <div className="relative h-6 rounded-full transition-all" style={{ background: card.checked ? '#06e8f9' : 'rgba(11,18,33,0.5)', border: card.checked ? 'none' : '1px solid rgba(100,116,139,0.3)', boxShadow: card.checked ? '0 0 12px rgba(6,232,249,0.5)' : 'none' }}>
                          <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: card.checked ? 'calc(100% - 22px)' : '2px' }} />
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(0,240,255,0.1)' }}>
                      <span className="text-[10px] flex items-center gap-1" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: card.statusOk && card.checked ? '#00F0FF' : '#64748B' }}>
                        <span className="material-symbols-outlined text-[12px]">check_circle</span>
                        {card.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Capability Matrix + Audit */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Matrix + Sliders */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>
                    <span className="material-symbols-outlined text-lg">tune</span>
                    Capability Matrix
                  </h3>
                  <div className="glass-panel flex flex-col">
                    {[
                      { icon: 'mail', label: 'External Communications', sub: 'SMTP / IMAP / Webhooks', info: 'Rate Limit', infoVal: '100/hr', checked: true },
                      { icon: 'api', label: 'Unverified API Access', sub: 'Allow connections to non-whitelisted domains', info: 'Status', infoVal: 'BLOCKED', checked: false, alert: true },
                      { icon: 'database', label: 'Persistent Memory Write', sub: 'Vector DB & Graph Storage', info: 'Quota', infoVal: '50GB/Agent', checked: true },
                    ].map((item, i, arr) => (
                      <div key={item.label} className="flex items-center justify-between p-5 transition-colors hover:bg-white/[0.02]" style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(0,240,255,0.1)' : 'none' }}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)' }}>
                            <span className="material-symbols-outlined text-primary">{item.icon}</span>
                          </div>
                          <div>
                            <h5 className="text-white font-medium">{item.label}</h5>
                            <p className="text-xs mt-0.5" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>{item.sub}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right hidden sm:block">
                            <div className="text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>{item.info}</div>
                            <div className="text-sm" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: item.alert && !item.checked ? '#FF0055' : '#fff' }}>{item.infoVal}</div>
                          </div>
                          <div className="relative inline-block w-12 align-middle select-none">
                            <div className="relative h-6 rounded-full transition-all" style={{ background: item.checked ? '#06e8f9' : 'rgba(11,18,33,0.5)', border: item.checked ? 'none' : '1px solid rgba(100,116,139,0.3)', boxShadow: item.checked ? '0 0 12px rgba(6,232,249,0.5)' : 'none' }}>
                              <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: item.checked ? 'calc(100% - 22px)' : '2px' }} />
                            </div>
                          </div>
                          <button style={{ color: '#64748B' }} className="hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>
                    <span className="material-symbols-outlined text-lg">speed</span>
                    Resource Bounds
                  </h3>
                  <div className="glass-panel p-6 flex flex-col gap-6">
                    {[
                      { label: 'Max Token Spend (Daily per Agent)', value: '500,000', min: 10000, max: 1000000, cur: 500000, minLabel: '10K', maxLabel: '1M' },
                      { label: 'Compute Priority Threading', value: 'Level 4', min: 1, max: 10, cur: 4, minLabel: 'Idle (1)', maxLabel: 'Critical (10)' },
                    ].map((s, i) => (
                      <div key={s.label} className={i > 0 ? 'pt-4' : ''} style={i > 0 ? { borderTop: '1px solid rgba(0,240,255,0.1)' } : {}}>
                        <div className="flex justify-between items-end mb-2">
                          <label className="text-white text-sm">{s.label}</label>
                          <span className="text-sm px-2 py-1 rounded" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#00F0FF', background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)' }}>{s.value}</span>
                        </div>
                        <input type="range" min={s.min} max={s.max} defaultValue={s.cur} className="w-full" readOnly />
                        <div className="flex justify-between text-[10px] mt-2" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B' }}>
                          <span>{s.minLabel}</span>
                          <span>{s.maxLabel}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right: Audit + Danger */}
              <div className="flex flex-col gap-6">
                <section className="flex-1 flex flex-col min-h-[300px]">
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>
                    <span className="material-symbols-outlined text-lg">terminal</span>
                    Policy Audit Log
                  </h3>
                  <div className="glass-panel flex-1 p-4 overflow-y-auto terminal-scroll relative" style={{ minHeight: 220 }}>
                    <div className="flex flex-col gap-2 text-[11px] leading-relaxed" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#64748B' }}>
                      {[
                        { time: '14:32:01', tag: 'INFO:', tc: '#00F0FF', msg: 'Policy updated: Network Lockdown → ENABLED' },
                        { time: '14:32:05', tag: 'PASS:', tc: '#39FF14', msg: 'Agent-0x4A requested external API (github.com). Whitelisted.' },
                        { time: '14:33:12', tag: 'BLOCK:', tc: '#FF0055', msg: 'Agent-0x9B attempted unauthorized transfer. Wallet frozen.', alert: true },
                        { time: '14:35:44', tag: 'INFO:', tc: '#00F0FF', msg: 'Rate limit adjusted for SMTP to 100/hr.' },
                        { time: '14:36:01', tag: 'PASS:', tc: '#39FF14', msg: 'Agent-0x1C committed to persistent memory. (12kb)' },
                        { time: '14:38:22', tag: 'INFO:', tc: '#00F0FF', msg: 'Compute priority thread level check: Nominal.' },
                      ].map((entry) => (
                        <div key={entry.time} className="flex gap-2" style={entry.alert ? { color: 'rgba(255,0,85,0.8)' } : {}}>
                          <span className="opacity-50">[{entry.time}]</span>
                          <span style={{ color: entry.tc }}>{entry.tag}</span>
                          <span>{entry.msg}</span>
                        </div>
                      ))}
                      <div className="flex gap-2 mt-2 animate-pulse">
                        <span style={{ color: '#00F0FF' }}>&gt;</span>
                        <span>Awaiting stream...</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Danger zone */}
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#FF0055', fontFamily: 'var(--font-syncopate), sans-serif' }}>
                    <span className="material-symbols-outlined text-lg">warning</span>
                    Danger Zone
                  </h3>
                  <div className="glass-panel-alert p-6 flex flex-col gap-4 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ background: 'rgba(255,0,85,0.1)', border: '1px solid rgba(255,0,85,0.3)' }}>
                      <span className="material-symbols-outlined text-2xl" style={{ color: '#FF0055' }}>power_settings_new</span>
                    </div>
                    <h4 className="text-white font-bold text-lg">Global Terminate</h4>
                    <p className="text-xs px-4" style={{ color: '#64748B' }}>Instantly sever all active connections, freeze wallets, and halt processing for every agent in the matrix. Requires authorization.</p>
                    <button className="mt-2 w-full flex items-center justify-center gap-2 h-12 font-bold text-xs uppercase tracking-wider transition-all" style={{ borderRadius: 4, border: '1px solid #FF0055', background: 'rgba(255,0,85,0.1)', color: '#FF0055', fontFamily: 'var(--font-syncopate), sans-serif', boxShadow: '0 0 15px rgba(255,0,85,0.1)' }}>
                      <span className="material-symbols-outlined text-lg">emergency</span>
                      INITIATE KILL SEQUENCE
                    </button>
                  </div>
                </section>
              </div>
            </div>
            <div className="h-8" />
          </div>
        </main>
      </div>
    </div>
  )
}
