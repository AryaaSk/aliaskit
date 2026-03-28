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
      className="text-xl font-bold mt-12 mb-4"
      style={{ color: '#E2E8F0', fontFamily: 'var(--font-syncopate), sans-serif', scrollMarginTop: '100px' }}
    >
      {children}
    </h2>
  )
}

function Heading3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="text-base font-semibold mt-8 mb-3 flex items-center gap-2"
      style={{ color: '#E2E8F0', fontFamily: 'var(--font-jetbrains-mono), monospace', scrollMarginTop: '100px' }}
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

function MethodBadge({ method }: { method: 'GET' | 'POST' | 'PATCH' | 'DELETE' }) {
  const colors: Record<string, string> = {
    GET: '#39FF14',
    POST: '#00F0FF',
    PATCH: '#FFB800',
    DELETE: '#FF0055',
  }
  return (
    <span
      className="text-xs px-2 py-0.5 rounded font-bold"
      style={{
        color: colors[method],
        background: `${colors[method]}15`,
        border: `1px solid ${colors[method]}40`,
        fontFamily: 'var(--font-jetbrains-mono), monospace',
      }}
    >
      {method}
    </span>
  )
}

function Route({ method, path, description }: { method: 'GET' | 'POST' | 'PATCH' | 'DELETE'; path: string; description: string }) {
  return (
    <div
      className="flex items-start gap-3 py-3 px-4 rounded-lg mb-2"
      style={{ background: 'rgba(11, 18, 33, 0.6)', border: '1px solid rgba(0, 240, 255, 0.07)' }}
    >
      <MethodBadge method={method} />
      <div className="flex-1 min-w-0">
        <code
          className="text-sm block mb-1"
          style={{ color: '#E2E8F0', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          {path}
        </code>
        <span className="text-xs" style={{ color: '#64748B' }}>{description}</span>
      </div>
    </div>
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

function ParamRow({ name, type, required, description }: { name: string; type: string; required?: boolean; description: string }) {
  return (
    <tr style={{ borderBottom: '1px solid rgba(0, 240, 255, 0.05)' }}>
      <td className="py-2 pr-4 text-xs" style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace', whiteSpace: 'nowrap' }}>
        {name}
        {required && <span className="ml-1 text-[10px]" style={{ color: '#FF0055' }}>*</span>}
      </td>
      <td className="py-2 pr-4 text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>{type}</td>
      <td className="py-2 text-xs" style={{ color: '#94A3B8' }}>{description}</td>
    </tr>
  )
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-left">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(0, 240, 255, 0.15)' }}>
            <th className="pb-2 text-xs uppercase tracking-wider pr-4" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>Field</th>
            <th className="pb-2 text-xs uppercase tracking-wider pr-4" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>Type</th>
            <th className="pb-2 text-xs uppercase tracking-wider" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>Description</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export default function ApiReferencePage() {
  return (
    <article>
      <Heading1>API Reference</Heading1>
      <P>
        Base URL: <InlineCode>https://aliaskit.com/api/v1</InlineCode> (production) /{' '}
        <InlineCode>http://localhost:3000/api/v1</InlineCode> (local)
      </P>
      <P>
        All requests require an API key in the <InlineCode>Authorization</InlineCode> header:
      </P>
      <CodeBlock language="http">{`Authorization: Bearer ak_live_...`}</CodeBlock>

      {/* ── Identities ── */}
      <Heading2 id="identities">Identities</Heading2>
      <P>An identity represents a complete digital persona — name, email inbox, and optionally a phone number.</P>

      <Route method="POST"   path="/v1/identities"          description="Create a new identity" />
      <Route method="GET"    path="/v1/identities"          description="List all identities" />
      <Route method="GET"    path="/v1/identities/:id"      description="Get a single identity" />
      <Route method="PATCH"  path="/v1/identities/:id"      description="Update identity metadata" />
      <Route method="DELETE" path="/v1/identities/:id"      description="Deactivate and release resources" />

      <Heading3 id="post-identities">POST /v1/identities</Heading3>
      <P>Create a new identity. Name and email username are auto-generated if omitted.</P>

      <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>Request body</p>
      <Table>
        <ParamRow name="name"            type="string"  description="Full name (auto-generated if omitted)" />
        <ParamRow name="email_username"  type="string"  description="Email prefix, e.g. 'jordan' → jordan@aliaskit.to" />
        <ParamRow name="email_domain"    type="string"  description="Email domain (defaults to aliaskit.to)" />
        <ParamRow name="provision_phone" type="boolean" description="Purchase and assign a phone number" />
        <ParamRow name="phone_country"   type="string"  description="ISO 3166-1 alpha-2 country code for phone (default: US)" />
        <ParamRow name="metadata"        type="object"  description="Arbitrary key-value pairs (agent framework, purpose, etc.)" />
      </Table>

      <CodeBlock language="json">{`
// Request
{
  "name": "Jordan Riley",
  "provision_phone": true,
  "metadata": { "purpose": "github-signup" }
}

// Response 201
{
  "id": "ident_abc123",
  "name": "Jordan Riley",
  "date_of_birth": "1994-07-12",
  "email": "jordan.riley@aliaskit.to",
  "email_domain": "aliaskit.to",
  "phone_number": "+12025551234",
  "phone_provider": "plivo",
  "status": "active",
  "metadata": { "purpose": "github-signup" },
  "api_key_id": "key_xyz",
  "created_at": "2026-03-28T10:00:00Z",
  "updated_at": "2026-03-28T10:00:00Z"
}
      `}</CodeBlock>

      <Heading3 id="get-identities">GET /v1/identities</Heading3>
      <P>Returns a paginated list of identities for the authenticated API key.</P>
      <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#64748B', fontFamily: 'var(--font-syncopate), sans-serif' }}>Query params</p>
      <Table>
        <ParamRow name="limit"  type="number" description="Max results per page (default: 20, max: 100)" />
        <ParamRow name="cursor" type="string" description="Pagination cursor from previous response" />
      </Table>

      <Heading3 id="patch-identities">PATCH /v1/identities/:id</Heading3>
      <Table>
        <ParamRow name="name"     type="string" description="Update the identity's display name" />
        <ParamRow name="status"   type="string" description="'active' or 'suspended'" />
        <ParamRow name="metadata" type="object" description="Merged into existing metadata (use null values to remove keys)" />
      </Table>

      {/* ── Email ── */}
      <Heading2 id="email">Email</Heading2>
      <P>Each identity has a dedicated email inbox. Inbound mail is stored automatically via Cloudflare Email Workers.</P>

      <Route method="GET"    path="/v1/identities/:id/emails"              description="List emails (paginated)" />
      <Route method="GET"    path="/v1/identities/:id/emails/:email_id"    description="Get a single email" />
      <Route method="POST"   path="/v1/identities/:id/emails"              description="Send an email" />
      <Route method="DELETE" path="/v1/identities/:id/emails/:email_id"    description="Delete an email" />

      <Heading3 id="get-emails">GET /v1/identities/:id/emails</Heading3>
      <Table>
        <ParamRow name="limit"  type="number"  description="Max results (default: 20, max: 100)" />
        <ParamRow name="cursor" type="string"  description="Pagination cursor" />
        <ParamRow name="unread" type="boolean" description="Filter to unread messages only" />
      </Table>
      <CodeBlock language="json">{`
{
  "data": [
    {
      "id": "msg_xyz789",
      "identity_id": "ident_abc123",
      "direction": "inbound",
      "from": "noreply@github.com",
      "to": "jordan.riley@aliaskit.to",
      "subject": "Verify your email",
      "body_text": "Your verification code is 482910",
      "body_html": null,
      "headers": {},
      "attachments": [],
      "received_at": "2026-03-28T10:05:00Z",
      "read": false
    }
  ],
  "pagination": { "hasMore": false, "nextCursor": null }
}
      `}</CodeBlock>

      <Heading3 id="post-emails">POST /v1/identities/:id/emails</Heading3>
      <P>Send an email from the identity's provisioned address.</P>
      <Table>
        <ParamRow name="to"        type="string" required description="Recipient address" />
        <ParamRow name="subject"   type="string" description="Email subject line" />
        <ParamRow name="body_text" type="string" description="Plain-text body" />
        <ParamRow name="body_html" type="string" description="HTML body (overrides body_text in email clients that support HTML)" />
      </Table>

      {/* ── SMS ── */}
      <Heading2 id="sms">SMS</Heading2>
      <P>Inbound SMS messages are stored when Plivo delivers them to the identity's phone number.</P>

      <Route method="GET"    path="/v1/identities/:id/sms"              description="List SMS messages (paginated)" />
      <Route method="GET"    path="/v1/identities/:id/sms/:sms_id"      description="Get a single SMS" />
      <Route method="DELETE" path="/v1/identities/:id/sms/:sms_id"      description="Delete an SMS message" />

      <Heading3 id="get-sms">GET /v1/identities/:id/sms</Heading3>
      <Table>
        <ParamRow name="limit"  type="number" description="Max results (default: 20, max: 100)" />
        <ParamRow name="cursor" type="string" description="Pagination cursor" />
      </Table>
      <CodeBlock language="json">{`
{
  "data": [
    {
      "id": "sms_def456",
      "identity_id": "ident_abc123",
      "direction": "inbound",
      "from": "+15551234567",
      "to": "+12025551234",
      "body": "Your verification code is 829301",
      "received_at": "2026-03-28T10:06:00Z",
      "read": false
    }
  ],
  "pagination": { "hasMore": false, "nextCursor": null }
}
      `}</CodeBlock>

      {/* ── API Keys ── */}
      <Heading2 id="api-keys">API Keys</Heading2>
      <P>API keys are managed through the dashboard. The following endpoints are available for programmatic access.</P>

      <Route method="POST"   path="/v1/api-keys"       description="Create a new API key" />
      <Route method="GET"    path="/v1/api-keys"        description="List API keys" />
      <Route method="DELETE" path="/v1/api-keys/:id"   description="Revoke an API key" />

      {/* ── Errors ── */}
      <Heading2 id="errors">Errors</Heading2>
      <P>All errors return a JSON body with <InlineCode>error</InlineCode> (message) and optional <InlineCode>code</InlineCode> fields.</P>
      <Table>
        <ParamRow name="400" type="Bad Request"    description="Missing or invalid request body fields" />
        <ParamRow name="401" type="Unauthorized"   description="Missing or invalid API key" />
        <ParamRow name="403" type="Forbidden"      description="API key lacks required scope" />
        <ParamRow name="404" type="Not Found"      description="Identity or resource does not exist" />
        <ParamRow name="429" type="Too Many Requests" description="Rate limit exceeded" />
        <ParamRow name="500" type="Internal Error" description="Unexpected server error" />
      </Table>
      <CodeBlock language="json">{`
{
  "error": "Identity not found",
  "code": "not_found"
}
      `}</CodeBlock>

      <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(0, 240, 255, 0.07)' }}>
        <Link
          href="/docs"
          className="text-sm"
          style={{ color: '#00F0FF', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          ← Quickstart
        </Link>
      </div>
    </article>
  )
}
