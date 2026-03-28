# AliasKit — Investor Pitch Outline

**Version:** 1.0
**Date:** 2026-03-28
**Owner:** CEO / Fundraising
**Purpose:** Talking points, slide deck outline, and financial projections for investor conversations

---

## Elevator Pitch (30 seconds)

"AliasKit is identity infrastructure for autonomous agents. One API call provisions email + phone identity. Agents can sign up for services, verify accounts, and operate independently on the internet. We're building the default identity provider for the agent ecosystem—capturing 6-12 month market window before Twilio/AWS enter the space."

---

## 10-Minute Pitch Deck Outline

### Slide 1: Title
- **AliasKit — Identity for Autonomous Agents**
- Tagline: One API call. Complete identity.
- Hero image: Agent with verified identity badge

### Slide 2: The Problem
**"Agents today lack verified identity."**

- Current state: Agents are compute endpoints, not independent entities
- Pain points:
  - Can't sign up for services (no verified identity)
  - Can't verify via email (no email address)
  - Can't verify via SMS (no phone number)
  - Workarounds are manual, fragile, expensive
- Impact: Limits use cases, slows time-to-value, creates security risks

**Speaker notes:**
- AgentMail and AgentPhone are solving pieces, but they're siloed
- Twilio/SendGrid are expensive and human-focused ($150+/month)
- Teams building agents are stuck: either DIY or pay enterprise prices

### Slide 3: Market Opportunity
**"Agents are moving from sandbox to production."**

- **TAM:** AI agents requiring operational identities
- Market segments:
  - Enterprise AI (customer support, internal automation)
  - Startup/Indie (agents-as-products)
  - Agentic Frameworks (OpenClaw, LangChain, Anthropic SDK users)
- **Market window:** 6-12 months before incumbents (Twilio, AWS, Azure) launch agent offerings
- First movers in agent infrastructure become standard

**Metrics:**
- LangChain: 500k+ monthly active users
- Anthropic: Major AI company with agent roadmap
- OpenClaw: Emerging agent framework with growing adoption
- Overall: Agent market growing 3-5x YoY

### Slide 4: The Solution
**"One API call. Complete agent identity."**

```
POST /v1/identities
→ email@aliaskit.to
→ +12025551234
→ verified name
```

**Key features:**
- Email inbox (inbound + outbound)
- Phone number (inbound SMS)
- Verified name (for interactions)
- SDK works everywhere (Node, Deno, Bun, browsers)
- Zero dependencies
- Free tier + affordable scaling

**Positioning pillars:**
1. Identity Infrastructure — Agents as independent, credible entities
2. Developer Experience — Provision in seconds, not weeks
3. Bundled & Priced Right — One provider, one bill, 10x cheaper than alternatives

### Slide 5: Business Model
**"Freemium SaaS with framework partnership revenue."**

**Pricing:**
- Free: 10 identities/month (acquisition + viral loop)
- Pro: $50/month unlimited (retention)
- Enterprise: Custom (coming Q3 2026)

**Revenue streams:**
- Direct SaaS subscription (primary)
- Framework partnership revenue share (5-10% of provisioned identities)
- Enterprise premium (SOC 2, team management, SLAs)

**Unit economics (Pro tier):**
- COGS: ~$0.05-0.10 per identity/month (infrastructure)
- Gross margin: ~80-90%
- LTV: $600-1200 per customer (assuming 12-24 month retention)
- CAC: $50-100 (via organic + partnerships)

### Slide 6: Competitive Landscape
**"We're consolidating a fragmented market."**

**Competitive positioning:**
| Factor | AliasKit | AgentMail | Twilio | DIY |
|--------|----------|-----------|--------|-----|
| Email + Phone bundled | ✓ | – | ✗ (separate) | ✗ |
| Agent-optimized UX | ✓ | ✓ | – | – |
| No KYC | ✓ | ✓ | ✗ | N/A |
| One API key | ✓ | ✓ | ✗ | N/A |
| Price/month | $50 | ~$50 | $150+ | N/A |

**Defensibility:**
- Network effects (frameworks built-in = sticky)
- Infrastructure moat (Cloudflare email + Plivo phone = hard to replicate)
- First-mover in bundled solution
- 6-12 month window before incumbents move

### Slide 7: Go-to-Market Strategy
**"Distribution through framework partnerships."**

**Tier 1 Partners (Q2 2026):**
- **LangChain** (500k+ users) → revenue share + co-marketing
- **Anthropic SDK** (Claude agents API) → recommended provider
- **OpenClaw** (emerging framework) → built-in integration

**How it works:**
- Framework agents auto-provision identity on init
- One line of code enables email + phone
- No extra signup, no API keys
- Revenue share on provisioned identities

**Why this works:**
- Dramatically improves framework user experience
- Framework builders get featured in docs/examples
- AliasKit gets distribution + usage

**Timing:**
- Partnerships close by end Q2 2026
- Joint announcements drive awareness
- Integration revenue flows Q3+ 2026

### Slide 8: Traction & Validation
**"Early validation from market leaders."**

**Product traction:**
- [ ] 10 beta customers signing up (placeholder)
- [ ] X identities provisioned (placeholder)
- [ ] X API keys created (placeholder)
- [ ] X monthly API calls (placeholder)

**Market validation:**
- Framework leaders (LangChain, Anthropic) responding positively
- Agent community interest high (HackerNews, social)
- Clear differentiation vs. AgentMail (bundled solution)
- 6-12 month market window recognized by early adopters

**Team validation:**
- [Founder background]
- [Previous exits/achievements]
- [Deep agent/infrastructure expertise]

**Speaker notes:** Share specific conversations, social proof, usage metrics

### Slide 9: Team & Execution
**"Deep infrastructure + AI expertise."**

**Founder/CEO:**
- [Background: previous companies, exits, relevant expertise]
- [Why building this now]

**Co-founder/CTO:**
- [Background: infrastructure, scale, relevant achievements]
- [Why excited about agent infrastructure]

**Key hires / advisors:**
- [Agent framework leaders / Twilio veterans / investors]
- [3-5 key advisors who validate market opportunity]

**Hiring plan:**
- Now: Product + infrastructure engineers
- Q2: Sales / partnerships lead
- Q3: Operations / support lead

### Slide 10: Financial Projections
**"Path to profitability in 18-24 months."**

**Revenue model:**
- Year 1: $0-100k (early SaaS + partnerships)
- Year 2: $500k-2M (partnerships + direct SaaS scale)
- Year 3: $5M+ (enterprise tier + market expansion)

**Unit economics:**
- Gross margin: 80-90%
- CAC payback: 6-12 months
- Churn: 2-3% monthly (typical SaaS)

**Key drivers:**
- Framework partnership adoption (determines growth ceiling)
- SaaS conversion rate (free to paid)
- Enterprise upsell (post-MVP)

**Capital efficiency:**
- Minimal infra costs (Cloudflare, Plivo, Supabase handle scaling)
- Small team (4-6 people year 1)
- Clear path to profitability with modest funding

### Slide 11: Ask & Use of Funds
**"$500k-$2M to accelerate market capture."**

**Use of funds:**
- 50% Engineering (product, infrastructure, framework integrations)
- 30% Go-to-market (partnerships, sales, content)
- 20% Operations (team, legal, finance)

**Milestones:**
- Month 3: 1-2 framework partnerships announced
- Month 6: $50k MRR (direct + partnership revenue)
- Month 12: $200k MRR (scale partnerships + enterprise)
- Month 18: Profitability path clear

**Why now:**
- 6-12 month market window before incumbents
- Framework momentum (LangChain, Anthropic agents)
- Agent market acceleration (3-5x YoY growth)

### Slide 12: Vision & Long-Term
**"Become the identity layer for the agent economy."**

**Year 2-3 vision:**
- Default identity provider for agent frameworks
- Trusted by Fortune 500 enterprises deploying agents
- Expanded to governance, multi-agent coordination, compliance
- Possible acquisition target for infrastructure companies

**Post-MVP roadmap:**
- Phase 2: Outbound SMS, webhook delivery
- Phase 3: Team management, SOC 2 compliance
- Phase 4: Agent-specific governance, audit trails
- Phase 5: Multi-agent identity (cross-agent coordination)

---

## 20-Minute Deep Dive Script

### Opening (2 min)
- **Hook:** "Agents are becoming independent entities. They need infrastructure. AliasKit provides it."
- **Context:** Move agent ecosystem from "agents as tools" to "agents as entities with identity"
- **Thesis:** First-mover in bundled agent identity becomes market standard

### Problem Deep-Dive (3 min)

**Why agents need identity:**
- Service signup requires verified identity (email, phone)
- Account recovery requires email/phone
- Contract negotiation requires credible identity
- Current workarounds: borrowed email, manual setup, expensive services

**Real-world examples:**
- Customer support agent can't verify customer identity
- Hiring agent can't sign up for job boards
- Autonomous workflow agent can't recover lost accounts
- QA agent can't sign up for beta services

**Market pain:**
- Teams building agents waste engineering time on identity infrastructure
- Twilio/SendGrid require expertise + high cost ($150+/month)
- AgentMail solves email, AgentPhone solves phone, but they're siloed
- No one solved "bundled agent identity at scale"

**Competitive gap:**
- AgentMail + AgentPhone = two services, two APIs, two dashboards
- Twilio + SendGrid = enterprise pricing, KYC required
- AliasKit = one service, one API, $50/month, no KYC

### Solution Deep-Dive (4 min)

**Technical architecture:**
- Email: Cloudflare Email Workers (catch-all MX routing)
- Phone: Plivo integration (real phone numbers, inbound SMS)
- API: REST + SDK (zero dependencies, works everywhere)
- Storage: Supabase (Postgres, encrypted, scalable)

**Why this architecture works:**
- Cloudflare email: Serverless, scales to millions, no per-address MX records
- Plivo phone: Global coverage, 190+ countries, inbound SMS native
- Zero-dependency SDK: Works in Node, Deno, Bun, browsers (no bloat)
- Supabase: Affordable, SOC 2 ready, proven at scale

**Product differentiation:**
1. Bundled (email + phone, not scattered)
2. Agent-optimized (simple API, agent frameworks = distribution)
3. Affordable ($50/mo vs $150+)
4. Developer-friendly (30 lines of code vs KYC + config)

### Market Opportunity (3 min)

**TAM estimation:**
- Global agent market: ~$10B by 2027 (Gartner, McKinsey)
- Agent identity portion: ~$500M (5% of total)
- Serviceable TAM: ~$100M (enterprise + startup builders)

**Market growth:**
- Agent adoption: 3-5x YoY (driven by Claude, GPT-4, open models)
- Enterprise AI agents: 2-3x YoY (customer support, internal automation)
- Framework adoption: LangChain 500k+ users, Anthropic agents incoming, OpenClaw growing

**Addressable market segments:**
1. **Startup/Indie builders:** Want cheap, fast, SDK-friendly
2. **Enterprise AI teams:** Want SOC 2, team management, audit trails
3. **Framework communities:** Want built-in identity for their users

**Market window:**
- 6-12 months before Twilio, AWS, Azure launch agent-focused offerings
- First movers become standard (network effects, integration deep)
- AgentMail has YC backing but email-only; we have bundled solution

### Business Model (2 min)

**Freemium SaaS + partnerships:**
- Free tier: 10 identities/month (user acquisition)
- Pro tier: $50/month unlimited (recurring revenue)
- Enterprise: Custom pricing (high-touch, SOC 2, compliance)

**Revenue drivers:**
- Direct SaaS: $X MRR from pro subscriptions
- Partnership revenue: 5-10% of identities provisioned via frameworks
- Enterprise: $10k-50k+ ACV (future)

**Path to profitability:**
- Infrastructure cost: $0.05-0.10 per identity/month
- Gross margin: 80-90%
- Break-even: ~$50k MRR with small team (4-6 people)
- Achievable in 18-24 months with modest capital

### Go-to-Market (2 min)

**Distribution strategy:**
- Partner with frameworks (not direct sales)
- LangChain, Anthropic SDK, OpenClaw auto-provision AliasKit identity
- Developers don't need to sign up—it's built-in

**Why partnerships work:**
- Frameworks benefit (better user experience)
- AliasKit gets distribution (millions of potential users)
- Revenue share aligns incentives

**Competitive advantage:**
- Framework integration = network effect
- Hard for Twilio/competitors to reach framework communities
- First-mover gets exclusive partnerships

### Traction (1 min)
- Share specific validation: beta customers, framework conversations, social proof
- Show metrics: API usage, identities provisioned, beta customer feedback
- Demonstrate product-market fit signals

### Ask (1 min)
- Funding amount: $500k-$2M
- Use: 50% engineering, 30% GTM, 20% operations
- Timeline: Milestones at 3/6/12 months

### Close (1 min)
- Restate thesis: Agent infrastructure is broken. AliasKit fixes it. First movers win.
- Call to action: "Help us become the identity layer for the agent economy."

---

## Investor FAQ / Objection Handling

### Q: Why not just use Twilio?
**A:** Twilio costs $150+/month, requires KYC, and is human-focused. AliasKit is purpose-built for agents: $50/month, no KYC, bundled email + phone, SDK works everywhere. 10x cheaper, better UX.

### Q: AgentMail already exists. Why AliasKit?
**A:** AgentMail does email. AliasKit does email + phone bundled. Bundled > separate. Plus, we're going after framework integration (LangChain, Anthropic, OpenClaw) for distribution. AgentMail isn't.

### Q: How do you compete with Twilio's sales team?
**A:** We're not competing on sales. We're competing on distribution. We reach developers through frameworks (LangChain, Anthropic), not sales reps. Framework integration = network effect.

### Q: What if AgentMail raises a Series A and outspends you?
**A:** We have 6-12 months to establish partnerships before incumbents enter. By then, LangChain agents auto-provision AliasKit identity by default. Switching cost approaches zero. Very defensible.

### Q: What if Twilio launches an agent identity product?
**A:** Possible, but unlikely to beat bundled solution. They're enterprise-focused. Agent builders (startup/indie/framework communities) want cheap, fast, no KYC. That's our wedge.

### Q: Unit economics?
**A:**
- COGS: ~$0.05-0.10 per identity/month
- Gross margin: 80-90%
- CAC: $50-100 (via organic + partnerships)
- LTV: $600-1200 (12-24 month retention)
- Payback period: 6-12 months

### Q: How do you get to $10M+ revenue?
**A:**
- Year 1: $100k (early SaaS + partnerships)
- Year 2: $2M (framework partnerships + direct SaaS)
- Year 3: $10M+ (enterprise tier + market expansion)

Drivers: Framework adoption (determines ceiling), SaaS conversion, enterprise upsell.

### Q: What's the churn rate?
**A:** Typical SaaS: 2-3% monthly. Lower for us because:
- Framework integration = sticky (switching costs high)
- Partnership revenue = recurring, tied to usage
- Agents = sticky (hard to migrate once integrated)

### Q: What are the biggest risks?
**A:**
1. Framework partnership adoption (mitigated: LangChain/Anthropic interested)
2. Incumbent entry (mitigated: 6-12 month window, network effects)
3. Regulatory (mitigated: we're not regulated, just infrastructure)
4. Technical scalability (mitigated: Cloudflare/Plivo handle it)

### Q: What's the exit potential?
**A:**
- Strategic acquisition: Infrastructure company (AWS, Twilio, Anthropic)
- Public company: Infrastructure plays scale to $100M+ revenue
- Timeline: 5-7 years to exit-ready scale

---

## Pitch Deck Appendix (Optional Slides)

### A1: Competitive Comparison Table
| Feature | AliasKit | AgentMail | AgentPhone | Twilio | SendGrid | DIY |
|---------|----------|-----------|-----------|--------|----------|-----|
| Email provisioning | ✓ | ✓ | – | ✓ | ✓ | – |
| Phone provisioning | ✓ | – | ✓ | ✓ | – | – |
| Bundled offering | ✓ | – | – | – | – | – |
| Agent-optimized | ✓ | ✓ | ✓ | – | – | – |
| SDK included | ✓ | ✓ | ✓ | ✓ | ✓ | – |
| No KYC | ✓ | ✓ | ✓ | – | ✓ | – |
| Free tier | ✓ | ✓ | ✓ | – | ✓ | – |
| Price/month | $50 | ~$50 | ? | $150+ | $20+ | – |
| Setup time | 5 min | 10 min | ? | 30+ min | 10 min | – |

### A2: Financial Model (3-Year Projection)
```
Year 1:
- Customers: 50 (early SaaS) + 5 partnerships
- MRR: $10k (SaaS) + $5k (partnerships)
- Total ARR: $180k
- Burn: $200k (team of 4 + ops)
- Runway: 12 months

Year 2:
- Customers: 300 (SaaS) + 10 partnerships (scaled)
- MRR: $50k (SaaS) + $30k (partnerships)
- Total ARR: $960k
- Burn: $150k (team of 6 + GTM)
- Runway: 6+ months (approaching profitability)

Year 3:
- Customers: 800 (SaaS) + 20 partnerships + enterprise deals
- MRR: $150k (SaaS) + $80k (partnerships) + $50k (enterprise)
- Total ARR: $4.56M
- Profit: $500k+ (infrastructure business)
- Next round: Growth equity or IPO track
```

### A3: Roadmap
```
Q2 2026: Launch + Partnership announcements
Q3 2026: Phase 2 (outbound SMS, webhooks)
Q4 2026: Enterprise tier (SOC 2, team management)
Q1 2027: Multi-agent identity (cross-agent coordination)
Q2 2027+: Expansion (Web3 identity, governance, compliance)
```

---

## Post-Pitch Follow-Up

### Email (If positive signal)
```
Hi [Investor],

Thanks for the conversation. We're excited about AliasKit and the opportunity
to build the identity layer for the agent economy.

Here's what we discussed:
- Framework partnerships as distribution strategy
- Path to profitability in 18-24 months
- $500k-$2M ask to accelerate market capture

Next steps from your perspective?
- Do you want to dive deeper on any area?
- Can we set up a follow-up with your partner?
- What additional diligence would be helpful?

Looking forward to exploring this together.

Best,
[Founder]
```

### Due Diligence Checklist
- [ ] Financial model (3-year projections, unit economics)
- [ ] Customer conversations (recorded or summary from beta users)
- [ ] Framework partner conversations (LOI or term sheet)
- [ ] Technical architecture (system diagram, scalability analysis)
- [ ] Team bios and relevant experience
- [ ] Product roadmap (prioritized by revenue impact)
- [ ] Competitive analysis (with defensibility assessment)
- [ ] Legal (incorporation, IP, founders' agreement)
- [ ] References (from advisors, partners, customers)

---

## Success Metrics (Post-Funding)

Track these metrics for investors:

**Growth:**
- Monthly recurring revenue (MRR)
- Customer acquisition (direct + partnerships)
- API calls / month
- Identities provisioned

**Unit Economics:**
- CAC (cost to acquire customer)
- LTV (lifetime value)
- Payback period
- Gross margin

**Product:**
- Framework partnerships (count + identities via each)
- API uptime / reliability
- Feature delivery velocity
- Customer satisfaction (NPS)

**Team:**
- Hiring progress (on track to roadmap)
- Retention (keeping key people)
- Advisor engagement

Report these monthly to investors.
