# AliasKit Support FAQ — Day 0 Launch

**Owner:** Ops/Support Team
**Purpose:** Fast, consistent responses during launch day
**When to use:** Day 0, 10 AM onwards
**Response Time SLA:** 30 minutes max

---

## Quick Reference Matrix

| Category | Type | Response Template | Priority |
|----------|------|-------------------|----------|
| **Onboarding** | How do I get started? | Use "Getting Started" template | Medium |
| **API Questions** | How do I use the API? | Use "API Basics" template | High |
| **Pricing** | How much does it cost? | Use "Pricing" template | Low |
| **Demo Issues** | Demo not working | Escalate to Product (SLA: 5 min) | Critical |
| **Account Issues** | Can't log in / reset password | Escalate to Ops (SLA: 10 min) | High |
| **Feature Requests** | Can you add X feature? | Use "Thank you for feedback" template | Low |
| **Billing** | Invoice / payment questions | Escalate to Finance (SLA: 2h) | Medium |

---

## FAQ Templates (Copy-Paste Ready)

### 1. Onboarding Question

**Customer Asks:** "How do I get started with AliasKit?"

**Response Template:**

```
Thanks for trying AliasKit! 🎉

Here's how to get started in 3 minutes:

1. **Create Account** → Visit aliaskit.com/signup
2. **Verify Email** → Check your inbox (we send a verification link)
3. **Explore Demo** → Try our interactive demo once logged in
4. **Create Your First Workflow** → Use our quickstart guide

Quick Links:
- Quickstart Guide: [link]
- Interactive Tutorial: [link]
- Example Workflows: [link]

Questions? Reply here or ping us on [Discord/Slack].

Welcome aboard! 🚀
```

**Response Time:** 15 min

---

### 2. API Integration Question

**Customer Asks:** "How do I integrate AliasKit into my app?"

**Response Template:**

```
Great question! AliasKit integrates via a simple REST API.

Here's the quick version:

1. **Get API Key** → Settings > API Keys (in your dashboard)
2. **Review API Docs** → aliaskit.com/docs/api
3. **Make First Call** → `POST /api/workflows/create`
4. **Test in Playground** → aliaskit.com/playground

Code Example (Node.js):
```js
const response = await fetch('https://api.aliaskit.com/workflows', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'My Workflow',
    trigger: 'manual'
  })
});
```

Quick Links:
- Full API Reference: [link]
- SDK (Node, Python, Go): [link]
- Code Examples: [link]

Stuck somewhere? Reply with the specific error and I'll help.

Happy integrating! 🛠️
```

**Response Time:** 20 min

---

### 3. Pricing Question

**Customer Asks:** "How much does AliasKit cost?"

**Response Template:**

```
Our pricing depends on your usage:

**Starter Plan** — Free
- Up to 100 workflows
- 1,000 executions/month
- Community support

**Pro Plan** — $29/month
- Unlimited workflows
- 100,000 executions/month
- Priority email support
- Advanced analytics

**Enterprise** — Custom pricing
- Custom execution limits
- Dedicated support
- SSO & advanced security
- SLA guarantee

See full details: aliaskit.com/pricing

For your use case, what's your approximate execution volume? I can help recommend the right plan.
```

**Response Time:** 10 min

---

### 4. Demo Not Working (CRITICAL)

**Customer Asks:** "The demo link is broken / demo won't load"

**ESCALATION REQUIRED** — This is critical to Day 0 launch impact.

**Response Template:**

```
Oh no! Demo issues are priority #1 for us.

Quick diagnostics:
- Browser: [Chrome/Safari/Firefox/Other?]
- Device: [Desktop/Mobile?]
- Error message: [What does it say?]
- Screenshot: [Can you share?]

I'm escalating this to our Product team immediately. They'll respond within 5 minutes.

In the meantime, here are alternatives:
- Try a different browser: [link]
- Watch our demo video: [link]
- Early access beta: [link]

We'll get this fixed ASAP. Thanks for your patience!
```

**Response Time:** Immediate escalation to Product (SLA: 5 min)
**Internal Escalation:** @ProductLead - CRITICAL: Demo issue reported

---

### 5. Account / Login Issue

**Customer Asks:** "Can't log in / password reset not working"

**Response Template:**

```
Let's get you back in!

Quick fixes:
1. Try password reset: aliaskit.com/forgot-password
2. Check spam folder for reset email
3. Clear browser cache and cookies
4. Try incognito/private browsing mode

Still stuck? Let me know:
- Which email address? [your email]
- What error do you see? [error message]
- When was your last successful login? [date]

I'll escalate this to our Ops team if the above doesn't work.
```

**Response Time:** 15 min (escalate if not resolved)
**Internal Escalation:** @OpslLead - Account issue: [email]

---

### 6. Feature Request

**Customer Asks:** "Can you add feature X?"

**Response Template:**

```
Thanks for the suggestion! We love hearing what our users want.

We're tracking feature requests in our public roadmap: [link]

Can you tell us a bit more?
- What problem does this solve for you?
- How often would you use this?
- What's your estimated ROI if we build this?

We review feature requests monthly and prioritize based on user demand. If this is something you're passionate about, I can add your +1 to the request.

Thanks for the feedback! 🙌
```

**Response Time:** 20 min

---

### 7. Billing / Invoice Issue

**Customer Asks:** "Where's my invoice? / Can I change my plan?"

**Response Template:**

```
Happy to help with billing!

Quick options:
- View invoices: Dashboard > Billing > Invoices
- Change plan: Dashboard > Billing > Plan (changes take effect immediately)
- Download invoice: Click invoice in history
- VAT / tax certificate: Email billing@aliaskit.com

Still need help? Let me know:
- What's the issue? [specific question]
- Which plan are you on? [Starter/Pro/Enterprise]
- Can you share your email? [email]

For complex billing questions, I'm escalating to our Finance team (response within 2 hours).
```

**Response Time:** 20 min (escalate if needed)
**Internal Escalation:** @Finance - Billing request: [details]

---

## Critical Issue Escalation Matrix

| Issue Type | Escalate To | SLA | Flag Color |
|-----------|-------------|-----|------------|
| Demo broken | @ProductLead | 5 min | 🔴 CRITICAL |
| API not responding | @Backend | 10 min | 🔴 CRITICAL |
| Account locked / lost access | @Ops | 10 min | 🟠 HIGH |
| Data loss reported | @CTO | 15 min | 🔴 CRITICAL |
| Security issue | @Security | 5 min | 🔴 CRITICAL |
| Billing discrepancy | @Finance | 2h | 🟡 MEDIUM |
| Feature request / feedback | #feedback-channel | 24h | 🟢 LOW |

---

## Day 0 Launch Support Protocol

**10:00 AM** — Launch announced publicly

**10:00 - 10:30 AM** — Expect surge of questions
- Deploy extra support staff if needed
- Use quick-response templates above
- Escalate critical issues immediately
- Track all questions for post-launch analysis

**10:30 AM - 2:00 PM** — Peak support window
- Monitor response time (target: <15 min average)
- Identify common questions (add to FAQ if needed)
- Escalate any systemic issues (e.g., API down, demo broken)
- Report blockers to @ProductLead every 30 min

**2:00 PM - 6:00 PM** — Continued monitoring
- Shift to async responses if surge has passed
- Prioritize critical issues
- Begin post-launch analysis
- Document any patterns for improvement

**6:00 PM** — EOD recap
- All critical issues resolved
- High-priority issues escalated
- Support team brief to leadership
- Lessons learned documented

---

## Messaging Tone

✅ **DO:**
- Be warm and empathetic ("We're here to help!")
- Acknowledge the issue ("That's frustrating")
- Provide specific next steps
- Set clear expectations ("We'll respond within...")
- Say thank you ("Thanks for trying AliasKit!")

❌ **DON'T:**
- Be robotic or corporate ("Your request has been logged")
- Blame the customer ("You should have...")
- Over-apologize ("We're so sorry" x5)
- Make promises you can't keep ("We'll fix it in 5 minutes")
- Use jargon without explaining

---

## Real-Time Status Updates

**If there's a system issue (API down, demo broken, etc.):**

1. **First response** (within 5 min):
```
We're aware of an issue with [feature]. Our team is investigating.
Status: Investigating
ETA: [time based on severity]
Updates: Every 15 minutes
```

2. **Every 15 minutes** (until resolved):
```
Update: Still investigating. [What we've done so far]
ETA: [revised estimate]
Workaround: [if available]
```

3. **Resolution** (when fixed):
```
✅ Issue resolved! [Brief explanation of what happened]
[How to resume using AliasKit]
Thank you for your patience!
```

---

## Post-Launch Analysis

**Collect these metrics:**
- Total support tickets received (by hour)
- Top 5 questions asked
- Average response time
- Critical issues (escalated)
- Customer sentiment (positive/neutral/negative)
- Conversion rate (help → user retained)

**Share daily standup with:**
- Growth Marketing (optimization insights)
- Product (feature requests / common confusion)
- Leadership (user feedback summary)

---

## Contact Info for Internal Escalation

| Team | Contact | Role | Hours |
|------|---------|------|-------|
| Product | @ProductLead | Demo validation | Day 0, 10-6 PM |
| API/Backend | @Backend | API issues | Day 0, 10-6 PM |
| Operations | @Ops | Account/access issues | Day 0, 10-6 PM |
| Security | @Security | Security issues | 24/7 on-call |
| Finance | @Finance | Billing issues | Business hours |
| Growth Marketing | @GrowthMarketer | User feedback / insights | Day 0, 10-6 PM |

---

## Remember

- **You are the voice of AliasKit** on Day 0
- **Every response matters** — first impressions count
- **Your speed sets tone** — fast, helpful support creates word-of-mouth
- **Document everything** — user questions inform product improvements
- **Ask for help** — if you're unsure, escalate rather than guess

**Good luck tomorrow! 🚀**

