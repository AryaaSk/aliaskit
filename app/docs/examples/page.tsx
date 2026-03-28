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

function CodeBlock({ children, language = 'typescript' }: { children: string; language?: string }) {
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

export default function ExamplesPage() {
  return (
    <article>
      <Heading1>Examples & Use Cases</Heading1>
      <P>
        Real-world patterns for using AliasKit to build AI agents that operate autonomously on the internet.
      </P>

      {/* ── Autonomous Service Signup ── */}
      <Heading2 id="autonomous-signup">Autonomous Service Signup</Heading2>
      <P>
        Create a disposable identity, sign up for a service, receive and verify an email confirmation, then clean up.
      </P>
      <CodeBlock language="typescript">{`
import { AliasKit } from '@aliaskit/sdk'

const ak = new AliasKit({
  apiKey: process.env.ALIASKIT_API_KEY!,
})

async function signupForNewsletter(targetUrl) {
  // 1. Create a fresh identity
  const identity = await ak.identities.create({
    metadata: { purpose: 'newsletter-signup', target: targetUrl },
  })
  console.log(\`Created identity: \${identity.email}\`)

  // 2. POST to signup form
  const response = await fetch(\`\${targetUrl}/api/subscribe\`, {
    method: 'POST',
    body: JSON.stringify({ email: identity.email }),
  })

  // 3. Poll for confirmation email
  let confirmed = false
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000)) // 2-second intervals

    const emails = await ak.identities.emails(identity.id, {
      limit: 5,
    })

    const confirmation = emails.data.find(e =>
      e.subject.includes('confirm') || e.body_text?.includes('confirm')
    )

    if (confirmation) {
      console.log('Confirmation received:', confirmation.subject)
      confirmed = true
      break
    }
  }

  // 4. Clean up
  await ak.identities.delete(identity.id)
  console.log('Identity deleted')

  return confirmed
}

// Usage
await signupForNewsletter('https://example.com')
      `}</CodeBlock>

      {/* ── Multi-Channel Verification ── */}
      <Heading2 id="multi-channel-verification">Multi-Channel Verification Testing</Heading2>
      <P>
        Create an identity with both email and phone, then verify both channels receive their codes.
      </P>
      <CodeBlock language="typescript">{`
async function testMultiChannelVerification(platform) {
  const identity = await ak.identities.create({
    provision_phone: true,
    metadata: { purpose: 'verification-test', platform },
  })

  console.log(\`Testing \${platform}\`)
  console.log(\`  Email: \${identity.email}\`)
  console.log(\`  Phone: \${identity.phone_number}\`)

  // Trigger signup (sends verification codes to both channels)
  await fetch(\`https://\${platform}/api/signup\`, {
    method: 'POST',
    body: JSON.stringify({
      email: identity.email,
      phone: identity.phone_number,
    }),
  })

  // Wait for both messages
  const emailPromise = waitForEmail(ak, identity.id, 'code')
  const smsPromise = waitForSms(ak, identity.id, 'code')

  const [emailCode, smsCode] = await Promise.race([
    Promise.all([emailPromise, smsPromise]),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 60000)
    ),
  ])

  console.log(\`  Email code: \${emailCode}\`)
  console.log(\`  SMS code: \${smsCode}\`)

  await ak.identities.delete(identity.id)
  return { emailCode, smsCode, success: true }
}

async function waitForEmail(ak, identityId, pattern) {
  for (let i = 0; i < 30; i++) {
    const emails = await ak.identities.emails(identityId)
    for (const email of emails.data) {
      const match = email.body_text?.match(new RegExp(pattern + ': (\\\\d+)'))
      if (match) return match[1]
    }
    await new Promise(r => setTimeout(r, 2000))
  }
  throw new Error('Email not received')
}

async function waitForSms(ak, identityId, pattern) {
  for (let i = 0; i < 30; i++) {
    const messages = await ak.identities.sms(identityId)
    for (const sms of messages.data) {
      const match = sms.body.match(new RegExp(pattern + ': (\\\\d+)'))
      if (match) return match[1]
    }
    await new Promise(r => setTimeout(r, 2000))
  }
  throw new Error('SMS not received')
}
      `}</CodeBlock>

      {/* ── Identity Pool Management ── */}
      <Heading2 id="identity-pool">Maintaining a Pool of Reusable Identities</Heading2>
      <P>
        Create and manage a pool of identities for repeated use across different workflows.
      </P>
      <CodeBlock language="typescript">{`
class IdentityPool {
  constructor(ak, poolSize = 10) {
    this.ak = ak
    this.poolSize = poolSize
    this.available = []
    this.inUse = new Map()
  }

  async initialize() {
    for (let i = 0; i < this.poolSize; i++) {
      const identity = await this.ak.identities.create({
        metadata: { pool: true, status: 'available' },
      })
      this.available.push(identity)
    }
    console.log(\`Pool initialized with \${this.poolSize} identities\`)
  }

  async acquire() {
    if (this.available.length === 0) {
      throw new Error('No identities available in pool')
    }

    const identity = this.available.pop()!
    const token = Math.random().toString(36)
    this.inUse.set(token, identity)

    return { identity, token }
  }

  async release(token) {
    const identity = this.inUse.get(token)
    if (!identity) {
      throw new Error('Invalid token')
    }

    // Clear inbox for reuse
    const emails = await this.ak.identities.emails(identity.id, {
      limit: 100,
    })
    for (const email of emails.data) {
      await this.ak.identities.deleteEmail(identity.id, email.id)
    }

    const sms = await this.ak.identities.sms(identity.id, { limit: 100 })
    for (const message of sms.data) {
      await this.ak.identities.deleteSms(identity.id, message.id)
    }

    this.inUse.delete(token)
    this.available.push(identity)
  }

  async cleanup() {
    for (const identity of [...this.available, ...this.inUse.values()]) {
      await this.ak.identities.delete(identity.id)
    }
  }
}

// Usage
const pool = new IdentityPool(ak, 20)
await pool.initialize()

const { identity, token } = await pool.acquire()
try {
  // Use identity...
} finally {
  await pool.release(token)
}

await pool.cleanup()
      `}</CodeBlock>

      {/* ── Batch Operations ── */}
      <Heading2 id="batch-operations">Batch Identity Operations</Heading2>
      <P>
        Create multiple identities in parallel and aggregate results.
      </P>
      <CodeBlock language="typescript">{`
async function createIdentitiesBatch(count) {
  const promises = Array(count)
    .fill(null)
    .map(() =>
      ak.identities.create({
        provision_phone: true,
        metadata: { batch: true },
      })
    )

  const identities = await Promise.all(promises)
  return identities.map(i => ({
    id: i.id,
    email: i.email,
    phone: i.phone_number,
  }))
}

// Create 50 identities
const batch = await createIdentitiesBatch(50)
console.log(\`Created \${batch.length} identities\`)
batch.forEach(i => console.log(\`  \${i.email}\`))
      `}</CodeBlock>

      {/* ── Monitoring & Logging ── */}
      <Heading2 id="monitoring">Monitoring & Logging Activities</Heading2>
      <P>
        Track identity creation and usage for observability.
      </P>
      <CodeBlock language="typescript">{`
class AliasKitLogger {
  constructor(ak) {
    this.ak = ak
    this.metrics = {
      identitiesCreated: 0,
      emailsSent: 0,
      emailsReceived: 0,
      smsReceived: 0,
    }
  }

  async createIdentity(opts) {
    const identity = await this.ak.identities.create(opts)
    this.metrics.identitiesCreated++
    console.log(
      JSON.stringify({
        event: 'identity_created',
        id: identity.id,
        email: identity.email,
        timestamp: new Date().toISOString(),
      })
    )
    return identity
  }

  async sendEmail(identityId, emailData) {
    const result = await this.ak.identities.sendEmail(identityId, emailData)
    this.metrics.emailsSent++
    console.log(
      JSON.stringify({
        event: 'email_sent',
        from: emailData.to,
        subject: emailData.subject,
        timestamp: new Date().toISOString(),
      })
    )
    return result
  }

  async pollEmails(identityId) {
    const emails = await this.ak.identities.emails(identityId)
    const newCount = emails.data.filter(e => !e.read).length
    if (newCount > 0) {
      this.metrics.emailsReceived += newCount
      console.log(
        JSON.stringify({
          event: 'emails_received',
          count: newCount,
          timestamp: new Date().toISOString(),
        })
      )
    }
    return emails
  }

  getMetrics() {
    return this.metrics
  }
}

const logger = new AliasKitLogger(ak)
const identity = await logger.createIdentity({ provision_phone: true })
await logger.sendEmail(identity.id, {
  to: 'test@example.com',
  subject: 'Test',
  body_text: 'Hello',
})
console.log('Metrics:', logger.getMetrics())
      `}</CodeBlock>

      <Note>
        For production use, integrate with your observability platform (Datadog, New Relic, Prometheus, etc.)
        to track these metrics alongside your other application metrics.
      </Note>

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
