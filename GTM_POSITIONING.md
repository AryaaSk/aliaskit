# AliasKit — Go-to-Market Positioning Statement

**Version:** 1.0
**Date:** 2026-03-28
**Audience:** Marketing, Sales, Product, Partnerships
**Next Review:** Post-launch (when initial customer feedback is in)

---

## Core Positioning

### Primary Positioning (Primary Audience: Indie/Startup Agent Builders)

**Headline:**
"The identity primitive for autonomous agents. One API call, one complete digital identity."

**Tagline:**
"Email, phone, verified identity — without the setup friction."

**Why This Works:**
- Shifts perception from "feature parity" (email+phone) to "architectural need" (identity)
- Emphasizes completeness ("one API call") vs. scattered solutions (AgentMail + AgentPhone + auth provider)
- Speaks to the developer pain point: agents need *identity*, not just *email*

---

## Positioning Pillars

### Pillar 1: Identity Infrastructure (Core)

**What:** AliasKit is not a communication tool. It's an identity system.

**Why It Matters:**
- Agents need to be *entities*, not just compute endpoints
- Current alternatives treat agents as extensions of humans (borrowed email, shared Slack accounts)
- AliasKit makes agents independent, credible actors

**Supporting Messages:**
- "An agent with its own email address is more trustworthy than one using a shared inbox"
- "Real identity unlocks real capabilities: service signup, account recovery, contract negotiation"
- "One identity object. Email, phone, metadata, all coherent."

**Who Cares:** AI engineers, agent framework builders, autonomous workflow teams

---

### Pillar 2: Developer Experience (Differentiator)

**What:** Ship agent identity in minutes, not weeks.

**Why It Matters:**
- Twilio requires KYC, phone routing expertise, billing account setup
- Email APIs scatter across SendGrid, Postmark, Resend — no phone parity
- AliasKit: one REST call, one dashboard, one SDK

**Supporting Messages:**
- "Faster to ship identity than to debug SMTP"
- "30 lines of code to provision a complete agent identity"
- "Dashboard that doesn't require telecom expertise"

**Who Cares:** Indie/startup builders, fast-moving product teams, agent framework maintainers

---

### Pillar 3: Bundled & Priced Right (Competitive)

**What:** Email + phone together, at a price point that makes the bundle more valuable than individual components.

**Why It Matters:**
- AgentMail (email) + AgentPhone (phone) = separate subscriptions, separate API keys, separate dashboards
- Twilio + SendGrid = enterprise pricing, overkill for agents
- AliasKit: one subscription covers identity lifecycle

**Supporting Messages:**
- "Eliminate vendor fragmentation. One provider, one API, one bill."
- "10x cheaper than building this with Twilio + SendGrid"
- "Free tier: 10 identities/month. Pro: unlimited at $50/mo (undercutting AgentMail+AgentPhone pricing)"

**Who Cares:** Startup builders, cost-conscious teams, open-source agent frameworks

---

## Secondary Positioning (Enterprise Audience)

**Headline:**
"Agent identity management platform with audit, compliance, and scale."

**Why Different:**
- Enterprise cares about SOC 2, audit trails, team management, API usage tracking
- Consumer messaging (identity, DX) is too casual for enterprise

**Supporting Messages:**
- "Coming in Phase 2: API key management, audit logs, team controls, SOC 2 certification"
- "Start simple, scale with compliance built-in"
- "Multi-tenant identity management for enterprise AI deployments"

**Who Cares:** Fortune 500 IT, AI ops teams, managed AI service providers

---

## Positioning by Audience Segment

### Segment 1: Agent Framework Developers (LangChain, Anthropic, OpenClaw)

**Positioning:** "The default identity layer for agents"

**Key Message:**
- "Integrate AliasKit into your framework. Give agents identity out-of-the-box."
- "One-line import: `from aliaskit import ProvisionIdentity`"
- "Your agents get email, phone, and verifiable credentials with zero additional setup."

**Tone:** Technical, collaborative, integration-first

**Call-to-Action:**
- Partner on bundled integration
- Co-marketing (blog posts, examples)
- Revenue share on identity provisioning

**Success Metric:** AliasKit available in framework docs, used by 20%+ of agents built with framework

---

### Segment 2: Indie/Startup Agent Builders

**Positioning:** "Ship agents faster. Identity out of the way."

**Key Message:**
- "Stop cobbling together email providers and phone APIs"
- "Provision a complete agent identity in one REST call"
- "Real identity, real trust, real interactions"

**Tone:** Casual, solution-focused, empowering

**Call-to-Action:**
- Sign up free
- Follow tutorial (GitHub, blog)
- Join community (Discord)

**Success Metric:** 100+ free-tier signups in first 30 days; 20+ paid conversions by day 90

---

### Segment 3: Enterprise AI Teams

**Positioning:** "Manage agent identities at scale, with compliance"

**Key Message:**
- "Audit trail for every identity action"
- "Team-based access controls and approval workflows"
- "SOC 2 coming in Phase 2; compliance roadmap visible now"

**Tone:** Professional, compliance-conscious, credible

**Call-to-Action:**
- Book a demo
- Get technical specification
- Discuss custom SLA

**Success Metric:** 3–5 enterprise pilot conversations by day 90

---

## Key Claims & Proof Points

| Claim | Proof Point | Source |
|-------|------------|--------|
| "Complete identity in one API call" | OpenAPI spec, SDK examples | SPEC.md + SDK documentation |
| "10x faster than Twilio+SendGrid" | Comparison table (setup time, API complexity) | Build marketing page |
| "Undercutting AgentMail+AgentPhone" | Pricing table side-by-side | Validate with pricing research |
| "Default for agent frameworks" | Partnerships with LangChain, Anthropic | In-flight (Q2 target) |
| "SOC 2 compliance by Q3" | Roadmap commitment + timeline | Publish roadmap publicly |

---

## Competitive Differentiation Matrix

### vs. AgentMail (Email-Only)

| Dimension | AliasKit | AgentMail |
|-----------|----------|-----------|
| **Email + Phone** | ✅ Bundled | ❌ Email only |
| **Single API** | ✅ One | ❌ Multiple |
| **Price Point** | ✅ $50/mo (bundled) | ❓ Likely $40+/mo (email) |
| **DX** | ✅ Optimized for agents | ❓ Unknown |
| **Time to Ship** | ✅ Days | ❓ Weeks |

**Positioning vs. AgentMail:** "Email is just the start. Agents need email *and* phone. One identity, one API."

---

### vs. Twilio (Incumbent)

| Dimension | AliasKit | Twilio |
|-----------|----------|--------|
| **Phone** | ✅ SMS (agents) | ✅ SMS/Voice (enterprise) |
| **Email** | ✅ Built-in | ❌ Separate provider |
| **Agent-Focused** | ✅ Yes | ❌ No (business-first) |
| **Setup Time** | ✅ 5 min | ❌ Days (KYC, approval) |
| **Price** | ✅ $50/mo (identity) | ❌ $0.01/SMS + setup |

**Positioning vs. Twilio:** "Twilio is for telecom. AliasKit is for agents. We're built for what you're trying to do."

---

## Launch Messaging Timeline

### Week 1 (Launch): "Identity for Agents"
- Announce: AliasKit is live
- Key message: "Agents can now provision real email addresses and phone numbers"
- Channels: HN, Twitter, agent community Slack, agent framework Discord

### Week 2–4 (Traction): "Framework Integration"
- Announce: LangChain / Anthropic SDK integration (if ready)
- Key message: "Your agent has an identity, automatically"
- Channels: Framework docs, framework blogs, tutorials

### Week 4–12 (Community): "Developer Testimonials"
- Case studies: Early adopters building [agent type] with AliasKit
- Key message: "Here's what people built in the first 30 days"
- Channels: Blog, community Discord, Twitter

### Month 3+ (Roadmap): "Enterprise Coming"
- Announce: Phase 2 roadmap (audit logs, SOC 2, team controls)
- Key message: "AliasKit: from indie to enterprise"
- Channels: Blog, sales outreach, industry events

---

## Tone & Voice

**Overall Tone:** Technical, direct, respectful of builder autonomy

**Word Choices:**
- ✅ "Provision identity" (architectural, precise)
- ❌ "Send emails" (too commodity-focused)
- ✅ "Agent as entity" (philosophical, clear)
- ❌ "Agent communication tool" (too feature-focused)
- ✅ "Real identity" (trustworthy, credible)
- ❌ "Virtual identity" (sounds fake, ephemeral)

**Tone Examples:**

**Good:**
> "Agents don't need your email. They need their own. AliasKit makes that possible."

**Bad:**
> "A better way for agents to send and receive emails."

**Good:**
> "One identity object. Everything an agent needs to operate independently."

**Bad:**
> "Email + SMS bundled. Save money."

---

## Success Metrics (90 Days)

| Metric | Target | Owner |
|--------|--------|-------|
| **Free-tier signups** | 100+ | Growth |
| **Paid conversions** | 20+ | Sales |
| **Framework partnerships** | 2+ (LangChain, Anthropic) | Partnerships |
| **Enterprise pilots** | 3–5 | Enterprise Sales |
| **Community members** | 500+ (Discord) | Community |
| **GitHub stars** | 200+ | Product |
| **Content reach** | 5k impressions/week | Marketing |

---

## Next Actions

- [ ] Create landing page copy (headline, subheading, CTA)
- [ ] Build pricing page with comparison tables
- [ ] Create LangChain/Anthropic partnership outreach docs
- [ ] Draft enterprise sales collateral (one-pager, pitch deck)
- [ ] Set up community (Discord, GitHub Discussions)
- [ ] Plan content calendar (tutorials, case studies, announcements)
- [ ] Create FAQ addressing AgentMail vs. AliasKit comparisons
