# AliasKit — Partnership Outreach Templates

**Version:** 1.0
**Date:** 2026-03-28
**Owner:** Partnerships
**Purpose:** Email templates, pitch talking points, and outreach strategy for Tier 1 framework partners

---

## Outreach Strategy Overview

**Timeline:** 90 days to partnership announcements (Week 1–12)

**Target Frameworks (Tier 1):**
1. **LangChain** (Partner with ecosystem/partnerships team)
2. **Anthropic SDK** (Partner with developer relations / agents team)
3. **OpenClaw** (Partner with maintainers or CEO)

**Key Principles:**
- Position as "completing the infrastructure," not "asking for a favor"
- Offer to build the integration (low friction on their end)
- Lead with technical depth and mutual benefit
- Personalize outreach (warm intro if possible, direct research if not)

---

## Email Template 1: LangChain Partnerships

**Subject Line Options:**
- "AliasKit + LangChain: Identity for autonomous agents"
- "Completing LangChain agent infrastructure"
- "LangChain agents + identity provisioning (technical partnership)"

**Email:**

```
Hi [Partnerships Lead Name],

I came across LangChain's recent announcements around agent capabilities,
and we're building something that we think completes the picture.

We launched AliasKit—an identity service for autonomous agents. One API call
provisions email + phone for an agent. We're thinking: what if LangChain agents
could auto-provision an AliasKit identity on initialization? That way,
developers don't need to set up email/phone separately. Agents are born ready
to sign up for services, verify accounts, and interact with the real world.

We're not asking for a major commitment. We're proposing to build the
integration ourselves (~500 LOC) and handle the engineering lift. All we'd
ask is:
- Inclusion in LangChain community integrations (or tools)
- A joint blog post or documentation callout
- Revenue share on identities provisioned via LangChain (5-10%)

LangChain's scale (~500k+ users) means this could be huge for both of us.
And honestly, agents without identity feel incomplete—we think you'd agree.

Would you be open to a 30-min call next week to explore this? Happy to show
a technical POC or dive into the integration architecture.

Best,
[Your Name]
AliasKit
```

**Follow-up (if no response in 1 week):**

```
Hi [Name],

Following up on my email last week about AliasKit + LangChain. We're moving
pretty quickly on framework partnerships, so I wanted to circle back.

The core idea: agents built with LangChain get automatic identity (email + phone)
without extra setup. This unblocks workflows that aren't possible today
(autonomous signups, account recovery, etc.).

We're serious about making this happen and would handle all engineering.
Let me know if you'd like to chat—we could even start with a technical deep-dive
if that's more useful for your team.

Thanks,
[Your Name]
```

---

## Email Template 2: Anthropic (Claude SDK / Agents)

**Subject Line Options:**
- "AliasKit: Identity layer for Anthropic Agents API"
- "Claude agents + verified identity"
- "Integrating AliasKit with Anthropic's agent infrastructure"

**Email:**

```
Hi [Developer Relations / Agents Lead Name],

We're building AliasKit—identity infrastructure for autonomous agents.
Anthropic customers are exactly the cohort we think should get early access,
and we'd love to explore a partnership with your team.

Here's our thesis: As Claude agents become more autonomous (via function calling,
tool use, extended reasoning), they need identity to operate in the real world.
No agent should use a shared email. Every agent should have a verified phone
number if needed. Real identity unlocks real capabilities.

We're proposing:
- AliasKit as recommended identity provider in Anthropic docs/guides
- Early co-dev of integration with your agents SDK
- Anthropic customer incentives (volume pricing, etc.)
- Co-marketing push (blog, talks at community events)

We've already shipped:
- Complete REST API (email + phone provisioning)
- TypeScript SDK (zero dependencies)
- Dashboard for managing identities

Next steps, we're building integrations with major agent frameworks. Anthropic
being first would be hugely meaningful for both of us.

Would you have 30 min next week to discuss? I can walk through a technical
architecture or just chat about what agents need.

Best,
[Your Name]
AliasKit
```

**Follow-up (1 week):**

```
Hi [Name],

Just checking in on my email about AliasKit + Anthropic agents. We're excited
about exploring this partnership.

To give you a quick sense of scope:
- We've built the core API + SDK already (MVP ready)
- Integration with agent frameworks is straightforward (~500 LOC per framework)
- We're targeting LangChain, Anthropic, and OpenClaw as Tier 1 partners
- Revenue share / volume pricing are flexible

Happy to jump on a call at your convenience. Or if it's easier, we could start
with a technical RFP or integration spec.

Let me know!
[Your Name]
```

---

## Email Template 3: OpenClaw Maintainers / CEO

**Subject Line Options:**
- "Identity for OpenClaw agents"
- "Building together: AliasKit + OpenClaw"
- "OpenClaw agents + autonomous identity provisioning"

**Email:**

```
Hi [OpenClaw Maintainer / CEO],

We're building AliasKit—identity for autonomous agents. OpenClaw is doing some
of the most interesting work in agents, and we think identity is the missing
piece.

Right now, agents running on OpenClaw can't:
- Sign up for services (no verified identity)
- Receive account recovery emails (no email address)
- Complete phone-based verification (no phone number)

With AliasKit, that changes. Agents born on OpenClaw get email + phone identity
by default. New workflows become possible: autonomous hiring workflows,
customer support agents that can verify, vendor negotiations that need verified identity.

We're not asking for much:
- Built-in AliasKit integration in OpenClaw core (we build it)
- Documentation and examples for OpenClaw users
- Revenue share or partnership terms (flexible)

OpenClaw users are exactly the cohort that cares about this. Early partnership
here could be a huge differentiator for OpenClaw.

Would you be interested in a quick chat? We could explore integration architecture,
or I can send over a technical spec first.

Best,
[Your Name]
AliasKit
```

**Follow-up (if no response):**

```
Hi [Name],

Following up on AliasKit + OpenClaw partnership idea. Quick reminder: we're
proposing to bring verified agent identity to the OpenClaw ecosystem.

Specific ask: Built-in integration so OpenClaw agents automatically get email
+ phone identity. We handle the engineering, you get the feature.

Curious if this is something worth exploring?

[Your Name]
```

---

## Call Script / Talking Points (30-Min Call)

**Opening (1 min):**
- "Thanks for making time. I want to walk you through why we built AliasKit and how we think it completes your framework's agent infrastructure."

**Problem Statement (2 min):**
- "Agents right now are compute endpoints. They can't sign up for services, verify accounts, or interact with systems that need verified identity."
- "Framework users are building these workarounds manually—separate email APIs, Twilio for phone, manual spreadsheet tracking."
- "We think that's a gap in the framework layer. Identity should be built-in."

**AliasKit Intro (2 min):**
- "We launched AliasKit: one API call provisions email + phone for an agent."
- "Agents get a real email address, real phone number, verified name."
- "Works everywhere—Node, Deno, Bun, browsers. Zero dependencies."
- "30 lines of code to create an agent identity."

**Partnership Vision (2 min):**
- "[Framework] agents could auto-provision identity on initialization."
- "Developers don't need separate setup. It's built-in."
- "We'd handle the integration engineering. Your team doesn't need to build anything."
- "Revenue share on identities provisioned via your framework."
- "Co-marketing push: 'Agents + Identity' thought leadership."

**Technical Details (if they want them) (5 min):**
- "Email routing via Cloudflare Email Workers (catch-all MX record)"
- "SMS via Plivo (real phone numbers, inbound SMS support)"
- "REST API + SDK, full observability"
- "Integration is lightweight—callbacks in agent initialization, that's it"

**Ask (2 min):**
- "What would integration look like on your end? Any blockers we should know about?"
- "Are you interested in exploring this? What's the next step from your perspective?"
- "Timeline: we're targeting partnership announcements in Q2. Is that realistic for you?"

**Close (1 min):**
- "Really excited about this. Let's stay in touch."
- (If interested) "I'll send over a technical spec / RFP so your team can review."
- (If interested) "Let's schedule a follow-up with your engineering team to dive into architecture."

---

## One-Pager Template (For Email or In-Person)

**Format:** 1 page, can print or send as PDF

```
═══════════════════════════════════════════════════════════════════════

                           A L I A S K I T
           Identity Infrastructure for Autonomous Agents

═══════════════════════════════════════════════════════════════════════

WHAT IS ALIASKIT?
One API call provisions a complete agent identity:
  • Email address (dedicated inbox, send/receive)
  • Phone number (receive SMS, verify OTP)
  • Verified name (human-like agent identity)

PROBLEM WE SOLVE
Agents today are compute endpoints. They can't:
  ✗ Sign up for services (no verified identity)
  ✗ Verify via email (no email address)
  ✗ Verify via SMS (no phone number)
  ✗ Interact with systems requiring real credentials

ALIASKIT CHANGES THAT
One REST call. Instant agent identity.
  ✓ Email receives automatically
  ✓ SMS arrives in seconds
  ✓ Works everywhere (Node, Deno, Bun, browsers)
  ✓ Zero dependencies
  ✓ Free tier + affordable scaling

FRAMEWORK INTEGRATION
We propose integrating AliasKit into [FRAMEWORK] so agents auto-provision
identity on initialization. Developers don't need extra setup. Agents are
born ready to interact with the real world.

PARTNERSHIP MODEL
  • Revenue share: 5-10% of identities provisioned via [FRAMEWORK]
  • Co-marketing: Joint blog, documentation, examples
  • Engineering: We build the integration (~500 LOC)
  • Timeline: Partnership announcement in Q2 2026

WHY NOW?
Agents are moving from sandbox to production. The market window for "default
identity provider" is 6-12 months. Early partnerships create mindshare and
distribution moat.

CONTACT
[Your Name]
[Title]
AliasKit
[Email]
[Phone]

═══════════════════════════════════════════════════════════════════════
```

---

## Tracking & Follow-Up

**Outreach Pipeline:**

| Framework | Contact | Email Sent | Response | Status | Next Action |
|-----------|---------|-----------|----------|--------|------------|
| LangChain | [Name] | [Date] | [Yes/No] | Pending/In Progress | [Call scheduled?] |
| Anthropic | [Name] | [Date] | [Yes/No] | Pending/In Progress | [Call scheduled?] |
| OpenClaw | [Name] | [Date] | [Yes/No] | Pending/In Progress | [Call scheduled?] |

**Success Metrics:**
- [ ] All Tier 1 partners respond (initial contact)
- [ ] All Tier 1 partners have discovery call scheduled
- [ ] At least 1 Tier 1 partner green-lights technical integration
- [ ] Integration POC complete for first partner
- [ ] Co-marketing announcement (blog post) published

---

## Additional Resources

**What to prepare before outreach:**
- [ ] Live AliasKit demo (create identity, send email, receive email)
- [ ] Technical integration spec (for each framework)
- [ ] Pricing/revenue share proposal
- [ ] Co-marketing templates (blog post outline, Twitter thread, etc.)
- [ ] Customer testimonials or case studies (if available)

**What to send if they ask:**
- Technical spec / architecture document
- SDK documentation / API reference
- Competitive positioning (vs. Twilio, SendGrid, AgentMail)
- Sample integration code
- Roadmap (Phase 1-6 overview)
