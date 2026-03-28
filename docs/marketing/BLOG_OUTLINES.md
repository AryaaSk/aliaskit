# AliasKit — Blog Post Outlines

**Version:** 1.0
**Date:** 2026-03-28
**Owner:** Content Strategy / Thought Leadership
**Purpose:** Blog post ideas that position AliasKit as a category leader and drive organic traffic

---

## Blog Strategy

**Objectives:**
1. Establish AliasKit as the category leader for "agent identity"
2. Drive SEO traffic around long-tail keywords (agent identity, autonomous agent infrastructure, etc.)
3. Build credibility with developer and framework communities
4. Support GTM positioning (identity infrastructure, developer experience, bundled solutions)
5. Enable partnerships through thought leadership

**Publishing Schedule (Q2 2026):**
- Week 1-2: "Why Agents Need Identity" (positioning piece)
- Week 3-4: "Building Autonomous Workflows" (practical piece)
- Week 5-6: "Agent Identity in [Framework]" (partnership support)
- Week 7-8: "Technical Deep-Dive" (engineering credibility)

---

## Blog Post 1: Category / Positioning

### Title Options
- "Why Agents Need Identity"
- "The Missing Layer in Agent Infrastructure"
- "Agents as Independent Entities (Not Compute Extensions)"
- "Why Agent Identity Matters"

### Format
~1500 words, 3-4 minute read

### Structure

#### Opening (Hook)
- Start with a problem: "Agents today are compute endpoints, not independent entities."
- Ask a question: "Can an agent sign up for a service? Verify an account? Negotiate a contract?"
- Position the gap: "Most agent frameworks skip identity provisioning. That's a mistake."

#### Section 1: The Problem (Agent Identity Gap)

**What's Missing:**
- Agents can't sign up for services (no verified identity)
- They can't receive email verification (no email address)
- They can't verify via SMS (no phone number)
- Current workarounds are manual, fragile, or borrowed from humans

**Real-World Examples:**
- Customer support agent can't verify caller identity
- Hiring agent can't sign up for job boards
- Vendor negotiation agent can't verify legitimately
- Autonomous workflow agent can't recover lost accounts

**Why This Matters:**
- Limits use cases to "sandbox" / testing only
- Creates security/compliance risks (shared email addresses)
- Requires manual setup and maintenance
- Slows time-to-value for agent deployment

#### Section 2: Why Identity is Infrastructure

**Thesis:** Agent identity is not a feature. It's infrastructure.

**Supporting Arguments:**
- Database for identity? Infrastructure.
- Authentication for identity? Infrastructure.
- Email routing for identity? Infrastructure.
- Identity provisioning should be infrastructure too.

**Framework Analogy:**
- Just like logging, tracing, and error handling are built into frameworks
- Identity should be a first-class citizen in agent frameworks
- Agents born with identity by default = better developer experience

#### Section 3: What Happens When Identity is Built-In

**Use Cases Unlocked:**
1. Autonomous service signups (sign up for GitHub, HubSpot, etc.)
2. Multi-channel verification (email + SMS together)
3. Account recovery workflows (reset password, recover 2FA)
4. Identity pooling (test at scale, demo workflows)
5. Autonomous vendor negotiation (verified agent = credible agent)

**Examples / Scenarios:**
- E-commerce agent autonomously creates supplier accounts
- Support agent verifies customer identity before helping
- Hiring agent posts job openings, collects applications
- QA agent signs up for beta services, tests verification flows

#### Section 4: The Path Forward

**What Needs to Happen:**
1. Agent frameworks need identity provisioning built-in
2. Identity should be as easy to provision as a logger
3. Identity bundles email + phone (not scattered APIs)
4. Pricing should be developer-friendly (not enterprise-focused)

**Call to Action:**
- Framework maintainers: Consider identity a foundational feature
- Developers: Demand identity support in your framework
- Companies: Build agent identity infrastructure

#### Closing
- Reiterate the thesis: Agent identity is infrastructure
- Point to the future: "Agents with identity are more autonomous, more trustworthy, more powerful"
- CTA: Link to AliasKit docs / getting started

### SEO Keywords
- agent identity
- autonomous agent infrastructure
- agent email provisioning
- agent phone provisioning
- agent verification
- autonomous workflow tools

### Author Bio
```
[Your Name] is the [Title] at AliasKit. He/She thinks agent infrastructure
is broken and building tools to fix it. Previously at [Company]. Tweets @aliaskitdev.
```

---

## Blog Post 2: Practical / How-To

### Title Options
- "Building Autonomous Workflows That Actually Work"
- "From Idea to Agent: A Step-by-Step Guide"
- "How to Ship an Agent That Can Verify Identity"
- "Autonomous Service Signup: A Tutorial"

### Format
~2000 words, 5-6 minute read, includes code examples

### Structure

#### Opening
- Hook: "Building agents is getting easier. But they're stuck in sandboxes because they lack identity."
- Promise: "In this post, we'll walk through building an agent that can sign up for a service autonomously."
- Scope: "This tutorial is for developers who have a working agent (LangChain, Anthropic SDK, etc.) and want to add autonomous capabilities."

#### Section 1: Setup

**Prerequisites:**
- Node.js 18+
- An agent framework (LangChain, Anthropic SDK, etc.)
- An AliasKit account (free tier works)

**Install AliasKit SDK:**
```
npm install @aliaskit/sdk
```

**Get an API Key:**
- Walk through dashboard flow
- Copy the key to .env

#### Section 2: Provision an Identity

**Code Example:**
```typescript
import { AliasKit } from '@aliaskit/sdk'

const ak = new AliasKit({
  apiKey: process.env.ALIASKIT_API_KEY!,
})

const identity = await ak.identities.create({
  provision_phone: true,
  metadata: { purpose: 'autonomous-signup' },
})

console.log(`Agent Identity:`)
console.log(`  Email: ${identity.email}`)
console.log(`  Phone: ${identity.phone_number}`)
```

**What Just Happened:**
- Agent now has a verified email address
- Agent now has a real phone number
- These credentials are immediately usable

#### Section 3: Sign Up for a Service

**Code Example (pseudo):**
```typescript
// Simulate signing up for a service
async function signupForService(email, phone) {
  const response = await fetch('https://example-service.com/api/signup', {
    method: 'POST',
    body: JSON.stringify({
      email,
      phone,
      name: 'Autonomous Agent',
    }),
  })
  return response.json()
}

const signup = await signupForService(identity.email, identity.phone_number)
console.log(`Signup successful. Confirmation email sent.`)
```

**What We're Doing:**
- Using the agent's email + phone to sign up
- Service thinks it's dealing with a real person
- Service sends verification emails/SMS

#### Section 4: Poll for Verification

**Code Example:**
```typescript
async function waitForVerification(ak, identityId) {
  let verified = false
  let attempts = 0
  const maxAttempts = 30

  while (!verified && attempts < maxAttempts) {
    const emails = await ak.identities.emails(identityId, { limit: 5 })

    for (const email of emails.data) {
      if (email.subject.includes('verify') || email.subject.includes('confirm')) {
        // Found verification email
        const code = email.body_text?.match(/\d{6}/)?.[0]
        console.log(`Verification code: ${code}`)
        return { verified: true, code, email }
      }
    }

    // Wait 2 seconds before next poll
    await new Promise(r => setTimeout(r, 2000))
    attempts++
  }

  throw new Error('Verification email not received')
}

const verification = await waitForVerification(ak, identity.id)
```

**Best Practices:**
- Use exponential backoff (start 2s, increase to 10s)
- Set a timeout (30 attempts = ~5 minutes)
- Log each attempt (for debugging)

#### Section 5: Extract Code & Verify

**Code Example:**
```typescript
// Regex patterns for common verification formats
const codePatterns = [
  /code:\s*(\d{6})/i,
  /code:\s*(\d{4})/i,
  /\b(\d{6})\b/, // any 6-digit number
  /\b(\d{4})\b/, // any 4-digit number
]

function extractCode(text) {
  for (const pattern of codePatterns) {
    const match = text.match(pattern)
    if (match) return match[1]
  }
  return null
}

const code = extractCode(verification.email.body_text)

// Now submit the code to complete verification
const result = await fetch('https://example-service.com/api/verify', {
  method: 'POST',
  body: JSON.stringify({ email: identity.email, code }),
})

console.log(`Verification complete!`)
```

**Why This Works:**
- Agents can now extract and use verification codes automatically
- No manual copy-paste, no human-in-the-loop

#### Section 6: Full Workflow

**Complete Code Example:**
```typescript
async function autonomousSignup() {
  // 1. Provision identity
  const identity = await ak.identities.create({
    provision_phone: true,
    metadata: { service: 'example-service' },
  })
  console.log(`Created identity: ${identity.email}`)

  // 2. Sign up
  const signup = await signupForService(identity.email, identity.phone_number)
  console.log(`Signed up successfully`)

  // 3. Wait for verification email
  const verification = await waitForVerification(ak, identity.id)
  console.log(`Received verification email`)

  // 4. Extract code
  const code = extractCode(verification.email.body_text)
  console.log(`Extracted code: ${code}`)

  // 5. Complete verification
  const result = await verifyAccount(identity.email, code)
  console.log(`Account verified!`)

  // 6. Cleanup
  await ak.identities.delete(identity.id)
  console.log(`Identity cleaned up`)

  return result
}

// Run it
autonomousSignup().catch(console.error)
```

#### Section 7: Next Steps & Advanced Patterns

**What You Can Do Now:**
- Sign up for multiple services with different identities
- Pool identities for testing
- Integrate with LangChain agents
- Use SMS verification (same pattern as email)

**Advanced Topics:**
- Identity pooling for performance
- Batch operations across many identities
- Retry logic with exponential backoff
- Rate limiting and quota management

**Resources:**
- Full API documentation
- Framework integration guides
- Community examples and tutorials

#### Closing
- Congratulate reader on shipping autonomous agent
- Remind them: "Your agent can now operate independently on the internet"
- CTA: "Join our community. Tell us what you built."

### SEO Keywords
- autonomous agent tutorial
- agent identity provisioning
- autonomous service signup
- agent email verification
- agent identity provisioning tutorial

---

## Blog Post 3: Partnership / Framework Support

### Title Options
- "AliasKit + [LangChain/Anthropic/OpenClaw]: Agent Identity at Scale"
- "Bringing Built-In Identity to [Framework] Agents"
- "Complete Agent Infrastructure with [Framework]"

### Format
~1200 words, co-authored with framework partner

### Structure

#### Opening
- Announce partnership
- Explain what it means for users
- Preview the integration

#### Section 1: What's New

**Feature Announcement:**
- [Framework] agents now auto-provision AliasKit identity on init
- One line of code enables email + phone
- No extra setup, no API keys, no credentials

**Code Example:**
```python
# LangChain example
from langchain.agents import initialize_agent
from langchain_community.tools import AliasKitIdentity

agent = initialize_agent(
  tools=[AliasKitIdentity()],  # Built-in!
  llm=llm,
  agent_type="zero-shot-react-description",
)

# Agent now has email + phone automatically
response = agent.run("Sign me up for GitHub and verify the account")
```

#### Section 2: Why This Matters

**For Framework Users:**
- One less thing to set up
- Agents are born ready to interact with the real world
- New use cases become possible

**For Framework Maintainers:**
- More powerful agent toolkit
- Better developer experience
- Community kudos for enabling autonomous workflows

#### Section 3: How to Use

- Quick start example
- Common use cases
- Link to full documentation

#### Section 4: What's Next

- Roadmap for partnership
- Feedback channels
- Community contributions welcome

#### Closing
- Thank you to framework team
- Encourage users to upgrade/try it out
- CTA: "Build with [Framework] + AliasKit"

### SEO Keywords
- [Framework] + identity
- [Framework] autonomous agents
- agent identity provisioning [Framework]

---

## Blog Post 4: Technical Deep-Dive

### Title Options
- "Building Agent Identity Infrastructure"
- "The Architecture Behind AliasKit"
- "Email + SMS at Scale for Autonomous Agents"
- "How We Built the Identity Layer for Agents"

### Format
~2500 words, highly technical

### Structure

#### Opening
- Problem statement: "How do you scale email + SMS for agents?"
- Technical challenges: Email routing, SMS delivery, rate limiting, etc.
- What we learned: Technical decisions made in building AliasKit

#### Section 1: Architecture Overview

**System Diagram:**
- Agents → AliasKit API → Cloudflare (email) + Plivo (SMS) → Services

**Components:**
- API layer (REST endpoints, auth, rate limiting)
- Email routing (Cloudflare Email Workers)
- SMS routing (Plivo integration)
- Database (Supabase for identity + message storage)
- SDK (TypeScript, zero dependencies)

#### Section 2: Email Provisioning

**How Inbound Email Works:**
1. Service sends email to agent's address (e.g., jordan.riley@aliaskit.to)
2. Cloudflare Email Worker catches at MX record level
3. Worker parses email (headers, body, attachments)
4. Worker POSTs to AliasKit API with shared secret
5. API stores in database, fires webhook if configured

**Why Cloudflare:**
- Catch-all routing (no per-address MX records needed)
- Serverless (scales to millions of emails)
- Low latency, good reliability

**Code Example (Simplified):**
```typescript
// Cloudflare Email Worker (simplified)
export default {
  async email(message) {
    // Parse email
    const from = message.headers.get('from')
    const to = message.headers.get('to')
    const subject = message.headers.get('subject')
    const body = await message.text()

    // Extract identity ID from email address
    const identityId = extractIdentityId(to)

    // POST to AliasKit API
    await fetch('https://api.aliaskit.com/api/internal/email/inbound', {
      method: 'POST',
      body: JSON.stringify({
        identity_id: identityId,
        from,
        to,
        subject,
        body,
        headers: Object.fromEntries(message.headers),
      }),
      headers: {
        'X-Webhook-Secret': process.env.WEBHOOK_SECRET,
      },
    })

    // Acknowledge receipt
    message.setReply('Thanks for your email!')
  },
}
```

**Challenges & Solutions:**
- Challenge: Spam filtering
  - Solution: Implement spam scoring, allow allowlisting
- Challenge: Attachment handling
  - Solution: Store in Supabase Storage, return signed URLs
- Challenge: Email routing to many identities
  - Solution: Cloudflare's catch-all + subdomain support

#### Section 3: SMS Provisioning

**How Inbound SMS Works:**
1. Service sends SMS to agent's phone number
2. Plivo delivers via webhook to AliasKit API
3. API stores in database, fires webhook if configured

**Why Plivo:**
- Global coverage (SMS in 190+ countries)
- Per-number webhooks (no shared routing needed)
- Affordable pricing ($0.50/number/month)
- Good API documentation

**Code Example (Simplified):**
```typescript
// API handler for inbound SMS
export async function POST(req) {
  const { From, To, Text } = await req.json()

  // Verify webhook signature
  const secret = process.env.PLIVO_SMS_WEBHOOK_SECRET
  const signature = req.headers.get('X-Plivo-Signature')
  if (!verifySignature(req.body, secret, signature)) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Extract identity ID from phone number
  const identityId = lookupIdentityByPhone(To)

  // Store SMS
  const sms = await db.insert('sms_messages', {
    identity_id: identityId,
    from: From,
    to: To,
    body: Text,
    received_at: new Date(),
  })

  // Fire webhook if configured
  const subscription = await db.get('webhook_subscriptions', {
    identity_id: identityId,
  })
  if (subscription?.active) {
    await fetch(subscription.url, {
      method: 'POST',
      body: JSON.stringify(sms),
      headers: {
        'X-Webhook-Signature': signPayload(sms, subscription.secret),
      },
    })
  }

  return new Response('OK', { status: 200 })
}
```

**Challenges & Solutions:**
- Challenge: Phone number provisioning takes time
  - Solution: Queue requests, batch with Plivo API
- Challenge: SMS can take 1-10 minutes to deliver
  - Solution: Teach developers polling patterns with backoff
- Challenge: SMS costs money
  - Solution: Charge $0.05 per SMS received, included in Pro plan

#### Section 4: Scalability Considerations

**What We Optimized For:**
- Email: Millions of emails/day (Cloudflare scales automatically)
- SMS: Thousands of SMS/day (Plivo scales, we just webhook)
- API: 10k+ RPS (rate limited per key, auto-scale infra)
- Storage: Message retention, pagination for large inboxes

**Rate Limiting:**
- Per API key limits (configurable, default 1000/min)
- Per identity limits (prevent abuse)
- Spike handling (queue excess requests)

**Database Queries:**
- Indexed on identity_id, created_at, direction
- Pagination using cursors (not offsets)
- Archive old messages to cheaper storage (post-MVP)

#### Section 5: Security & Privacy

**API Authentication:**
- Bearer token (API key)
- Bcrypt hashing of keys
- Key scopes (identities:read, identities:write, etc.)
- Rate limiting per key

**Data Security:**
- Encryption at rest (Supabase + Postgres encryption)
- TLS for all API requests
- HMAC signing for webhooks
- No email/message data exposed in logs

**Privacy Considerations:**
- Data owned by API key holder
- Multi-tenancy (no cross-key access)
- GDPR compliance (data deletion on request)
- Audit logs for compliance

**Code Example (Webhook Signing):**
```typescript
import crypto from 'crypto'

function signPayload(payload, secret) {
  const body = JSON.stringify(payload)
  const signature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')
  return signature
}

// Verify incoming webhook
function verifyWebhook(req, secret) {
  const signature = req.headers.get('X-Webhook-Signature')
  const body = req.body
  const expected = signPayload(JSON.parse(body), secret)
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  )
}
```

#### Section 6: Lessons Learned

**What We'd Do Differently:**
1. Batch SMS purchasing (we query Plivo per identity, should batch)
2. Async email processing (currently synchronous, should queue)
3. Earlier webhook support (now in Phase 4, should have been MVP)

**What Worked Well:**
1. Cloudflare for email (simple, scalable, reliable)
2. Zero-dependency SDK (easy to use, no bloat)
3. API-first design (works with any framework)

#### Closing
- Thank you to Cloudflare, Plivo, Supabase
- Open to feedback on architecture
- CTA: "Read the source code on GitHub" (when open-sourced)

### SEO Keywords
- agent email provisioning architecture
- scalable SMS for agents
- Cloudflare email routing
- Plivo SMS integration
- agent identity infrastructure

---

## Publishing Checklist

For each blog post:

- [ ] Write first draft (target word count)
- [ ] Get review from product/engineering
- [ ] Get review from partnerships (if applicable)
- [ ] Add code examples (tested locally)
- [ ] Add images/diagrams (if applicable)
- [ ] Add SEO meta description (~160 chars)
- [ ] Add internal links (to docs, other posts)
- [ ] Add external links (to frameworks, services)
- [ ] Publish on blog
- [ ] Share on social media (Twitter, LinkedIn)
- [ ] Send to community channels (Slack, forums, etc.)
- [ ] Monitor engagement (views, time on page, links shared)

---

## Content Promotion

After each post:

- **Twitter:** Thread + main link (3-5 tweets)
- **LinkedIn:** Longer-form version or callout + link
- **Email:** Add to next newsletter issue
- **Slack:** Post in relevant communities
- **Framework communities:** Post in appropriate channels (LangChain Slack, etc.)
- **HN / Reddit:** Submit if relevant to communities
