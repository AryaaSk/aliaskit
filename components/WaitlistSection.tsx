export default function WaitlistSection() {
  return (
    <section
      id="waitlist"
      className="w-full py-28 px-6 relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(0, 240, 255, 0.08)' }}
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,240,255,0.07), transparent)',
        }}
      />

      <div className="max-w-[760px] mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: copy + buttons */}
        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
          <div className="flex flex-col gap-4">
            <h2
              className="text-3xl lg:text-[42px] font-bold text-white uppercase leading-tight"
              style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
            >
              Start Building Today
            </h2>
            <p
              className="text-base leading-relaxed max-w-md"
              style={{ color: '#64748B', fontFamily: 'var(--font-outfit), sans-serif' }}
            >
              AliasKit is live and free to try. Provision your first agent identity in
              under a minute — no waitlist, no credit card required.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
            <a
              href="/dashboard"
              className="btn-cyber flex items-center justify-center text-sm"
              style={{ width: 200, height: 48 }}
            >
              Open Dashboard
            </a>
            <a
              href="/docs"
              className="hero-learn-more"
            >
              Read the Docs →
            </a>
          </div>
        </div>

        {/* Right: REST snippet */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid rgba(0, 240, 255, 0.15)', background: '#02040b' }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-1.5 px-4 py-3"
              style={{ background: 'rgba(0, 0, 0, 0.4)', borderBottom: '1px solid rgba(0, 240, 255, 0.08)' }}
            >
              {['#FF0055', '#F59E0B', '#39FF14'].map((c) => (
                <div
                  key={c}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: c, opacity: 0.6 }}
                />
              ))}
              <span
                className="ml-2 text-[11px]"
                style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                terminal
              </span>
            </div>

            {/* Code */}
            <div className="p-5 flex flex-col gap-1 text-xs overflow-x-auto" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
              <div className="flex gap-2">
                <span style={{ color: '#39FF14' }}>$</span>
                <span style={{ color: '#E2E8F0' }}>curl -X POST https://api.aliaskit.com/v1/identities \</span>
              </div>
              <div className="pl-4" style={{ color: '#E2E8F0' }}>{'  -H "Authorization: Bearer <api_key>" \\'}</div>
              <div className="pl-4" style={{ color: '#E2E8F0' }}>{'  -H "Content-Type: application/json" \\'}</div>
              <div className="pl-4 pb-2" style={{ color: '#E2E8F0' }}>{"  -d '{\"label\": \"agent-7f3a\"}'"}</div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 8 }}>
                <div style={{ color: '#64748B' }}>{'{'}</div>
                <div className="pl-4"><span style={{ color: '#7b9cff' }}>&quot;id&quot;</span><span style={{ color: '#64748B' }}>: </span><span style={{ color: '#39FF14' }}>&quot;id_a1b2c3d4&quot;</span><span style={{ color: '#64748B' }}>,</span></div>
                <div className="pl-4"><span style={{ color: '#7b9cff' }}>&quot;email&quot;</span><span style={{ color: '#64748B' }}>: </span><span style={{ color: '#00F0FF' }}>&quot;agent-7f3a@aliaskit.email&quot;</span><span style={{ color: '#64748B' }}>,</span></div>
                <div className="pl-4"><span style={{ color: '#7b9cff' }}>&quot;phone&quot;</span><span style={{ color: '#64748B' }}>: </span><span style={{ color: '#00F0FF' }}>&quot;+14155550192&quot;</span><span style={{ color: '#64748B' }}>,</span></div>
                <div className="pl-4"><span style={{ color: '#7b9cff' }}>&quot;status&quot;</span><span style={{ color: '#64748B' }}>: </span><span style={{ color: '#39FF14' }}>&quot;active&quot;</span></div>
                <div style={{ color: '#64748B' }}>{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
