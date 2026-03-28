# AliasKit Launch Metrics Dashboard Setup

**Owner:** Growth Marketing + Analytics
**Status:** Ready for implementation
**Timeline:** Days 0-1 (setup), Day 1+ (execution and monitoring)

---

## Overview

This document provides a complete framework for tracking launch success metrics in real-time. All metrics are defined, UTM parameters are ready to use, and tracking implementation is straightforward.

---

## Core Metrics Definition (90-Day Targets)

### Acquisition Metrics

| Metric | Target | Owner | Tracking |
|--------|--------|-------|----------|
| **Free-tier signups** | 100+ by day 30 | Growth | Analytics event |
| **Free-to-paid conversion** | 20+ by day 90 | Sales | Analytics + Stripe |
| **Cost per signup** | <$50 (if paid ads) | Growth | Campaign tracking |
| **Signup source breakdown** | HN, Twitter, Product Hunt, blog, newsletter | Growth | UTM params |

### Engagement Metrics

| Metric | Target | Owner | Tracking |
|--------|--------|-------|----------|
| **API key creation (Day 1)** | 30%+ of signups | Product | Instrumentation |
| **First API call (Day 1)** | 20%+ of signups | Product | Instrumentation |
| **Demo completion** | 70%+ of visitors | Product | Analytics event |
| **Docs page views** | 500+ day 1 | Product | Analytics |

### Content & Reach Metrics

| Metric | Target | Owner | Tracking |
|--------|--------|-------|----------|
| **HackerNews rank** | Top 10 day 1 | Growth | Manual check |
| **Product Hunt rank** | Top 3 day 1 | Product | Product Hunt API |
| **Twitter impressions** | 10k+ week 1 | Growth | Twitter Analytics |
| **Blog page views** | 2k+ week 1 | Growth | Google Analytics |

### Community Metrics

| Metric | Target | Owner | Tracking |
|--------|--------|-------|----------|
| **Discord members** | 100+ day 3 | Community | Discord API |
| **GitHub stars** | 200+ by day 30 | Product | GitHub API |
| **GitHub forks** | 20+ by day 30 | Product | GitHub API |

---

## UTM Parameter Strategy

### Standard UTM Structure
`?utm_source={source}&utm_medium={medium}&utm_campaign=launch&utm_content={content}&utm_term={variant}`

### Campaign URLs

#### HackerNews
```
https://aliaskit.io?utm_source=hackernews&utm_medium=social&utm_campaign=launch
```

#### Product Hunt
```
https://aliaskit.io?utm_source=producthunt&utm_medium=directory&utm_campaign=launch
```

#### Twitter
- **Thread header:** `?utm_source=twitter&utm_medium=social&utm_campaign=launch&utm_content=thread_1`
- **Retweets/replies:** `?utm_source=twitter&utm_medium=social&utm_campaign=launch&utm_content=engagement`

#### LinkedIn
```
https://aliaskit.io?utm_source=linkedin&utm_medium=social&utm_campaign=launch
```

#### Newsletter Sponsorships
```
https://aliaskit.io?utm_source=newsletter&utm_medium=email&utm_campaign=launch&utm_content={newsletter_name}
```

**Newsletter Name Variants:**
- `import_ai`
- `theblock`
- `newsletter_ai`
- etc. (one per sponsorship)

#### Blog Post (Internal)
```
https://aliaskit.io?utm_source=blog&utm_medium=organic&utm_campaign=launch&utm_content=launch_post
```

#### Framework Partners
```
https://aliaskit.io?utm_source={framework}&utm_medium=partner&utm_campaign=launch&utm_content=sdk_example
```

**Framework Name Variants:**
- `langchain`
- `anthropic`
- `crewai`
- etc.

---

## Google Analytics Setup

### Event Tracking (Day 1)

#### Event 1: Signup Started
```javascript
gtag('event', 'signup_started', {
  'source': utm_source,
  'medium': utm_medium
});
```

#### Event 2: Signup Completed
```javascript
gtag('event', 'signup_completed', {
  'source': utm_source,
  'medium': utm_medium,
  'user_type': 'free|paid'
});
```

#### Event 3: API Key Created
```javascript
gtag('event', 'api_key_created', {
  'source': utm_source,
  'medium': utm_medium,
  'time_to_action': seconds_from_signup
});
```

#### Event 4: First API Call
```javascript
gtag('event', 'first_api_call', {
  'source': utm_source,
  'medium': utm_medium,
  'time_to_action': seconds_from_signup,
  'endpoint': api_endpoint_name
});
```

#### Event 5: Framework Integration Used
```javascript
gtag('event', 'framework_integration', {
  'framework': 'langchain|anthropic|crewai',
  'source': utm_source
});
```

### Goals to Configure in GA4
1. **Signup Goal** — tracks "signup_completed" event
2. **Activation Goal** — tracks "first_api_call" event within 24 hours
3. **Framework Adoption Goal** — tracks "framework_integration" event

### Reports to Set Up

**Real-Time Dash (Day 1):**
- Live pageviews (dashboard, docs, pricing)
- Live signups by source
- Live events (API key creation, first API call)

**Daily Report Template:**
- Sessions by source (HN, Twitter, Product Hunt, blog, newsletter)
- Signups by source
- Signup-to-API-call conversion rate
- Top pages (engagement)
- Top events

---

## Tracking Implementation Checklist

### Pre-Launch (Day 0)

- [ ] Google Analytics 4 property created
- [ ] Measurement ID added to website (GA tracking code)
- [ ] All UTM parameters tested in staging
- [ ] Goal conversions configured
- [ ] Custom events documented in GA4
- [ ] Conversion rate visualization set up
- [ ] Real-time dashboard shared with team
- [ ] Slack webhook configured for real-time alerts

### Launch Day (Day 1)

- [ ] GA real-time dashboard live and monitoring
- [ ] Stripe webhook configured to track payments
- [ ] Product Hunt API integration set up (if available)
- [ ] HackerNews story tracked manually (no direct API)
- [ ] Twitter analytics enabled and monitored
- [ ] Discord analytics enabled
- [ ] GitHub API integrated (stars, forks)
- [ ] Slack notifications configured for key events (100 signups, first paid, etc.)

---

## Slack Alerts Configuration

### Alert Events (Post to #launch Channel)

#### Every 10 Signups
```
🎉 10 new signups! Total: {count}
Top source: {source}
Conversion rate: {api_call_rate}%
```

#### Every 100 Signups
```
🚀 Milestone: 100 signups reached!
- Time to reach: {hours} hours
- Top sources: {top3_sources}
- Activation rate: {api_call_rate}%
```

#### First Paid Signup
```
💰 First paid signup!
Source: {source}
User: {anonymized}
Time from signup: {minutes} minutes
```

#### Hourly Summary (Every 4 hours on Day 1)
```
📊 4-Hour Summary
- New signups: {count}
- Active users: {count}
- API calls: {count}
- Top source: {source}
- Conversion rate: {rate}%
```

#### Daily Summary (EOD)
```
📈 Day {N} Summary
- Total signups: {count} (target: {target})
- Free → Paid: {count}
- Active users: {count}
- Avg signup-to-activation: {minutes}m
- Top 3 sources: {list}
- Revenue: ${amount}
```

---

## Dashboard Template (Google Sheets or Airtable)

### Recommended Structure

**Row Headers:**
- Date
- Hour
- Total Signups
- Signups (HN)
- Signups (Twitter)
- Signups (Product Hunt)
- Signups (Blog)
- Signups (Newsletter)
- Signups (Other)
- API Keys Created
- First API Calls
- Free → Paid Conversions
- Revenue
- Top Referrer

### Auto-Update Method

**Option A (Google Sheets):**
Use Google Sheets API + Apps Script to auto-populate from GA4 data

**Option B (Airtable):**
Use Zapier to connect GA4 events → Airtable records

**Option C (Manual Update):**
Dashboard owner updates every 4 hours on Day 1, then daily

### Share Settings
- **Team:** Full edit access
- **Board/Leadership:** View-only access
- **Update frequency:** Real-time (Option A) or 4-hourly (Option C)

---

## Post-Launch Reporting (Days 2-7)

### Daily Email Report (to Team + Leadership)

**Template:**

```
Subject: AliasKit Launch — Day {N} Report

Signups: {count} ({target_pct}% of 30-day goal)
  - Free tier: {count}
  - Paid: {count}

Top Sources:
  1. {source}: {count} signups
  2. {source}: {count} signups
  3. {source}: {count} signups

Activation Rate: {pct}% (target: 20%)
  - API keys created: {count}
  - First API calls: {count}

Revenue: ${amount}
  - New MRR: ${amount}

Key Insights:
- {insight 1}
- {insight 2}
- {action item}

Next 24 Hours:
- Planned activities
- Expected metrics
```

### Week 1 Recap Report (Day 7)

**Sections:**

1. **Acquisition Summary**
   - Total signups by day
   - Signups by source (breakdown)
   - Cost per signup (if paid ads)
   - Signup-to-activation flow

2. **Revenue Impact**
   - Free-to-paid conversions
   - MRR impact
   - Customer acquisition cost
   - Lifetime value estimate

3. **Engagement Analysis**
   - Top pages (docs, pricing, blog)
   - Time on site
   - Return visitors
   - Framework usage

4. **Community Growth**
   - Discord members
   - GitHub stars
   - Twitter followers
   - Newsletter subscribers

5. **Content Performance**
   - Blog post views
   - HackerNews rank
   - Product Hunt rank
   - Social impressions

6. **Recommendations**
   - What's working (double down)
   - What's not (optimize or kill)
   - Opportunities for Week 2

---

## Success Criteria (Launch Day Checkpoints)

### By End of Hour 1 (11 AM ET)
- [ ] GA is tracking signups
- [ ] First 10+ signups recorded
- [ ] Slack alerts are working
- [ ] Dashboard is live and updating
- [ ] Team has confirmed no tracking gaps

### By End of Hour 4 (2 PM ET)
- [ ] 30+ signups minimum
- [ ] All channels driving traffic (HN, Twitter, Product Hunt)
- [ ] Conversion rates tracked and visible
- [ ] No broken tracking links

### By End of Day 1
- [ ] 50+ total signups
- [ ] First paid conversion recorded
- [ ] API activation rate 15%+
- [ ] Daily report generated and shared
- [ ] Zero data gaps or tracking errors

---

## Technical Implementation Notes

### Website Instrumentation

**Add to website before launch:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID', {
    'allow_google_signals': true,
    'allow_ad_personalization_signals': true
  });
</script>

<!-- Event tracking wrapper -->
<script>
  function trackEvent(eventName, params) {
    gtag('event', eventName, params);
  }
</script>
```

### API Instrumentation (Backend)

**Instrument key API endpoints:**
```python
# On user signup
track_event('signup_completed', {
  'source': request.GET.get('utm_source'),
  'medium': request.GET.get('utm_medium'),
  'user_id': user.id,
  'timestamp': datetime.now().isoformat()
})

# On API key creation
track_event('api_key_created', {
  'user_id': user.id,
  'time_since_signup': (datetime.now() - user.created_at).total_seconds(),
  'source': user.utm_source
})

# On first API call
track_event('first_api_call', {
  'user_id': user.id,
  'endpoint': request.path,
  'time_since_signup': (datetime.now() - user.created_at).total_seconds()
})
```

---

## Contingency Plans

### If GA Tracking Fails
1. Switch to manual spreadsheet tracking (update every 2 hours)
2. Use Stripe webhook data as source of truth for revenue
3. Use Discord/GitHub APIs directly for community metrics
4. Manual checks of HN ranking and Product Hunt position

### If Traffic Spikes Unexpectedly
1. Increase Slack alert frequency
2. Add 30-minute summary reports
3. Prepare server scaling checklist
4. Notify product team for capacity planning

### If Signup Quality is Low (bot signups)
1. Implement email verification requirement
2. Add CAPTCHA to signup form
3. Review traffic sources for suspicious patterns
4. Flag sources with >80% non-activation rate

---

## Owner Responsibilities

| Task | Owner | Frequency |
|------|-------|-----------|
| Monitor real-time dashboard | Growth | Every 30 min (Day 1) |
| Check GA data accuracy | Analytics | Every 4 hours (Day 1) |
| Send Slack alerts | Automation | Real-time |
| Generate hourly summary | Growth | Every 4 hours (Day 1) |
| Generate daily report | Growth | Daily EOD |
| Review for issues | Growth Lead | 2x daily |
| Weekly deep-dive analysis | Growth Lead | Weekly (Day 7) |

---

## Tools & Credentials

| Tool | Purpose | Configured | Owner |
|------|---------|-----------|-------|
| Google Analytics 4 | Event tracking | No | Analytics |
| Slack API | Alerts | No | Growth |
| Stripe Webhook | Revenue tracking | No | Product |
| GitHub API | Star/fork tracking | No | Product |
| Discord API | Member tracking | No | Community |
| Google Sheets | Dashboard | No | Growth |
| Airtable (optional) | Dashboard | No | Growth |

**Action Items:** Assign setup owners and get credentials configured Day 0.

---

## Post-Launch Metrics Review (Day 30)

Once 30-day window closes, produce a comprehensive report:

1. **Did we hit targets?** (signups, conversions, engagement)
2. **What was the biggest surprise?** (positive or negative)
3. **What should we optimize?** (top 3 improvements)
4. **What should we kill?** (underperforming channels or features)
5. **What's next?** (Month 2 strategy)

Use this data to inform Week 2 optimization and Month 2 growth plan.

---

**Status:** Ready for implementation
**Timeline:** Setup Day 0, activate Day 1
**Owner:** Growth Marketing + Analytics Team
