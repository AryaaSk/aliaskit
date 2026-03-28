# Typeform Setup Quick Reference

**For:** Growth/Content Team
**Task:** Create Typeform survey using these specifications
**Timeline:** Complete by Thursday 2026-03-30 (launch Friday)

---

## Basic Settings

- **Form Title:** "Help Shape AliasKit — 10-min feedback survey"
- **Form Description:** "We're building AliasKit: a unified API for provisioning email and phone identities for AI agents. Want to shape the product? Fill out this quick survey and tell us what matters to you. This survey takes ~10 minutes and your feedback directly informs our product roadmap."
- **Welcome Screen:** Enable (friendly intro)
- **Thank You Screen:** "Thanks for the feedback! Early access + launch credits coming soon 🎁"
- **Response Limit:** None (unlimited responses)
- **Response Notifications:** Enable email notifications

---

## Survey Questions (Copy-Paste Ready)

### Q1: Framework Usage (Multiple Choice)
**Question:** What frameworks do you use to build agents? (Select all that apply)

**Options:**
- LangChain
- Anthropic SDK
- OpenClaw
- LLaMA / Ollama
- Custom / In-house
- None / Just APIs

**Settings:** Multiple select

---

### Q2: Current Provider Count
**Question:** Currently, how many email/phone/identity providers do you use for your agent infrastructure?

**Options:**
- 1 provider
- 2 providers
- 3+ providers
- Don't use any yet

**Settings:** Single choice

---

### Q3: Infrastructure Pain Points
**Question:** What's the biggest pain point in setting up agent infrastructure? (Select top 2)

**Options:**
- Setup time / complexity
- Cost
- Feature gaps (webhooks, audit logs, etc.)
- Reliability / uptime
- Lack of framework integration
- Support / documentation quality
- Other: _________

**Settings:** Multiple select (limit to 2)

---

### Q4: Feature Prioritization
**Question:** Rank these features by importance for your use case (1 = most important, 5 = least)

**Type:** Ranking / Ordering

**Options to rank:**
- Email provisioning (receive + send)
- SMS/Phone provisioning (inbound)
- Webhooks (real-time event notifications)
- Audit logs (compliance / debugging)
- Team/multi-tenant access controls

**Settings:** Drag-to-rank or matrix

---

### Q5: Pricing Model Preference
**Question:** Which pricing model would you prefer?

**Options:**
- Completely free (no limitations)
- Freemium: Free tier + paid upgrades ($0–$49/mo)
- Mid-market: Pay for usage ($50–$199/mo)
- Enterprise: Premium support + compliance ($200+/mo)
- Unsure

**Settings:** Single choice

---

### Q6: Willingness-to-Pay
**Question:** At what price point would AliasKit be a no-brainer for your team?

**Options:**
- Free forever
- $9/month
- $29/month
- $49/month
- $99/month
- $199+/month
- Depends on features

**Settings:** Single choice

---

### Q7: Framework Integration Intent
**Question:** If AliasKit were built into your framework of choice, would you use it?

**Options:**
- Definitely
- Probably
- Maybe
- Probably not
- Not applicable / don't use frameworks

**Settings:** Single choice

---

### Q8: Discovery Channel
**Question:** How would you discover AliasKit? (Select all that apply)

**Options:**
- Framework docs/built-in integration
- Product Hunt
- HackerNews / Y Combinator
- Twitter / LinkedIn
- Community forums/Discord (LangChain, Anthropic, etc.)
- Email newsletter
- Direct outreach / friends
- Other: _________

**Settings:** Multiple select

---

### Q9: Likelihood to Use
**Question:** How likely are you to use AliasKit for your next agent project?

**Type:** Rating Scale (0-10)

**Labels:**
- Left (0): Not at all likely
- Right (10): Definitely will use

**Settings:** 0-10 scale, required

---

### Q10: Contact & Segment Info
**Question:** Email (for early access / results updates)

**Type:** Email field

**Settings:** Optional

---

### Q11: Work Type / Segment
**Question:** What type of work are you doing with agents?

**Options:**
- Personal project / learning
- Side project / indie business
- Startup / scale-up (10-100 people)
- Enterprise / large company (1000+ people)
- Open source / community framework
- Other: _________

**Settings:** Single choice

---

### Q12: Framework Excitement
**Question:** Most exciting framework or tool right now:

**Type:** Short text

**Settings:** Optional

---

## Typeform Configuration Checklist

- [ ] Set form to **Public** (shareable link)
- [ ] Enable **Notifications** (Growth team email)
- [ ] Set **Language** to English
- [ ] Enable **Progress Bar** (helps with completion)
- [ ] Set form **Color** to match AliasKit branding (if available)
- [ ] Test all questions on mobile (80% of clicks will be mobile)
- [ ] Generate **Public Link** (will be used in all distribution channels)
- [ ] Create **Spreadsheet Export** destination (Google Sheets) for automatic response sync
- [ ] Set up **Slack Notification** (optional, for real-time alerts)

---

## Response Tracking Setup

### Create a Google Sheet with these columns:

| Column | Data |
|--------|------|
| A | Response Date |
| B | Email |
| C | Framework(s) Used |
| D | # of Providers |
| E | Top Pain Point |
| F | Feature Priority #1 |
| G | Preferred Pricing |
| H | Price Point |
| I | Would Use? (0-10) |
| J | Discovery Method |
| K | Segment (Indie/Startup/Enterprise/Framework) |
| L | Interview Candidate? (Y/N) |
| M | Notes |

### Link Typeform to Google Sheet:
1. In Typeform: Settings → Integrations
2. Add Google Sheets integration
3. Select new/existing Google Sheet
4. Responses auto-sync as they arrive

---

## Distribution Links (To Be Created)

Once Typeform is live, you'll have:
- **Public Link:** https://typeform.com/to/[shortcode]
- **Shortened Link (for Discord/Twitter):** bit.ly/aliaskit-survey
- **QR Code:** Generate from Typeform

---

## Launch Checklist

**Thursday 2026-03-30:**
- [ ] All 12 questions created in Typeform
- [ ] Test responses from team member
- [ ] Google Sheet linked + test auto-sync
- [ ] Public link generated + shortened
- [ ] Early access email drafted (for respondents)
- [ ] Discord messaging finalized (per DISCORD_OUTREACH.md)
- [ ] Product Hunt post drafted
- [ ] HackerNews outline prepared

**Friday 2026-03-31 (Launch Day):**
- [ ] Publish Product Hunt post (9am)
- [ ] Post Discord messages in Tier 1 communities (10am)
- [ ] Tweet/LinkedIn posts (11am)
- [ ] Monitor response rate (track hourly)
- [ ] Reply to comments / engage community (all day)
- [ ] Send followup DMs to 10-15 framework maintainers (3pm)

---

## Success Metrics (Daily Tracking)

Track in spreadsheet:

| Metric | Day 1 | Day 2 | Day 3 | Day 4 | Day 5 | Target |
|--------|-------|-------|-------|-------|-------|--------|
| Total Responses | — | — | — | — | — | 50+ |
| PH Responses | — | — | — | — | — | 20-30 |
| Discord Responses | — | — | — | — | — | 15-25 |
| HN Responses | — | — | — | — | — | 10-20 |
| Avg. Completion % | — | — | — | — | — | 90%+ |

---

## Troubleshooting

**Low response rate (< 5 in Day 1)?**
- Check link syntax (no typos)
- Verify Product Hunt post is visible / pinned
- Re-post Discord message in additional channels
- Send direct DMs to 20+ prominent community members

**High abandonment rate (< 70% completion)?**
- Check Q4 (ranking) — may be too complex on mobile
- Consider reducing from 12 to 10 questions (remove Q11 or Q12)
- Add progress bar message: "Almost there!"

**Wrong audience (mostly enterprise respondents, few indie)?**
- Shift focus to HackerNews (attracts more indie builders)
- Post in indie-focused channels (#indie-hackers, r/SideProject)
- Email reach-out to known indie builder communities

---

## Post-Launch (After 48 hours)

1. Export responses from Typeform → Google Sheet
2. Quick analysis: Count responses by segment, framework adoption %, pain points
3. Post update to ALI-36 with preliminary findings
4. Identify top 10 interview candidates from responses
5. Begin outreach for Phase 2 interviews

---
