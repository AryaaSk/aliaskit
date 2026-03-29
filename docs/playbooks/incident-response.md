# AliasKit Incident Response & Rollback Playbook

## Severity Levels

### 🔴 CRITICAL — Page on-call immediately
**Symptoms:**
- Application won't start (500 errors on home page)
- Database completely unavailable
- Authentication system broken
- User data corruption detected

**Immediate Action:**
1. Release Engineer: Revert to previous stable commit
2. Notify all team members
3. Post status update on status page
4. Begin incident investigation
5. Plan post-mortem

**Rollback Command:**
```bash
git revert HEAD
git push
# Vercel auto-deploys the reverted code
```

---

### 🟠 HIGH — Notify team, may need rollback
**Symptoms:**
- Specific features broken (auth/dashboard/API)
- 5xx errors > 10%
- Database performance degraded
- Email/SMS webhooks not processing

**Action:**
1. Assess scope of impact
2. Decide: Hotfix or rollback?
3. If critical: Execute rollback above
4. If fixable: Create urgent hotfix branch
5. Test hotfix thoroughly before re-deploy

---

### 🟡 MEDIUM — Monitor, document, fix post-launch
**Symptoms:**
- Minor UI bugs
- Non-critical features broken
- Performance issues < 1000ms
- Occasional errors (< 1% of requests)

**Action:**
1. Document in incident log
2. Create post-launch bug fix task in Paperclip
3. Continue normal monitoring
4. Plan fix for next deploy

---

## Pre-Deploy Verification

Before any production deployment:
- [ ] Latest tests pass locally
- [ ] Build succeeds without warnings (`npm run build`)
- [ ] All environment variables are correct
- [ ] Database backups are recent (Supabase dashboard)
- [ ] Monitoring is active

---

## Post-Rollback Steps

1. Verify reverted code deployed successfully (check Vercel dashboard)
2. Run smoke tests against the reverted version
3. Confirm all systems operational
4. Update status page: RESOLVED
5. Create post-mortem task in Paperclip
6. Plan root cause investigation
7. Identify what gaps in testing or monitoring allowed the issue through

---

## Escalation Chain

| Role | Responsibility |
|------|---------------|
| Release Engineer | Primary contact for deployments and reverts |
| CTO | Decision maker for rollbacks and major incidents |
| Lead Engineer | Technical coordination and hotfix oversight |
| On-Call DevOps | Infrastructure support (Vercel, networking) |
| Database Admin | Supabase/database issues |

---

## Communication Plan

### During a Critical Incident
1. Post in #incidents channel immediately
2. Update status page (status.aliaskit.com if configured)
3. Email affected users if data loss is possible
4. Brief leadership

### Recovery Communication
1. Update status page with resolution time
2. Post all-clear in #incidents
3. Send email to affected users
4. Schedule post-mortem meeting within 48 hours

---

## Monitoring Baselines

| Metric | Normal | Warning | Critical |
|--------|--------|---------|----------|
| Response time | < 200ms | 200–1000ms | > 1000ms |
| Error rate | < 0.1% | 0.1–1% | > 1% |
| CPU | < 60% | 60–80% | > 80% |
| Memory | < 70% | 70–85% | > 85% |

**Monitoring dashboards:** Vercel Analytics, Supabase dashboard
