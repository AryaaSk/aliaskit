import Link from 'next/link'

function Heading1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="text-3xl font-bold mb-2"
      style={{ color: '#E2E8F0', fontFamily: 'var(--font-syncopate), sans-serif' }}
    >
      {children}
    </h1>
  )
}

function Heading2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-xl font-bold mt-10 mb-4"
      style={{ color: '#E2E8F0', fontFamily: 'var(--font-syncopate), sans-serif' }}
    >
      {children}
    </h2>
  )
}

function Heading3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-base font-semibold mt-6 mb-2"
      style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
    >
      {children}
    </h3>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed mb-4" style={{ color: '#94A3B8' }}>
      {children}
    </p>
  )
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="px-1.5 py-0.5 rounded text-xs"
      style={{
        background: 'rgba(0, 240, 255, 0.08)',
        color: '#00F0FF',
        fontFamily: 'var(--font-jetbrains-mono), monospace',
      }}
    >
      {children}
    </code>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg px-4 py-3 mb-6 text-sm"
      style={{
        background: 'rgba(0, 240, 255, 0.05)',
        border: '1px solid rgba(0, 240, 255, 0.15)',
        color: '#94A3B8',
        fontFamily: 'var(--font-jetbrains-mono), monospace',
      }}
    >
      {children}
    </div>
  )
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-6 ml-4" style={{ color: '#94A3B8' }}>
      {items.map((item, idx) => (
        <li key={idx} className="mb-2 text-sm leading-relaxed">
          <span style={{ color: '#00F0FF', marginRight: '8px' }}>•</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function ConceptsPage() {
  return (
    <article>
      <Heading1>Concepts & Architecture</Heading1>
      <P>
        Understand the core ideas behind AliasKit and how the system works end-to-end.
      </P>

      {/* ── What is an Identity ── */}
      <Heading2 id="what-is-identity">What is an Identity?</Heading2>
      <P>
        An <strong>identity</strong> is a complete digital persona that an AI agent can use to operate independently on the internet.
        One identity includes:
      </P>
      <BulletList
        items={[
          <><strong>Name</strong> — a realistic human name (auto-generated or provided)</>,
          <><strong>Email address</strong> — a dedicated inbox (e.g., jordan.riley@aliaskit.com)</>,
          <><strong>Phone number</strong> (optional) — a real phone number for SMS verification</>,
        ]}
      />
      <P>
        When you create an identity, all three components are provisioned in seconds. The identity is then ready to sign up for services,
        receive verification codes, and communicate autonomously.
      </P>
      <Note>
        Identities are isolated per API key. If you want separate identities for different agents or use cases, create separate API keys.
      </Note>

      {/* ── Email Inbox ── */}
      <Heading2 id="email-inbox">Email Inbox</Heading2>
      <P>
        Each identity has a dedicated email inbox. Incoming emails are automatically captured and stored.
      </P>
      <Heading3>How email works</Heading3>
      <BulletList
        items={[
          <>Email arrives at your identity&apos;s address (e.g., jordan.riley@aliaskit.com)</>,
          <>Cloudflare Email Workers catch the incoming mail at the MX record level</>,
          <>The worker forwards it to AliasKit&apos;s API, which parses and stores the message in the database</>,
          <>Your app polls the email list endpoint to retrieve messages and extract verification codes</>,
        ]}
      />
      <P>
        Emails are stored indefinitely and can be marked as read or deleted. The inbox supports pagination
        and filtering (e.g., unread messages only).
      </P>
      <Heading3>Sending email</Heading3>
      <P>
        You can also send emails <strong>from</strong> the identity&apos;s provisioned address. Outbound emails are sent via Resend,
        which ensures good deliverability and reputation. All outbound mail is logged for your records.
      </P>

      {/* ── Phone & SMS ── */}
      <Heading2 id="phone-sms">Phone Numbers & SMS</Heading2>
      <P>
        When you enable phone provisioning on an identity, AliasKit purchases a real phone number from Plivo.
        The number is dedicated to that identity.
      </P>
      <Heading3>How SMS works</Heading3>
      <BulletList
        items={[
          <>An SMS arrives at the provisioned phone number</>,
          <>Plivo&apos;s webhook notifies AliasKit&apos;s API of the incoming message</>,
          <>The API parses and stores the SMS in the database, linked to the identity</>,
          <>Your app polls the SMS list endpoint to retrieve messages</>,
        ]}
      />
      <P>
        Inbound SMS is fully supported. Outbound SMS (sending messages from the identity) is a planned feature.
      </P>
      <Note>
        Phone numbers are real numbers managed by Plivo. When you delete an identity, the number is released back to the pool
        and may be reassigned after a waiting period.
      </Note>

      {/* ── API Keys & Auth ── */}
      <Heading2 id="api-keys-auth">API Keys & Authentication</Heading2>
      <P>
        All requests to AliasKit must include an API key in the <InlineCode>Authorization</InlineCode> header.
        API keys can be created, revoked, and managed through the dashboard.
      </P>
      <Heading3>Key properties</Heading3>
      <BulletList
        items={[
          <><strong>Key prefix</strong> — first 8 characters (e.g., ak_live_ab...) for identification</>,
          <><strong>Scopes</strong> — permissions (e.g., identities:read, identities:write, messages:read)</>,
          <><strong>Rate limit</strong> — requests per minute (configurable per key)</>,
        ]}
      />
      <P>
        Keys are bcrypt-hashed in the database and only shown once upon creation. Store them securely in environment variables.
      </P>

      {/* ── Data Isolation ── */}
      <Heading2 id="data-isolation">Data Isolation</Heading2>
      <P>
        All identities and messages created with a given API key are isolated to that key. One API key cannot access
        identities or messages created by another API key.
      </P>
      <P>
        This isolation model supports multi-agent workflows:
      </P>
      <BulletList
        items={[
          <>Each agent gets its own API key</>,
          <>Agents can create and manage their own identities</>,
          <>No agent can see another agent&apos;s data</>,
          <>The parent system can manage all agents with a master API key</>,
        ]}
      />

      {/* ── Metadata & Use Cases ── */}
      <Heading2 id="metadata">Metadata & Tagging</Heading2>
      <P>
        Each identity can store arbitrary metadata (a JSON object) for tracking context and classification.
      </P>
      <Heading3>Common use cases</Heading3>
      <BulletList
        items={[
          <><strong>Agent framework</strong> — e.g., &quot;openclaw&quot; or &quot;custom&quot; for agent tracking</>,
          <><strong>Purpose</strong> — e.g., &quot;github-signup&quot; or &quot;email-verification-test&quot;</>,
          <><strong>Campaign</strong> — e.g., &quot;spring-launch&quot; or &quot;beta-cohort-2&quot;</>,
          <><strong>External ID</strong> — link to an identity in your own system</>,
        ]}
      />
      <P>
        Metadata is fully mutable and can be updated at any time using the <InlineCode>PATCH /v1/identities/:id</InlineCode> endpoint.
      </P>

      {/* ── Status Lifecycle ── */}
      <Heading2 id="status-lifecycle">Identity Status Lifecycle</Heading2>
      <P>
        Identities have a status field that tracks their current state:
      </P>
      <BulletList
        items={[
          <><strong>active</strong> — identity is fully functional, can send/receive emails and SMS</>,
          <><strong>suspended</strong> — identity is temporarily disabled, emails and SMS are not processed</>,
          <><strong>deleted</strong> — identity is permanently removed, resources are released</>,
        ]}
      />
      <P>
        To deactivate an identity, send a <InlineCode>DELETE</InlineCode> request. The identity will be marked as deleted,
        and its phone number (if provisioned) will be released.
      </P>

      {/* ── Rate Limiting ── */}
      <Heading2 id="rate-limiting">Rate Limiting</Heading2>
      <P>
        Each API key has a configurable rate limit (requests per minute). When you exceed the limit, the API returns
        a <InlineCode>429 Too Many Requests</InlineCode> error.
      </P>
      <P>
        Rate limits are applied per key, not per IP. If you need a higher limit, contact support or upgrade your plan.
      </P>

      <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(0, 240, 255, 0.07)' }}>
        <div className="flex gap-4 text-sm">
          <Link
            href="/docs"
            style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            ← Quickstart
          </Link>
          <span style={{ color: '#64748B' }}>•</span>
          <Link
            href="/docs/api-reference"
            style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            API Reference →
          </Link>
        </div>
      </div>
    </article>
  )
}
