# AliasKit Architecture

## System Overview

```
  ┌──────────────────────┐          ┌──────────────────────────┐
  │  @aliaskit/test SDK  │          │   AliasKit Web App       │
  │  (runs on user's     │──HTTP──▶│   (Next.js on Vercel)    │
  │   machine)           │          │                          │
  │                      │          │  /api/v1/identities      │
  │  - Playwright        │          │  /api/v1/.../emails      │
  │  - OTP extractor     │          │  /api/v1/.../sms         │
  │  - Test reporter     │          │  /api/internal/email/... │
  │  - Browser helpers   │          │  /api/internal/sms/...   │
  └──────────────────────┘          │  /dashboard              │
                                    └────────────┬─────────────┘
                                                 │
                                    ┌────────────▼─────────────┐
                                    │       Supabase           │
                                    │   (Postgres + Auth)      │
                                    └────────────┬─────────────┘
                                                 │
                           ┌─────────────────────┼─────────────────────┐
                           │                     │                     │
                    ┌──────▼──────┐       ┌──────▼──────┐       ┌─────▼──────┐
                    │   Resend    │       │   Twilio    │       │  Supabase  │
                    │  (Email)    │       │   (SMS)     │       │  Storage   │
                    └─────────────┘       └─────────────┘       └────────────┘
```

## Two Products

### @aliaskit/test (Testing SDK)
- TypeScript package, runs on the developer's machine
- Uses Playwright for browser automation
- Calls the AliasKit Identity API for identity provisioning
- Polls email/SMS endpoints to extract verification codes
- Produces test reports with screenshots

### AliasKit Identity API (Infrastructure)
- Next.js API routes on Vercel
- REST API at `/api/v1/` for identity CRUD, email, SMS
- Dashboard at `/dashboard` for manual management
- Webhook receivers at `/api/internal/` for inbound email (Resend) and SMS (Twilio)
- Supabase for data storage and auth

## Data Flow: Test Run

```
  1. SDK creates ephemeral identity via POST /api/v1/identities
  2. SDK launches Playwright, navigates to target app signup page
  3. SDK fills form with identity's email/phone
  4. Target app sends verification email to identity's address
  5. Resend receives email → webhook → /api/internal/email/inbound → Supabase
  6. SDK polls GET /api/v1/identities/:id/emails until verification arrives
  7. SDK extracts OTP code via regex
  8. SDK enters code in target app, completes verification
  9. SDK captures evidence (screenshots, timeline)
  10. SDK deletes identity via DELETE /api/v1/identities/:id (cleanup)
```

## Key Directories

```
/app/api/v1/          — Public REST API (identity CRUD, email, SMS)
/app/api/dashboard/   — Dashboard-specific API routes
/app/api/internal/    — Webhook receivers (Resend inbound, Twilio inbound)
/app/dashboard/       — Dashboard UI pages
/app/(auth)/          — Login, register, password reset
/lib/                 — Shared utilities (auth, supabase clients, name generation)
/packages/aliaskit-test/  — Testing SDK package (@aliaskit/test)
```
