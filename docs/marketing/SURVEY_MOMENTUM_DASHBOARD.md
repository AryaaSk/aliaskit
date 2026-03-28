# Survey Momentum Monitoring Dashboard

**For:** Competitive Analyst
**Purpose:** Daily tracking and early intervention (Week 1-2)
**Timeline:** 2026-03-31 — 2026-04-11

---

## Daily Tracking Template

### Launch Day Checklist (Friday 2026-03-31)

**Pre-Launch (9:00am PT)**
- [ ] Typeform link verified (click test)
- [ ] Response tracking spreadsheet open + shared
- [ ] Slack notifications enabled
- [ ] Discord community posts scheduled
- [ ] Product Hunt post finalized
- [ ] Twitter/LinkedIn posts queued

**Launch Window (10:00am-5:00pm PT)**

| Time | Action | Owner | Notes |
|------|--------|-------|-------|
| 10:00am | Product Hunt post goes LIVE | Growth | Monitor engagement |
| 10:15am | Discord Tier 1 posts (LangChain, Anthropic, OpenClaw) | Growth | Track pinned status |
| 10:30am | Twitter/LinkedIn posts | Growth | Tag @frameworks |
| 12:00pm | First momentum check | Analyst | Log response count + channels |
| 2:00pm | Mid-day check | Analyst | Early troubleshooting if <5 responses |
| 5:00pm | EOD check | Analyst | Initial analysis + next day forecast |

**End of Day Report (5pm)**
```
Survey Launch Report — Friday 2026-03-31

Total Responses: ___
- Product Hunt: ___ (Target: 10-20)
- Discord: ___ (Target: 3-5)
- Direct/Organic: ___ (Target: 2-5)

Issues encountered: ___
Resolution: ___

Forecast for Monday: ___

Next day priorities: ___
```

---

## Daily Monitoring Schedule (Week 1)

### Monday 2026-03-31 — Friday 2026-04-04

**Morning Check (9:00am PT)**
- [ ] Responses overnight count
- [ ] Response quality spot check (legitimate vs. spam)
- [ ] Notable comments/feedback in Product Hunt
- [ ] Issues or blockers overnight

**Afternoon Check (3:00pm PT)**
- [ ] Cumulative response count
- [ ] Completion rate (% finishing full survey)
- [ ] Framework breakdown (are we getting all framework types?)
- [ ] Segment representation (indie vs. startup vs. enterprise)
- [ ] Any trending issues in responses

**End of Day Report (5:00pm PT)**

```
Daily Momentum Report — [Date]

RESPONSES:
- Today: +__ new
- Cumulative: __ total
- Completion rate: __%

BY CHANNEL:
- Product Hunt: __ total (+___ today)
- Discord: __ total (+___ today)
- Direct/Organic: __ total (+___ today)
- HackerNews: __ total (+___ today)

SEGMENT BREAKDOWN:
- Framework users: __%
- Indie builders: __%
- Startups: __%
- Enterprise: __%

QUALITY SIGNALS:
✅ [Positive insight from responses]
⚠️ [Any concern/issue]
❓ [Question to investigate]

FORECAST:
- Day 5 target: 20+ responses
- Week 1 target: 30+ responses
- Week 2 target: 50+ responses

NEXT ACTIONS:
- [ ] [Action 1]
- [ ] [Action 2]
```

---

## Early Intervention Playbook

### Scenario 1: LOW RESPONSE RATE (<5 by noon Day 1)

**Symptoms:**
- Fewer than 5 total responses by 12pm on Friday
- Product Hunt post not getting visibility
- Discord posts getting no engagement

**Diagnostics (Run immediately):**
1. Is Typeform link working? (Click + test submit)
2. Is Product Hunt post visible? (Check trending, search)
3. Is Discord post pinned in #integrations? (Check channel)
4. Are there visible errors in survey? (Check preview)

**Interventions (In priority order):**

✅ **Tier 1 (Do immediately):**
- [ ] Reach out to @LangChain team on Discord (DM mods)
- [ ] Post in Product Hunt discussion (add context/engaging comment)
- [ ] Email 20+ known framework maintainers with survey link

✅ **Tier 2 (If still <10 by EOD):**
- [ ] Post on r/agents, r/LanguageModels with survey link
- [ ] Shorten feedback loop: "Survey live — early responses show [insight]"
- [ ] Offer higher incentive: "$100 Amazon gift card for first 20 respondents"

✅ **Tier 3 (Emergency pivot):**
- [ ] Shift focus to HackerNews (post Show HN post Saturday morning)
- [ ] Direct outreach campaign: DM 50+ prominent indie builders
- [ ] Consider adding first-mover bonus (extra credits for early responses)

---

### Scenario 2: LOW COMPLETION RATE (<70%)

**Symptoms:**
- Survey starts are tracked but many people don't finish
- High drop-off at specific question (e.g., Q4 ranking question)

**Diagnostics:**
1. Which question is causing drop-off? (Export + analyze)
2. Mobile vs. desktop completion rate? (Typeform analytics)
3. Is survey too long? (Typical: 10 min = good, 15 min = risky)

**Interventions:**

✅ **Fix the question:**
- [ ] If Q4 (ranking) is problematic: Replace with simpler rating scale
- [ ] If Q10 (contact info) causes drop: Move to optional, shorten other questions
- [ ] Test on mobile: Ensure no layout issues

✅ **Encourage completion:**
- [ ] Add progress bar message: "You're [X]% done!"
- [ ] Shorten form: Remove Q11 or Q12 (least critical)
- [ ] Incentivize: "Finish survey → guaranteed early access"

✅ **Targeted follow-up:**
- [ ] Export partial responses (people who started but didn't finish)
- [ ] Email: "You started the survey — any blockers? Finish for early access"

---

### Scenario 3: WRONG AUDIENCE (Mostly Enterprise, Few Indie)

**Symptoms:**
- 60%+ responses from large companies
- Few framework integrations mentioned
- Low interest in freemium pricing

**Diagnostics:**
- Is Product Hunt reaching wrong segment? (PH tends towards startups, which is good)
- Is HackerNews launch needed earlier? (HN = more indie/technical)
- Are Discord communities too "enterprise"? (LangChain team might skew larger)

**Interventions:**

✅ **Shift distribution:**
- [ ] Accelerate HackerNews "Show HN" post (Schedule for Thursday Week 2)
- [ ] Post in Indie Hackers, r/SideProject, BuildInPublic communities
- [ ] Focus Discord on developer-focused channels (not enterprise)

✅ **Targeted recruitment:**
- [ ] Email indie builder list from Twitter network
- [ ] Reach out to known solo/2-person AI teams directly
- [ ] Post in LLM fine-tuning / agent framework communities

---

### Scenario 4: TECH/FRAMEWORK BLINDNESS (Missing key frameworks)

**Symptoms:**
- Survey responses show low LangChain adoption (but we expected 40%+)
- Framework breakdown doesn't match our competitive analysis
- Outlier frameworks we didn't expect

**Diagnostics:**
- Are we reaching the right communities? (Where do LangChain users hang out?)
- Is our messaging not resonating with framework users?
- Are they choosing "Custom / In-house" instead of listing specific framework?

**Interventions:**

✅ **Refine messaging:**
- [ ] Explicitly mention [Top Frameworks] in Discord post: "If you use LangChain, Anthropic SDK, OpenClaw..."
- [ ] Ask direct follow-up: "Oh, you use custom setup — what stack?"
- [ ] Target framework Discord/communities more aggressively

✅ **Adjust questions:**
- [ ] Survey edit: Q1 add "OpenAI Function Calling" or other missing frameworks
- [ ] Add follow-up: "What frameworks are you *considering* for next project?"

---

## Weekly Checkpoints

### End of Week 1 (Friday 2026-04-04)

**Target:** 30+ responses

**Weekly Analysis:**

```
WEEK 1 SUMMARY

Total Responses: __ (Target: 30+)
Completion Rate: __%
Response Quality: ___/10 (comments, specificity)

HYPOTHESIS SIGNALS:
H1 (Bundling): ___ framework users, ___ cite provider complexity
H2 (DX drives choice): Setup complexity is top pain? ___ %
H3 (Framework integration): ___ % mention framework adoption
H4 (Enterprise opportunity): ___ % mention enterprise features
H5 (Phone vs. email): Email vs. phone feature ranking

SEGMENT REPRESENTATION:
- Indie: __%
- Startup: __%
- Enterprise: __%
- Framework maintainers: _%

GO-TO-MARKET SIGNALS:
- Most common discovery channel: ___
- Least expected insight: ___
- Biggest surprise: ___

FORECAST:
- Trajectory to 50+ by Week 2: [YES / NO / MAYBE]
- If NO: Escalate interventions [See Scenario X]

NEXT WEEK PRIORITIES:
1. ___
2. ___
3. ___
```

---

### End of Week 2 (Friday 2026-04-11)

**Target:** 50-100 responses (minimum 50)

**Success Criteria:**
- ✅ 50+ total responses (non-negotiable)
- ✅ 80%+ completion rate
- ✅ Representative mix (indie/startup/enterprise/frameworks)
- ✅ 10-15 interview candidates identified

**Analysis Output:**
- [ ] Response data exported + cleaned
- [ ] Segment breakdown finalized
- [ ] Framework adoption % calculated
- [ ] Top 3 pain points by segment identified
- [ ] Interview candidate list (Priority A/B/C) prepared
- [ ] Preliminary findings memo drafted (shared with CMO)

**Interview Recruitment (Begins Monday 2026-04-07):**
- [ ] Segment + score all respondents by interview fit
- [ ] Send recruitment emails to Priority A (5-7 people) Monday
- [ ] Send recruitment emails to Priority B (5-10 people) Tuesday
- [ ] Confirm 10-15 interviews by Thursday
- [ ] Schedule first interviews for Wednesday-Friday

---

## Real-Time Tracking Spreadsheet

**Columns to maintain (auto-update daily):**

| Column | Data Type | Formula/Notes |
|--------|-----------|---------------|
| Date | Date | Daily entry |
| New Responses | Number | Count from Typeform |
| Cumulative | Number | Running total |
| PH Responses | Number | From Typeform utm_source |
| HN Responses | Number | From utm_source |
| Discord | Number | From utm_source |
| Direct/Organic | Number | From utm_source |
| Completion % | % | Completed / Started |
| Avg Time | Minutes | Survey duration |
| Framework % | % | Users selecting framework |
| Pain Point #1 | Text | Most common response |
| Issues | Text | Any noted problems |
| Interventions | Text | Actions taken |
| Forecast | Text | Trajectory assessment |

---

## Communication Schedule

**Daily (During Week 1-2):**
- 5:00pm PT: Slack update to Growth team (momentum check)
- Track: Response count, completion rate, any blockers

**Weekly (Every Friday):**
- Post ALI-36 comment with full weekly analysis
- Share preliminary findings with CMO
- Confirm interview schedule for next week

---

## Success Metrics Targets

| Metric | Day 1 | Day 3 | Day 5 | Week 2 |
|--------|-------|-------|-------|---------|
| **Total Responses** | 5-10 | 15-20 | 25-35 | 50-100 |
| **Completion %** | 85%+ | 85%+ | 85%+ | 80%+ |
| **Framework %** | TBD | TBD | TBD | 40-60% |
| **Indie %** | TBD | TBD | TBD | 30-40% |
| **Interview Candidates** | — | — | — | 10-15 |

---

## Early Warning Signals (Monitor Daily)

🚩 **RED FLAGS (Escalate immediately):**
- Fewer than 5 responses by end of Day 1
- Less than 70% completion rate (suggests survey issue)
- Zero responses from Product Hunt after 4 hours (link problem?)
- High spam/low-quality responses (>10% unusable)
- Framework adoption <15% (suggests wrong audience)

🟡 **YELLOW FLAGS (Adjust next day):**
- Fewer than 20 by end of Day 2
- Fewer than 30 by end of Day 3
- Specific frameworks underrepresented (no LangChain, etc.)
- Segment breakdown skewed (>70% one segment)

🟢 **GREEN SIGNALS (Keep momentum):**
- 10+ responses Day 1
- 25+ responses Day 2
- 80%+ completion rate
- Diverse framework representation
- Mix of indie/startup/enterprise

---

## When to Escalate

**Escalate to Growth/CMO if:**
- Response rate <50% of Week 2 target by Day 4
- Technical issue with Typeform (responses not recording)
- Messaging not resonating (very few in target segments)
- Unexpected opportunity (e.g., enterprise inbound)

**Escalation Path:**
1. Post ALI-36 comment explaining situation
2. Tag CMO + Growth leads
3. Propose intervention (shift strategy, add incentive, pivot channel)
4. Execute with approval

---

## Post-Survey Handoff (Week 2 Friday)

Once survey closes:
1. [ ] Export all responses (JSON + CSV)
2. [ ] Clean data (remove spam, duplicates)
3. [ ] Segment by: Framework, company size, pain points, NPS
4. [ ] Score for interview qualification (H1: easy to validate)
5. [ ] Create interview candidate list (Priority A/B/C)
6. [ ] Transition to INTERVIEW_RECRUITMENT_EMAIL.md
7. [ ] Begin interview outreach Monday 2026-04-07

---
