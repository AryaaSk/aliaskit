# AliasKit Launch Marketing Assets

**Version:** 1.0
**Date:** 2026-03-28
**Owner:** Growth Marketing
**Status:** Ready for Review

---

## Product Hunt Launch Copy

### Hunt Title
"AliasKit — Identity provisioning for autonomous agents"

### Hunt Tagline
"One API call provisions a complete agent identity. Email, phone, verified credentials."

### Hunt Description (Main)
```
Agents need real identity to interact with the world.

Right now, building agent identity is a pain:
• Scatter APIs across Twilio, SendGrid, and others
• Navigate KYC requirements and account setup
• Manage separate billing and authentication
• Debug SMTP, phone routing, webhook timing

AliasKit fixes this. One REST API gives your agents:
✓ Verified email address (inbound + outbound)
✓ Phone number with SMS capabilities
✓ Identity metadata (name, jurisdiction, verification status)
✓ Complete provisioning in ~30 lines of code

Ship agent identity in minutes. No KYC. No vendor fragmentation. No expertise required.

Free tier: 10 identities/month. Pro: unlimited at $50/month.

Examples included for LangChain, Crew.ai, and vanilla Node.
```

### Key Talking Points (for Q&A)
- **Speed:** Average setup time is 5 minutes (vs. weeks with Twilio/SendGrid)
- **Completeness:** Email + phone bundled as one identity object (not two separate services)
- **DX:** 30 lines of code to provision a working agent identity
- **Pricing:** $50/month for unlimited identities (AgentMail + Twilio = $150+/month)
- **Integrations:** Ready for LangChain, Anthropic SDK, and any Node/Deno framework

### Maker Profile Highlights
- **Profile name:** AliasKit
- **Tagline:** "Email, phone, verified identity for agents"
- **About:** Built by [team], AliasKit is the identity infrastructure layer for autonomous agents
- **Website:** [demo.aliaskit.io or similar]
- **Twitter:** [@AliasKit or similar]

---

## HackerNews Launch Story

### Title
"AliasKit: Identity Provisioning for Autonomous Agents"

### Body (250 words, technical framing)

```
I've been watching the agent builder ecosystem grow, and noticed a gap: agents need real identity.

Right now, when you build an autonomous agent, you face a choice:
1. Use a shared email/phone (security risk, fragile)
2. Glue together Twilio + SendGrid + auth provider (vendor fragmentation, weeks of setup)
3. Build it yourself (months, compliance headaches)

None of these are great. Agents that operate autonomously need their own verified identity—
to sign up for services, receive email verification, authenticate via SMS, or negotiate with humans.

We spent the last 3 months building AliasKit: one API that provisions both email and phone identity
for agents, with all the boring stuff (SMTP routing, SMS delivery, inbound message handling)
handled automatically.

Here's what makes it different:

**Simplicity:** One REST call returns email address + phone number + auth token. No KYC forms.
No account setup. Works in Node, Deno, browsers.

**Bundled:** Email + phone as one coherent identity object. Not two separate services.
Not Twilio's phone + SendGrid's email scattered across docs.

**Built for agents:** Our rate limits, pricing, and API design assume agents—not humans.
So instead of paying $0.01 per SMS + SMTP setup, it's a flat $50/month for unlimited identity provisioning.

**Framework-ready:** Works out of the box with LangChain, Crew.ai, Anthropic SDK.
One-line import to give your agents identity.

We're open to partnership with frameworks (LangChain, Anthropic, etc.) and early adopter feedback.
This is the MVP—Phase 2 will add SOC 2, audit logs, team controls for enterprise.

Free tier available: 10 identities/month. Hit us up if you're building agents.

---

GitHub: [github.com/aliaskit/sdk]
Docs: [docs.aliaskit.io]
```

---

## Twitter Announcement Thread

### Tweet 1 (Hook)
"Agents can now provision real identity.

Email address. Phone number. Verified credentials.

One API call. No KYC. No SMTP debugging. No vendor fragmentation.

Introducing AliasKit.

🧵 (1/5)"

### Tweet 2 (Problem)
"Here's what it's like building agent identity today:

❌ Glue Twilio + SendGrid + auth provider (weeks of setup)
❌ Use shared email/phone (security risk)
❌ Build it yourself (compliance nightmare)

Agents deserve better. (2/5)"

### Tweet 3 (Solution)
"One REST call gives your agents:
✓ Verified email (inbound + outbound)
✓ SMS-capable phone number
✓ Identity metadata
✓ Zero setup friction

30 lines of code. 5 minutes. Done. (3/5)"

### Tweet 4 (Proof Point)
"AgentMail + Twilio + SendGrid = $150+/month + complexity

AliasKit = $50/month, unified, agent-first pricing

Free tier: 10 identities/month

Works with LangChain, Crew.ai, any agent framework. (4/5)"

### Tweet 5 (CTA)
"Try it now. Build something ambitious.

🔗 [link to demo]

GitHub | Docs | Discord

(5/5)"

---

## LinkedIn Announcement Post

**Headline:** "Why Autonomous Agents Need Real Identity"

**Body:**

"Autonomous agents are becoming the standard for workflow automation. But there's a gap in the infrastructure layer: identity.

Today, we're launching AliasKit—the identity provisioning platform built for agents.

Why it matters:
- Agents need real email addresses to sign up for services
- They need phone numbers to verify accounts and receive notifications
- They need trustworthy credentials to operate independently
- Current workarounds (shared inboxes, scattered APIs) are fragile and slow

What AliasKit does:
✓ Provisions complete agent identity in one API call
✓ Manages email, phone, and verification automatically
✓ Integrates with LangChain, Anthropic, and other major frameworks
✓ Priced for scale ($50/month unlimited, free tier available)

We've spent months talking to AI engineers, startup founders, and framework maintainers. The need is real. The solution is here.

If you're building autonomous agents—whether it's hiring workflows, customer support automation, or vendor negotiation—AliasKit is built for you.

Check out the demo and GitHub examples. Join us in building the next generation of autonomous infrastructure.

[Link]
[Link]
[Link]"

---

## Guest Post Outline (800 words)

### Title
"Building Autonomous Workflows That Work: The Role of Agent Identity"

### Sections (with word counts)

**Opening/Problem (100 words)**
- Start with a real scenario: An agent trying to sign up for SaaS and failing because it has no verified identity
- Pose the question: "If agents can perform complex tasks autonomously, why can't they provision their own verified identity?"
- Preview the solution: How AliasKit changes this dynamic

**Section 1: The Identity Infrastructure Gap (150 words)**
- Agent frameworks (LangChain, Anthropic SDK, Crew.ai) handle orchestration beautifully
- But they don't handle identity
- Current workarounds: shared email, scattered APIs, manual setup
- Why this matters for real-world use cases: agent verification, service integration, contract negotiation

**Section 2: What Real Agent Identity Unlocks (200 words)**
- An agent can autonomously negotiate contracts (with verified identity)
- An agent can sign up for services and manage accounts
- An agent can receive and respond to email and SMS
- An agent can operate with the same credibility as a human
- Examples: hiring agent, vendor management agent, support automation

**Section 3: Building Agent Identity Right (250 words)**
- Challenges: SMTP routing, SMS delivery, KYC, compliance, rate limiting
- How AliasKit handles it: bundled solution, agent-first pricing, framework integrations
- Developer experience comparison: 5 minutes with AliasKit vs. weeks with alternatives
- Code walkthrough: Simple provisioning example

**Closing/Call-to-Action (100 words)**
- Vision: Agent identity as a standard infrastructure layer (like logging or authentication)
- Invitation: Try AliasKit, build something ambitious, share feedback
- Link to free tier, examples, Discord community

---

## Newsletter Sponsorship Pitches

### Template for Top 10 Tech Newsletter Targets

**Target List:**
1. TheAlgorithm (MIT Tech Review newsletter)
2. Import AI (Jack Clark / Anthropic research newsletter)
3. Lunchclub AI Digest
4. The Neuron (AI news)
5. Practical AI (Changelog)
6. AI Weekly
7. Ben's Bites (AI + startups)
8. The Batch (Andrew Ng)
9. AIInformed
10. Stratechery (for enterprise edition)

### Sponsorship Pitch Template

**Subject:** Sponsorship opportunity: AliasKit (agent infrastructure)

Dear [Newsletter Editor],

We're launching AliasKit—identity provisioning infrastructure for autonomous agents—and your audience of AI engineers and builders would find it valuable.

**Quick context:**
- Agent frameworks (LangChain, Anthropic SDK, Crew.ai) are growing rapidly
- But agents lack a standard way to provision real identity (email, phone, verified credentials)
- AliasKit solves this with one API call

**Who should care:**
- AI engineers building autonomous workflows
- Startup founders deploying agents
- Framework maintainers (LangChain partners, etc.)
- Your readers building next-gen infrastructure

**Sponsorship proposal:**
[Choose one]
- Ad slot in your newsletter (week of [date])
- Dedicated sponsor story (500 words, technical framing)
- Joint webinar / interview with your audience

**Assets we'll provide:**
- Sponsor copy tailored to your audience
- Demo video (2 min) for inclusion
- Exclusive promo code for your readers

Would you be interested in a conversation? Happy to jump on a quick call.

Best,
[Name]
AliasKit Growth

---

## Social Media Graphics (3-5 Assets)

### Asset 1: "One API Call" Graphic
- Visual: Code snippet on left, agent avatar + email + phone icon on right
- Headline: "One API Call"
- Subheading: "Email + phone identity for agents"
- CTA: "Try free"

### Asset 2: Comparison Table
- Visual: Side-by-side comparison (AliasKit vs. Twilio + SendGrid)
- Dimensions: Setup time, cost, API complexity, phone support
- Headline: "Build 10x faster"

### Asset 3: Use Case Carousel (Instagram Story / Carousel)
- Slide 1: Hiring agent needs verified identity
- Slide 2: Support agent needs to verify customers
- Slide 3: Workflow agent needs to sign up for services
- CTA on each: "Identity for agents"

### Asset 4: Quote/Testimonial
- Once we have early user feedback: "I was spending weeks setting up email + phone. AliasKit took 30 minutes." — [User]
- Visual: Testimonial card with avatar

### Asset 5: Feature Highlight
- Visual: Feature icons (email, phone, verification, integrations)
- Headline: "Everything agents need in one place"

---

## Demo Link & Testing Checklist

### Demo Endpoints
- [ ] Demo signup page (email only for quick testing)
- [ ] Dashboard showing created identities
- [ ] API endpoint for creating identity (documented)
- [ ] Email testing (forward message to demo address, verify receipt)
- [ ] SMS testing (send SMS to demo number, verify receipt)
- [ ] Framework integration examples (LangChain, basic Node)
- [ ] Monitoring dashboard (real-time provisioning activity)

### Pre-Launch Testing
- [ ] All links in marketing copy are live
- [ ] Demo video plays on social platforms
- [ ] Sign-up flow is under 2 minutes
- [ ] Email forwarding works (test with Gmail, Outlook)
- [ ] SMS delivery works (test with major carriers)
- [ ] Dashboard loads under 3 seconds
- [ ] Mobile experience is clean

---

## Launch Checklist (Internal)

- [ ] HN story submitted (Day 1, 10 AM)
- [ ] Twitter thread posted (Day 1, 10 AM)
- [ ] LinkedIn post live (Day 1, 10 AM)
- [ ] Product Hunt live (Day 1)
- [ ] Newsletter sponsorships sent and confirmed
- [ ] Blog post published (support HN / Twitter momentum)
- [ ] Devrel manager posts to agent framework Discord/Slack
- [ ] Beta users briefed on Day 0 support expectations
- [ ] Metrics dashboard live (tracking signups, conversions, traffic sources)
- [ ] Support email monitored (30 min SLA)
- [ ] Slack notifications set up for real-time metrics

---

## Status & Next Steps

All copy and messaging assets are ready for review. Pending:
1. CMO approval of core positioning and copy tone
2. Design team finalization of social graphics
3. Demo environment hardening and testing
4. Newsletter outreach execution (requires approvals from partners)

**Timeline to launch:**
- Day 1-2: Internal review and approval
- Day 3: Final demo testing
- Day 4: Go/no-go decision
- Day 5: Public launch (HN, Twitter, Product Hunt)
