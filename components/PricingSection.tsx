const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'For experimentation and small projects.',
    features: [
      '10 identities/month',
      'Unlimited email receives',
      'Unlimited SMS receives',
      'Full API access',
      'Community support',
    ],
    cta: 'Get Started',
    ctaHref: '/dashboard',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$50',
    period: '/month',
    description: 'For teams shipping agents in production.',
    features: [
      'Unlimited identities',
      'Unlimited email receives',
      'Unlimited SMS receives',
      'Priority support',
      'Advanced analytics',
    ],
    cta: 'Start Free Trial',
    ctaHref: '/dashboard',
    highlight: true,
  },
]

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="w-full max-w-[1200px] mx-auto px-6 lg:px-0 pb-24"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <p
          className="text-xs uppercase tracking-[0.2em] mb-3"
          style={{ color: '#00F0FF', fontFamily: 'var(--font-syncopate), sans-serif' }}
        >
          Pricing
        </p>
        <h2
          className="text-2xl lg:text-3xl font-bold text-white uppercase mb-3"
          style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
        >
          Simple, Transparent Pricing
        </h2>
        <p
          className="text-sm"
          style={{ color: '#64748B', fontFamily: 'var(--font-outfit), sans-serif' }}
        >
          No surprises. Pay for what you use. Upgrade anytime.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="glass-panel p-8 flex flex-col gap-6"
            style={plan.highlight ? { borderColor: 'rgba(0, 240, 255, 0.3)', boxShadow: '0 0 32px rgba(0, 240, 255, 0.06)' } : {}}
          >
            {/* Plan name + price */}
            <div className="flex flex-col gap-1">
              {plan.highlight && (
                <span
                  className="text-[10px] uppercase tracking-widest mb-2 self-start px-2 py-0.5 rounded"
                  style={{
                    color: '#00F0FF',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    background: 'rgba(0, 240, 255, 0.06)',
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                  }}
                >
                  Popular
                </span>
              )}
              <h3
                className="text-lg font-bold uppercase"
                style={{ color: '#E2E8F0', fontFamily: 'var(--font-syncopate), sans-serif' }}
              >
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span
                  className="text-4xl font-bold tabular-nums"
                  style={{ color: plan.highlight ? '#00F0FF' : '#E2E8F0', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  {plan.price}
                </span>
                <span className="text-sm" style={{ color: '#475569', fontFamily: 'var(--font-outfit), sans-serif' }}>
                  {plan.period}
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: '#475569', fontFamily: 'var(--font-outfit), sans-serif' }}>
                {plan.description}
              </p>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2.5 flex-1">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: '#94a3b8', fontFamily: 'var(--font-outfit), sans-serif' }}
                >
                  <span style={{ color: '#39FF14', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12 }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={plan.ctaHref}
              className={plan.highlight ? 'btn-cyber flex items-center justify-center text-sm' : undefined}
              style={
                plan.highlight
                  ? { height: 44 }
                  : {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 44,
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 4,
                      fontSize: 14,
                      color: '#94a3b8',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-outfit), sans-serif',
                    }
              }
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
