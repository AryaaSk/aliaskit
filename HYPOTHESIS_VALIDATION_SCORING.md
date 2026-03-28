# Hypothesis Validation Scoring Framework

**For:** Competitive Analyst
**Purpose:** Score survey responses against 5 core hypotheses
**Use:** During Week 1-2 analysis to measure hypothesis confidence

---

## Scoring Methodology

Each hypothesis gets a **Confidence Score** (0-100%) based on accumulated evidence from:
- Survey responses (quantitative)
- Interview insights (qualitative)
- Early signals (comments, trending data)

**Score Interpretation:**
- **0-25%:** Hypothesis likely FALSE; strategy may need pivot
- **26-50%:** Hypothesis UNCERTAIN; mixed signals
- **51-75%:** Hypothesis LIKELY TRUE; proceed with confidence
- **76-100%:** Hypothesis CONFIRMED; prioritize in roadmap

---

## Hypothesis 1: "Bundling Solves Pain"

**Core Claim:** Email + phone bundling is more valuable than separate providers; builders find provider fragmentation tedious.

### Scoring Indicators

**Positive Evidence (Add points):**
- Q2: Respondent uses 2+ providers (5 points each)
- Q2: Respondent uses 3+ providers (10 points)
- Q3: "Setup time / complexity" cited as pain point (5 points)
- Q3: "Lack of [framework integration]" cited (2 points, suggests bundling appeal)
- Interview: "Setting up [Provider A] + [Provider B] was a headache" (10 points)
- Interview: "I'd love a unified API" (8 points)

**Negative Evidence (Subtract points):**
- Q2: Respondent uses only 1 provider (−3 points)
- Q3: Pain point is "Cost" not "Setup complexity" (−3 points)
- Interview: "Provider X is fine, just works" (−5 points)
- Interview: "I prefer best-of-breed for each function" (−10 points)

**Calculation:**
```
H1 Confidence = (Total Positive Points) / (Total Max Possible) × 100%

Example:
- 5 responses × 2+ providers = 25 points
- 3 "Setup complexity" mentions = 15 points
- 1 "prefer separate" = −10 points
- Total: 30 points / 40 max possible = 75% confidence
```

**Target:** 70%+ confidence (>70% of builders cite bundling value)

---

## Hypothesis 2: "DX Drives Choice"

**Core Claim:** Developer experience is primary differentiator vs. Twilio/SendGrid; builders choose tools because they're easier, not cheaper.

### Scoring Indicators

**Positive Evidence:**
- Q4: Email provisioning ranks #1 (3 points; setup matters)
- Q4: Webhooks/features rank higher than price in importance (5 points)
- Q3: "Setup time / complexity" cited (vs. "Cost") (5 points)
- Survey comment: "I'd switch for faster setup" (5 points)
- Interview: "Setup speed is critical" (8 points)
- Interview: "I'd pay 2x for better DX" (10 points)
- Feature ranking: Audit logs > Cost reduction (3 points)

**Negative Evidence:**
- Q6: Price point "$0" or "$9" chosen (−5 points; price-sensitive)
- Q3: "Cost" cited as #1 pain point (−5 points)
- Q5: "Completely free" model preferred (−3 points)
- Interview: "Pricing is the main factor" (−10 points)
- Interview: Setup complexity not mentioned as issue (−3 points)

**Calculation:**
```
H2 Confidence = (DX-focused responses) / (Total responses) × 100%

Success if: DX factors cited 60%+ of the time, AND
            Setup-time pain mentioned more than price sensitivity
```

**Target:** 70%+ confidence (DX is primary selection criterion)

---

## Hypothesis 3: "Framework Integrations Essential"

**Core Claim:** 60%+ of builders use frameworks; framework integration is key distribution channel.

### Scoring Indicators

**Positive Evidence:**
- Q1: Respondent selects any framework (8 points)
- Q1: Respondent selects 2+ frameworks (5 bonus points)
- Q7: "Definitely" or "Probably" if built into framework (5 points)
- Q8: "Framework docs/integration" selected as discovery (10 points)
- Interview: Framework maintainer confirms "high demand" (15 points)
- Interview: Indie builder says "would definitely use if in [Framework]" (8 points)

**Negative Evidence:**
- Q1: "None / Just APIs" selected (−5 points)
- Q1: "Custom / In-house" only (−3 points; suggests framework-agnostic)
- Q7: "Probably not" or "Not applicable" selected (−5 points)
- Q8: "Framework docs" NOT selected (−2 points)
- Interview: "Frameworks don't matter" (−10 points)

**Calculation:**
```
H3 Framework Adoption % = (Respondents selecting any framework) / (Total) × 100%

H3 Integration Value = (Respondents saying framework integration matters) / (Framework users) × 100%

Overall Confidence = (Adoption % > 60%) AND (Integration Value > 70%)
```

**Validation Targets:**
- 60%+ framework adoption
- 70%+ of framework users say integration would matter
- Framework maintainers cite community demand

**Target:** 70%+ confidence

---

## Hypothesis 4: "Enterprise Opportunity Q3+"

**Core Claim:** Enterprise features (SOC 2, audit logs, team controls) are Phase 2 opportunity; today, focus on indie builders.

### Scoring Indicators

**Positive Evidence (Enterprise Interest):**
- Q4: Audit logs rank top 3 (5 points)
- Q4: Team controls rank top 3 (5 points)
- Q5: "Enterprise ($200+/mo)" model selected (8 points)
- Segment: Enterprise respondent (10 points per respondent)
- Interview: Enterprise buyer discusses audit logs (10 points)
- Interview: "We'd need SOC 2" (8 points)

**Negative Evidence (No Enterprise Interest):**
- Q4: Audit logs rank bottom 2 (−3 points)
- Q5: "Completely free" or "Freemium" selected (−2 points; indie focused)
- Segment: 90%+ responses from indie/personal (−5 points)
- Interview: "Enterprise features don't matter yet" (−5 points)

**Calculation:**
```
Enterprise Interest = (Enterprise-focused responses) / (Total) × 100%
Indie Focus = (Indie responses) / (Total) × 100%

H4 Validation = (Enterprise Interest 25-40%) AND (Indie Focus 30-50%)

If Enterprise Interest >50%: Accelerate enterprise roadmap
If Enterprise Interest <15%: Defer enterprise features to Phase 3+
```

**Target:** 25-40% enterprise interest (sufficient for Phase 2, but not immediate priority)

---

## Hypothesis 5: "Phone is Nice-to-Have"

**Core Claim:** Email is critical; phone is differentiator but not deal-breaker.

### Scoring Indicators

**Positive Evidence (Phone as Nice-to-Have):**
- Q4: Email ranks #1, Phone ranks #3-4 (5 points)
- Q4: Email priority > Phone priority (3 points per response)
- Q3: Phone not mentioned as pain point (3 points)
- Interview: "Email is essential, phone would be nice" (8 points)
- Interview: "Phone is probably overkill" (5 points)
- Feature ranking: Email > Phone > Webhooks (3 points)

**Negative Evidence (Phone as Critical):**
- Q4: Email and Phone rank equally (−3 points)
- Q4: Phone ranks #1 or #2 (−5 points)
- Q3: "SMS/Phone" cited as critical pain (−8 points)
- Interview: "Phone is must-have" (−10 points)
- Q9: Likelihood drops below 5 if no phone (−5 points)

**Calculation:**
```
Email Importance % = (Email ranks #1-2) / (Total) × 100%
Phone Importance % = (Phone ranks #1-2) / (Total) × 100%

H5 Validation = (Email > 80%) AND (Phone 60-80%)

If Email >90% and Phone <60%: Deprioritize phone in Phase 1
If Phone >85%: Upgrade phone to Phase 1 priority
```

**Target:** Email >90% importance; Phone 60-80% (secondary feature)

---

## Weekly Summary Score Card

### Template (Update Every Friday)

```
# Hypothesis Validation Summary — Week [1-2]

## H1: Bundling Solves Pain
**Score:** __/100%
**Evidence:**
- + [Number] respondents use 2+ providers
- + [Number] cite "setup complexity" pain
- − [Number] cite "cost" as primary pain
**Confidence:** [Increasing / Stable / Decreasing]
**Action:** [Continue / Adjust messaging / Pivot strategy]

---

## H2: DX Drives Choice
**Score:** __/100%
**Evidence:**
- + [%] cite DX as primary selection factor
- + Setup time mentioned more than cost
- − Price sensitivity signals: [Count]
**Confidence:** [Increasing / Stable / Decreasing]
**Action:** [Emphasize DX in positioning / Test pricing / Adjust]

---

## H3: Framework Integrations Essential
**Score:** __/100%
**Evidence:**
- Framework adoption: __%
- Integration value (among framework users): __%
- Framework maintainer feedback: [Summary]
**Confidence:** [Increasing / Stable / Decreasing]
**Action:** [Prioritize partnerships / Adjust messaging]

---

## H4: Enterprise Opportunity Q3+
**Score:** __/100%
**Evidence:**
- Enterprise interest: __%
- Indie focus: __%
- Enterprise feature mentions: [Count]
**Confidence:** [Increasing / Stable / Decreasing]
**Action:** [Phase 2 roadmap impact]

---

## H5: Phone is Nice-to-Have
**Score:** __/100%
**Evidence:**
- Email importance: __%
- Phone importance: __%
- Feature ranking differential: [Email−Phone = __]
**Confidence:** [Increasing / Stable / Decreasing]
**Action:** [Deprioritize / Keep / Upgrade phone priority]

---

## Overall Assessment
- ✅ Hypotheses confirmed: [List]
- ⚠️ Hypotheses uncertain: [List]
- ❌ Hypotheses rejected: [List]

## Implications for GTM/Product
[Summary of how validated hypotheses should shape strategy]

## Interview Focus Areas (Phase 2)
[Based on Week 1 signals, dig deeper into: ___]
```

---

## Hypothesis Interaction Matrix

Some hypotheses interact with each other:

| If This | Then Expect This | Implication |
|---------|------------------|-------------|
| H3 confirmed (frameworks essential) | H1 + H2 matter more (bundling + DX via integration) | Prioritize framework partnerships |
| H1 rejected (bundling not important) | Focus on H2 + distribution (DX + visibility) | Differentiate on ease, not bundling |
| H5 confirmed (phone is nice-to-have) | Email-first positioning works | Simplify positioning, reduce phone scope |
| H2 rejected (price > DX) | Focus on H5 scope reduction, H4 enterprise | Go cheaper, not faster |

---

## Confidence Threshold Decisions

| Hypothesis | If < 50% | If 50-75% | If > 75% |
|-----------|---------|----------|---------|
| H1 (Bundling) | Remove bundling angle | Test messaging | Lead with bundling |
| H2 (DX) | Emphasize pricing | Mixed positioning | Lead with DX advantage |
| H3 (Frameworks) | Community/content focus | Pursue partnerships | Frameworks first |
| H4 (Enterprise) | Defer Phase 2 | Phase 2 roadmap | Accelerate enterprise |
| H5 (Phone) | Remove phone | Include not featured | Phone is key feature |

---

## Final Validation Checklist (Week 6)

Before publishing Market Validation Report:
- [ ] All 5 hypotheses scored 0-100%
- [ ] Confidence scores have supporting evidence (cited 3+ sources per hypothesis)
- [ ] If any hypothesis <50%: Strategy pivot documented
- [ ] Interview findings match survey findings (no contradictions)
- [ ] Recommendations align with hypothesis scores
- [ ] CMO/CEO agrees with confidence levels before publishing

---

## Quick Reference: Evidence Weight

| Evidence Type | Weight | Points |
|--------------|--------|--------|
| Single survey response | Low | 1-5 points |
| Multiple similar responses (trend) | Medium | 10-25 points |
| Interview insight | Medium-High | 8-15 points |
| Framework maintainer feedback | High | 15-20 points |
| Contradictory evidence | Deduct | −5 to −15 points |

---

## Example Calculation

**H1 Scoring (Week 1 Sample):**

```
Positive signals:
- 15 respondents selected 2+ providers = 75 points
- 8 cited "setup complexity" pain = 40 points
- 2 interviews praised bundling idea = 20 points
Total: 135 points

Negative signals:
- 3 respondents cited "cost" primary = −15 points
- 1 interview: "I prefer best-of-breed" = −10 points
Total: −25 points

Net: 135 − 25 = 110 points
Max possible (based on response rate): 150 points
H1 Confidence: 110/150 = 73% ✅ VALIDATES H1

Action: "Proceed with bundling messaging; hypothesis confirmed at 73% confidence"
```

---
