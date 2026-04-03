# AliasKit — Specification

## Vision

AliasKit is two products:

1. **@aliaskit/test** (primary) — A TypeScript SDK that lets AI agents and automated tests complete real signup/verification flows end-to-end. No other testing tool can actually sign up for things, receive verification emails/SMS, and extract codes. Point it at your app, it tests your signup flow autonomously.

2. **AliasKit Identity API** (infrastructure) — A REST API that provisions ephemeral digital identities (email + phone + name) for agents and tests. Powers the testing SDK and is available as a standalone API.

## Product Positioning

The bottleneck in AI-assisted development isn't writing code anymore — it's testing it. AI agents build features in minutes, but when a flow requires email verification or SMS codes, everything stops and waits for a human. AliasKit removes that bottleneck.

The Identity API competes with AgentMail (email, YC S25) and various phone APIs, but the real product is the testing SDK that sits on top — no other tool can complete real verification flows end-to-end.

Long-term: portable, verifiable agent credentials (Web3). Short-term: a dead-simple REST API.

---

## MVP Scope

### What's In

- Email inbox provisioning (receive + send) via Resend (inbound webhooks + outbound API)
- Phone number provisioning (receive SMS) via Twilio
- REST API for identity CRUD
- Dashboard UI for managing identities
- TypeScript SDK
- API key authentication
- Supabase for data storage (already set up)

### What's Out (Post-MVP)

- Virtual debit cards
- Government ID / KYC documents
- Web3 / on-chain identity
- OpenClaw skill integration
- Multi-tenant / team accounts
- Usage-based billing (MVP is free tier only)
- Outbound voice calls
- MCP server

---

## Data Model

### Identity

The core entity. One identity = one "person" an agent can be.

```
Identity {
  id              string (uuid)
  name            string          // generated human name, e.g. "Jordan Riley"
  date_of_birth   string          // generated DOB
  email           string          // provisioned email address
  email_domain    string          // domain used (e.g. aliaskit.to)
  phone_number    string?         // provisioned phone number (E.164)
  phone_provider  string?         // "twilio"
  status          enum            // active | suspended | deleted
  metadata        jsonb           // arbitrary key-value (agent framework, purpose, etc.)
  api_key_id      string (fk)     // which API key created this
  created_at      timestamp
  updated_at      timestamp
}
```

### Email Message

Inbound and outbound emails for an identity's inbox.

```
EmailMessage {
  id              string (uuid)
  identity_id     string (fk)
  direction       enum            // inbound | outbound
  from            string
  to              string
  subject         string
  body_text       string?
  body_html       string?
  headers         jsonb
  attachments     jsonb           // [{filename, content_type, size, storage_key}]
  received_at     timestamp
  read            boolean
}
```

### SMS Message

Inbound SMS messages for an identity's phone number.

```
SmsMessage {
  id              string (uuid)
  identity_id     string (fk)
  direction       enum            // inbound | outbound
  from            string
  to              string
  body            string
  received_at     timestamp
  read            boolean
}
```

### API Key

Authentication for API access.

```
ApiKey {
  id              string (uuid)
  key_hash        string          // bcrypt hash of the key
  key_prefix      string          // first 8 chars for display (e.g. "ak_live_ab")
  label           string          // user-given name
  scopes          string[]        // ["identities:read", "identities:write", "messages:read", ...]
  rate_limit      int             // requests per minute
  created_at      timestamp
  last_used_at    timestamp?
  revoked_at      timestamp?
}
```

### Webhook Subscription (optional, stretch)

```
Webhook {
  id              string (uuid)
  api_key_id      string (fk)
  url             string
  events          string[]        // ["email.received", "sms.received"]
  secret          string          // HMAC signing secret
  active          boolean
  created_at      timestamp
}
```

---

## API Design

Base URL: `https://api.aliaskit.com/v1` (production) / `http://localhost:3000/api/v1` (dev)

Auth: `Authorization: Bearer ak_live_...`

### Identities

```
POST   /v1/identities                Create a new identity
GET    /v1/identities                List all identities
GET    /v1/identities/:id            Get identity details
PATCH  /v1/identities/:id            Update identity metadata
DELETE /v1/identities/:id            Deactivate identity (releases resources)
```

#### POST /v1/identities

Request:
```json
{
  "name": "Jordan Riley",          // optional, auto-generated if omitted
  "email_username": "jordan",      // optional, auto-generated if omitted
  "email_domain": "aliaskit.to",   // optional, default domain
  "provision_phone": true,         // optional, default false
  "phone_country": "US",           // optional, default "US"
  "metadata": {                    // optional
    "agent_framework": "openclaw",
    "purpose": "customer-support"
  }
}
```

Response (201):
```json
{
  "id": "ident_abc123",
  "name": "Jordan Riley",
  "date_of_birth": "1994-07-12",
  "email": "jordan@aliaskit.to",
  "phone_number": "+12025551234",
  "status": "active",
  "metadata": { ... },
  "created_at": "2026-03-28T10:00:00Z"
}
```

### Email

```
GET    /v1/identities/:id/emails              List emails (paginated)
GET    /v1/identities/:id/emails/:email_id    Get single email
POST   /v1/identities/:id/emails              Send an email
DELETE /v1/identities/:id/emails/:email_id    Delete email
```

#### GET /v1/identities/:id/emails

Query params: `?limit=20&offset=0&unread=true`

Response (200):
```json
{
  "data": [
    {
      "id": "msg_xyz789",
      "direction": "inbound",
      "from": "noreply@github.com",
      "subject": "Verify your email",
      "body_text": "Your code is 482910...",
      "received_at": "2026-03-28T10:05:00Z",
      "read": false
    }
  ],
  "pagination": { "total": 42, "limit": 20, "offset": 0 }
}
```

#### POST /v1/identities/:id/emails

Request:
```json
{
  "to": "support@example.com",
  "subject": "Account inquiry",
  "body_text": "Hello, I need help with...",
  "body_html": "<p>Hello, I need help with...</p>"
}
```

### SMS

```
GET    /v1/identities/:id/sms                 List SMS messages (paginated)
GET    /v1/identities/:id/sms/:sms_id         Get single SMS
POST   /v1/identities/:id/sms                 Send SMS (stretch)
```

#### GET /v1/identities/:id/sms

Response (200):
```json
{
  "data": [
    {
      "id": "sms_def456",
      "direction": "inbound",
      "from": "+15551234567",
      "body": "Your verification code is 829301",
      "received_at": "2026-03-28T10:06:00Z",
      "read": false
    }
  ],
  "pagination": { "total": 5, "limit": 20, "offset": 0 }
}
```

### API Keys (Dashboard only — not in public SDK)

```
POST   /v1/api-keys                  Create API key
GET    /v1/api-keys                  List API keys
DELETE /v1/api-keys/:id              Revoke API key
```

### Webhooks (stretch)

```
POST   /v1/webhooks                  Create webhook
GET    /v1/webhooks                  List webhooks
DELETE /v1/webhooks/:id              Delete webhook
```

---

## Architecture

```
                    +------------------+
                    |   Dashboard UI   |
                    |   (Next.js)      |
                    +--------+---------+
                             |
                    +--------+---------+
                    |  Next.js API     |
                    |  Routes (/api/v1)|
                    +--+-------+---+---+
                       |       |   |
              +--------+  +---+   +--------+
              |           |                |
     +--------v---+  +----v------+  +------v------+
     |  Supabase  |  | Resend|  |   Twilio     |
     |  (Postgres)|  | Email     |  |   (Phone)   |
     |            |  | Workers   |  |             |
     +------------+  +-----------+  +-------------+
```

### Email Flow (Inbound)

1. Email arrives at `*@aliaskit.to`
2. Resend inbound webhook receives it
3. Worker parses headers, body, attachments
4. Worker POSTs to `/api/internal/email/inbound` with a shared secret
5. API route stores the message in Supabase `email_messages` table
6. (Stretch) Fire webhook to subscriber if configured

### Email Flow (Outbound)

1. Agent calls `POST /v1/identities/:id/emails`
2. API route validates the identity owns the from address
3. API route sends via Resend API (for deliverability)
4. Store sent message in Supabase

### SMS Flow (Inbound)

1. SMS arrives at Twilio number
2. Twilio sends webhook to `/api/internal/sms/inbound`
3. API route looks up identity by phone number
4. Store message in Supabase `sms_messages` table
5. (Stretch) Fire webhook

### Phone Provisioning Flow

1. Agent calls `POST /v1/identities` with `provision_phone: true`
2. API route calls Twilio API to search available numbers
3. Purchases number, configures SMS webhook URL
4. Stores number + Twilio ID in identity record

### Email Provisioning Flow

1. Agent calls `POST /v1/identities`
2. API route generates or uses provided username
3. Registers the address in Supabase (Resend worker routes all `*@aliaskit.to`)
4. No external provisioning needed — the catch-all worker handles routing

---

## Dashboard UI

### Pages

1. **Login / Register** — email + password via Supabase Auth
2. **Dashboard Home** — overview stats (total identities, messages today)
3. **Identities List** — table of all identities with status, email, phone
4. **Identity Detail** — view identity info, recent emails, recent SMS
5. **API Keys** — create, view prefix, revoke keys
6. **Settings** — account settings, webhook config (stretch)

### Design

Keep the existing dark/cyberpunk aesthetic from the landing page. The dashboard should feel like a control panel — tables, monospace fonts, minimal chrome.

---

## Testing SDK (@aliaskit/test)

**Standalone test:**
```typescript
import { AliasKitTest } from '@aliaskit/test'

const ak = new AliasKitTest({ apiKey: 'ak_live_...' })

const result = await ak.test('https://myapp.com/signup', {
  flow: 'email-password',
  fields: {
    email: 'input[name="email"]',
    password: 'input[name="password"]',
    submit: 'button[type="submit"]',
  },
  verification: {
    method: 'email-otp',
    codeField: 'input[name="code"]',
    submit: 'button[type="submit"]',
  },
  success: { urlContains: '/dashboard' },
})

console.log(result.passed) // true
```

**Inside a Playwright test:**
```typescript
import { test, expect } from '@playwright/test'
import { AliasKitTest } from '@aliaskit/test'

const ak = new AliasKitTest({ apiKey: process.env.ALIASKIT_API_KEY })

test('signup flow works end to end', async ({ page }) => {
  await ak.withIdentity(async (identity) => {
    await page.goto('https://myapp.com/signup')
    await page.fill('[name="email"]', identity.email)
    await page.fill('[name="password"]', 'TestPass123!')
    await page.click('button[type="submit"]')

    const code = await ak.waitForEmailCode(identity.id)
    await page.fill('[name="code"]', code)
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL(/dashboard/)
  })
  // identity auto-cleaned up
})
```

SDK uses Playwright (peer dependency) for browser automation and the AliasKit Identity API for identity provisioning, email/SMS receiving, and OTP extraction.

---

## Infrastructure & Domains

| Component | Service | Notes |
|---|---|---|
| App hosting | Vercel | Next.js default, free tier sufficient |
| Database | Supabase (Postgres) | Already configured |
| Email receive | Resend (inbound webhooks + outbound API) | Requires `aliaskit.to` DNS on Resend |
| Email send | MailChannels via CF Worker or Resend | Need SPF/DKIM/DMARC setup |
| Phone numbers | Twilio | $0.50/number/month, free inbound SMS |
| File storage | Supabase Storage | Email attachments |
| Auth | Supabase Auth | Dashboard login |

### Required DNS (aliaskit.to)

```
MX    aliaskit.to  →  Resend inbound email
TXT   aliaskit.to  →  SPF record for outbound
TXT   _dmarc       →  DMARC policy
CNAME sel1._domainkey  →  DKIM key
```

### Environment Variables

```
# Existing
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# New — server-side only
SUPABASE_SERVICE_ROLE_KEY=...        # for server-side DB writes
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...              # Default Twilio phone number
TWILIO_SMS_WEBHOOK_SECRET=...        # HMAC for inbound SMS verification
RESEND_WEBHOOK_SECRET=...            # Resend webhook signing secret for inbound email
RESEND_API_KEY=...                   # for outbound email (if using Resend)
```

---

## Implementation Phases

### Phase 1 — API Foundation

- [ ] Set up Supabase tables (identities, email_messages, sms_messages, api_keys)
- [ ] API key auth middleware
- [ ] Identity CRUD endpoints
- [ ] Name/DOB generation utility (random realistic names)

### Phase 2 — Email

- [ ] Resend inbound webhook (catch-all → POST to API)
- [ ] Internal inbound email endpoint
- [ ] Email list/read endpoints
- [ ] Outbound email (via Resend or MailChannels)
- [ ] DNS setup (MX, SPF, DKIM, DMARC)

### Phase 3 — Phone

- [ ] Twilio SDK integration
- [ ] Phone number search + purchase on identity creation
- [ ] SMS inbound webhook endpoint
- [ ] SMS list/read endpoints
- [ ] Phone number release on identity deletion

### Phase 4 — Dashboard

- [ ] Supabase Auth (login/register)
- [ ] Dashboard layout + navigation
- [ ] Identities list page
- [ ] Identity detail page (emails + SMS inbox view)
- [ ] API keys management page

### Phase 5 — SDK + Docs

- [ ] TypeScript SDK package (`@aliaskit/sdk`)
- [ ] API reference docs
- [ ] Quickstart guide
- [ ] Landing page update with docs link

### Phase 6 — Hardening (Post-MVP)

- [ ] Rate limiting
- [ ] Webhook delivery system
- [ ] Email spam filtering
- [ ] Phone number recycling / pooling
- [ ] Usage tracking + quotas
- [ ] Error monitoring (Sentry)

---

## Competitive Landscape

| Feature | AgentMail | AgentPhone | AliasKit |
|---|---|---|---|
| Email inbox | Yes | No | Yes |
| Phone number | No | Yes | Yes |
| Unified identity | No | No | Yes |
| Name generation | No | No | Yes |
| One-call provisioning | Email only | Phone only | Email + Phone |
| SDK | Python, TS | Python, TS (coming) | TypeScript |
| Pricing | Free tier | Free tier | Free tier |

AliasKit's differentiator: the **testing SDK** that no competitor offers. AgentMail gives you an inbox. AliasKit gives you an agent that can actually sign up for things.

---

## Success Metrics

### Technical (gates the build)
- @aliaskit/test SDK can autonomously complete an email+password signup flow (create identity, fill form, receive verification email, extract code, complete verification)
- SDK can handle SMS verification flows
- Test run completes in under 120 seconds (including email/SMS delivery wait)
- Clear pass/fail reporting with screenshots at each step
- `withIdentity()` auto-cleans up test identities after each run

### Validation (gates the launch)
- 5 developers outside the founder have used the SDK and given feedback
- At least 1 developer would be upset if it disappeared
- At least 1 developer offers to pay or asks about pricing
