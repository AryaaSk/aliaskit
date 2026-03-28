# Real-Time Survey Response Analysis Template

**For:** Competitive Analyst
**Use:** Analyze each survey response as it arrives (Week 1-2)
**Purpose:** Score responses against 5 hypotheses, identify interview candidates

---

## How to Use This Template

1. **Copy this template** for each new survey response batch (e.g., every 10 responses)
2. **Review responses** in Typeform export or Google Sheet
3. **Score each response** against the 5 hypotheses using the framework below
4. **Identify candidates:** Flag high-value interview prospects (NPS 8-10, strong articulation)
5. **Update tracking:** Feed insights into HYPOTHESIS_VALIDATION_SCORING.md

---

## Single Response Analysis Template

```markdown
# Response Analysis — [Respondent Name/ID: ___]

**Survey Submission Time:** [Time]
**Completion Status:** [Complete / Partial]
**Completion Time:** [Minutes to complete]

---

## Response Summary

**Framework Used:** [LangChain / Anthropic SDK / OpenClaw / Custom / None]
**Company Size:** [Indie / Startup / Enterprise / Framework Maintainer]
**Primary Pain Point:** [From Q3]
**Likelihood to Use (Q9):** [0-10 score]

---

## Hypothesis Scoring

### H1: Bundling Solves Pain
**Q2 Response:** [1 / 2 / 3+ providers]
**Q3 Response:** [Setup complexity / Cost / Features / Reliability / Other]

**Evidence:**
- Uses [X] providers → [+3 points if 2+, +5 if 3+]
- Cites [pain point] → [assess relevance]
- Additional context: [any comments suggesting bundling value?]

**H1 Score:** [Points] ✅ / ⚠️ / ❌

---

### H2: DX Drives Choice
**Q4 Feature Ranking:** [Top 3 features ranked]
**Q3 Pain Points:** [What they selected]

**Evidence:**
- Feature priorities show setup/ease valued: [✅ / ❌]
- Setup complexity > cost mentioned: [✅ / ⚠️ / ❌]
- Comments suggest DX matters: [Quote or ✗]

**H2 Score:** [Points] ✅ / ⚠️ / ❌

---

### H3: Framework Integrations Essential
**Q1 Response:** [Frameworks selected]
**Q7 Response:** [Would use if in framework? Definitely/Probably/Maybe/No]
**Q8 Response:** [Framework docs selected as discovery?]

**Evidence:**
- Framework user: [Yes / No]
- Framework integration would matter: [Definitely / Probably / Maybe / No]
- Community feedback (if maintainer): [Quote or N/A]

**H3 Score:** [Points] ✅ / ⚠️ / ❌

---

### H4: Enterprise Opportunity Q3+
**Q4 Feature Ranking:** [Audit logs rank, Team controls rank]
**Q5 Pricing Preference:** [Free / Freemium / Mid-market / Enterprise / Unsure]
**Company Size:** [Segment]

**Evidence:**
- Enterprise features ranked: [Top 3 / Middle / Bottom]
- Enterprise pricing selected: [Yes / No]
- Company segment: [Enterprise interest signal: High / Medium / Low]

**H4 Score:** [Points] ✅ / ⚠️ / ❌

---

### H5: Phone is Nice-to-Have
**Q4 Feature Ranking:** [Email rank, Phone rank]
**Q3 Pain Points:** [Any mention of SMS/phone?]

**Evidence:**
- Email importance > phone: [Yes / No]
- Email rank vs. phone rank: [Email #1, Phone #3 = strong signal]
- Phone mentioned as pain: [No / Yes (negative signal)]

**H5 Score:** [Points] ✅ / ⚠️ / ❌

---

## Interview Candidate Assessment

**Overall Quality Score:** [1-10]
**Interview Priority:** [Priority A / B / C / Not Qualified]

**Reasons:**
- [Reason 1: e.g., "High NPS (9/10) + detailed responses"]
- [Reason 2: e.g., "Framework maintainer — partnership potential"]
- [Reason 3: e.g., "Startup with clear feature needs"]

**Segment:** [Indie / Startup / Enterprise / Framework Maintainer]
**Email:** [If provided]
**Follow-up Note:** [Any special context for interview]

---

## Key Insights from This Response

**Positive Signals:**
- ✅ [Finding 1]
- ✅ [Finding 2]

**Caution Signals:**
- ⚠️ [Flag 1]

**Surprising Finding:**
- 🤔 [Unexpected insight]

---

## Aggregate Score (for batch analysis)

| Hypothesis | This Response | Running Tally | Confidence |
|-----------|---------------|---------------|------------|
| **H1** | __% | __% | [Trend: ↗ / → / ↘] |
| **H2** | __% | __% | [Trend: ↗ / → / ↘] |
| **H3** | __% | __% | [Trend: ↗ / → / ↘] |
| **H4** | __% | __% | [Trend: ↗ / → / ↘] |
| **H5** | __% | __% | [Trend: ↗ / → / ↘] |
```

---

## Quick Scoring Rubric

### H1: Bundling Solves Pain

**Strong Evidence (✅):**
- Uses 2+ providers + cites setup complexity
- Comments like "juggling multiple providers" or "would be nice to have unified"
- Completion time suggests pain point

**Weak Evidence (⚠️):**
- Uses 1 provider; no pain cited
- OR uses 3+ but cites cost, not complexity

**Contradicts Hypothesis (❌):**
- "I prefer best-of-breed for each function"
- "Separate tools work fine"

---

### H2: DX Drives Choice

**Strong Evidence (✅):**
- Email/features rank top, price rank bottom
- Q3 cites "setup complexity" not "cost"
- Comments like "fast setup matters" or "speed is critical"

**Weak Evidence (⚠️):**
- Mixed ranking (DX + price both important)
- No strong opinion in comments

**Contradicts Hypothesis (❌):**
- Q6: Lowest price selected (price-sensitive)
- Q3: Cost cited as #1 pain
- Comments: "Pricing is the main factor"

---

### H3: Framework Integrations Essential

**Strong Evidence (✅):**
- Uses 1+ framework
- Q7: "Definitely" would use if in framework
- Q8: "Framework docs" selected as discovery
- Framework maintainer: "Community asks for this"

**Weak Evidence (⚠️):**
- Uses framework, but "Maybe" on integration
- OR "Custom / In-house" selected alone

**Contradicts Hypothesis (❌):**
- "None / Just APIs"
- Q7: "Probably not" or "Not applicable"
- "Frameworks don't matter for my use case"

---

### H4: Enterprise Opportunity Q3+

**Strong Evidence (✅):**
- Audit logs or team controls rank top 3
- Q5: Enterprise pricing selected
- Company size: Enterprise (1000+)
- Comments: "We'd need SOC 2" or "Multi-tenant required"

**Weak Evidence (⚠️):**
- Enterprise features ranked #3-5 (nice-to-have)
- OR mid-market company with enterprise interest

**Contradicts Hypothesis (❌):**
- Audit logs rank #5 (least important)
- Free tier selected (indie focus)
- Company size: Indie or 5-10 people
- Comments: "Enterprise features don't matter yet"

---

### H5: Phone is Nice-to-Have

**Strong Evidence (✅):**
- Email ranks #1, Phone ranks #3-4
- Q3: No SMS/phone pain cited
- Comments: "Email is critical, phone would be nice"

**Weak Evidence (⚠️):**
- Email and Phone rank similarly
- OR email #1 but phone #2

**Contradicts Hypothesis (❌):**
- Phone ranks #1 or #2
- Q3: "SMS/Phone provision is critical"
- Comments: "Phone is a must-have"

---

## Batch Analysis Template (After 10+ Responses)

```markdown
# Batch Analysis — Responses [X-Y]

**Total Responses:** [X]
**Completion Rate:** [Y]%

---

## Hypothesis Confidence Scores

| Hypothesis | Score | Trend | Status |
|-----------|-------|-------|--------|
| H1: Bundling | __% | [↗↘→] | [✅ / ⚠️ / ❌] |
| H2: DX | __% | [↗↘→] | [✅ / ⚠️ / ❌] |
| H3: Frameworks | __% | [↗↘→] | [✅ / ⚠️ / ❌] |
| H4: Enterprise | __% | [↗↘→] | [✅ / ⚠️ / ❌] |
| H5: Phone | __% | [↗↘→] | [✅ / ⚠️ / ❌] |

---

## Segment Breakdown

- **Indie:** ___ responses (__%）
- **Startup:** ___ responses (__%）
- **Enterprise:** ___ responses (__%）
- **Framework:** ___ responses (__%）

---

## Framework Adoption

- **LangChain:** __%
- **Anthropic SDK:** __%
- **OpenClaw:** __%
- **Custom:** __%
- **None:** __%

---

## Top 3 Pain Points (by frequency)

1. [Pain point 1] — cited ___ times (__%）
2. [Pain point 2] — cited ___ times (__%）
3. [Pain point 3] — cited ___ times (__%）

---

## Interview Candidates (Priority A)

| Respondent | Score | Segment | Reason | Contact |
|-----------|-------|---------|--------|---------|
| [Name] | 9/10 | Startup | [Reason] | [Email] |
| [Name] | 8/10 | Framework | [Reason] | [Email] |

---

## Key Insights

**Emerging Patterns:**
- [Pattern 1]
- [Pattern 2]

**Early Surprises:**
- [Surprise 1]
- [Surprise 2]

**Forecast Update:**
- Week 1 pace: [X] responses/day → Projected Week 1 total: [Y]
- Week 2 target: 50-100 responses — **[On Track / Monitor / Escalate]**

```

---

## Using This in Real-Time

**During Launch Day (Friday):**
1. Check responses at each checkpoint (10:30am, 11:00am, 12:00pm, 2:00pm, 3:00pm, 5:00pm)
2. Copy this template for each batch (e.g., every 5-10 responses)
3. Score responses quickly (2-3 min per response)
4. Identify interview candidates as you go
5. Update hypothesis tracking continuously
6. Post Slack updates with key findings

**Weekly (Every Friday):**
1. Analyze all responses from that week
2. Update cumulative hypothesis scores
3. Refresh candidate list
4. Update forecast for next week
5. Post ALI-36 comment with weekly findings

---

## Quick Reference: Scoring Shortcuts

**H1 Bundling:** Count responses with 2+ providers + setup pain → divide by total
**H2 DX:** Count responses citing setup/speed as top concern → divide by total
**H3 Frameworks:** Count framework users who say integration matters → divide by framework users
**H4 Enterprise:** Count enterprise features in top 3 rankings → divide by total
**H5 Phone:** Count (email rank > phone rank) → divide by total

---

## Interview Candidate Flags

**Priority A (Must Interview):**
- ✅ NPS 8-10 + any segment
- ✅ Framework maintainer + any NPS
- ✅ Enterprise company + any NPS
- ✅ Startup + strong articulation (NPS 7+)

**Priority B (Should Interview):**
- Indie builder + NPS 7-8
- Startup + NPS 6-7
- Strong pain point articulation (any segment)

**Priority C (Nice to Interview):**
- Any NPS 5-6
- Weak articulation but interesting segment

**Not Qualified:**
- NPS < 5
- Incomplete responses
- Spam/low quality

---
