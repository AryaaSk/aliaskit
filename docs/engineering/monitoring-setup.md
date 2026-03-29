# AliasKit Monitoring & Alerting Setup

**Last updated:** 2026-03-29 (Launch Day)

## Health Check Endpoint

`GET /api/health`

Returns JSON with overall status and per-component checks:

```json
{
  "status": "ok",
  "timestamp": "2026-03-29T08:00:00.000Z",
  "version": "unknown",
  "checks": {
    "database": { "status": "ok", "latency_ms": 42 }
  }
}
```

- HTTP 200 when `ok` or `degraded`
- HTTP 503 when `down`
- Monitor this endpoint for uptime alerting

## Vercel (Hosting & Deployment)

Vercel provides built-in monitoring at the project dashboard.

**Available out of the box:**
- Deployment status and build logs
- Edge network performance metrics
- Function invocation counts and errors
- Real-time log streaming

**Configure alerts:**
1. Go to Project → Settings → Notifications
2. Enable: Deployment failed, Deployment succeeded
3. Add team email / Slack webhook for deployment notifications

## Supabase (Database)

**Dashboard:** https://supabase.com/dashboard/project/avfkafflfgeaalzncgip

**Available metrics:**
- Database connections (connection pool status)
- Query performance (slow query log)
- Database size and row counts
- API request counts and error rates

**Recommended checks:**
1. Database → Reports: Enable daily email report
2. Settings → Alerts: Set connection pool warning at 80% capacity
3. Check "Database Health" tab before and during launch

## Sentry (Error Tracking) — NEEDS SETUP

Sentry is **not yet installed**. To enable error monitoring:

### Install

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Required environment variables

```
SENTRY_DSN=https://<key>@o<org>.ingest.sentry.io/<project>
SENTRY_AUTH_TOKEN=<token>         # for source map uploads
NEXT_PUBLIC_SENTRY_DSN=<same dsn> # for client-side errors
```

Add these to Vercel project environment variables (Production only).

### Alert thresholds to configure in Sentry

| Alert | Condition | Action |
|-------|-----------|--------|
| Error rate spike | >5% error rate over 5 min | Page on-call |
| New issue | First occurrence of any unhandled error | Notify Slack |
| Performance degradation | P95 response time >1000ms | Notify Slack |

## Uptime Monitoring (External)

Use an external uptime monitor to check from outside the network.

**Recommended free options:**
- [Better Uptime](https://betteruptime.com) — monitors `/api/health`
- [UptimeRobot](https://uptimerobot.com) — 5-minute check intervals free

**Configure to monitor:**
- `https://aliaskit.com/api/health` — every 1 minute
- Alert on: 2 consecutive failures (avoids false positives)
- Notify: on-call email + Slack

## Alerting Summary

| Alert | Source | Threshold | Status |
|-------|--------|-----------|--------|
| Database down | `/api/health` + Supabase | Unavailable | Needs uptime monitor |
| Error rate >5% | Sentry | 5% over 5min | Needs Sentry install |
| Response time >1s | Sentry / Vercel | P95 >1000ms | Needs Sentry install |
| Deployment failed | Vercel | Any failure | Configure in Vercel Settings |
| Deployment succeeded | Vercel | Any deploy | Configure in Vercel Settings |

## On-Call Runbook

When an alert fires:

1. Check `/api/health` — identifies which component is down
2. Check Vercel logs for recent deployment or function errors
3. Check Supabase dashboard for database issues
4. Check Twilio console for SMS delivery failures
5. Check email provider (Postmark/SendGrid) for email failures

## Launch Day Baseline

Capture baseline metrics within the first hour of launch:
- Response time P50 / P95 from Vercel analytics
- Database connection count from Supabase
- First user registration timestamp
- First API key creation timestamp
