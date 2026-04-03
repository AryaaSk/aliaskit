# 02 -- Product Overview

## Two Products, One Purpose

AliasKit closes the feedback loop in AI coding agent workflows. It consists of two products that work together:

### @aliaskit/test -- The Testing SDK

A TypeScript SDK that AI coding agents and automated tests call to verify that signup and verification flows actually work. The SDK:

- Provisions a real identity (name, email address, phone number) via the Identity API
- Launches a browser via Playwright and navigates to the target application
- Fills signup forms with the provisioned identity's credentials
- Waits for verification emails or SMS to arrive at the identity's real inbox
- Extracts OTP codes from incoming messages using pattern matching
- Enters codes and completes the verification flow
- Reports pass/fail with screenshots and timing data
- Cleans up the identity after the test completes

The SDK is what a coding agent calls when it needs to answer the question: "does the signup flow I just built actually work?"

```typescript
const ak = new AliasKitTest({ apiKey: 'ak_live_...' })

await ak.withIdentity(async (identity) => {
  // identity.email = "jordan@aliaskit.to" (real, receives mail)
  // identity.phone_number = "+12025551234" (real, receives SMS)
  const code = await ak.waitForEmailCode(identity.id)
  // code = "482910" (extracted from actual verification email)
})
```

### AliasKit Identity API -- The Infrastructure

A REST API (Next.js on Vercel, backed by Supabase) that provisions and manages ephemeral digital identities. The API:

- Creates identities with auto-generated names and dates of birth
- Provisions email addresses on the `aliaskit.to` domain (catch-all via Resend)
- Provisions real phone numbers via Twilio
- Receives and stores inbound email (Resend webhooks) and SMS (Twilio webhooks)
- Exposes email and SMS inboxes via REST endpoints
- Handles identity lifecycle (create, read, update, delete)
- Authenticates via API keys

The Identity API is infrastructure. It can be used standalone (any HTTP client can call it), but its primary consumer is the testing SDK.

## How They Work Together

```
Coding Agent (Claude Code, Cursor, etc.)
    |
    |  "Test the signup flow I just built"
    v
@aliaskit/test SDK
    |
    |  1. POST /v1/identities -> provisions email + phone
    |  2. Launches browser, fills signup form
    |  3. Target app sends verification email
    |  4. GET /v1/identities/:id/emails -> reads email, extracts code
    |  5. Enters code, completes flow
    |  6. DELETE /v1/identities/:id -> cleanup
    |
    v
Identity API (aliaskit.com)
    |
    +-- Supabase (storage)
    +-- Resend (email receive/send)
    +-- Twilio (SMS receive, phone provisioning)
```

The coding agent never touches the Identity API directly. It calls the SDK, which handles the full lifecycle: identity provisioning, browser automation, message polling, code extraction, verification completion, and cleanup. The coding agent gets back a simple pass/fail result with evidence.

## Dashboard

A web UI at aliaskit.com/dashboard provides manual visibility into identities, email inboxes, SMS inboxes, and API key management. This is for developers who want to inspect what their agents are doing -- it is not the primary interface.
