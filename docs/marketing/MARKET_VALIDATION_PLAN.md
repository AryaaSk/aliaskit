# AliasKit — Market Validation Research Plan

**Version:** 1.0
**Date:** 2026-03-28
**Owner:** Competitive Analyst (supporting growth/partnerships teams)
**Timeline:** 4–6 weeks (concurrent with MVP development, pre-launch)

---

## Strategic Rationale

The competitive analysis identified key assumptions about market demand, pricing tolerance, and feature priorities. Before full GTM execution, validate these assumptions with target customers to:

1. **Reduce GTM Risk** — Confirm positioning resonates with actual builders
2. **Prioritize Roadmap** — Understand which Phase 2 features matter most (enterprise SOC 2 vs. community features)
3. **Refine Messaging** — Test messaging angles before landing page/marketing materials are finalized
4. **Identify Go-to-Market Channels** — Understand where agents/frameworks actually discover tools

---

## Validation Hypotheses

### H1: "Agents need unified identity provisioning, not scattered services"

**Assumption:** Builders find AgentMail + AgentPhone patchwork tedious; bundling is compelling.

**How to Validate:**
- Survey: "How many email + phone providers do you currently use for agent infrastructure?" (n=50)
- Interview: Deep-dive with 5 active agents/framework builders on setup friction
- NPS-style question: "Would unified identity provisioning save you time?" (1-10)

**Success Criteria:** >70% agree bundling is valuable; 60%+ cite setup friction as pain point

**Action if Wrong:** Double down on DX/simplicity messaging instead of bundling narrative

---

### H2: "Developer experience (not price) is the primary differentiator vs. Twilio/SendGrid"

**Assumption:** Agents builders choose AliasKit over incumbents because setup is faster, not because pricing is lower.

**How to Validate:**
- Survey: "What's your top criteria when choosing an agent identity provider?" (ranking: price, DX, feature set, reliability, support)
- Interview: "Walk me through how you'd set up phone provisioning today" (observe pain points)
- Willingness-to-pay: "Would you pay $X/mo for [AliasKit feature set]?" at various price points

**Success Criteria:** DX ranks #1 or #2; setup time is primary friction point mentioned in interviews

**Action if Wrong:** Emphasize pricing/bundling value more heavily; reconsider freemium tier structure

---

### H3: "Framework integrations (LangChain, Anthropic, OpenClaw) are essential for adoption"

**Assumption:** Agents built *with* frameworks account for >60% of total addressable market; framework integration is key distribution channel.

**How to Validate:**
- Survey: "Do you build agents using a framework or from scratch?" (n=100)
- Breakdown: Which frameworks? (LangChain, Anthropic SDK, OpenClaw, custom, etc.)
- Intent: "If AliasKit were integrated into your framework of choice, would you use it?" (yes/no/maybe)

**Success Criteria:** >60% use frameworks; >70% would use AliasKit if integrated into their framework

**Action if Wrong:** Shift focus from framework partnerships to community/content marketing; direct-to-developer positioning

---

### H4: "Enterprise segment (multi-tenant, audit logs, SOC 2) will become meaningful by Q3 2026"

**Assumption:** Enterprise customers are a Phase 2+ opportunity; today, focus on indie builders.

**How to Validate:**
- Survey: "Would enterprise features (audit logs, team access controls, SOC 2) influence your decision?" (yes/no)
- Interview: 3–5 enterprise buyers (Fortune 500, managed AI service providers) on identity requirements
- Pricing tolerance: "What would you pay for enterprise version?" vs. consumer tier

**Success Criteria:** 30%+ of respondents care about enterprise features; clear enterprise pricing willingness

**Action if Wrong:** Accelerate enterprise feature development; launch enterprise tier at MVP

---

### H5: "Phone provisioning is a nice-to-have, not a must-have"

**Assumption:** Email is the critical identity primitive; phone is differentiator but not deal-breaker.

**How to Validate:**
- Survey: "How often do services require SMS/phone for verification?" (daily/weekly/monthly/rarely)
- Interview: "Have you needed to provision phone numbers for agents? Why/why not?"
- Feature prioritization: Rank email, phone, webhooks, audit logs by importance

**Success Criteria:** Email >90% importance; phone 60–80%; webhooks/audit logs 40–60%

**Action if Wrong:** De-prioritize phone roadmap; focus engineering on email + ecosystem integrations

---

## Research Methods & Timeline

### Phase 1: Quick Survey (Week 1–2)

**Method:** Typeform/Qualtrics online survey

**Target:** 50–100 respondents (indie developers, framework users, early adopters)

**Distribution Channels:**
- Product Hunt (launch post, link in discussion)
- HackerNews (Show HN post)
- Agent/LangChain Reddit communities
- Relevant Discord servers (OpenClaw, LangChain community)
- Twitter/LinkedIn (organic + paid if needed)

**Questions (10 min survey):**
- What frameworks/tools do you use to build agents?
- How many identity/email/phone providers do you currently use?
- What's your biggest pain point in agent infrastructure?
- Feature ranking: email, phone, webhooks, audit logs, team management
- Willingness-to-pay at $0 (free), $29, $49, $99, $199 per month
- How likely would you use AliasKit? (0-10)
- Would you want it integrated into your framework?

**Success Metric:** 50+ responses, representative mix of indie/startup/enterprise builders

**Deliverable:** Survey results spreadsheet + analysis memo

---

### Phase 2: Depth Interviews (Week 2–4)

**Method:** Scheduled 30-60 min conversations (Zoom)

**Target:** 10–15 interviews
- 5 active agent/framework builders (indie/startup)
- 3–4 framework maintainers (LangChain, Anthropic, or community frameworks)
- 2–3 enterprise AI ops/product leads

**Interview Guide:**
1. **Background** — What agents/systems are you building? How mature?
2. **Current Setup** — Walk me through how identity is handled today. What's friction?
3. **Alternative Tools** — Have you evaluated AgentMail, Twilio, others? Why chosen/not chosen?
4. **Feature Priorities** — Ranking of features from MVP/Phase 2 roadmap
5. **Messaging Test** — Show 2–3 positioning statements; which resonates?
6. **Go-to-Market** — How would you discover/learn about AliasKit?
7. **Pricing Sensitivity** — What price would you expect? What price point breaks it?
8. **Partnerships** — If integrated into [framework], would adoption accelerate?

**Success Metric:** 10+ interviews completed; clear patterns in pain points, feature priorities, messaging

**Deliverable:** Interview transcript summary + insights memo (top 5 findings per segment)

---

### Phase 3: Pricing & Messaging Testing (Week 3–5)

**Method:** A/B landing page tests, survey questions

**Test 1: Positioning/Messaging**
- Landing page variant A: "Identity infrastructure for agents"
- Landing page variant B: "Email + phone provisioning, bundled"
- Landing page variant C: "Faster than Twilio. Complete digital identity."

**Metric:** Scroll depth, time-on-page, CTR (signup button)

**Target:** 500+ visitors per variant; 1–2% conversion rate baseline

---

**Test 2: Pricing Model**

Survey question with price testing:
- Option 1: Free tier (10 identities/month) + Pro ($29/mo for 100 identities)
- Option 2: Free tier (5 identities/month) + Pro ($49/mo for unlimited)
- Option 3: Free tier + Pro ($99/mo for enterprise features)

**Metric:** Which plan would you choose? Which seems fair?

---

### Phase 4: Synthesis & Recommendations (Week 6)

**Activities:**
- Aggregate all data (survey, interviews, landing page tests)
- Identify patterns and contradictions
- Draft recommendations for CMO/CEO (messaging, pricing, roadmap prioritization)

**Deliverable:** **Market Validation Report** (10–15 pages)
- Executive summary (key findings)
- Hypothesis validation (which held up, which were wrong)
- Recommended messaging and positioning adjustments
- Pricing model recommendation
- Feature prioritization for Phase 2
- Go-to-market channel recommendations
- Risk flags (e.g., "enterprise demand lower than expected")

---

## Sample Segmentation for Validation

### Segment 1: Indie Agent Builders (Target: 30% of respondents)

- Single developer or small team (<5 people)
- Building agents for personal project, side business, or SaaS feature
- Using frameworks (LangChain, custom, etc.)
- Tight budget; price-sensitive
- High DX expectations (wants things to "just work")

**Key Questions:**
- Setup time vs. Twilio?
- Would framework integration change decision?
- Pricing tolerance?

---

### Segment 2: Startup/Scale-Up (Target: 40% of respondents)

- 10–100 person company
- Building agent-powered product or feature
- Team of 2–4 engineers
- Moderate budget; willing to pay for features (webhooks, audit logs)
- Want reliability + support

**Key Questions:**
- Multi-tenant / team needs?
- Feature priorities (webhooks, audit logs, analytics)?
- Timeline to production?

---

### Segment 3: Enterprise (Target: 20% of respondents)

- 1000+ person company
- Evaluating AI agent deployment at scale
- Procurement process; needs SOC 2, SLA, support
- High budget; feature-driven

**Key Questions:**
- Enterprise feature importance (audit logs, team management, SOC 2)?
- Timeline expectations?
- Pricing model (seat-based, usage-based)?

---

### Segment 4: Framework Maintainers (Target: 10% of respondents)

- Active maintainers of LangChain, Anthropic SDK, OpenClaw, etc.
- Deciding what integrations to ship in core
- Concerned with ease of integration, community demand, user experience

**Key Questions:**
- How difficult is integration?
- Community demand for identity provisioning?
- Revenue-share / partnership model interest?

---

## Success Metrics

| Metric | Target | Owner |
|--------|--------|-------|
| **Survey Response Rate** | 50+ respondents | Growth/Content |
| **Interview Completion** | 10+ interviews | Competitive Analyst |
| **Landing Page Conversion** | 1–2% baseline | Growth |
| **Hypothesis Validation** | 4/5 hypotheses confirmed | Competitive Analyst |
| **Report Completion** | Week 6 | Competitive Analyst |
| **CMO Feedback Cycle** | Messaging updated by Week 7 | Marketing |

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| **Low survey response rate (<20)** | Offer early access / discount to incentivize completion |
| **Interview no-shows** | Recruit from Product Hunt discussions, early users |
| **Contradictory findings** | Deep-dive into subgroup analysis (framework vs. non-framework, enterprise vs. indie) |
| **Results delay GTM** | Collect data in parallel with MVP dev; publish findings weekly (not waiting for final synthesis) |

---

## Next Actions

- [ ] Design survey questionnaire (Competitive Analyst)
- [ ] Create Typeform and define distribution strategy (Growth)
- [ ] Draft interview guide (Competitive Analyst)
- [ ] Recruit interview participants (Growth/Partnerships)
- [ ] Launch survey (Week 1)
- [ ] Begin interviews (Week 2)
- [ ] A/B test landing page variants (Growth)
- [ ] Synthesize findings (Week 6)
- [ ] Present Market Validation Report to CMO/CEO (Week 7)

---

## How This Informs GTM & Product

**If Messaging Tests Reveal:**
- Option A ("Identity infrastructure") wins → Double down on architectural positioning
- Option B ("Bundled") wins → Emphasize unbundling cost in marketing
- Option C ("Faster setup") wins → Add setup time comparisons to sales deck

**If Pricing Tests Reveal:**
- Free tier demand is high → Expand free tier; more user acquisition focus
- Pro tier uptake is strong → Premium positioning works; focus on feature depth

**If Features are Reprioritized:**
- Webhooks > Audit logs → Shift Phase 2 roadmap to webhooks-first
- Enterprise features urgent → Accelerate SOC 2 planning

---

## Appendix: Sample Survey Link & Embedded Questions

**Survey Title:** "Help Shape AliasKit — 10-min feedback survey"

**Introduction:**
> We're building AliasKit: a unified API for provisioning email and phone identities for AI agents. Want to shape the product? Fill out this quick survey and tell us what matters to you.

**Survey Questions:**

1. What frameworks do you use to build agents? (Multi-select)
   - [ ] LangChain
   - [ ] Anthropic SDK
   - [ ] OpenClaw
   - [ ] Custom / In-house
   - [ ] None / Just APIs

2. Currently, how many email/phone/identity providers do you use?
   - [ ] 1
   - [ ] 2
   - [ ] 3+

3. What's the biggest pain point in setting up agent infrastructure?
   - [ ] Setup time / complexity
   - [ ] Cost
   - [ ] Feature gaps (webhooks, audit logs, etc.)
   - [ ] Reliability
   - [ ] Other: ___

4. Feature prioritization (rank 1-5):
   - __ Email provisioning (receive + send)
   - __ SMS provisioning (inbound)
   - __ Webhooks (real-time events)
   - __ Audit logs (compliance)
   - __ Team/multi-tenant (multiple users)

5. How would you describe ideal pricing?
   - [ ] Completely free
   - [ ] Freemium ($0–$49/mo)
   - [ ] Mid-market ($50–$199/mo)
   - [ ] Enterprise ($200+/mo)

6. If AliasKit were built into [your framework], would you use it?
   - [ ] Definitely
   - [ ] Probably
   - [ ] Maybe
   - [ ] Probably not

7. How would you discover AliasKit?
   - [ ] Framework docs/integration
   - [ ] Product Hunt
   - [ ] HackerNews
   - [ ] Twitter/social
   - [ ] Community forums/Discord
   - [ ] Other: ___

8. How likely are you to use AliasKit for your next agent project?
   - [ ] 1 (not at all)
   - [ ] 2
   - [ ] 3
   - [ ] 4
   - [ ] 5
   - [ ] 6
   - [ ] 7
   - [ ] 8
   - [ ] 9
   - [ ] 10 (definitely)

9. Email & follow-up:
   - Email: ___ (optional; for early access / results)
   - Framework you're most excited about: ___

---

This plan is ready to execute immediately and will provide critical data for GTM refinement before full launch.
