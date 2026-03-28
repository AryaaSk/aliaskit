# AliasKit — Messaging & Copy Guide

**Version:** 1.0
**Date:** 2026-03-28
**Owner:** Content Strategy
**Audience:** Marketing, Sales, Product, Partnerships

---

## Quick Reference: Positioning & Pillars

### Core Positioning
**"The identity primitive for autonomous agents. One API call, one complete digital identity."**

### Tagline
**"Email, phone, verified identity — without the setup friction."**

### Three Positioning Pillars
1. **Identity Infrastructure** — Agents as independent, credible entities (not compute endpoints)
2. **Developer Experience** — Ship agent identity in minutes, not weeks
3. **Bundled & Priced Right** — Complete solution, one provider, one bill

---

## Audience-Specific Messaging

### 1. AI Engineers & Agent Builders (Primary)

**Who:** Indie developers, startup founders, framework maintainers building agents

**Primary Pain Points:**
- Agents need real identity to interact with services (email verification, phone OTP, account recovery)
- Current workarounds = scattered APIs (SendGrid + Twilio) or manual setup (KYC, billing)
- No one-stop solution for "agent identity as a service"

**AliasKit Messaging:**
- **Hook:** "One API call provisions a complete agent identity"
- **Benefits:**
  - No Twilio KYC, no SMTP debugging, no phone routing expertise required
  - One REST call, one SDK, one dashboard—everything agents need
  - Free tier: 10 identities/month. Upgrade at $50/mo (vs. $150+ for Twilio + SendGrid)
- **Proof Points:**
  - 30 lines of code to create a working agent identity
  - Email receives automatically (Cloudflare catches inbound mail)
  - SMS arrives in seconds (Plivo backend)
  - Works in Node, Deno, Bun, browsers (zero dependencies)

**Copy Examples:**
- _Headline:_ "Identity for autonomous agents. Fast. Simple. Complete."
- _Subheading:_ "Ship agent identity in minutes. No KYC forms, no SMTP config, no vendor fragmentation."
- _CTA:_ "Try it free — 10 identities/month"

---

### 2. Framework Partners (LangChain, Anthropic, OpenClaw)

**Who:** Ecosystem/partnerships teams at major agent frameworks

**Primary Motivation:**
- Make their agent builders more successful (reduce friction)
- Gain exclusive/early integration positioning
- Enable new use cases (agents signing up for services autonomously)

**AliasKit Messaging:**
- **Hook:** "Complete the agent infrastructure with a built-in identity provider"
- **Value Proposition:**
  - LangChain agents get automatic identity provisioning on init
  - Anthropic SDK users can auto-configure email/phone for their agents
  - OpenClaw agents born with verified identity
- **Co-Marketing Angle:**
  - "Agents + Identity: Making Autonomous Workflows Real"
  - Joint blog post, documentation, example notebooks
  - Revenue share on provisioned identities

**Partnership Positioning:**
- _Not a sale pitch._ Framed as "completing the agent infrastructure stack"
- _Technical depth._ Explain integration requirements, SDKs, callback patterns
- _Mutual growth._ Framework success = agent adoption = more identities provisioned = revenue for both

**Copy Template:**
> "AliasKit completes your agent framework by providing first-class identity provisioning. When [Framework] agents initialize, they automatically get email + phone—no separate signup, no third-party API keys required. This enables autonomous workflows that aren't possible today."

---

### 3. Enterprise/Compliance-Focused Buyers

**Who:** Fortune 500 companies, regulated industries (finance, healthcare) deploying internal agents

**Primary Pain Points:**
- Audit trails, SOC 2, data residency, team access controls
- Can't use consumer products (data sovereignty concerns)
- Need fine-grained permissioning (who can create identities, read emails, etc.)

**AliasKit Messaging (Post-MVP):**
- **Hook:** "Verified agent identity with enterprise compliance built-in"
- **Benefits:**
  - SOC 2 compliance, encrypted data at rest
  - Audit logs of all identity operations
  - Team management (role-based access, API key scopes)
  - Data residency options

**Note:** Enterprise positioning is Phase 6+. Keep in backlog for now.

---

## Channel-Specific Copy

### Landing Page / Website

**H1:**
"The identity primitive for autonomous agents."

**H2:**
"Email, phone, verified identity — without the setup friction."

**Subheading (below hero):**
"One API call creates a complete digital identity. Agents can sign up for services, verify accounts, and operate independently on the internet—with zero KYC forms or manual setup."

**Feature Section (3 Pillars):**

**Identity Infrastructure**
"Agents are independent entities, not compute extensions. Real identity unlocks real trust and real capabilities: service signups, account recovery, contract negotiation."

**Developer Experience**
"Provision a complete agent identity faster than debugging SMTP. 30 lines of code. One REST call. Works everywhere—Node, Deno, Bun, browsers. Zero dependencies."

**Bundled & Priced Right**
"Email + phone together, for one price. Free tier: 10 identities/month. Pro: unlimited at $50/mo. That's 10x cheaper than Twilio + SendGrid."

**CTA:**
"Get started free — No credit card required"

---

### Email / Partnership Outreach

**Subject Line (Tier 1):**
"AliasKit: Completing [Framework] agent infrastructure"

**Opening (First Paragraph):**
> "Hi [Name], we're launching AliasKit—identity infrastructure for autonomous agents. We think [Framework] is the natural place where agents should be born with verified identity. We'd love to talk about bringing AliasKit into [Framework] core or community."

**Body (High-Level Pitch):**

1. **Problem:** Agents today lack identity. They can't sign up for services, verify via OTP, or interact with systems that demand verified humans.

2. **Solution:** AliasKit provisions email + phone in one API call.

3. **Why [Framework]:** Agents built with [Framework] should get identity by default. No extra signup, no separate API keys—just like they get logging and tracing.

4. **Ask:**
   - 30-min call to discuss integration architecture
   - We'd handle the technical implementation (500-1000 LOC)
   - Co-marketing if it's a good fit

5. **Close:** "Let me know your thoughts. Happy to jump on a call this week if you're interested."

---

### Social Media / Twitter

**Tweet 1 (Launch Announcement):**
"Introducing AliasKit—identity for autonomous agents. One API call creates a complete digital identity: email inbox, phone number, verified name. Agents can now sign up for services, verify accounts, and operate independently on the internet. Free tier: aliaskit.com"

**Tweet 2 (Developer-Focused):**
"Just shipped AliasKit SDK. Provision an agent identity in 30 lines of code. Works in Node, Deno, Bun, browsers. Zero dependencies. The missing piece of every agent framework. [link]"

**Tweet 3 (Positioning):**
"Agents without identity are compute endpoints. Agents with identity are independent entities that can negotiate contracts, recover accounts, and sign up for services. That's the future we're building with AliasKit."

---

### FAQ / Common Questions

**Q: How is AliasKit different from AgentMail?**
A: AgentMail does email. AliasKit does email + phone bundled into one identity. One API call provisions both channels. Plus, we designed specifically for agent use cases (not forwarding, not privacy-focused—autonomous operations).

**Q: Do I need both AliasKit and Twilio?**
A: No. AliasKit replaces Twilio for agents that need to receive emails and SMS. It's cheaper, has no KYC, and integrates directly with agent frameworks.

**Q: Can my agents send SMS?**
A: Receiving inbound SMS is in MVP. Sending SMS is on the roadmap (Phase 3+). Email sending is fully supported.

**Q: What happens if I delete an identity?**
A: The email address and phone number are released back to the pool. Email routing stops, phone callbacks stop. All messages are permanently deleted (configurable retention coming post-MVP).

**Q: Does AliasKit work for human users or just agents?**
A: Built for autonomous agents. Human users can use it, but the UX and pricing are optimized for agent workflows (high volume, short-lived identities, programmatic access).

---

## Brand Voice & Tone

### Core Principles
1. **Technical but accessible** — Explain complexity clearly, but don't dumb it down
2. **Direct and honest** — No marketing fluff. "This is the problem. This is our solution."
3. **Agent-centric** — Always frame benefits in terms of agent capabilities, not human workflows
4. **Fast and minimal** — Copy should be concise. Show, don't tell.

### Examples of Voice

**Good:**
- "Provision an agent identity in 30 lines of code"
- "Email, phone, identity—one API call"
- "No KYC forms. No SMTP debugging. No vendor fragmentation."

**Avoid:**
- "Unlock the power of agent identity" (vague)
- "Experience the future of autonomous workflows" (hype)
- "Revolutionary identity infrastructure" (buzzword-heavy)

---

## Messaging Calendar (Q2 2026)

| Date | Channel | Message | Audience |
|------|---------|---------|----------|
| Week 1-2 | Website | Launch GTM messaging on landing page | Organic/cold traffic |
| Week 2-3 | Email | Partnership outreach (LangChain, Anthropic, OpenClaw) | Framework leaders |
| Week 3-4 | Twitter | Launch announcements, "why identity" thought pieces | AI community |
| Week 4-5 | Blog | "Agents Need Identity" (positioning piece) | Technical audience |
| Week 5-8 | Code examples | Agency use case walkthroughs (autonomously sign up for services) | Developers |
| Week 8-12 | Co-marketing | Framework partnership announcements (if closed) | Broader audience |

---

## Content Assets to Create (Next Steps)

- [ ] Partnership outreach email templates (for LangChain, Anthropic, OpenClaw)
- [ ] One-pager for partnerships / investors
- [ ] Website copy updates (landing page, pricing page, docs)
- [ ] Blog post: "Why Agents Need Identity"
- [ ] Blog post: "Building Autonomous Workflows That Actually Work"
- [ ] Technical deep-dive: Email/SMS architecture (developer credibility)
- [ ] Framework integration guides (for each Tier 1 partner)
- [ ] PR pitch / press release template
