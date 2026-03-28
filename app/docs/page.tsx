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

function CodeBlock({ children, language = 'bash' }: { children: string; language?: string }) {
  return (
    <pre
      className="rounded-lg p-4 text-sm overflow-x-auto mb-6"
      style={{
        background: 'rgba(11, 18, 33, 0.9)',
        border: '1px solid rgba(0, 240, 255, 0.1)',
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        color: '#E2E8F0',
      }}
    >
      <code>{children.trim()}</code>
    </pre>
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

export default function QuickstartPage() {
  return (
    <article>
      <Heading1>Quickstart</Heading1>
      <P>
        Get your first AI agent identity — with a provisioned email inbox and phone number — in under two minutes.
      </P>

      <Heading2 id="install">1. Install the SDK</Heading2>
      <CodeBlock language="bash">{`npm install @aliaskit/sdk`}</CodeBlock>
      <P>
        The SDK has zero dependencies and works in Node 18+, Bun, Deno, and modern browsers.
        It uses native <InlineCode>fetch</InlineCode> — no polyfills needed for Node 18+.
      </P>

      <Heading2 id="api-key">2. Get an API key</Heading2>
      <P>
        Log in to the <Link href="/dashboard/api-keys" style={{ color: '#00F0FF' }}>dashboard</Link> and
        create an API key. Copy the key — it starts with <InlineCode>ak_live_</InlineCode> and is only shown once.
      </P>
      <CodeBlock language="bash">{`export ALIASKIT_API_KEY="ak_live_..."`}</CodeBlock>

      <Heading2 id="create-identity">3. Create an identity</Heading2>
      <P>
        One call creates a complete digital identity: a generated human name, a provisioned email inbox,
        and optionally a phone number.
      </P>
      <CodeBlock language="typescript">{`
import { AliasKit } from '@aliaskit/sdk'

const ak = new AliasKit({
  apiKey: process.env.ALIASKIT_API_KEY!,
  baseUrl: 'https://aliaskit.com/api/v1',  // or your self-hosted URL
})

// Create identity with email + phone
const identity = await ak.identities.create({
  provision_phone: true,
  metadata: { purpose: 'github-signup' },
})

console.log(identity.name)          // "Jordan Riley"
console.log(identity.email)         // "jordan.riley@aliaskit.to"
console.log(identity.phone_number)  // "+12025551234"
      `}</CodeBlock>

      <Note>
        Phone provisioning is optional. Omit <InlineCode>provision_phone</InlineCode> (or set it to <InlineCode>false</InlineCode>) to create an email-only identity.
      </Note>

      <Heading2 id="read-inbox">4. Read the inbox</Heading2>
      <P>
        After the identity receives emails or SMS messages, poll the inbox endpoints to read them.
      </P>

      <Heading3>Email</Heading3>
      <CodeBlock language="typescript">{`
// List unread emails
const emails = await ak.identities.emails(identity.id, { limit: 10 })

for (const email of emails.data) {
  console.log(email.from, email.subject)

  // Extract a verification code from the body
  const code = email.body_text?.match(/\\d{6}/)?.[0]
  if (code) console.log('Code:', code)
}
      `}</CodeBlock>

      <Heading3>SMS</Heading3>
      <CodeBlock language="typescript">{`
// List SMS messages
const messages = await ak.identities.sms(identity.id, { limit: 10 })

for (const sms of messages.data) {
  console.log(sms.from, sms.body)

  const code = sms.body.match(/\\d{6}/)?.[0]
  if (code) console.log('SMS code:', code)
}
      `}</CodeBlock>

      <Heading2 id="send-email">5. Send an email</Heading2>
      <CodeBlock language="typescript">{`
await ak.identities.sendEmail(identity.id, {
  to: 'support@example.com',
  subject: 'Account inquiry',
  body_text: 'Hi, I need help with my account.',
})
      `}</CodeBlock>

      <Heading2 id="cleanup">6. Clean up</Heading2>
      <P>
        Deleting an identity releases the phone number back to the pool and stops routing
        emails for that inbox.
      </P>
      <CodeBlock language="typescript">{`
await ak.identities.delete(identity.id)
      `}</CodeBlock>

      <Heading2 id="full-example">Full example</Heading2>
      <P>Sign up for a service, receive a verification code, and clean up — all autonomously.</P>
      <CodeBlock language="typescript">{`
import { AliasKit } from '@aliaskit/sdk'

const ak = new AliasKit({
  apiKey: process.env.ALIASKIT_API_KEY!,
  baseUrl: 'https://aliaskit.com/api/v1',
})

async function autonomousSignup() {
  // 1. Provision identity
  const identity = await ak.identities.create({
    provision_phone: true,
    metadata: { purpose: 'demo' },
  })
  console.log('Identity:', identity.email, identity.phone_number)

  // 2. ... use identity.email to sign up for a service ...

  // 3. Wait for verification email (poll with back-off in production)
  await new Promise(r => setTimeout(r, 5000))
  const emails = await ak.identities.emails(identity.id, { limit: 5 })
  const code = emails.data[0]?.body_text?.match(/\\d{6}/)?.[0]
  console.log('Email verification code:', code)

  // 4. Clean up when done
  await ak.identities.delete(identity.id)
}

autonomousSignup()
      `}</CodeBlock>

      <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(0, 240, 255, 0.07)' }}>
        <Link
          href="/docs/api-reference"
          className="text-sm"
          style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          API Reference →
        </Link>
      </div>
    </article>
  )
}
