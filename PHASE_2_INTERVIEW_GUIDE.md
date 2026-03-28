# Phase 2 Interview Guide

**Owner:** Competitive Analyst
**Timeline:** Week 2-4 (Begins during Week 2 of survey)
**Target:** 10-15 interviews across 3 segments

---

## Interview Overview

Phase 2 validates survey findings with deep-dive conversations. Interviews provide:
- **Qualitative context** for survey quantitative data
- **Nuanced pain points** (why, not just what)
- **Use case stories** for sales/marketing materials
- **Feature trade-offs** (e.g., "would you choose X over Y?")
- **Early reference customers** for beta/launch

---

## Interview Segments & Recruitment Strategy

### Segment 1: Indie Agent Builders (5 interviews)

**Who:** Individual developer or 2-3 person team building agents

**Where to recruit:**
- Survey respondents marked "Personal project / learning" or "Side project / indie business"
- Product Hunt, HackerNews community members
- Twitter DMs to prominent indie builders
- LangChain Discord active members

**Selection criteria:**
- Currently building agents (not evaluating)
- Active with at least one framework (LangChain, Anthropic, etc.)
- Willing to test beta / provide feedback

**Incentive:** Early access + $50 credits + public recognition

---

### Segment 2: Startup / Scale-Up Builders (5 interviews)

**Who:** 10-100 person company building agent-powered product

**Where to recruit:**
- Survey respondents marked "Startup / scale-up (10-100 people)"
- YC companies using agents
- First.com, Indie Hackers startup list
- LinkedIn searches: "agent," "AI," founded 2024-2026

**Selection criteria:**
- Agent infrastructure in production or near-production
- Multiple engineers on project
- Budget for infrastructure tooling
- Interest in enterprise features (webhooks, audit logs)

**Incentive:** Early access + $200 credits + partnership discussion

---

### Segment 3: Framework Maintainers (3-5 interviews)

**Who:** Maintainers of LangChain, Anthropic SDK, OpenClaw, etc.

**Where to recruit:**
- Direct email to GitHub maintainers
- Discord DM to maintainer accounts
- Conference / community events
- Survey respondents who listed framework maintainer role

**Selection criteria:**
- Active maintainance (merged PRs in last 30 days)
- 1000+ users/stars on their framework
- Interest in identity infrastructure problem

**Incentive:** Partnership discussion + revenue share opportunity + beta access

---

## Interview Structure

### Duration: 45-60 minutes
**Format:** Zoom/video preferred (observe body language, demo ability)
**Recording:** Yes (with permission) + notes + transcript

### Interview Flow

**[00:00-02:00] Welcome & Context Setting**

*"Thanks for making time. We're building AliasKit to solve identity infrastructure pain for agents. Before we go all-in on our roadmap, we want to understand how real builders actually work. Your feedback shapes what we build first."*

**Questions:**
1. "Tell me about the agents or products you're building right now."
   - What's the use case? How many users?
   - How mature is it? (POC / beta / production?)

2. "What frameworks/tools are you using?"
   - Why those choices?
   - How's the DX? (Setup time, documentation, community support)

---

**[02:00-10:00] Current Infrastructure & Pain Points**

*"Let me understand your current setup."*

**Questions:**
3. "Walk me through how you handle identity today."
   - Email: Which provider? (SendGrid, Mailgun, custom SMTP?)
   - Phone: Twilio, Plivo, custom?
   - How many providers total?
   - Separate integrations or unified?

4. "What's painful about that setup?"
   - Setup time? (How long did onboarding take?)
   - Cost? (What are you paying monthly?)
   - Feature gaps? (Any limits you hit?)
   - Reliability? (Outages, latency?)
   - Support / documentation quality?

5. "Have you evaluated other solutions?"
   - Considered Twilio, SendGrid, others?
   - Why chosen? Why not chosen?
   - What would make you switch?

---

**[10:00-20:00] AliasKit Concept & Use Case Testing**

*"Let me show you what we're building."*

**Demo/Walk-through (5-8 min):**
- Show AliasKit landing page / MVP demo
- Explain: unified email + phone API, framework integrations, pricing tiers
- Observe: Reactions, questions, head nods

**Questions:**
6. "How does this compare to your current setup?"
   - Would it simplify your infrastructure?
   - Switching cost: How hard would migration be?
   - Would you actually use it? (1-10 likelihood)

7. "What would need to be true for you to switch?"
   - Feature must-haves?
   - Pricing ceiling?
   - Support/SLA requirements?
   - Framework integration critical?

8. **Feature Trade-off:** "If you had to pick two features below, what would they be?"
   - Email provisioning (send/receive)
   - SMS provisioning (inbound)
   - Webhooks (real-time events)
   - Audit logs (compliance)
   - Team/multi-tenant controls
   - Framework integration [their framework]

   *Listen for reasoning: "I'd pick X because..." reveals priorities*

---

**[20:00-30:00] Segment-Specific Deep Dives**

### For Indie Builders:
9. "What would you expect to pay for this?"
   - Free tier expectations?
   - "Would $29/month break-even for you?"
   - Feature-gated or time-gated free trial?

10. "How do you discover tools like this?"
    - Product Hunt? HN? Twitter? Framework docs?
    - Who influences your decision? (Framework maintainer? Peers?)

### For Startups:
9. "Do you have team access / multi-tenant needs?"
   - How many engineers? How many customers?
   - Audit logs / SOC 2 requirements?

10. "What's your evaluation timeline?"
    - When would you move to production?
    - Who decides on infrastructure? (CTO, eng lead, founder?)

### For Framework Maintainers:
9. "Would you integrate AliasKit into [your framework]?"
   - Community demand for identity infrastructure?
   - How difficult would integration be?
   - Revenue-share / partnership model interesting?

10. "What would you need from us to promote this to your community?"
    - Co-marketing? Bundled examples? Revenue share?
    - Beta access for your community?

---

**[30:00-45:00] Messaging & Positioning Test**

*"We're thinking about how to position this. I'll read 3 messages; tell me which resonates."*

**Positioning A (Bundling):**
"AliasKit: Unified email and phone provisioning for agents. One API instead of three."

**Positioning B (DX/Speed):**
"AliasKit: Identity infrastructure for agents. Set up email + phone in minutes, not days."

**Positioning C (Competitive):**
"AliasKit: Faster than Twilio. Simpler than SendGrid. Built for agents."

**Questions:**
11. "Which of these makes you want to learn more?"
    - Why?
    - Which is least compelling? Why?

12. "What would you want to see on the landing page to get interested?"
    - Demo video?
    - Pricing comparison?
    - Framework integration docs?
    - Customer testimonials?

13. "If your framework integrated AliasKit, would that influence your decision?"
    - How much? (Game changer vs. nice to have)
    - What would the integration look like?

---

**[45:00-55:00] Go-to-Market & Partnership**

14. "How would you discover AliasKit?"
    - Search google for "email provisioning API"?
    - See it in framework docs?
    - Read about it on Product Hunt?
    - Recommendation from peer?

15. (For frameworks/startups) "Would you want to partner with us?"
    - Beta testing group?
    - Co-marketing?
    - Affiliate / revenue share?
    - Enterprise reference customer?

---

**[55:00-60:00] Closing**

16. "Any final thoughts or questions?"

17. "Would you be interested in early access? What's the best way to stay in touch?"
    - Collect email + preferred communication channel

**Thank you + next steps:**
"This was super helpful. We'll send you early access [timeline]. You'll be among the first to use it, and we'll check in for feedback as we build."

---

## Interview Notes Template

Create one doc per interview with:

```markdown
# Interview: [Respondent Name]
**Date:** [Date]
**Segment:** Indie / Startup / Framework Maintainer
**Framework:** [LangChain / Anthropic / etc.]

## Summary (2-3 sentences)
[Quick recap of key finding]

## Current Setup
- Email provider: [SendGrid / Mailgun / etc.]
- Phone provider: [Twilio / Plivo / custom]
- Total providers: [N]
- Pain points: [Top 2-3]

## AliasKit Response
- Likelihood to use (1-10): [X]
- Key concern: [Main blocker or question]
- Feature priorities: [Ranked top 3]

## Positioning Test
- Best resonated: [A / B / C]
- Why: [Quote or reason]

## Go-to-Market Insight
- Discovery preference: [Product Hunt / HN / Docs / Peer]
- Partnership interest: [Yes / Maybe / No + why]

## Quote / Highlight
*"[Most insightful quote from interview]"*

## Next Steps
- [ ] Send early access by [date]
- [ ] Invite to beta tester group? [Yes / No]
- [ ] Follow up on [specific question]: [Date]
```

---

## Recruitment Timeline

| Week | Action | Owner | Target |
|------|--------|-------|--------|
| **Week 1** | Survey launches | Growth | - |
| **Week 2 (Start)** | Identify top 10-15 interview candidates from survey responses | Competitive Analyst | 10-15 people |
| **Week 2** | Send recruitment email (early access + interview offer) | Growth | 100% of candidates |
| **Week 2** | Confirm interviews | Growth | 80%+ conversion |
| **Week 3** | Conduct interviews (5-7 in Week 3) | Competitive Analyst | 5-7 |
| **Week 4** | Conduct interviews (remaining 3-8 in Week 4) | Competitive Analyst | 3-8 |
| **Week 4** | Synthesize findings | Competitive Analyst | - |

---

## Analysis & Synthesis

### Interview Insights Memo Template

After all interviews, create insights memo:

```markdown
# Phase 2 Interview Findings

**Total Interviews:** [X]
**Segments:** Indie (X), Startup (X), Framework (X)
**Response Rate:** [X]%

## Key Hypothesis Validations

### H1: Bundling Solves Pain ✓/✗
**Finding:** [X]% agree bundling is valuable
**Evidence:** [Top 2 quotes]
**Action:** [Implication for messaging/product]

### H2: DX Drives Choice ✓/✗
**Finding:** [DX ranks #[1-5] priority]
**Evidence:** [Setup time pain point frequency]
**Action:** [Implication for positioning]

### H3: Framework Integration Essential ✓/✗
**Finding:** [X]% mention framework integration as factor
**Evidence:** [Quotes from framework maintainers]
**Action:** [Implication for roadmap]

### H4: Enterprise Opportunity Q3+ ✓/✗
**Finding:** [X]% startups need enterprise features]
**Evidence:** [SOC 2, audit logs, team access mentions]
**Action:** [Implication for Phase 2 roadmap]

### H5: Phone is Nice-to-Have ✓/✗
**Finding:** [Email cited as critical; phone as [X]]
**Evidence:** [Feature ranking data]
**Action:** [Implication for engineering priorities]

## Top 5 Insights (By Impact)

1. **[Insight]** — Evidence: [Quote]
2. **[Insight]** — Evidence: [Quote]
3. **[Insight]** — Evidence: [Quote]
4. **[Insight]** — Evidence: [Quote]
5. **[Insight]** — Evidence: [Quote]

## Messaging Recommendation

Best positioning: **[A / B / C]**
Why: [Data from interviews]
Tweak suggested: [Any refinements based on feedback]

## Feature Prioritization (from interviews)

Rank 1: [Feature] — [Why, with frequency]
Rank 2: [Feature] — [Why, with frequency]
Rank 3: [Feature] — [Why, with frequency]

## Go-to-Market Channels (Validated)

Most effective: [Product Hunt / HN / Framework docs / etc.]
Supporting channels: [2-3 others]
Avoid/deprioritize: [Any channels with weak interest]

## Partnership Opportunities

- [Framework A]: Maintainer interested in [integration / revenue share]
- [Startup B]: Reference customer + beta testing
- [Platform C]: Co-marketing opportunity

## Risk Flags

⚠️ [Risk]: [Mitigation]

## Next: Phase 3 & 4

Survey findings + interview insights → Landing page A/B tests (Phase 3)
Interview segments → Pricing tier recommendations (Phase 3)
Framework feedback → Partnership roadmap (post-launch)
```

---

## Interviewer Tips

✅ **DO:**
- Listen more than talk (80/20 rule)
- Follow up on interesting signals ("You mentioned friction — tell me more")
- Take notes + record (if permitted)
- Ask "Why?" and "Tell me more" when you hear pain points
- Show genuine interest — this person is helping shape the product
- Thank them profusely; make them feel valued

❌ **DON'T:**
- Lead questions ("Our bundling feature is great, right?")
- Pitch the product (this is research, not sales)
- Interrupt or rush answers
- Dismiss concerns ("That's not really a problem")
- Over-explain features (let them ask questions)

---

## Next: Phase 3 & 4

Once interviews complete:
- Synthesize findings into memo
- A/B test messaging on landing page (Phase 3)
- Finalize pricing recommendations (Phase 3)
- Plan Phase 4: Final report + executive summary

