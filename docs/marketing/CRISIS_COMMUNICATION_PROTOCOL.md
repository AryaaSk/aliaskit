# Crisis Communication Protocol — Day 0 Launch

**Purpose:** Rapid response procedures for launch day issues
**Owner:** Content Strategist + All Functions
**Timeline:** March 29, 2026 (Day 0)
**Status:** Ready to activate if needed

---

## Escalation Decision Tree

### Tier 1: Minor Issues (Respond in <15 min)

**What qualifies:**
- Single social media typo
- Minor website display issue (not functionality)
- Slow page load (but accessible)
- Single negative comment on Twitter

**Who decides:** Marketing/Ops lead
**Action:** Fix locally, no public announcement needed
**Example:** "Fixed a typo on pricing page, thanks for catching that!"

---

### Tier 2: Moderate Issues (Respond in <30 min)

**What qualifies:**
- Website temporarily slow (but recovering)
- Press release needs minor clarification
- API response time elevated (but working)
- Multiple similar negative comments emerging

**Who decides:** Product + CEO
**Actions:**
1. Assess scope and impact
2. Determine if public transparency needed
3. Post status update if necessary
4. Make corrective changes
5. Communicate resolution

**Example:** "We're experiencing elevated traffic (good problem!). Working to scale. More updates in 30 min."

---

### Tier 3: Major Issues (Immediate CEO escalation)

**What qualifies:**
- Website down or completely broken
- Press release contains false/misleading claims
- API completely non-functional
- Legal/compliance issue emerges
- Significant negative press or social backlash
- Messaging contradiction detected in core messaging

**Who decides:** CEO + CFO
**Actions:**
1. CEO notified immediately (phone call, not Slack)
2. Assess severity and PR impact
3. Decide: Fix quietly vs. public transparency
4. Activate contingency plan if needed
5. Post public update (transparency builds trust)

**Example:** "We're experiencing temporary website issues and have activated our backup. Full service restored in 15 min. Thanks for patience."

---

## Issue-Specific Protocols

### Website Down

**Detection:** Page doesn't load or 500 error
**Impact:** HIGH (blocks all signups)
**Response Time:** Immediate (< 5 min)

**Steps:**
1. [ ] Ops confirms outage (is it real or local issue?)
2. [ ] CEO notified immediately
3. [ ] Backup landing page activated (if available)
4. [ ] Twitter post: "We're aware of the issue and working on it. Updates every 15 min."
5. [ ] Root cause identified
6. [ ] Fix deployed
7. [ ] Verification test (load page in 3 browsers)
8. [ ] "Service restored" announcement
9. [ ] Post-mortem scheduled for next day

**Messaging:**
```
🚨 Site temporarily down, we're on it.
Updates: [status page URL]
ETA: [specific time, not "soon"]
Thanks for your patience! 🙏
```

---

### Press Release Issue (False Claim, Overstatement, Legal Problem)

**Detection:** Legal flags issue, media questions claim, competitor challenges statement
**Impact:** CRITICAL (damages credibility)
**Response Time:** Immediate (< 30 min)

**Steps:**
1. [ ] Legal + CEO review claim immediately
2. [ ] Assess: True but misleading? False? Defensible?
3. [ ] If indefensible: Plan correction
4. [ ] Draft correction: "Our original statement said X, which wasn't accurate. Correction: Y"
5. [ ] CEO approves correction
6. [ ] Send correction to media contacts who received original
7. [ ] Post on social media + blog
8. [ ] Link to clarification in all channels

**Messaging:**
```
Correction: Our initial press release stated [X].
This was [inaccurate/misleading]. The correct information is [Y].
We apologize for the confusion and appreciate the correction.
```

---

### API Not Working / Demo Broken

**Detection:** Users report API errors, demo endpoints failing, support surge
**Impact:** HIGH (kills conversions)
**Response Time:** < 10 min assessment, < 30 min communication

**Steps:**
1. [ ] Product confirms issue scope (all users? Some endpoints? Demo only?)
2. [ ] Engineering assesses fix time (15 min? 1 hour? Major issue?)
3. [ ] CEO notified
4. [ ] Public transparency decision made
5. [ ] If fixable in < 15 min: "Working on it, update in 10 min"
6. [ ] If > 30 min: Post status page with ETA
7. [ ] Activate contingency: "Try this alternative while we fix it"
8. [ ] Monitor fix deployment
9. [ ] "Service restored" announcement

**Messaging:**
```
⚠️ We're aware some users are experiencing API issues.
Our team is actively working on it.
Status updates every 15 minutes: [status page]
Thanks for your patience!
```

---

### Negative Press / Social Backlash

**Detection:** HackerNews downvoted to -50, Twitter trending #aliaskitfail, major publication publishes critical piece
**Impact:** MEDIUM-HIGH (reputation + conversation shift)
**Response Time:** < 60 min to initial response

**Steps:**
1. [ ] Collect all criticism and identify themes
2. [ ] Assess: Fair criticism? Misinformation? Trolling?
3. [ ] CEO reads all comments/article
4. [ ] Decide: Respond or let community defend?
5. [ ] If responding: Acknowledge valid points, correct misinformation
6. [ ] Draft response emphasizing facts and roadmap
7. [ ] Post in threads where criticism is concentrated
8. [ ] Do NOT be defensive; BE factual

**Messaging (Valid Criticism):**
```
Fair point! You're right that [concern].
Here's how we're thinking about it: [explanation].
We'd love your feedback as we build this: [forum/email]
```

**Messaging (Misinformation):**
```
Quick clarification: We actually [do/don't do X].
[Evidence or link]. Thanks for giving us a chance to clarify!
```

**Messaging (Trolling):**
*Don't respond.* Let users defend. Engage with substantive feedback only.

---

### Messaging Conflict Detected

**Detection:** Blog post says one thing, website copy says another; or partnership email contradicts press release
**Impact:** MEDIUM (confuses users, undermines credibility)
**Response Time:** Halt affected channel immediately

**Steps:**
1. [ ] Content Strategist confirms the conflict
2. [ ] CEO made aware
3. [ ] Determine: Which version is correct?
4. [ ] Update incorrect channel immediately
5. [ ] No need for public announcement (internal fix)
6. [ ] Update all copies of content to be consistent
7. [ ] Communicate correction to team

**Messaging (Internal):**
```
🔄 Messaging clarification:
Previous statement said [X], corrected to [Y] for consistency.
Updated on: [website, blog, etc.]
New canonical messaging: [quote from MESSAGING_GUIDE.md]
```

---

## Communication Channels During Crisis

**Priority Order:**
1. **CEO Slack DM** — Immediate escalation (phone call if critical)
2. **#launch-status channel** — Public coordination and updates
3. **Twitter** — Only for user-facing transparency
4. **Email** — Follow-up and detailed updates to media/partners
5. **Blog post** — Detailed explanation (for major issues only)

**Response Speed Requirements:**
- Tier 1: 15 min
- Tier 2: 30 min
- Tier 3: 5 min escalation, 30 min public response

---

## Crisis Communication Templates

### Template A: Service Issue (We're Fixing It)

```
🚨 Status Update — [Issue Type]

We're aware of [specific issue] affecting [scope].
Our team is actively working on a fix.

What we know:
• Issue started at [time]
• Affects [users/features]: [scope]
• Root cause: [if known]
• ETA for fix: [specific time or "investigating"]

What you can do:
• Check our status page: [URL]
• For urgent issues: support@aliaskit.io
• We'll update every [15/30] minutes

Thank you for your patience! 🙏
```

---

### Template B: We Made a Mistake (Correction & Apology)

```
📝 Correction

Our initial [press release/blog post/announcement] stated [X].
This was [inaccurate/incomplete]. The correct information is [Y].

We apologize for any confusion.
The updated information is now published here: [link]

Questions? Reply to this thread or email us: support@aliaskit.io
```

---

### Template C: Fair Criticism (We Hear You)

```
You're absolutely right. [Acknowledgment of valid point].

Here's our thinking: [Explanation of trade-off or roadmap plan]

We're committed to [improvement/solution] by [timeline].
Your feedback is invaluable: [forum/email for ongoing feedback]

Thanks for raising this!
```

---

### Template D: Misinformation Correction

```
Quick clarification: [We actually do/don't X]

[Evidence, link, or specific example showing correct info]

Thanks for letting us clarify! Any other questions, feel free to ask.
```

---

## Escalation Contact List

| Role | Name | Phone | Slack | Email |
|---|---|---|---|---|
| **CEO** | [Name] | [Phone] | @CEO | [Email] |
| **COO** | [Name] | [Phone] | @COO | [Email] |
| **Product Lead** | [Name] | [Phone] | @ProductLead | [Email] |
| **Legal Lead** | [Name] | [Phone] | @LegalLead | [Email] |
| **Communications Lead** | [Name] | [Phone] | @CommLead | [Email] |
| **Ops Lead** | [Name] | [Phone] | @OpsLead | [Email] |
| **Content Strategist** | [8491ba0a] | — | @ContentStrategist | [Email] |

---

## Decision Matrix: Respond or Let It Go

| Situation | Respond? | Why | How |
|---|---|---|---|
| Single negative comment | NO | Don't amplify isolated feedback | Ignore |
| Constructive criticism (10+ people) | YES | Valid feedback deserves acknowledgment | Thoughtful reply |
| Misinformation spreading (trending) | YES | Protect brand reputation | Clear facts + link |
| Trolling (no substance) | NO | Engaging feeds trolls | Ignore, users will defend |
| Legal/compliance issue | YES | MUST address immediately | CEO + legal + transparency |
| Product bug report | YES | Show we care about quality | Acknowledge + ETA |
| Competitor attack | MAYBE | Only if spreading misinformation | Facts only, no defensiveness |
| Feature request | NO | Not a crisis | Save for roadmap consideration |

---

## What NOT to Do During Crisis

❌ **Don't be defensive.** "You're wrong because..."
✅ **Do acknowledge.** "That's a fair point..."

❌ **Don't delay transparency.** Radio silence makes it worse.
✅ **Do communicate early.** "We're aware and working on it"

❌ **Don't make promises you can't keep.** "Fixed in 5 min!"
✅ **Do estimate conservatively.** "Working on it, update in 15 min"

❌ **Don't argue on social media.** You can't win.
✅ **Do offer to discuss offline.** "Email us: support@..."

❌ **Don't delete negative comments.** It looks like cover-up.
✅ **Do respond respectfully.** Shows you're listening.

---

## Post-Crisis Protocol

**After issue is resolved:**

1. [ ] Post "All Clear" message in #launch-status
2. [ ] Thank the community for patience
3. [ ] Brief explanation of what happened (transparency builds trust)
4. [ ] What we learned and how we'll prevent it next time
5. [ ] Schedule post-mortem for next day (internal)
6. [ ] Document incident and resolution in wiki
7. [ ] Share learnings with team (blameless retrospective)

**Example Post-Crisis Message:**
```
✅ Issue Resolved

Our [API/website] issue has been fully resolved.
Here's what happened: [brief explanation]
How we fixed it: [what we did]
How we'll prevent this: [process improvement]

Thanks again for your patience and for being part of our launch! 🚀
```

---

## When to Activate This Protocol

✅ **Activate if:**
- Website is down or significantly broken
- API/core functionality is non-functional
- Legal/compliance issue emerges
- Significant negative press or social backlash
- Messaging conflict detected in core messaging
- Major feature not working as advertised
- Any Tier 3 issue above

⏸️ **Don't activate for:**
- Single typo or minor display bug
- One negative comment
- Slow loading (but working)
- Feature requests or constructive feedback

---

**Document:** CRISIS_COMMUNICATION_PROTOCOL.md
**Version:** 1.0
**Created:** 2026-03-28
**Status:** Ready to activate if needed
**Responsibility:** Content Strategist + All Functions

🚨 Hope we don't need this, but ready just in case.
