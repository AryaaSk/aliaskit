export default function OpenClawSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 lg:px-0 pb-20">
      <div
        className="glass-panel p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center lg:items-start gap-10"
        style={{ borderColor: 'rgba(0, 240, 255, 0.2)' }}
      >
        {/* Left: copy */}
        <div className="flex-1 flex flex-col gap-5">
          {/* OpenClaw badge */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded"
              style={{
                background: 'rgba(0, 240, 255, 0.06)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
              }}
            >
              <span
                className="material-symbols-outlined text-sm"
                style={{ color: '#00F0FF', fontSize: 16 }}
              >
                extension
              </span>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: '#00F0FF', fontFamily: 'var(--font-syncopate), sans-serif' }}
              >
                OpenClaw
              </span>
            </div>
            <span
              className="text-xs"
              style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              Native skill integration
            </span>
          </div>

          <h2
            className="text-2xl lg:text-3xl font-bold text-white uppercase leading-tight"
            style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
          >
            One Command.
            <br />
            Your Agent Has an Identity.
          </h2>

          <p
            className="text-base leading-relaxed max-w-lg"
            style={{ color: '#64748B', fontFamily: 'var(--font-outfit), sans-serif' }}
          >
            AliasKit is available as a native OpenClaw skill on ClawHub. Install it once
            and every agent in your gateway automatically receives a provisioned identity —
            no API wiring, no config files, no extra code.
          </p>

          <ul className="flex flex-col gap-3 mt-2">
            {[
              'Installs in under 60 seconds via ClawHub',
              'Identity credentials injected directly into agent context',
              'Works with any model — Claude, GPT, DeepSeek, Ollama',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm"
                style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit), sans-serif' }}
              >
                <span
                  className="mt-0.5 flex-shrink-0 text-xs"
                  style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: code block */}
        <div className="w-full lg:w-[400px] flex flex-col gap-3">
          {/* Terminal window */}
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
            <div className="p-5 flex flex-col gap-3">
              <div
                className="flex items-center gap-3 text-xs sm:text-sm overflow-x-auto"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                <span style={{ color: '#39FF14' }}>$</span>
                <span style={{ color: '#E2E8F0' }}>npx skills add aliaskit</span>
              </div>
              <div
                className="flex flex-col gap-1 text-xs pl-1 pt-1"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', borderTop: '1px solid rgba(255,255,255,0.04)' }}
              >
                <span style={{ color: '#39FF14' }}>✓ AliasKit skill installed</span>
                <span style={{ color: '#64748B' }}>→ Provisioning identity for agent...</span>
                <span style={{ color: '#00F0FF' }}>→ agent-7f3a@aliaskit.network ready</span>
                <span style={{ color: '#64748B' }}>→ Virtual card **** 8492 issued</span>
                <span style={{ color: '#39FF14' }}>✓ Agent identity live</span>
              </div>
            </div>
          </div>

          <p
            className="text-center text-xs"
            style={{ color: '#3d4f63', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            Available on ClawHub soon
          </p>
        </div>
      </div>
    </section>
  )
}
