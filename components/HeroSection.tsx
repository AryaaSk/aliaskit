import IdentityVisual from './IdentityVisual'

export default function HeroSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 py-16 lg:py-28 px-6 lg:px-0">
      {/* Left — copy */}
      <div className="flex-1 flex flex-col gap-7 z-10 text-center lg:text-left">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 justify-center lg:justify-start">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: '#39FF14',
              boxShadow: '0 0 6px #39FF14',
              animation: 'pulse 2s infinite',
            }}
          />
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            Agent Identity Layer
          </span>
        </div>

        {/* Headline */}
        <h1
          className="leading-[1.08]"
          style={{
            fontFamily: 'var(--font-syncopate), sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(26px, 5.5vw, 54px)',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: '#E2E8F0' }}>A complete</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(120deg, #00F0FF 0%, #7b9cff 60%, #00F0FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            human identity
          </span>
          <br />
          <span style={{ color: '#E2E8F0' }}>for your agent.</span>
        </h1>

        {/* Body */}
        <p
          className="text-base leading-[1.8] max-w-lg mx-auto lg:mx-0"
          style={{ color: '#8899aa', fontFamily: 'var(--font-outfit), sans-serif', fontSize: 16 }}
        >
          AliasKit provisions a full real-world identity so your AI agent can
          act as an autonomous entity on the web — open accounts, make payments,
          receive messages, and more. No humans in the loop.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4 justify-center lg:justify-start">
          <a
            href="#waitlist"
            className="btn-cyber flex items-center justify-center text-sm"
            style={{ width: 200, height: 48 }}
          >
            Join the Beta
          </a>
          <a href="#waitlist" className="hero-learn-more">
            Learn more →
          </a>
        </div>
      </div>

      {/* Right — identity visual */}
      <div className="hidden lg:block">
        <IdentityVisual />
      </div>
    </section>
  )
}
