# AliasKit — Content Alignment & Quality Checklist

**Version:** 1.0
**Date:** 2026-03-28
**Owner:** Content Strategy / Marketing
**Purpose:** Validate all content is aligned, consistent, and ready for publication

---

## Pre-Launch Content Quality Assurance

Use this checklist **before publishing any content** to ensure alignment with GTM strategy and quality standards.

---

## Messaging Alignment (All Content)

### Core Message Consistency
- [ ] **Positioning:** Content accurately reflects "The identity primitive for autonomous agents"
- [ ] **Tagline:** All copy uses "Email, phone, verified identity — without the setup friction" or refers to it
- [ ] **3 Pillars:** Content reinforces at least one of: Identity Infrastructure, Developer Experience, Bundled & Priced Right
- [ ] **No conflicting messages:** Check for any messaging that contradicts GTM_POSITIONING.md

**Validation Steps:**
1. Search all content for "identity primitive" or "complete digital identity" (should appear frequently)
2. Check that no content calls AliasKit "email for agents" (that's AgentMail's positioning)
3. Verify pricing messaging is consistent ($50/mo for Pro, free tier 10/month)
4. Ensure "bundled" or "email + phone" appears in every major piece

### Audience-Specific Messaging
- [ ] **Developer messaging:** Uses technical language (API, SDK, endpoints, Node/Deno/Bun)
- [ ] **Partner messaging:** Emphasizes integration, framework benefits, revenue share
- [ ] **Enterprise messaging:** Highlights compliance, team management, audit trails
- [ ] **Investor messaging:** Focuses on market opportunity, defensibility, growth path

**Validation Steps:**
1. Check that developer content has code examples
2. Check that partner content mentions integration/frameworks
3. Ensure enterprise content is aspirational (Phase 6+) not MVP
4. Verify investor content includes financial metrics

### Tone & Voice Consistency
- [ ] **Tone:** Direct, technical, honest (no hype, no buzzwords)
- [ ] **Voice:** Speaks to agents and developers, not generic audience
- [ ] **Style:** Short sentences, concrete examples, "show don't tell"
- [ ] **No outdated language:** Remove "revolutionary," "unlock," "at scale" (overused in tech)

**Validation Steps:**
1. Read first paragraph of each major piece aloud (does it sound natural?)
2. Search for buzzwords: "unlock," "revolutionary," "at scale," "paradigm" (should be rare/justified)
3. Check that examples are specific, not generic
4. Verify action-oriented verbs (create, provision, sign up) not passive language

---

## Content-Specific Checklists

### Website Copy (WEBSITE_COPY_UPDATES.md)

#### Hero Section
- [ ] H1 is exactly: "The identity primitive for autonomous agents."
- [ ] H2 is exactly or closely matches: "Email, phone, verified identity — without the setup friction."
- [ ] Body copy explains what one API call does (provisions email + phone)
- [ ] CTA is clear and action-oriented (Get Started, Try Free)
- [ ] No marketing fluff (no "seamless," "powerful," "unlock")

#### Features Section (3 Cards)
- [ ] **Card 1 (Identity Infrastructure):** Emphasizes agents as independent entities
- [ ] **Card 2 (Developer Experience):** Focuses on speed and simplicity (30 lines, no KYC)
- [ ] **Card 3 (Bundled & Priced):** Mentions one provider, one bill, $50/month
- [ ] Each card has 3-4 supporting bullets
- [ ] No redundancy between cards

#### Pricing Section
- [ ] **Free Tier:** 10 identities/month, API access, community support
- [ ] **Pro Tier:** Unlimited identities, $50/month, priority support
- [ ] **Enterprise:** Listed but marked as coming soon (Phase 6)
- [ ] Price comparisons are fair (vs. Twilio, not vs. AgentMail)

#### Use Cases Section
- [ ] 4-5 specific examples (autonomous signup, verification, account recovery, pooling, etc.)
- [ ] Each use case has 1-2 sentence description + example
- [ ] All use cases are realistic agent operations (not human operations)

#### FAQ Section
- [ ] Questions address common developer objections
- [ ] Answers are concise (1-2 paragraphs max)
- [ ] Answers link to docs or relevant resources when applicable
- [ ] FAQ doesn't repeat website copy verbatim

### Blog Posts (BLOG_OUTLINES.md)

#### Post #1: Category/Positioning ("Why Agents Need Identity")
- [ ] **Thesis:** Clearly stated in opening (agents lack identity, this is a problem)
- [ ] **Problem:** Concrete examples, not abstract
- [ ] **Solution:** AliasKit positioned as addressing the gap
- [ ] **Call to action:** Links to docs or getting started
- [ ] **Word count:** ~1500 words (target)
- [ ] **Tone:** Educational, not promotional

#### Post #2: Practical ("Building Autonomous Workflows")
- [ ] **Prerequisites:** Clearly listed (Node 18+, API key, etc.)
- [ ] **Code examples:** Tested, syntactically correct, well-commented
- [ ] **Step-by-step:** Each section builds on previous
- [ ] **Copy-paste ready:** Code should work as-is for developers
- [ ] **Word count:** ~2000 words
- [ ] **Tone:** Tutorial, hands-on

#### Post #3: Partnership ("Framework + AliasKit")
- [ ] **Partnership:** Announced clearly (if applicable)
- [ ] **Feature:** New integration explained with example
- [ ] **Benefits:** Clear for framework users
- [ ] **Availability:** When integration is available
- [ ] **Word count:** ~1200 words
- [ ] **Tone:** Announcement + educational

#### Post #4: Technical ("Architecture & Scalability")
- [ ] **Architecture:** System diagram or detailed explanation
- [ ] **Technical depth:** Explains design decisions, trade-offs
- [ ] **Code examples:** Low-level details (architecture, not usage)
- [ ] **Scalability:** Performance metrics, limits, optimization
- [ ] **Word count:** ~2500 words
- [ ] **Tone:** Technical, credibility-building

### Partnership Outreach (PARTNERSHIP_OUTREACH.md)

#### Email Templates
- [ ] **Subject:** Clear, not clickbait (references partnership/integration)
- [ ] **Opening:** Personalized, references framework specifically
- [ ] **Problem/Value:** Explains why partnership matters for their community
- [ ] **Ask:** Clear, specific (30-min call, technical review, etc.)
- [ ] **Tone:** Respectful, not presumptuous (not "please respond")

#### Discovery Call Script
- [ ] **Opening:** Acknowledges their work, frames as completing infrastructure
- [ ] **Problem:** Explained from framework user perspective, not AliasKit perspective
- [ ] **Solution:** Positioned as framework feature, not AliasKit feature
- [ ] **Revenue share:** Mentioned as mutual benefit, not pressure
- [ ] **Next steps:** Clear (technical spec, follow-up call, etc.)

#### One-Pager
- [ ] **Headline:** Captures key value (e.g., "Identity for LangChain Agents")
- [ ] **Problem statement:** Specific to their ecosystem
- [ ] **Solution:** How AliasKit fits
- [ ] **Partnership model:** Revenue share, co-marketing, support
- [ ] **Contact:** Clear next step
- [ ] **Length:** True one-page (fits on printed page)

### Press Release (PRESS_RELEASE_TEMPLATE.md)

#### Format & Structure
- [ ] **Header:** FOR IMMEDIATE RELEASE (or embargo date)
- [ ] **Headline:** Clear, newsworthy, not salesy
- [ ] **City/Date:** Included in byline
- [ ] **Dateline:** First paragraph starts with city, date
- [ ] **Boilerplate:** Company description at end (50-100 words)
- [ ] **Contact:** Media contact with email, phone

#### Content Quality
- [ ] **Quotes:** Attributed to specific person with title, sound authentic
- [ ] **Data/metrics:** Included where credible (e.g., LangChain 500k+ users)
- [ ] **Differentiation:** Clearly states vs. competitors (email vs. email-only, bundled vs. scattered)
- [ ] **No hype:** Avoids "revolutionary," "first-ever," "game-changing"
- [ ] **Length:** ~400-500 words (3-4 paragraphs, standard press release length)

#### Tone & Timing
- [ ] **Tone:** Professional, journalistic (not marketing-speak)
- [ ] **Embargo:** Clear embargo date if applicable
- [ ] **Timing:** Dates align with actual launch date
- [ ] **News angle:** Would a reporter find this newsworthy? (framework partnerships, market timing, etc.)

### Investor Pitch (INVESTOR_PITCH_OUTLINE.md)

#### Pitch Deck Outline
- [ ] **Slide 1-3:** Problem, market opportunity, solution (clear narrative arc)
- [ ] **Slide 4-7:** Business model, traction, team, ask (credibility buildup)
- [ ] **Slide 8-12:** Financial projections, vision, roadmap (forward-looking)
- [ ] **Total slides:** 10-12 (digestible in 10-20 minutes)

#### Financial Projections
- [ ] **Unit economics:** Clearly stated (COGS, gross margin, CAC, LTV)
- [ ] **3-year model:** Shows path to profitability
- [ ] **Assumptions:** Stated explicitly (churn, CAC, conversion rates)
- [ ] **Conservative:** Not overly optimistic (still credible)
- [ ] **Revenue drivers:** Clear (direct SaaS, partnerships, enterprise)

#### Competitive Positioning
- [ ] **Comparison table:** Includes 3-4 competitors, 5-6 dimensions
- [ ] **Defensibility:** Explains why AliasKit is hard to copy
- [ ] **Market window:** 6-12 month window explained
- [ ] **Network effects:** Partnership distribution moat discussed

---

## Consistency Checks (All Content)

### Terminology
- [ ] **"Agent":** Not "AI," "autonomous system," or "bot"
- [ ] **"Identity":** Not "credentials," "account," or "profile"
- [ ] **"Provision":** Not "create," "generate," or "setup" (use provision for technical, create for user-friendly)
- [ ] **"Bundled":** Consistently used to describe email + phone together
- [ ] **Frameworks:** Always capitalized (LangChain, Anthropic SDK, OpenClaw)
- [ ] **Pricing:** Consistent ($50/month for Pro, free tier with 10 identities/month)

**Validation Step:**
Search for alternative terms and replace with standardized terminology.

### Links & CTAs
- [ ] **All CTAs are action-oriented:** "Get Started," "Try Free," "Read Docs," "Book a Call" (not "Click Here")
- [ ] **Links are tracked:** UTM parameters for analytics (if applicable)
- [ ] **Destination links are accurate:** All internal links work, external links are relevant
- [ ] **CTA color consistent:** Same color/style across all content

### Examples & Use Cases
- [ ] **Examples are agent-specific:** Not human-focused (not "customer resumes their password" but "agent recovers account access")
- [ ] **Examples are concrete:** Not "use cases" but "your agent can sign up for GitHub"
- [ ] **Examples avoid jargon:** Explains context clearly
- [ ] **Diversity of examples:** Shows email, SMS, multi-channel, pooling, etc.

### Product References
- [ ] **Pricing is accurate:** $50/month, free tier 10/month (check with product)
- [ ] **Feature list is accurate:** Email, phone, metadata, API key auth (check with product)
- [ ] **Timeline is accurate:** Q2 launch, Phase 2 in Q3 (check with product)
- [ ] **API endpoints are accurate:** /v1/identities, /v1/identities/:id/emails (check with docs)

---

## Cross-Document Consistency

### Content Dependencies
- [ ] **MESSAGING_GUIDE.md is source of truth** for messaging
- [ ] **GTM_POSITIONING.md is source of truth** for positioning
- [ ] **SPEC.md is source of truth** for product features and timeline
- [ ] **All other content derives from these three**

### No Conflicting Messages
- [ ] **Website copy doesn't contradict blog posts** (same messaging pillars)
- [ ] **Partner outreach doesn't promise features** not in product roadmap
- [ ] **Press release doesn't claim "first-ever"** if AgentMail exists
- [ ] **Investor pitch isn't more optimistic** than realistic financial model

### Consistent Narratives
- [ ] **Problem statement:** Same across website, blog, pitch, press release
- [ ] **Solution:** Same positioning across all channels
- [ ] **Differentiation:** Same competitive claims everywhere
- [ ] **Timeline:** Same roadmap mentioned everywhere

---

## SEO & Discoverability

### Blog Posts
- [ ] **Meta description:** Written and under 160 characters
- [ ] **Keywords:** Include 3-5 relevant SEO keywords in copy naturally
- [ ] **Headings:** H1, H2, H3 hierarchy is clear and descriptive
- [ ] **Internal links:** Link to other blog posts, documentation where relevant
- [ ] **External links:** Link to relevant frameworks, services (credibility)
- [ ] **Images:** Include at least 1 image with descriptive alt text

### Website Pages
- [ ] **Meta descriptions:** All pages have meta descriptions
- [ ] **Heading hierarchy:** H1 appears once, H2/H3 nested logically
- [ ] **Schema markup:** Structured data for pricing, FAQs if applicable
- [ ] **Mobile optimization:** Content is readable on mobile (tested)
- [ ] **Page speed:** Loads in < 3 seconds (tested)

### Press Release
- [ ] **Keyword placement:** Keywords appear naturally in headline, first paragraph
- [ ] **Distribution:** Includes keywords for news search engines
- [ ] **Rich media:** Links to press kit, screenshots, video if available

---

## Editing & Proofreading

### Grammar & Spelling
- [ ] **Spell check:** All content passes spell check
- [ ] **Grammar:** Sentences are clear, no grammatical errors
- [ ] **Punctuation:** Consistent punctuation style (e.g., Oxford comma, dash usage)
- [ ] **Formatting:** Consistent formatting (bold, italics, code blocks)

### Accuracy
- [ ] **Numbers:** All statistics, pricing, metrics are accurate
- [ ] **Names:** Company names, people names spelled correctly
- [ ] **Dates:** All dates are accurate and formatted consistently
- [ ] **Links:** All links are accurate and not broken

### Tone & Flow
- [ ] **Sentence length:** Mix of short and long sentences (not all short, not all long)
- [ ] **Paragraph length:** Paragraphs are 2-4 sentences (scannable)
- [ ] **Transitions:** Ideas flow logically from one to next
- [ ] **Readability:** Written at appropriate level for audience

### Accessibility
- [ ] **Alt text:** All images have descriptive alt text
- [ ] **Color contrast:** Text is readable on background
- [ ] **Font size:** Large enough for readability (14px+ body text)
- [ ] **Structure:** Headings and lists used for scannability

---

## Legal & Compliance

### Claims & Promises
- [ ] **No unfounded claims:** All claims are defensible
- [ ] **No promises we can't keep:** Roadmap items marked as coming soon
- [ ] **Competitive claims fair:** Don't misrepresent competitors
- [ ] **Pricing accurate:** Pricing information is up-to-date

### Terms & Links
- [ ] **Terms of Service linked:** On website, mentioned in press
- [ ] **Privacy Policy linked:** Clear on website
- [ ] **Data claims:** Any data/storage claims align with actual infrastructure
- [ ] **Compliance:** Enterprise claims (SOC 2) only if true

---

## Final QA Checklist (Before Publishing)

### All Content Reviewed By
- [ ] **CEO/Founder:** Messaging is approved, tone is authentic
- [ ] **Product Lead:** Feature claims are accurate, timeline is realistic
- [ ] **Marketing Lead:** Copy is ready for publication, links work
- [ ] **Legal:** No liability or compliance issues

### All Content Tested
- [ ] **Links:** All internal and external links work
- [ ] **Code examples:** All code snippets are syntactically correct, run without error
- [ ] **Formatting:** Content displays correctly on web, mobile, email
- [ ] **Analytics:** Tracking is set up (if applicable)

### Readiness Checklist
- [ ] All content passes this checklist ✓
- [ ] All cross-document dependencies are satisfied ✓
- [ ] All team approvals obtained ✓
- [ ] All legal/compliance review completed ✓
- [ ] All links tested ✓
- [ ] All code examples tested ✓

**Sign-off:**
- [ ] Content Strategy: _____________________ Date: _____
- [ ] Marketing Lead: _____________________ Date: _____
- [ ] Product Lead: _____________________ Date: _____
- [ ] CEO/Founder: _____________________ Date: _____

---

## Red Flags (Stop & Review If Found)

⛔ **Stop if you find:**
- [ ] Conflicting messaging between documents (e.g., "email only" vs "email + phone")
- [ ] Unfounded claims (e.g., "fastest," "cheapest" without data)
- [ ] Broken links or unfinished content
- [ ] Outdated information (pricing, timeline, features)
- [ ] Grammatical errors or typos in major content
- [ ] Missing attribution or source for claims
- [ ] Legal/compliance concerns not addressed
- [ ] Code examples that don't work

**If any red flag found:** Don't publish. Review and fix with relevant team member.

---

## Content Approval Workflow

**Step 1:** Author completes content and self-checks against relevant section above

**Step 2:** Content Strategy reviews for messaging alignment and consistency

**Step 3:** Marketing reviews for tone, formatting, SEO readiness

**Step 4:** Product reviews for accuracy of features, timeline, pricing

**Step 5:** Legal reviews for compliance, claims, terms

**Step 6:** CEO approves messaging and tone (final sign-off)

**Step 7:** Publish and track metrics

---

## Post-Publication Tracking

### Content Performance Metrics
- [ ] Website traffic (Google Analytics)
- [ ] Blog engagement (views, scroll depth, time on page)
- [ ] Social reach (impressions, engagement, shares)
- [ ] Email metrics (open rate, click rate)
- [ ] Conversion metrics (signups, API key creation)

### Feedback Collection
- [ ] User feedback (comments, support tickets)
- [ ] Framework partner feedback (response to pitch)
- [ ] Investor feedback (questions, objections)
- [ ] Team feedback (what worked, what didn't)

### Updates Log
- [ ] Track any corrections or updates made post-publication
- [ ] Update CONTENT_STRATEGY_SUMMARY.md with new data/metrics
- [ ] Document lessons learned for next content cycle
