# 05 -- Technical Architecture

## System Components

```
Coding Agent (Claude Code, Cursor, etc.)
       |
       v
@aliaskit/test SDK (TypeScript, runs locally)
  |-- Playwright (browser automation)
  |-- OTP extractor (regex-based code extraction)
  |-- Test reporter (pass/fail + screenshots)
  |-- Identity client (HTTP calls to API)
       |
       v
AliasKit Identity API (Next.js on Vercel)
  |-- /api/v1/*           Public REST API
  |-- /api/internal/*     Webhook receivers
  |-- /dashboard          Web UI
       |
       +-- Supabase (Postgres + Auth + Storage)
       +-- Resend (email send/receive)
       +-- Twilio (SMS receive, phone provisioning)
```

## Identity Provisioning

### Email

Email provisioning requires no per-identity external setup. The domain `aliaskit.to` uses a catch-all configuration on Resend: all mail sent to `*@aliaskit.to` is received by Resend and forwarded via webhook to the API.

1. `POST /v1/identities` -- API generates a unique username (or uses a provided one)
2. API stores the identity in Supabase with email `{username}@aliaskit.to`
3. Any mail sent to that address is caught by Resend's catch-all and delivered via webhook
4. No external API call is needed for email provisioning -- it is purely a database operation

### Phone (SMS)

Phone provisioning requires purchasing a Twilio number.

1. `POST /v1/identities` with `provision_phone: true`
2. API calls Twilio to search available numbers in the requested country
3. API purchases the number and configures its SMS webhook URL to point to `/api/internal/sms/inbound`
4. Phone number and Twilio SID are stored on the identity record
5. On identity deletion, the number is released back to Twilio

### Generated Attributes

Each identity is provisioned with a realistic name and date of birth, generated at creation time. These are available for form-filling during test runs.

## Message Flow

### Inbound Email

```
External app sends email to jordan@aliaskit.to
  -> Resend receives via catch-all MX
  -> Resend sends webhook POST to /api/internal/email/inbound
  -> API authenticates webhook (shared secret)
  -> API looks up identity by recipient address
  -> API stores email in Supabase (email_messages table)
  -> SDK polls GET /v1/identities/:id/emails
  -> SDK extracts OTP code via regex patterns
```

### Inbound SMS

```
External app sends SMS to +12025551234
  -> Twilio receives SMS
  -> Twilio sends webhook POST to /api/internal/sms/inbound
  -> API validates Twilio signature
  -> API looks up identity by phone number
  -> API stores SMS in Supabase (sms_messages table)
  -> SDK polls GET /v1/identities/:id/sms
  -> SDK extracts OTP code via regex patterns
```

### Outbound Email

Identities can send email (for testing flows that require email replies):

```
SDK calls POST /v1/identities/:id/emails
  -> API validates identity owns the from address
  -> API sends via Resend API
  -> API stores sent message in Supabase
```

## Data Model

Four core tables in Supabase:

- **identities** -- ID, name, DOB, email, phone, status, metadata, API key reference
- **email_messages** -- ID, identity FK, direction, from/to, subject, body (text + HTML), headers, attachments, timestamps
- **sms_messages** -- ID, identity FK, direction, from/to, body, timestamps
- **api_keys** -- ID, key hash, prefix, label, scopes, rate limit, timestamps

## Authentication

- **Public API** (`/api/v1/*`): Bearer token authentication using API keys. Keys are hashed with bcrypt; the prefix is stored for display.
- **Dashboard** (`/dashboard`): Supabase Auth (email + password).
- **Internal webhooks** (`/api/internal/*`): Shared secrets (Resend) and signature validation (Twilio).

## Infrastructure

| Component | Service | Purpose |
|-----------|---------|---------|
| Application | Vercel | Next.js hosting, auto-deploy from main |
| Database | Supabase Postgres | Identity, message, and API key storage |
| Auth | Supabase Auth | Dashboard user authentication |
| Email | Resend | Inbound webhooks + outbound API |
| SMS | Twilio | Inbound webhooks + number provisioning |
| Storage | Supabase Storage | Email attachments |
| DNS | aliaskit.to | MX (Resend), SPF, DKIM, DMARC |

## SDK Architecture

The `@aliaskit/test` package (`/packages/aliaskit-test/`) contains:

- **client.ts** -- HTTP client for the Identity API
- **identity.ts** -- Identity provisioning and lifecycle management
- **browser.ts** -- Playwright browser automation helpers
- **otp.ts** -- OTP/verification code extraction from email and SMS bodies
- **runner.ts** -- Test execution orchestration
- **reporter.ts** -- Test result formatting and screenshot capture
- **index.ts** -- Public API surface (`AliasKitTest`, `withIdentity`, etc.)
