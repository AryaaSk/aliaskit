import React from 'react'

type Tag = {
  icon: string
  label: string
  value: string
  delay: string
  pos: React.CSSProperties
}

const cornerTags: Tag[] = [
  {
    icon: 'badge',
    label: 'Legal Name',
    value: 'James A. Mitchell',
    delay: '0s',
    pos: { top: 10, left: 0 },
  },
  {
    icon: 'mail',
    label: 'Email',
    value: 'j.mitchell@proton.me',
    delay: '1.1s',
    pos: { top: 10, right: 0 },
  },
  {
    icon: 'phone',
    label: 'Phone',
    value: '+1 (555) 347-8821',
    delay: '1.65s',
    pos: { top: 330, left: 0 },
  },
  {
    icon: 'fingerprint',
    label: 'Gov. ID',
    value: 'Passport / NID',
    delay: '0.55s',
    pos: { top: 320, right: 0 },
  },
]

export default function IdentityVisual() {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: 440, height: 560 }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 40%, rgba(0,240,255,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Central silhouette — neck connects to body via unified path */}
      <div
        className="absolute identity-silhouette"
        style={{ left: '50%', top: 88, transform: 'translateX(-50%)' }}
      >
        {/* Scan sweep */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ borderRadius: 4 }}
        >
          <div className="scan-sweep-line" />
        </div>

        <svg
          viewBox="0 0 130 190"
          width={130}
          height={190}
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <defs>
            <filter id="fig-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="fig-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Head */}
          <circle
            cx="65" cy="38" r="28"
            stroke="url(#fig-grad)" strokeWidth="1.5"
            fill="rgba(0,240,255,0.04)"
            filter="url(#fig-glow)"
          />
          {/* Inner dashed ring */}
          <circle
            cx="65" cy="38" r="20"
            stroke="rgba(0,240,255,0.12)" strokeWidth="0.75"
            fill="none" strokeDasharray="4 6"
          />
          {/* Centre dot */}
          <circle cx="65" cy="38" r="3" fill="rgba(0,240,255,0.55)" />

          {/*
            Unified neck + shoulders + torso path.
            Head bottom is at y=66. Path starts/ends at y=66 so it
            connects directly to the head circle with no gap.
          */}
          <path
            d="M53 66 L53 80 Q50 93 40 103 C20 120 8 150 8 188 L122 188 C122 150 110 120 90 103 Q80 93 77 80 L77 66"
            stroke="url(#fig-grad)" strokeWidth="1.5"
            fill="rgba(0,240,255,0.025)"
            filter="url(#fig-glow)"
          />

          {/* Collarbone detail */}
          <path
            d="M40 103 Q65 111 90 103"
            stroke="rgba(0,240,255,0.28)" strokeWidth="1" fill="none"
          />

          {/* Biometric chest scan lines */}
          <line x1="22" y1="132" x2="108" y2="132" stroke="rgba(0,240,255,0.12)" strokeWidth="0.6" />
          <line x1="15" y1="148" x2="115" y2="148" stroke="rgba(0,240,255,0.09)" strokeWidth="0.6" />
          <line x1="11" y1="164" x2="119" y2="164" stroke="rgba(0,240,255,0.06)" strokeWidth="0.6" />
        </svg>
      </div>

      {/* Corner tags */}
      {cornerTags.map((tag) => (
        <div
          key={tag.label}
          className="identity-tag"
          style={{
            ...tag.pos,
            animation: `tag-float 3.2s ease-in-out infinite ${tag.delay}`,
          }}
        >
          <div className="flex items-center gap-2 px-3 pt-2.5 pb-0.5">
            <span
              className="material-symbols-outlined"
              style={{ color: '#00F0FF', fontSize: 14, lineHeight: 1 }}
            >
              {tag.icon}
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              {tag.label}
            </span>
          </div>
          <div className="px-3 pb-2.5">
            <span
              className="text-[11px]"
              style={{ color: '#94a3b8', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              {tag.value}
            </span>
          </div>
        </div>
      ))}

      {/*
        Virtual Debit Card — centred with a flex wrapper so the
        tag-float animation (which uses transform: translateY) does not
        clobber the translateX(-50%) trick.
      */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          animation: 'tag-float 3.2s ease-in-out infinite 1.3s',
        }}
      >
        <div
          style={{
            width: 272,
            background:
              'linear-gradient(135deg, rgba(0,240,255,0.07) 0%, rgba(7,14,30,0.94) 55%, rgba(0,240,255,0.04) 100%)',
            border: '1px solid rgba(0,240,255,0.22)',
            borderRadius: 10,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '13px 15px 12px',
            boxShadow: '0 6px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,240,255,0.07)',
          }}
        >
          {/* Row 1: tag-style label + chip */}
          <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined"
                style={{ color: '#00F0FF', fontSize: 14, lineHeight: 1 }}
              >
                credit_card
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                Bank Account
              </span>
            </div>
            {/* EMV chip */}
            <svg width="24" height="18" viewBox="0 0 24 18" style={{ display: 'block' }}>
              <rect x="0.5" y="0.5" width="23" height="17" rx="2.5" fill="rgba(0,240,255,0.1)" stroke="rgba(0,240,255,0.35)" strokeWidth="0.8" />
              <line x1="8" y1="0.5" x2="8" y2="17.5" stroke="rgba(0,240,255,0.25)" strokeWidth="0.6" />
              <line x1="16" y1="0.5" x2="16" y2="17.5" stroke="rgba(0,240,255,0.25)" strokeWidth="0.6" />
              <line x1="0.5" y1="6" x2="23.5" y2="6" stroke="rgba(0,240,255,0.25)" strokeWidth="0.6" />
              <line x1="0.5" y1="12" x2="23.5" y2="12" stroke="rgba(0,240,255,0.25)" strokeWidth="0.6" />
            </svg>
          </div>

          {/* Card number */}
          <div
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 13.5,
              letterSpacing: '0.18em',
              color: '#E2E8F0',
              marginBottom: 11,
            }}
          >
            4782&nbsp;&nbsp;3901&nbsp;&nbsp;6547&nbsp;&nbsp;8492
          </div>

          {/* Row 3: holder / expiry / CVV */}
          <div className="flex items-end justify-between">
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 7.5,
                  color: '#64748B',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 2,
                }}
              >
                Card Holder
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 10,
                  color: '#94a3b8',
                }}
              >
                J. MITCHELL
              </div>
            </div>
            <div className="text-right">
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 7.5,
                  color: '#64748B',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 2,
                }}
              >
                Expires
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 10,
                  color: '#94a3b8',
                }}
              >
                09 / 28
              </div>
            </div>
            <div className="text-right">
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 7.5,
                  color: '#64748B',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 2,
                }}
              >
                CVV
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 10,
                  color: '#94a3b8',
                }}
              >
                •••
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner bracket decorations */}
      <svg className="absolute top-0 left-0 pointer-events-none" width={28} height={28} viewBox="0 0 28 28">
        <path d="M2 14 L2 2 L14 2" stroke="rgba(0,240,255,0.35)" strokeWidth="1.5" fill="none" />
      </svg>
      <svg className="absolute top-0 right-0 pointer-events-none" width={28} height={28} viewBox="0 0 28 28">
        <path d="M26 14 L26 2 L14 2" stroke="rgba(0,240,255,0.35)" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}
