# QA Test Checklist — AliasKit

**Last Updated:** 2026-03-29 (Launch Day)
**Status:** ✅ All tests passing, production ready
**Tested Commit:** 52a403f

---

## Pre-Deployment Checks (Run Before Every Merge to Main)

- [ ] `npm run build` succeeds with no errors
- [ ] `node testing/integration-test.js` passes all 9 tests
- [ ] No console errors or warnings in test output
- [ ] All screenshots capture correctly in `testing/screenshots/`
- [ ] Git status is clean (no uncommitted changes)

---

## Feature Testing Checklist

### Authentication & Access Control
- [ ] User registration works end-to-end
- [ ] User login works and redirects to dashboard
- [ ] User logout clears session
- [ ] Google OAuth sign-in works (if enabled)
- [ ] Protected routes redirect to login for unauthenticated users
- [ ] API endpoints reject requests without valid API key

### Identity Management
- [ ] Create identity via API
- [ ] List identities in dashboard
- [ ] View identity details
- [ ] Delete identity
- [ ] Pagination works for large identity lists

### Email Features
- [ ] Send outbound email via API
- [ ] View sent emails in dashboard inbox
- [ ] Receive inbound email webhook
- [ ] Email renders correctly with HTML
- [ ] Email subject, body, and attachments display

### SMS Features
- [ ] Send outbound SMS via API
- [ ] View sent SMS in dashboard
- [ ] Receive inbound SMS webhook
- [ ] SMS conversation view works
- [ ] Phone number formatting is correct

### API Key Management
- [ ] Generate API key
- [ ] Display key prefix (not full key after creation)
- [ ] Revoke/delete API key
- [ ] Revoked key stops working immediately
- [ ] API key permissions are enforced

### Dashboard Pages
- [ ] Dashboard home page loads and displays stats
- [ ] Identities page loads and displays list
- [ ] API Keys page loads and shows management UI
- [ ] All pages have correct navigation
- [ ] Responsive design works on mobile

---

## Visual QA Checklist (Chrome/Manual Verification)

- [ ] Home page renders correctly
- [ ] No broken images or missing styles
- [ ] Text is readable (color contrast OK)
- [ ] Navigation is intuitive
- [ ] Buttons are clickable and responsive
- [ ] Forms are properly aligned
- [ ] Mobile layout is usable
- [ ] No console errors in DevTools

---

## API Endpoint Testing

### Core Endpoints
- [ ] `GET /api/v1/identities` — list identities
- [ ] `POST /api/v1/identities` — create identity
- [ ] `GET /api/v1/identities/[id]` — get identity details
- [ ] `DELETE /api/v1/identities/[id]` — delete identity

### Email Endpoints
- [ ] `GET /api/v1/identities/[id]/emails` — list emails
- [ ] `POST /api/v1/identities/[id]/emails` — send email
- [ ] `GET /api/v1/identities/[id]/emails/[emailId]` — get email
- [ ] `POST /api/internal/email/inbound` — receive webhook

### SMS Endpoints
- [ ] `GET /api/v1/identities/[id]/sms` — list SMS
- [ ] `POST /api/v1/identities/[id]/sms` — send SMS
- [ ] `DELETE /api/v1/identities/[id]/sms/[smsId]` — delete SMS
- [ ] `POST /api/internal/sms/inbound` — receive webhook

### API Key Endpoints
- [ ] `GET /api/v1/api-keys` — list keys
- [ ] `POST /api/v1/api-keys` — generate key
- [ ] `DELETE /api/v1/api-keys/[id]` — revoke key

### Health & Monitoring
- [ ] `GET /api/health` — returns 200 with status
- [ ] Response includes timestamp and uptime info

---

## Database Testing

- [ ] All tables created by migrations
- [ ] Identities table has correct schema
- [ ] API keys table has correct schema
- [ ] Emails table has correct schema
- [ ] SMS messages table has correct schema
- [ ] Foreign keys enforced
- [ ] Indexes created for performance

---

## Bug Regression Tests

### Fixed Issues — Verify Still Fixed
- [ ] Messages route queries correct column (inbound_email_webhook_id)
- [ ] DELETE SMS endpoint exists and works
- [ ] Dashboard routes require authentication

---

## Load & Performance

- [ ] Build time is under 30 seconds
- [ ] Page load time is reasonable (< 3s)
- [ ] Dashboard can handle 1000+ identities
- [ ] No memory leaks in browser console
- [ ] No unhandled promise rejections

---

## Documentation Testing

- [ ] README.md is accurate and up-to-date
- [ ] API docs match actual endpoints
- [ ] Code examples are tested and working
- [ ] All links in docs are valid

---

## Post-Launch Monitoring

- [ ] Monitor error logs in production
- [ ] Check `/api/health` endpoint regularly
- [ ] Track API response times
- [ ] Monitor database performance
- [ ] Review user feedback for issues

---

## Test Reports Directory

All test reports saved in `docs/reports/`:
- `test-report-YYYY-MM-DD.md` — Daily test summary
- `TEST_CHECKLIST.md` — This file

**Create new report:** `npm run build && node testing/integration-test.js`

---

## How to Run Tests

```bash
# Build verification
npm run build

# Integration tests (generates screenshots)
node testing/integration-test.js

# Check specific feature
npm run test -- --grep "auth"
```

---

**QA Lead:** Agent 74a3abd7-963b-4cc1-8be0-31140c5eace2
**Last Verified:** 2026-03-29 01:00 UTC
**Status:** ✅ PRODUCTION READY
