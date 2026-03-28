# AliasKit Integration Test Report

**Run Date:** 2026-03-28
**Tester:** QA Lead (automated via Playwright + Chromium)
**App URL:** http://localhost:3000
**Branch:** main

---

## Summary

| Category | Count |
|----------|-------|
| ✅ Pass  | 8     |
| ❌ Fail  | 2     |
| ⚠️ Warn  | 2     |
| **Total**| **12**|

**Overall status: ❌ CRITICAL ISSUES FOUND — app not fully functional**

---

## Critical Findings

### 🔴 BUG-1 — Database migration not applied to Supabase

**Severity:** Critical
**Affected endpoints:**
- `GET /api/dashboard/identities` → `500 Internal Server Error`
- `GET /api/dashboard/api-keys` → `500 Internal Server Error`
- `POST /api/dashboard/identities` → would also 500
- `POST /api/dashboard/api-keys` → would also 500

**Error message:**
```
{"error":"Could not find the table 'public.identities' in the schema cache"}
{"error":"Could not find the table 'public.api_keys' in the schema cache"}
```

**Root cause:** The migration file `supabase/migrations/001_initial.sql` has not been applied to the Supabase project (`avfkafflfgeaalzncgip`). Tables `public.identities`, `public.api_keys`, `public.email_messages`, and `public.sms_messages` do not exist in the database.

**Impact:** Identities and API Keys dashboard pages load (HTML renders) but the data fails to fetch with 500 errors. Users see "0 total" but would get errors if they tried to create an identity or API key.

**Fix required:** Run the migration against the Supabase project:
```bash
npx supabase login --token <SUPABASE_ACCESS_TOKEN>
npx supabase link --project-ref avfkafflfgeaalzncgip
npx supabase db push
```
Or apply `supabase/migrations/001_initial.sql` via the Supabase Dashboard SQL editor.

---

### 🟡 BUG-2 — Stats API silently masks database errors

**Severity:** Medium
**File:** `app/api/dashboard/stats/route.ts`

**Issue:** The stats endpoint uses `data ?? []` fallback when querying missing tables. When the DB tables don't exist, it returns `{"totalIdentities":0,"activeIdentities":0,"totalApiKeys":0,"activeApiKeys":0}` with HTTP 200 instead of surfacing the error.

**Impact:** Dashboard overview shows all-zero stats that appear valid but are actually error states. No indication to users or operators that DB is not configured.

**Fix:** Propagate errors from identities/api_keys queries instead of silently falling back.

---

### 🟡 BUG-3 — Registration success state not clearly detected (UX issue)

**Severity:** Low
**File:** `app/(auth)/register/page.tsx`

**Issue:** After successful registration, the app shows a success message and redirects to `/login` after 3 seconds. However:
- The user lands back at `/register` URL briefly during the success state
- If Supabase email confirmation is required (default), the user cannot login until they confirm their email
- There is no in-app indication that email confirmation is pending after the 3-second redirect to `/login`
- The login page shows no message about needing to confirm email if the user tries to login before confirming

**Impact:** Users who register and immediately try to login see a generic auth error with no guidance.

---

## Page-by-Page Test Results

### 1. `/` — Home Page

| Check | Result |
|-------|--------|
| HTTP status | ✅ 200 |
| Page title | ✅ "AliasKit — Identity Layer for Autonomous Agents" |
| Hero heading | ✅ "A complete human identity for your agent." |
| Layout renders | ✅ |
| Navigation | ✅ |
| Console errors | ✅ None |

**Screenshot:** `screenshots/page-01-home.png`

---

### 2. `/login` — Login Page

| Check | Result |
|-------|--------|
| HTTP status | ✅ 200 |
| Form renders | ✅ |
| Email input | ✅ |
| Password input | ✅ |
| Submit button | ✅ |
| Console errors | ✅ None |

**Screenshot:** `screenshots/page-02-login.png`

---

### 3. `/register` — Registration Page

| Check | Result |
|-------|--------|
| HTTP status | ✅ 200 |
| Form renders | ✅ |
| Email input | ✅ |
| Password input | ✅ |
| Confirm password input | ✅ |
| Password mismatch validation | ✅ Error shown: "Passwords do not match" |
| Short password validation | ✅ Error shown: "Password must be at least 8 characters" |
| Submit with valid data | ✅ Success state shown |
| Console errors | ✅ None |

**Screenshot:** `screenshots/page-03-register.png`, `screenshots/page-05-register-mismatch-error.png`

**Notes:** Registration succeeds but email confirmation is required before login. See BUG-3.

---

### 4. `/login` — Login with Confirmed Account

| Check | Result |
|-------|--------|
| Login with `qa-lead@aliaskit-test.com` | ✅ |
| Redirect to `/dashboard` | ✅ |
| Session cookie set | ✅ |
| Console errors | ✅ None |

**Screenshot:** `screenshots/13-login-confirmed-result.png`

---

### 5. `/dashboard` — Dashboard Overview

| Check | Result |
|-------|--------|
| HTTP status | ✅ 200 |
| Redirects unauthenticated users to `/login?next=/dashboard` | ✅ |
| Loads for authenticated user | ✅ |
| Navigation sidebar renders | ✅ (Overview, Identities, API Keys, Settings) |
| User email displayed | ✅ `qa-lead@aliaskit-test.com` |
| Sign out button | ✅ |
| Stats section renders | ✅ (TOTAL IDENTITIES: 0, ACTIVE IDENTITIES: 0, API KEYS: 0, ACTIVE KEYS: 0) |
| Date display | ✅ "Saturday, March 28, 2026" |
| Stats API `/api/dashboard/stats` | ⚠️ Returns 200 but silently ignores DB errors (see BUG-2) |

**Screenshot:** `screenshots/page-06-dashboard-overview.png`

---

### 6. `/dashboard/identities` — Identities Page

| Check | Result |
|-------|--------|
| HTTP status | ✅ 200 |
| Redirects unauthenticated | ✅ |
| Page HTML renders | ✅ |
| Navigation sidebar | ✅ |
| "+ NEW IDENTITY" button visible | ✅ |
| `GET /api/dashboard/identities` | ❌ **500 — table does not exist** |
| Identity list loads | ❌ Fails silently (shows 0 total) |
| Create identity action | ❌ Would fail (table missing) |

**Screenshot:** `screenshots/page-07-dashboard-identities.png`

**Error:** `{"error":"Could not find the table 'public.identities' in the schema cache"}`

---

### 7. `/dashboard/api-keys` — API Keys Page

| Check | Result |
|-------|--------|
| HTTP status | ✅ 200 |
| Redirects unauthenticated | ✅ |
| Page HTML renders | ✅ |
| Navigation sidebar | ✅ |
| "+ NEW KEY" button visible | ✅ |
| `GET /api/dashboard/api-keys` | ❌ **500 — table does not exist** |
| API key list loads | ❌ Fails silently (shows 0 active) |
| Create API key action | ❌ Would fail (table missing) |

**Screenshot:** `screenshots/page-08-dashboard-api-keys.png`

**Error:** `{"error":"Could not find the table 'public.api_keys' in the schema cache"}`

---

### 8. Auth Redirect (Unauthenticated Access)

| Check | Result |
|-------|--------|
| `/dashboard` → `/login?next=%2Fdashboard` | ✅ |
| `/dashboard/identities` → `/login?next=...` | ✅ |
| `/dashboard/api-keys` → `/login?next=...` | ✅ |
| `next` param preserved on redirect | ✅ |

---

## Test Account

Credentials stored in `testing/TEST_CREDENTIALS.md`.

- Email: `qa-lead@aliaskit-test.com`
- Created via Supabase Admin API with `email_confirm: true` (bypasses email verification for testing)

---

## Environment

| Item | Value |
|------|-------|
| Next.js | 16.2.1 |
| React | 19.2.4 |
| Supabase project | avfkafflfgeaalzncgip |
| Browser | Chromium 145 (Playwright) |
| Node.js | v22.22.0 |
| Test runner | Playwright 1.58.2 |

---

## Action Items

| Priority | Issue | Owner |
|----------|-------|-------|
| 🔴 P0 | Apply DB migration `001_initial.sql` to Supabase project | Backend/DevOps |
| 🟡 P1 | Fix stats API to propagate DB errors instead of silencing them | Backend |
| 🟡 P2 | Add post-registration UX guidance ("Check your email to confirm before logging in") and display informative error on login when email is unconfirmed | Frontend |

---

*Generated by QA Lead automated integration test — 2026-03-28*
