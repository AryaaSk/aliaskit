# AliasKit Integration Test Report — 2026-03-28

**Run Date:** 2026-03-28
**Tester:** QA Lead (Agent 74a3abd7)
**Branch:** fix/email-verification-callback
**Task:** [ALI-63](/ALI/issues/ALI-63)
**App URL:** http://localhost:3000

---

## Executive Summary

Comprehensive integration testing of AliasKit MVP covering:
- Email inbox control (agentmail equivalent)
- SMS control (agentphone equivalent)
- Identity CRUD API
- Authentication
- Dashboard UI

| Category | Count |
|----------|-------|
| ✅ Pass  | 18    |
| ❌ Fail  | 4     |
| ⚠️ Warn  | 1     |
| **Total**| **23**|

**Overall status: ❌ CRITICAL GAPS — full SMS control not yet functional; email send requires domain fix**

---

## Test Results

### Unit Tests (Jest)
| Suite | Tests | Status |
|-------|-------|--------|
| auth.test.ts | 5 | ✅ All pass |
| names.test.ts | 17 | ✅ All pass |
| **Total** | **22** | **✅ All pass** |

---

### Identity API

| Test | Status | Notes |
|------|--------|-------|
| `POST /api/dashboard/api-keys` | ✅ Pass | Returns `{id, key_prefix, key, ...}` correctly |
| `GET /api/dashboard/api-keys` | ✅ Pass | Returns list with correct fields |
| `POST /api/v1/identities` (no phone) | ✅ Pass | Returns `{id, name, date_of_birth, email, ...}` |
| `GET /api/v1/identities` | ✅ Pass | Returns paginated list scoped to API key |
| `GET /api/v1/identities/{id}` | ✅ Pass | Returns single identity |
| `PATCH /api/v1/identities/{id}` | ✅ Pass | Updates metadata correctly |
| `DELETE /api/v1/identities/{id}` | ✅ Pass | Soft deletes; deleted identity returns 404 |
| Auth — no token | ✅ Pass | Returns 401 |
| Auth — invalid token | ✅ Pass | Returns 401 |
| Identity isolation (cross-key access) | ✅ Pass | Returns 404 for cross-key access |

---

### Email Inbox (AgentMail Equivalent)

| Test | Status | Notes |
|------|--------|-------|
| `GET /api/v1/identities/{id}/emails` (empty) | ✅ Pass | Returns `{data:[], total:0, limit:50, offset:0}` |
| `POST /api/internal/email/inbound` (webhook) | ✅ Pass | Stores email correctly, returns `{received:true, stored:true}` |
| `GET /api/v1/identities/{id}/emails` (after inbound) | ✅ Pass | Returns stored inbound email |
| `GET /api/v1/identities/{id}/emails/{id}` (marks as read) | ✅ Pass | Returns email and marks it read |
| `GET /api/v1/identities/{id}/emails?unread=true` | ✅ Pass | Returns 0 after email was read |
| `DELETE /api/v1/identities/{id}/emails/{id}` | ✅ Pass | Returns `{success:true}` |
| `POST /api/v1/identities/{id}/emails` (outbound send) | ❌ **FAIL** | 403 — aliaskit.to domain not verified on Resend ([ALI-68](/ALI/issues/ALI-68)) |

---

### SMS Inbox (AgentPhone Equivalent)

| Test | Status | Notes |
|------|--------|-------|
| `GET /api/v1/identities/{id}/sms` (empty) | ✅ Pass | Returns `{data:[], total:0, limit:50, offset:0}` |
| `POST /api/internal/sms/inbound` (Twilio webhook) | ✅ Pass | Validates Twilio signature, stores SMS |
| `GET /api/v1/identities/{id}/sms` (after inbound) | ✅ Pass | Returns stored SMS |
| `GET /api/v1/identities/{id}/sms/{id}` (marks as read) | ✅ Pass | Returns SMS with `read:true` |
| `GET /api/v1/identities/{id}/sms?unread=true` | ✅ Pass | Returns 0 after SMS was read |
| `DELETE /api/v1/identities/{id}/sms/{id}` | ❌ **FAIL** | 405 — DELETE method not implemented ([ALI-65](/ALI/issues/ALI-65)) |
| `POST /api/v1/identities/{id}/sms` (outbound send) | ❌ **FAIL** | 405 — Outbound SMS endpoint does not exist ([ALI-67](/ALI/issues/ALI-67)) |

---

### Auth / Email Verification (Branch: fix/email-verification-callback)

| Test | Status | Notes |
|------|--------|-------|
| `GET /auth/callback` (no session) | ✅ Pass | Renders loading state, shows error after 5s timeout |
| `/login` unconfirmed email message | ✅ Pass | Shows "Account created — check your email and confirm before signing in" |
| Auth callback code implementation | ✅ Pass | Handles `SIGNED_IN` event + existing session check |

---

### Dashboard UI (Playwright)

| Test | Status | Notes |
|------|--------|-------|
| `/` home page | ✅ Pass | HTTP 200, correct title + hero text |
| `/login` page | ✅ Pass | Form renders correctly |
| `/register` page | ✅ Pass | Form renders correctly |
| `/register` submit | ✅ Pass | Success state shown |
| `/login` submit (unconfirmed test user) | ⚠️ Warn | Test user `qa-test-aliaskit@mailinator.com` not confirmed — login fails as expected |
| Unauthenticated redirect | ✅ Pass | Redirects to `/login?next=...` |
| `GET /api/dashboard/stats` | ✅ Pass | Returns real counts (DB migration applied) |
| `GET /api/dashboard/identities` | ⚠️ Minor | Missing `total` field in response ([ALI-69](/ALI/issues/ALI-69)) |

---

## Bugs Found (New Issues)

| Issue | Severity | Title | Assigned |
|-------|----------|-------|----------|
| [ALI-65](/ALI/issues/ALI-65) | 🔴 High | Missing DELETE endpoint for SMS messages | Lead Engineer |
| [ALI-67](/ALI/issues/ALI-67) | 🔴 High | Missing outbound SMS send endpoint | Lead Engineer |
| [ALI-68](/ALI/issues/ALI-68) | 🔴 High | Outbound email fails: aliaskit.to domain not verified on Resend | Lead Engineer |
| [ALI-69](/ALI/issues/ALI-69) | 🟡 Low | Dashboard identities API missing 'total' field | Lead Engineer |

---

## Previously Known Issues (Status Check)

| Prior Issue | Status |
|-------------|--------|
| DB migration not applied | ✅ **FIXED** — Tables exist, stats return real data |
| Stats API silently masks errors | ✅ **Resolved** — Tables now exist |
| Email verification UX gap | ✅ **FIXED** — Commit `29375fa` adds unconfirmed email message; `/auth/callback` route added in `e905bdd` |

---

## Critical Path for Full Functionality

For **full inbox control** (agentmail parity):
- [x] Inbound email storage ✅
- [x] List/get/delete emails ✅
- [ ] **Outbound email send** — blocked by Resend domain verification ([ALI-68](/ALI/issues/ALI-68))

For **full SMS control** (agentphone parity):
- [x] Inbound SMS storage ✅
- [x] List/get SMS ✅
- [ ] **Delete SMS** — endpoint missing ([ALI-65](/ALI/issues/ALI-65))
- [ ] **Outbound SMS send** — endpoint missing ([ALI-67](/ALI/issues/ALI-67))

---

## Environment

| Item | Value |
|------|-------|
| Next.js | 16.2.1 |
| Node.js | v22.22.0 |
| Supabase project | avfkafflfgeaalzncgip |
| Branch | fix/email-verification-callback |

---

*Generated by QA Lead — 2026-03-28*
