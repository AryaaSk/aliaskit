# QA Test Credentials

> **KEEP SECURE** — Do not commit to public repositories

## Test Account (Pre-confirmed via Supabase Admin API)

| Field    | Value                          |
|----------|--------------------------------|
| Email    | `qa-lead@aliaskit-test.com`    |
| Password | `QAtest2026!secure`            |
| User ID  | `e69bcf51-69b6-4c80-b7f5-fe3cfa3d3039` |
| Status   | Email confirmed, active        |
| Created  | 2026-03-28                     |

## How to Recreate

If this account is deleted, recreate it via the Supabase Admin API:

```bash
SUPABASE_URL="https://avfkafflfgeaalzncgip.supabase.co"
SERVICE_KEY="<see .env SUPABASE_SERVICE_ROLE_KEY>"

curl -X POST "$SUPABASE_URL/auth/v1/admin/users" \
  -H "apikey: $SERVICE_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "qa-lead@aliaskit-test.com",
    "password": "QAtest2026!secure",
    "email_confirm": true
  }'
```
