const pillars = [
  {
    icon: 'verified_user',
    title: 'Identity Infrastructure',
    body: 'Agents are independent entities, not compute extensions. Real identity unlocks real trust and real capabilities: service signups, account recovery, contract negotiation.',
    points: [
      'Verified agent identity (name, email, phone)',
      'Real email address (receive + send)',
      'Real phone number (receive SMS)',
      'Metadata for tracking agent context',
    ],
  },
  {
    icon: 'terminal',
    title: 'Ship Identity in Minutes',
    body: 'Provision a complete agent identity faster than debugging SMTP. 30 lines of code. One REST call. Works everywhere — Node, Deno, Bun, browsers. Zero dependencies.',
    points: [
      'No KYC forms or verification delays',
      'No SMTP config or phone routing expertise',
      'SDK works in all runtimes',
      'REST API for custom integrations',
    ],
  },
  {
    icon: 'inventory_2',
    title: 'One Provider, One Bill',
    body: 'Email + phone together, at a price point that makes bundling more valuable than the components. Free tier: 10 identities/month. Pro: unlimited at $50/mo.',
    points: [
      'No vendor fragmentation (Twilio + SendGrid)',
      '10x cheaper than enterprise services',
      'Free tier for experimentation',
      'Transparent pricing, no hidden fees',
    ],
  },
]

export default function FeatureCards() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 lg:px-0 pb-20">
      {/* Section header */}
      <div className="text-center mb-12">
        <p
          className="text-xs uppercase tracking-[0.2em] mb-3"
          style={{ color: '#00F0FF', fontFamily: 'var(--font-syncopate), sans-serif' }}
        >
          Why AliasKit
        </p>
        <h2
          className="text-2xl lg:text-3xl font-bold text-white uppercase"
          style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
        >
          Built for Autonomous Agents.
        </h2>
      </div>

      {/* 3-pillar grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="glass-panel p-6 lg:p-8 flex flex-col gap-4"
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.12)' }}
            >
              <span className="material-symbols-outlined" style={{ color: '#00F0FF', fontSize: 20 }}>
                {pillar.icon}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-base font-bold text-white uppercase"
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
            <ul className="flex flex-col gap-2 mt-auto pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {pillar.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-xs"
                  style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit), sans-serif' }}
                >
                  <span style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>→</span>
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
