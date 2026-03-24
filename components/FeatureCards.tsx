const items = [
  { icon: 'badge',              label: 'Legal Name',          detail: 'First, middle & last name' },
  { icon: 'cake',               label: 'Date of Birth',        detail: 'Verifiable DOB' },
  { icon: 'location_on',        label: 'Place of Birth',       detail: 'City & country of origin' },
  { icon: 'mail',               label: 'Email Address',        detail: 'Working inbox included' },
  { icon: 'phone',              label: 'Phone Number',         detail: '+1 number with SMS' },
  { icon: 'home',               label: 'Mailing Address',      detail: 'Physical address on record' },
  { icon: 'account_balance',    label: 'Bank Account',         detail: 'Sort code & account number' },
  { icon: 'credit_card',        label: 'Debit Card',           detail: 'Virtual card with CVV' },
  { icon: 'language',           label: 'Nationality',          detail: 'Country & citizenship record' },
  { icon: 'fingerprint',        label: 'Government ID',        detail: 'Passport / national ID number' },
]

export default function FeatureCards() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 lg:px-0 pb-16">
      {/* Section header */}
      <div className="text-center mb-12">
        <p
          className="text-xs uppercase tracking-[0.2em] mb-3"
          style={{ color: '#00F0FF', fontFamily: 'var(--font-syncopate), sans-serif' }}
        >
          What your agent receives
        </p>
        <h2
          className="text-2xl lg:text-3xl font-bold text-white uppercase"
          style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
        >
          A Full Identity. Ready to Deploy.
        </h2>
      </div>

      {/* Identity items grid */}
      <div className="glass-panel p-8 lg:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {items.map((item) => (
            <div
              key={item.label}
              className="feature-item flex items-center gap-4 py-4 px-4"
            >
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.12)' }}
              >
                <span className="material-symbols-outlined text-base" style={{ color: '#00F0FF', fontSize: 18 }}>
                  {item.icon}
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className="text-sm font-medium text-white"
                  style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                >
                  {item.label}
                </span>
                <span
                  className="text-xs"
                  style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  {item.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
