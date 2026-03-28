const pillars = [
  {
    icon: 'verified_user',
    title: 'Identity Infrastructure',
    body: 'Agents are independent entities, not compute extensions. Real identity unlocks real capabilities: service signups, account recovery, and autonomous operation on the internet.',
    points: [
      'Verified name, email, and phone number',
      'Real inbound email — receive anything',
      'Real inbound SMS — receive any code',
      'Metadata fields for agent context',
    ],
  },
  {
    icon: 'terminal',
    title: 'Ship Identity in Minutes',
    body: 'Provision a complete agent identity faster than configuring SMTP. 30 lines of code. One REST call. Works with Node, Deno, Bun, and any HTTP client — zero dependencies.',
    points: [
      'No KYC forms or verification delays',
      'No SMTP config or phone routing expertise',
      'SDK for Node, Python, and REST',
      'Webhooks for real-time message events',
    ],
  },
  {
    icon: 'inventory_2',
    title: 'One Provider, One Bill',
    body: 'Email and phone together in a single API, at a price that makes bundling more valuable than piecing together Twilio and SendGrid yourself.',
    points: [
      'No vendor fragmentation (Twilio + SendGrid)',
      'Transparent pricing, no hidden fees',
      'Free tier: 10 identities/month',
      'Pro: unlimited at $50/month flat',
    ],
  },
]

export default function FeatureCards() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 lg:px-0 pb-20">
      {/* Section header */}
      <div className="text-center mb-14">
        <p
          className="text-[10px] uppercase tracking-[0.25em] mb-3"
          style={{ color: '#00F0FF', fontFamily: 'var(--font-syncopate), sans-serif' }}
        >
          Why AliasKit
        </p>
        <h2
          className="text-2xl lg:text-3xl font-bold text-white uppercase mb-4"
          style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
        >
          Built for Autonomous Agents.
        </h2>
        <p
          className="text-sm max-w-md mx-auto"
          style={{ color: '#475569', fontFamily: 'var(--font-outfit), sans-serif' }}
        >
          Everything your agent needs to operate as an independent digital entity — without the setup nightmare.
        </p>
      </div>

      {/* 3-pillar grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="glass-panel feature-card p-6 lg:p-8 flex flex-col gap-5"
          >
            {/* Icon */}
            <div
              className="feature-icon-container w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.15)' }}
            >
              <span className="material-symbols-outlined" style={{ color: '#00F0FF', fontSize: 22 }}>
                {pillar.icon}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-sm font-bold text-white uppercase tracking-wide"
              style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
            >
              {pillar.title}
            </h3>

            {/* Body */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: '#64748B', fontFamily: 'var(--font-outfit), sans-serif' }}
            >
              {pillar.body}
            </p>

            {/* Points */}
            <ul className="flex flex-col gap-2.5 mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {pillar.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-xs"
                  style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit), sans-serif' }}
                >
                  <span
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    →
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
