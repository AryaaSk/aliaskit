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

function CodeBlock({ children, language = 'json' }: { children: string; language?: string }) {
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

function ErrorCard({
  code,
  status,
  description,
  cause,
  solution,
}: {
  code: string
  status: number
  description: string
  cause: string
  solution: string
}) {
  return (
    <div
      className="rounded-lg p-4 mb-6"
      style={{
        background: 'rgba(11, 18, 33, 0.6)',
        border: '1px solid rgba(0, 240, 255, 0.1)',
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap"
          style={{
            background: '#FF0055',
            color: '#fff',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
          }}
        >
          {status}
        </div>
        <code
          className="text-sm flex-1"
          style={{
            color: '#E2E8F0',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
          }}
        >
          {code}
        </code>
      </div>
      <p className="text-xs mb-2" style={{ color: '#94A3B8' }}>
        {description}
      </p>
      <div className="text-xs mb-2">
        <span style={{ color: '#64748B' }}>Cause: </span>
        <span style={{ color: '#94A3B8' }}>{cause}</span>
      </div>
      <div className="text-xs">
        <span style={{ color: '#64748B' }}>Fix: </span>
        <span style={{ color: '#94A3B8' }}>{solution}</span>
      </div>
    </div>
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

export default function ErrorsPage() {
  return (
    <article>
      <Heading1>Error Handling</Heading1>
      <P>
        AliasKit returns standard HTTP status codes and JSON error responses. All errors include an <InlineCode>error</InlineCode> message
        and an optional <InlineCode>code</InlineCode> field for programmatic handling.
      </P>

      <Heading2>Error Response Format</Heading2>
      <P>Every error response follows this structure:</P>
      <CodeBlock language="json">{`
{
  "error": "Identity not found",
  "code": "not_found"
}
      `}</CodeBlock>

      <Heading2>Client Error Responses (4xx)</Heading2>

      <ErrorCard
        status={400}
        code="bad_request"
        description="Request body is invalid or missing required fields."
        cause="Malformed JSON, missing required fields, or invalid field values."
        solution="Check the request body against the API reference. Ensure all required fields are present and have the correct type."
      />

      <ErrorCard
        status={400}
        code="invalid_email_format"
        description="Email address or email domain is invalid."
        cause="The provided email_username or email_domain does not match expected format."
        solution="Ensure the email_username is alphanumeric and the email_domain is a valid domain."
      />

      <ErrorCard
        status={400}
        code="invalid_country_code"
        description="Phone country code is not recognized."
        cause="The provided phone_country code is not a valid ISO 3166-1 alpha-2 code (e.g., 'US', 'GB', 'CA')."
        solution="Use a valid ISO country code. See the API reference for allowed values."
      />

      <ErrorCard
        status={401}
        code="unauthorized"
        description="API key is missing, invalid, or revoked."
        cause="Authorization header is missing, malformed, or the key does not exist."
        solution="Include a valid API key in the Authorization header: Authorization: Bearer ak_live_..."
      />

      <ErrorCard
        status={403}
        code="forbidden"
        description="API key lacks the required scope for this operation."
        cause="The API key does not have permission for the requested action (e.g., missing identities:write scope)."
        solution="Create a new API key with the required scopes or contact support to upgrade permissions."
      />

      <ErrorCard
        status={404}
        code="not_found"
        description="Identity, email, SMS, or API key does not exist."
        cause="The requested resource ID does not exist or belongs to a different API key."
        solution="Double-check the resource ID. Ensure you are using the correct API key that created the resource."
      />

      <ErrorCard
        status={429}
        code="rate_limit_exceeded"
        description="Your API key has exceeded its rate limit."
        cause="Too many requests have been made in the current minute."
        solution="Wait before retrying. Implement exponential backoff in your client. Contact support if you need a higher rate limit."
      />

      <Heading2>Server Error Responses (5xx)</Heading2>

      <ErrorCard
        status={500}
        code="internal_error"
        description="An unexpected error occurred on the server."
        cause="A bug or infrastructure issue on AliasKit's side."
        solution="Retry the request after a few seconds. If the error persists, contact support with the request ID (if provided)."
      />

      <ErrorCard
        status={503}
        code="service_unavailable"
        description="The API is temporarily unavailable."
        cause="Scheduled maintenance or temporary outage."
        solution="Wait a few minutes and retry. Check the status page for updates."
      />

      <Heading2>Handling Errors in Your Application</Heading2>

      <Heading3>Pattern: Exponential Backoff</Heading3>
      <P>For transient errors (5xx, rate limits), implement exponential backoff:</P>
      <CodeBlock language="typescript">{`
async function createIdentityWithRetry(ak, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await ak.identities.create({ provision_phone: true })
    } catch (error) {
      if (error.status === 429 || error.status >= 500) {
        // Exponential backoff: 1s, 2s, 4s, 8s...
        const delay = Math.pow(2, attempt) * 1000
        await new Promise(r => setTimeout(r, delay))
        continue
      }
      throw error // Don't retry client errors
    }
  }
  throw new Error('Max retries exceeded')
}
      `}</CodeBlock>

      <Heading3>Pattern: Validation Before Request</Heading3>
      <P>Validate input locally to avoid round-trips for obvious errors:</P>
      <CodeBlock language="typescript">{`
async function sendEmailSafely(ak, identityId, email) {
  // Validate before sending
  if (!email.to || !email.to.includes('@')) {
    throw new Error('Invalid recipient email')
  }
  if (!email.subject || email.subject.length === 0) {
    throw new Error('Subject is required')
  }

  return await ak.identities.sendEmail(identityId, email)
}
      `}</CodeBlock>

      <Heading3>Pattern: Error Recovery</Heading3>
      <P>Handle specific errors gracefully:</P>
      <CodeBlock language="typescript">{`
try {
  const identity = await ak.identities.get(identityId)
} catch (error) {
  if (error.code === 'not_found') {
    // Identity was deleted; create a new one
    const newIdentity = await ak.identities.create()
    return newIdentity
  } else if (error.code === 'rate_limit_exceeded') {
    // Too many requests; queue for later
    queue.push(() => ak.identities.get(identityId))
    return null
  } else {
    // Unexpected error
    throw error
  }
}
      `}</CodeBlock>

      <Heading2>Common Issues & Troubleshooting</Heading2>

      <Heading3>Issue: "Unauthorized" on every request</Heading3>
      <P>
        <strong>Cause:</strong> API key is missing or malformed.
      </P>
      <P>
        <strong>Fix:</strong> Verify the API key is correctly set in your environment and passed in the Authorization header.
      </P>
      <CodeBlock language="bash">{`
# Check your API key
echo $ALIASKIT_API_KEY

# Should output: ak_live_...
      `}</CodeBlock>

      <Heading3>Issue: "Identity not found" when it should exist</Heading3>
      <P>
        <strong>Cause:</strong> The identity was created with a different API key.
      </P>
      <P>
        <strong>Fix:</strong> Data is isolated per API key. Verify you are using the same API key that created the identity.
      </P>

      <Heading3>Issue: Rate limit errors during polling</Heading3>
      <P>
        <strong>Cause:</strong> You're polling too frequently for new messages.
      </P>
      <P>
        <strong>Fix:</strong> Implement backoff between polls. Start with 2-5 second intervals and increase if you hit rate limits.
      </P>
      <CodeBlock language="typescript">{`
async function pollEmail(ak, identityId) {
  const maxAttempts = 10
  let attempt = 0
  const initialDelay = 2000 // 2 seconds

  while (attempt < maxAttempts) {
    const emails = await ak.identities.emails(identityId)
    if (emails.data.length > 0) {
      return emails.data[0]
    }

    attempt++
    const delay = initialDelay * Math.pow(1.5, attempt - 1)
    await new Promise(r => setTimeout(r, delay))
  }

  throw new Error('Email not received after timeout')
}
      `}</CodeBlock>

      <Note>
        For production use cases with many identities, consider using webhooks (when available) instead of polling for better efficiency.
      </Note>

      <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(0, 240, 255, 0.07)' }}>
        <div className="flex gap-4 text-sm">
          <Link
            href="/docs/concepts"
            style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            ← Concepts
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
