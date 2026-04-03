import IdentityVisual from './IdentityVisual'

export default function HeroSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 py-16 lg:py-24 px-6 lg:px-0">
      {/* Left — copy */}
      <div className="flex-1 flex flex-col gap-6 z-10 text-center lg:text-left">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 justify-center lg:justify-start">
          <div
            className="flex items-center gap-2 px-3 py-1 rounded"
            style={{
              background: 'rgba(57, 255, 20, 0.06)',
              border: '1px solid rgba(57, 255, 20, 0.18)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 pulse-dot"
              style={{ background: '#39FF14', boxShadow: '0 0 6px #39FF14' }}
            />
            <span
              className="text-[10px] tracking-[0.18em] uppercase font-medium"
              style={{ color: '#39FF14', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              Live — Free to try
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="leading-[1.06]"
          style={{
            fontFamily: 'var(--font-syncopate), sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(28px, 5.5vw, 56px)',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: '#E2E8F0' }}>Give your agents</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(120deg, #00F0FF 0%, #7b9cff 55%, #00F0FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            a real identity.
          </span>
        </h1>

        {/* Body */}
        <p
          className="text-base leading-[1.75] max-w-lg mx-auto lg:mx-0"
          style={{ color: '#7a8fa3', fontFamily: 'var(--font-outfit), sans-serif' }}
        >
          One API call provisions a complete digital identity — real email, real phone
          number, real presence on the internet. Your agents can sign up for services,
          receive messages, and operate independently.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {[
            { icon: 'mail', label: 'Real Email Address' },
            { icon: 'smartphone', label: 'SMS Phone Number' },
            { icon: 'fingerprint', label: 'Unique Identity' },
            { icon: 'bolt', label: 'One API Call' },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5"
              style={{
                background: 'rgba(0, 240, 255, 0.05)',
                border: '1px solid rgba(0, 240, 255, 0.12)',
                borderRadius: 20,
                color: '#64748B',
                fontFamily: 'var(--font-outfit), sans-serif',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 13, color: '#00F0FF' }}>{icon}</span>
              {label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center lg:items-start gap-2.5">
          <div className="flex items-center gap-4 justify-center lg:justify-start">
            <a
              href="/dashboard"
              className="btn-cyber flex items-center justify-center gap-2 text-sm"
              style={{ width: 200, height: 48 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>rocket_launch</span>
              Get Started Free
            </a>
            <a href="/docs" className="hero-learn-more">
              Read Docs →
            </a>
          </div>
          <span
            className="text-xs flex items-center gap-1.5"
            style={{ color: '#2d3d4f', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 12, color: '#2d3d4f' }}>lock</span>
            No credit card required. 10 free identities/month.
          </span>
        </div>
      </div>

      {/* Right — identity visual */}
      <div className="hidden lg:block">
        <IdentityVisual />
      </div>
    </section>
  )
}
