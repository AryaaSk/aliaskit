# 08 -- Requirements Summary

## Functional Requirements

### Identity Provisioning (Identity API)

- FR-1: Create an identity with a unique, real email address on the `aliaskit.to` domain
- FR-2: Optionally provision a real phone number (via Twilio) for SMS reception
- FR-3: Auto-generate a realistic name and date of birth for each identity
- FR-4: Support custom metadata on identities (agent framework, purpose, tags)
- FR-5: List, read, update, and delete identities via REST API
- FR-6: Release phone numbers back to Twilio on identity deletion

### Email (Identity API)

- FR-7: Receive inbound email at any `*@aliaskit.to` address via Resend catch-all
- FR-8: Store inbound emails with full headers, text/HTML body, and attachments
- FR-9: Expose email inbox via REST API (list, read, delete)
- FR-10: Send outbound email from an identity's address via Resend API
- FR-11: Support polling for new emails with filtering (unread, since timestamp)

### SMS (Identity API)

- FR-12: Receive inbound SMS at provisioned Twilio numbers
- FR-13: Store inbound SMS with sender, body, and timestamp
- FR-14: Expose SMS inbox via REST API (list, read)
- FR-15: Support polling for new SMS with filtering

### Authentication (Identity API)

- FR-16: API key authentication for all public API endpoints
- FR-17: API key creation, listing, and revocation
- FR-18: Scoped permissions on API keys (read, write, admin)
- FR-19: Supabase Auth for dashboard access (email + password)

### Testing SDK (@aliaskit/test)

- FR-20: Provision and clean up identities via `withIdentity()` lifecycle wrapper
- FR-21: Launch and control browsers via Playwright for form interaction
- FR-22: Poll email inbox and extract OTP codes via regex pattern matching
- FR-23: Poll SMS inbox and extract OTP codes via regex pattern matching
- FR-24: Support configurable selectors for signup form fields
- FR-25: Return structured test results (pass/fail, timing, screenshots)
- FR-26: Support both standalone test execution and integration with existing Playwright test suites

### Dashboard (Web UI)

- FR-27: Identity list view with status, email, phone, and creation date
- FR-28: Identity detail view showing email and SMS inboxes
- FR-29: API key management (create, view prefix, revoke)
- FR-30: Overview dashboard with usage statistics

## Non-Functional Requirements

### Performance

- NFR-1: Identity provisioning (email only) completes in under 2 seconds
- NFR-2: Identity provisioning (email + phone) completes in under 10 seconds (Twilio number purchase is the bottleneck)
- NFR-3: Email polling returns new messages within 5 seconds of receipt by the API
- NFR-4: A full signup flow test (provision, signup, receive email, extract code, verify) completes in under 60 seconds
- NFR-5: API response times under 500ms for read operations

### Reliability

- NFR-6: Inbound email webhook must not lose messages (at-least-once delivery with idempotent storage)
- NFR-7: Inbound SMS webhook must not lose messages
- NFR-8: Identity cleanup must reliably release Twilio phone numbers to avoid cost leakage

### Security

- NFR-9: API keys stored as bcrypt hashes, never in plaintext
- NFR-10: Webhook endpoints authenticated via shared secrets (Resend) and signature validation (Twilio)
- NFR-11: No cross-identity access -- an API key can only access identities it created
- NFR-12: Dashboard access requires authenticated Supabase session

### Scalability

- NFR-13: Support at least 100 concurrent identities per API key
- NFR-14: Support at least 1,000 stored messages per identity before requiring cleanup
- NFR-15: Rate limiting on API endpoints to prevent abuse (configurable per API key)

### Operability

- NFR-16: Deploy via `git push` to main (Vercel auto-deploy)
- NFR-17: Health check endpoint at `/api/health`
- NFR-18: Environment variables for all external service credentials (no hardcoded secrets)

## Constraints

- C-1: MVP uses a single email domain (`aliaskit.to`)
- C-2: Phone numbers are limited to countries supported by Twilio
- C-3: The SDK requires Playwright as a peer dependency
- C-4: Inbound email relies on Resend's webhook infrastructure (availability dependency)
- C-5: Phone number costs ($0.50/number/month via Twilio) require identity cleanup to control spend
