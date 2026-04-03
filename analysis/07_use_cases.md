# 07 -- Use Cases

## Use Case 1: Coding Agent Building a SaaS App

A developer instructs Claude Code to build a SaaS application with email-based authentication. The agent scaffolds the signup page, the verification email template, and the code entry form.

The agent then calls `@aliaskit/test` to verify the flow works:

1. SDK provisions an identity with a real email address
2. SDK opens a browser, navigates to the signup page, fills the form
3. The SaaS app sends a verification email to the identity's address
4. SDK polls the identity's inbox, receives the email, extracts the 6-digit code
5. SDK enters the code on the verification page
6. SDK confirms the user lands on the dashboard
7. SDK reports pass/fail back to the coding agent

If the test fails (e.g., the email never arrives because SMTP is misconfigured), the coding agent sees the failure, diagnoses the issue, fixes the code, and runs the test again. The entire build-test-fix cycle runs without human involvement.

## Use Case 2: Iterating on an Auth Flow

A developer asks Cursor to change the authentication flow from email OTP to magic link. The agent modifies the backend and frontend.

After each iteration, the agent runs `@aliaskit/test` to verify:

- The magic link email arrives
- The link in the email is valid and navigable
- Clicking the link authenticates the user
- The old OTP flow is properly removed

The agent iterates until the test passes. Each cycle takes under a minute. Without AliasKit, the developer would need to manually test each iteration.

## Use Case 3: Overnight Autonomous Development

A team kicks off an AI coding agent session at end of day. The agent's task: build user onboarding with email verification, SMS phone verification, and profile setup.

The agent works through the night:

1. Builds the email verification flow, tests it with AliasKit (passes)
2. Builds the SMS verification flow, tests with AliasKit (fails -- wrong Twilio webhook URL)
3. Fixes the webhook configuration, retests (passes)
4. Builds profile setup, runs a full end-to-end test through all three steps (passes)
5. Refactors and retests to confirm nothing broke

By morning, the developer has a working, tested onboarding flow. Every verification step was tested against real email and SMS infrastructure.

## Use Case 4: CI/CD Pipeline Integration

A team adds `@aliaskit/test` to their Playwright test suite in CI. On every pull request:

1. The test suite creates a fresh identity
2. Runs the signup flow against the staging environment
3. Verifies that the verification email arrives and the code works
4. Verifies that SMS verification works for phone-required flows
5. Reports pass/fail as a CI check

This catches integration regressions that mocked tests miss: a DNS change that breaks email delivery, a Twilio configuration error, a rate limit change from the email provider.

## Use Case 5: Multi-Provider Auth Testing

A developer building an app that supports multiple auth methods (email OTP, SMS OTP, magic link) uses AliasKit to test all paths:

```typescript
for (const method of ['email-otp', 'sms-otp', 'magic-link']) {
  await ak.withIdentity(async (identity) => {
    const result = await ak.test('https://staging.myapp.com/signup', {
      flow: method,
      // ...
    })
    assert(result.passed, `${method} flow failed`)
  })
}
```

Each test uses a fresh identity with real email and phone. All three flows are verified against real infrastructure in under two minutes total.

## Use Case 6: Agent-to-Agent Development Workflow

A team uses multiple AI agents in their workflow:

- **Agent A** (coding agent): writes and modifies application code
- **Agent B** (AliasKit): tests the auth flows Agent A builds
- **Agent C** (review agent): reviews the code and test results

Agent A builds a feature, triggers Agent B via the SDK, Agent B reports results, and Agent A iterates. Agent C reviews the final state. The human developer reviews the completed, tested, and reviewed work -- not each intermediate step.

This is the future of autonomous software development: specialized agents collaborating, with AliasKit filling the verification testing role that no other agent can.
