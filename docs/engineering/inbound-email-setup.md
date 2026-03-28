# Inbound Email Setup Guide

AliasKit receives inbound emails via Cloudflare Email Routing + a Cloudflare Email Worker.

## Architecture

```
Sender → MX record → Cloudflare Email Routing → Email Worker → POST /api/internal/email/inbound → Supabase
```

## Prerequisites

- `aliaskit.com` zone is on Cloudflare (must move NS from Google Cloud DNS to Cloudflare)
- Cloudflare Workers account (free tier is fine)
- `INBOUND_EMAIL_SECRET` set in both `.env` (AliasKit app) and Wrangler secrets

## Step 1 — Move DNS to Cloudflare

1. Add `aliaskit.com` to Cloudflare (create a zone)
2. Copy existing DNS records from Google Cloud DNS
3. Update nameservers at your registrar to Cloudflare's NS
4. Remove the existing SES MX record once propagated

## Step 2 — Enable Cloudflare Email Routing

In the Cloudflare dashboard for `aliaskit.com`:

1. Go to **Email → Email Routing**
2. Enable Email Routing (Cloudflare adds the required MX records automatically)
3. Under **Routing rules**, add a catch-all rule:
   - **Catch-all** → **Send to Worker** → `aliaskit-email-inbound`

## Step 3 — Deploy the Email Worker

```bash
cd workers/email-inbound
npm install
wrangler secret put INBOUND_EMAIL_SECRET   # paste value from .env
wrangler secret put ALIASKIT_API_URL       # e.g. https://aliaskit.com
wrangler deploy
```

## Step 4 — Set INBOUND_EMAIL_SECRET in production

In Vercel (or wherever AliasKit is deployed), add the env var:

```
INBOUND_EMAIL_SECRET=<same value as in wrangler secret>
```

## How the endpoint works

`POST /api/internal/email/inbound` expects:

```
Authorization: Bearer <INBOUND_EMAIL_SECRET>
Content-Type: application/json

{
  "from": "sender@example.com",
  "to": "jordan@aliaskit.com",
  "subject": "Your verification code",
  "text": "Code: 829301",
  "html": "<p>Code: 829301</p>",
  "headers": {}
}
```

Returns `{ "received": true, "stored": true }` on success, or `{ "received": true, "stored": false }` if the `to` address doesn't match any identity (e.g. spam).

## Testing

Send a test email to any provisioned identity address (e.g. `jordan@aliaskit.com`) and verify it appears in `GET /v1/identities/:id/emails`.

For local testing, POST directly to the endpoint:

```bash
curl -X POST http://localhost:3000/api/internal/email/inbound \
  -H "Authorization: Bearer $INBOUND_EMAIL_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "test@example.com",
    "to": "jordan@aliaskit.com",
    "subject": "Test inbound",
    "text": "Hello from the test",
    "html": null,
    "headers": {}
  }'
```

## Why not Resend for inbound?

The `.env` has `RESEND_API_KEY` and `RESEND_WEBHOOK_SECRET` for outbound email delivery. Resend does have an inbound email product, but the MX records for `aliaskit.com` currently point to AWS SES (`inbound-smtp.us-east-1.amazonaws.com`), meaning Resend never receives the emails. Cloudflare Email Workers is the simpler, free path that requires only DNS changes.

If the team later wants to switch to Resend for inbound:
1. Configure `aliaskit.com` in Resend as an inbound domain
2. Update MX records to Resend's inbound server
3. Configure Resend inbound routing to POST to `/api/internal/email/inbound` with `Authorization: Bearer <INBOUND_EMAIL_SECRET>`
The endpoint is provider-agnostic — any forwarder that sends the expected JSON with the correct secret will work.
