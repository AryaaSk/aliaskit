# 04 -- Value Proposition

## Core Value: Close the Agent Feedback Loop

AliasKit turns AI coding agent development from a supervised process into an autonomous one. The coding agent builds a feature, AliasKit tests it, and the coding agent iterates -- all without a human touching anything.

**Before AliasKit:** Agent writes auth flow -> human manually signs up -> human checks email -> human enters code -> human reports back -> agent iterates. The human is the bottleneck. Development speed is capped at human testing speed.

**After AliasKit:** Agent writes auth flow -> agent calls AliasKit SDK -> AliasKit provisions identity, signs up, receives email, extracts code, completes verification -> agent gets pass/fail result -> agent iterates. No human in the loop. Development runs at machine speed, 24/7.

## Key Differentiators

### 1. Novel Identity Provisioning

The fundamental capability that makes everything else possible. AliasKit provisions complete, functional identities on demand:

- Real email addresses that receive real mail (not mocked, not simulated)
- Real phone numbers that receive real SMS
- Generated names and dates of birth for form completion
- Fully disposable -- created and destroyed per test run

No other tool provides a unified identity with both email and SMS channels through a single API call.

### 2. Purpose-Built for the Agent Loop

AliasKit is not a general-purpose testing framework. It is specifically designed to be the second agent in an AI coding agent loop. The SDK interface is what a coding agent calls:

```typescript
await ak.withIdentity(async (identity) => {
  const code = await ak.waitForEmailCode(identity.id)
})
```

This is a machine-to-machine interface. The coding agent does not need to understand email protocols or Twilio APIs. It gets an identity, tests the flow, and gets a result.

### 3. Real Infrastructure, Not Mocks

Tests run against real email and SMS infrastructure. This catches the integration failures that mocked tests miss:

- Email deliverability issues (SPF/DKIM misconfiguration, spam filtering)
- SMS routing failures
- Rate limiting behavior under real conditions
- Provider-specific edge cases (formatting, character limits, delivery timing)

### 4. Autonomous and Self-Contained

The entire test lifecycle -- identity creation, browser automation, message receipt, code extraction, verification completion, and cleanup -- is handled by a single SDK call. No external orchestration, no manual steps, no human oversight required.

## The Speed Argument

An AI coding agent can write and refactor code in seconds. Manual testing of a signup flow takes 2-5 minutes per iteration. Over a multi-hour agent session building an auth system, the human testing overhead dominates total development time.

AliasKit reduces verification testing to the time it takes for the target application to send an email and for the SDK to complete the browser flow -- typically under 30 seconds. More importantly, it runs without waiting for a human to be available, enabling continuous development cycles that run overnight or across weekends.

## Summary

AliasKit's value is not "better testing" in the abstract. It is specifically: **removing the human from the AI coding agent feedback loop so that autonomous development sessions can run without interruption.**
