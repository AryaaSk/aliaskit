# AliasKit — Website Copy Updates

**Version:** 1.0
**Date:** 2026-03-28
**Owner:** Content Strategy / Marketing
**Purpose:** Refresh website copy to reflect GTM positioning and messaging pillars

---

## Overview

Current landing page likely has generic/placeholder copy. This document provides refreshed copy aligned with GTM positioning that emphasizes:
1. **Identity Infrastructure** — Agents as independent entities
2. **Developer Experience** — Fast provisioning, minimal setup
3. **Bundled & Priced Right** — Complete solution, affordable

---

## Page-by-Page Updates

### 1. Homepage / Hero Section

**Location:** `/` (top of page)

**Current (Placeholder):**
- "Coming Soon" or generic "AliasKit" title
- Vague value prop about identity

**New Copy:**

#### H1 (Main Headline)
```
The identity primitive for autonomous agents.
```

#### H2 (Subheading)
```
Email, phone, verified identity — without the setup friction.
```

#### Hero Body Copy (2-3 sentences)
```
One API call creates a complete digital identity. Your agents can sign up
for services, verify accounts, and operate independently on the internet—
with zero KYC forms or manual setup.
```

#### Primary CTA Button
```
Get Started Free
```

#### Secondary CTA / Subtext (below CTA)
```
No credit card required. 10 free identities/month.
```

---

### 2. Features Section (Below Hero)

**Location:** Homepage, below hero section

**Structure:** 3 cards highlighting the positioning pillars

#### Card 1: Identity Infrastructure

**Icon:** Person/entity icon (or abstract verified badge)

**Title:**
```
Identity Infrastructure
```

**Body:**
```
Agents are independent entities, not compute extensions. Real identity
unlocks real trust and real capabilities: service signups, account recovery,
contract negotiation.
```

**Key Points (bullet list):**
- Verified agent identity (name, email, phone)
- Real email address (receive/send)
- Real phone number (receive SMS)
- Metadata for tracking (agent framework, purpose, etc.)

---

#### Card 2: Developer Experience

**Icon:** Code/terminal icon

**Title:**
```
Ship Identity in Minutes
```

**Body:**
```
Provision a complete agent identity faster than debugging SMTP. 30 lines
of code. One REST call. Works everywhere—Node, Deno, Bun, browsers.
Zero dependencies.
```

**Key Points (bullet list):**
- No KYC forms or verification delays
- No SMTP config, no phone routing expertise
- SDK works in all runtimes (zero polyfills)
- REST API for custom integrations
- Works in production instantly

---

#### Card 3: Bundled & Priced Right

**Icon:** Package/bundle icon

**Title:**
```
One Provider, One Bill
```

**Body:**
```
Email + phone together, at a price point that makes bundling more valuable
than the components. Free tier: 10 identities/month. Pro: unlimited at
$50/mo.
```

**Key Points (bullet list):**
- No vendor fragmentation (Twilio + SendGrid + auth provider)
- 10x cheaper than building with enterprise services
- Free tier for experimentation
- Transparent pricing, no hidden fees

---

### 3. Comparison Section (Optional)

**Location:** Homepage, above pricing section (optional; useful for competitive positioning)

**Title:**
```
Why AliasKit?
```

**Comparison Table:**

| Feature | AliasKit | AgentMail | Twilio + SendGrid | DIY |
|---------|----------|-----------|-------------------|-----|
| Email provisioning | ✓ | ✓ | ✓ (separate) | ✓ |
| Phone provisioning | ✓ | – | ✓ (separate) | ✓ |
| Bundled offering | ✓ | – | – | N/A |
| One API key | ✓ | ✓ | – (multiple) | N/A |
| SDK included | ✓ | ✓ | ✓ (separate) | – |
| KYC required | – | – | ✓ | – |
| Setup time (minutes) | 5 | 10 | 30+ | N/A |
| Price/month (unlimited) | $50 | ~$50 | $150+ | N/A |

---

### 4. Pricing Section

**Location:** `/pricing` or homepage pricing card

**Updated Copy:**

#### Section Title
```
Simple, Transparent Pricing
```

#### Intro Text
```
No surprises. Pay for what you use. Upgrade anytime.
```

#### Free Tier Card

**Plan Name:**
```
Free
```

**Price:**
```
$0/month
```

**Includes:**
```
✓ 10 identities/month
✓ Unlimited email sends/receives
✓ Unlimited SMS receives
✓ Full API access
✓ Community support
```

**CTA:**
```
Get Started
```

#### Pro Tier Card

**Plan Name:**
```
Pro
```

**Price:**
```
$50/month
```

**Includes:**
```
✓ Unlimited identities
✓ Unlimited email sends/receives
✓ Unlimited SMS receives
✓ Priority support
✓ Advanced analytics
```

**Best For:**
```
Teams shipping agents in production
```

**CTA:**
```
Start Free Trial
```

#### Enterprise Tier Card (Optional, Post-MVP)

**Plan Name:**
```
Enterprise
```

**Price:**
```
Custom
```

**Includes:**
```
✓ Everything in Pro
✓ SSO / team management
✓ SOC 2 compliance
✓ Custom SLAs
✓ Dedicated support
```

**CTA:**
```
Contact Sales
```

---

### 5. Getting Started / Quickstart Section

**Location:** Homepage or dedicated page

#### Section Title
```
Getting Started Takes Minutes
```

#### Intro
```
Create an agent identity with email + phone in just 30 lines of code.
```

#### Step-by-Step Visual / Code Block

```
1. Install the SDK
   npm install @aliaskit/sdk

2. Create an identity
   const ak = new AliasKit({ apiKey: "ak_live_..." })
   const identity = await ak.identities.create({
     provision_phone: true
   })

3. Use it
   console.log(identity.email)       // jordan.riley@aliaskit.to
   console.log(identity.phone)       // +12025551234
```

#### CTA
```
Read the Full Quickstart →
```

---

### 6. Use Cases / Success Stories Section

**Location:** Homepage or dedicated page

#### Section Title
```
What You Can Build With AliasKit
```

#### Use Case Cards (3-4 examples)

##### Use Case 1: Autonomous Signups

**Title:** "Autonomous Service Signups"

**Description:**
```
Let agents sign up for services without human intervention. Receive
verification emails, extract codes, complete OTP—all automatically.
```

**Example:** "An agent autonomously signs up for a GitHub account, verifies
the email, and creates a repository."

---

##### Use Case 2: Multi-Channel Verification

**Title:** "Email + SMS Verification"

**Description:**
```
Services that require dual-channel verification now work with agents.
Receive both email and SMS codes. Extract and use them automatically.
```

**Example:** "An agent signs up for a banking API, verifies via email,
confirms via SMS, and gains account access."

---

##### Use Case 3: Account Recovery

**Title:** "Account Recovery Workflows"

**Description:**
```
Agents can recover lost accounts, reset passwords, and manage account
operations without human involvement.
```

**Example:** "An agent resets a forgotten password by receiving a recovery
email, extracting the link, and completing reset."

---

##### Use Case 4: Identity Pooling

**Title:** "Test and Demo at Scale"

**Description:**
```
Create pools of identities for testing, demo flows, or distributed agent
deployments.
```

**Example:** "Create 50 test identities, run autonomous workflows in
parallel, then clean up automatically."

---

### 7. FAQ Section

**Location:** Homepage or dedicated page

**New FAQs (based on GTM messaging):**

---

#### Q: How is AliasKit different from Twilio or SendGrid?

**A:**
```
Twilio and SendGrid are powerful but enterprise-focused. Twilio requires
KYC, phone routing expertise, and billing account setup. SendGrid is
email-only. AliasKit is built specifically for agents: one API, one
dashboard, email + phone bundled, no KYC, $50/month. It's 10x faster
to get started and costs 3-5x less.
```

---

#### Q: Can I use AliasKit for human users?

**A:**
```
Technically yes—AliasKit works for humans. But we built it for agents.
The UX, pricing, and feature roadmap are optimized for autonomous
workflows (high volume, short-lived identities, programmatic access).
If you're building a human app, check out AgentMail or Twilio.
```

---

#### Q: What happens to emails/SMS when I delete an identity?

**A:**
```
Email routing stops immediately. All stored messages are deleted
(configurable retention coming post-MVP). The phone number is released
back to the pool for reassignment.
```

---

#### Q: Does AliasKit work in my framework? (LangChain, Anthropic, OpenClaw, etc.)

**A:**
```
We're actively building integrations with major agent frameworks. Check
the docs or contact us if your framework isn't listed. We accept requests
and can prioritize based on community demand.
```

---

#### Q: Is there an on-premise or self-hosted version?

**A:**
```
Not in the MVP. Post-MVP, we're evaluating self-hosted and private
infrastructure options for enterprise. DM us if this is critical for you.
```

---

### 8. Navigation / Header Copy

**Logo/Brand Name:**
```
AliasKit
```

**Nav Links (suggested):**
```
Home | Docs | Pricing | Blog | Dashboard
```

**Secondary CTA (top-right):**
```
Get Started Free → | Dashboard →
```

---

## Call-to-Action (CTA) Messaging

**Primary CTA:**
```
"Get Started Free"
"Try Free Today"
"Create Your First Identity"
```

**Secondary CTAs:**
```
"Read the Docs"
"View API Reference"
"See Examples"
"Book a Demo"
```

**Footer CTA:**
```
"Ready to ship agent identity? Start free."
```

---

## Tone & Style Notes

- **Be direct:** No buzzwords like "revolutionary" or "unlock the power."
- **Be technical:** Mention frameworks (Node, Deno, Bun), infrastructure (Cloudflare, Plivo), etc.
- **Be honest:** Acknowledge what we're NOT (enterprise compliance, on-prem, outbound SMS—yet).
- **Be agent-centric:** Frame benefits in terms of agent capabilities, not developer convenience.
- **Be concise:** Short sentences. Show, don't tell.

---

## Implementation Checklist

- [ ] Update homepage hero section (H1, H2, body, CTA)
- [ ] Create/update features section (3 cards, messaging pillars)
- [ ] Update pricing page with new pricing tier descriptions
- [ ] Add use cases / success stories section
- [ ] Update FAQ (add new Qs, refine answers)
- [ ] Update navigation and header copy
- [ ] Add comparison table (if competitive positioning desired)
- [ ] Update footer CTA
- [ ] Test all links (docs, API ref, pricing, etc.)
- [ ] Get feedback from product/partnerships teams
- [ ] Publish and monitor engagement

---

## Content Assets Needed (From Design/Product)

To implement these updates, you'll need:

- [ ] Icons for 3 feature cards (identity, developer experience, bundling)
- [ ] Use case graphics or example screenshots
- [ ] Updated hero image or background (can match existing brand)
- [ ] Pricing page redesign (if major layout change)
- [ ] FAQ page styling (if new section)

---

## Analytics & Measurement

Track these after updates:

- **Click-through rate on CTAs** (Get Started, Docs, etc.)
- **Time on page** for hero section
- **Scroll depth** to features / pricing sections
- **Form completions** (signup, contact)
- **Referral sources** (where traffic comes from)
- **Device split** (mobile vs. desktop)

Target: 15%+ click-through on primary CTA from organic traffic.
