# 06 -- Competitive Landscape

## The Problem Space

Testing verification flows (email OTP, SMS codes, magic links) in automated environments. Specifically: enabling AI coding agents to test these flows without human intervention.

## Existing Solutions

### AgentMail (YC S25)

Email-only identity provisioning for AI agents. Provides real email inboxes via API.

- Creates email addresses on demand
- API for reading inbound email
- Python and TypeScript SDKs
- No phone/SMS capability
- No browser automation or test orchestration
- No verification code extraction

**Gap:** Solves email receipt but not the full verification loop. An agent using AgentMail still needs to parse emails, extract codes, automate a browser, and manage the test lifecycle separately.

### Mailosaur

Email and SMS testing platform for QA teams. Established product with broad feature set.

- Virtual email servers and phone numbers
- API for reading messages
- Built-in code/link extraction
- Designed for traditional test suites (Jest, Playwright, Cypress integrations)

**Gap:** Designed for human-orchestrated test suites, not AI agent loops. No concept of a unified identity. No autonomous test execution -- it provides the infrastructure but the test still needs a human to write and trigger it.

### Twilio Test Credentials

Twilio provides test credentials that simulate SMS without sending real messages.

- Free, no real messages sent
- Predictable responses for testing
- No real delivery -- only simulates the API, not the full flow

**Gap:** By definition, test credentials do not test real infrastructure. They verify that your code calls the Twilio API correctly, but not that SMS actually arrives, or that your webhook processes it correctly.

### Manual Testing

The status quo for most teams. A developer signs up with their own email, checks their inbox, enters the code.

- Catches real integration issues
- Extremely slow (2-5 minutes per iteration)
- Cannot run without a human present
- Does not scale to multiple flows or frequent iterations

**Gap:** Incompatible with autonomous agent development. The human is the bottleneck.

### Mocked Verification

Tests stub out the email/SMS layer entirely. The verification code is hardcoded or the verification step is skipped.

- Fast, deterministic, free
- Runs in CI without external dependencies
- Tests nothing about the real verification infrastructure

**Gap:** Misses the integration failures that matter most: deliverability, routing, webhook processing, rate limiting, provider outages.

## Competitive Matrix

| Capability | AliasKit | AgentMail | Mailosaur | Twilio Test | Manual | Mocked |
|---|---|---|---|---|---|---|
| Real email inbox | Yes | Yes | Yes | No | Yes | No |
| Real phone number | Yes | No | Yes | No | Yes | No |
| Unified identity (name + email + phone) | Yes | No | No | No | N/A | No |
| Browser automation | Yes | No | No | No | Human | No |
| OTP extraction | Yes | No | Yes | No | Human | N/A |
| Autonomous test execution | Yes | No | No | No | No | Partial |
| Designed for agent loops | Yes | Partial | No | No | No | No |
| Runs without human | Yes | Partial | Partial | Yes | No | Yes |

## AliasKit's Position

AliasKit is not competing on any single capability. Email inboxes exist. Phone numbers exist. Browser automation exists. The differentiator is combining all three into a single SDK call that an AI coding agent can invoke to autonomously test a verification flow end-to-end.

No existing tool answers the question: "coding agent, test this signup flow and tell me if it works." AliasKit does.
