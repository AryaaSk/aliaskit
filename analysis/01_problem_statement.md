# 01 -- Problem Statement

## The Human Bottleneck in AI Coding Agent Loops

AI coding agents -- Claude Code, Cursor, Devin, Copilot Workspace -- have collapsed the time it takes to write code. An agent can scaffold a full authentication flow in minutes. But writing the code is only half the loop. The other half is feedback: did the signup actually work? Did the verification email arrive? Can the user log in?

Today, that feedback requires a human. The developer has to stop the agent, open a browser, sign up manually, check their inbox, copy a verification code, paste it in, and report back whether it worked. The agent waits. The human becomes the constraint.

This is the fundamental bottleneck: **code generation is now faster than code verification.** The AI agent can iterate at machine speed, but it cannot close the loop without a human performing manual testing steps that involve real-world side effects -- receiving an email, reading an SMS, completing a multi-step verification flow.

## Why This Matters Now

The trajectory is clear. Development teams are moving toward longer autonomous agent sessions -- overnight builds, weekend iterations, CI-triggered agent runs. These sessions stall the moment the agent needs to verify something that requires a real identity: a real email address that can receive mail, a real phone number that can receive SMS.

Without a way to close this feedback loop autonomously, teams face two bad options:

1. **Mock the verification.** Skip real email/SMS in tests. Ship code that was never tested against real verification infrastructure. Accept the risk that integration bugs (wrong SMTP config, broken SMS routing, rate limiting, deliverability issues) surface in production.

2. **Keep the human in the loop.** Maintain manual QA as the gatekeeper. Accept that agent-driven development moves no faster than the human can test.

Neither option is viable as agent-driven development becomes the default workflow.

## What Existing Tools Miss

- **Disposable email services** (Mailinator, Guerrilla Mail) are designed for humans clicking in browsers, not for agents calling APIs.
- **Mocked verification** skips the real infrastructure entirely, missing the integration bugs that matter most.
- **Point solutions** (AgentMail for email, Twilio test credentials for SMS) solve one channel at a time. A complete signup flow requires both, plus a coherent identity, plus browser automation.
- **Traditional E2E testing tools** (Playwright, Cypress) automate the browser but have no answer for "where do I get a real email address that I can programmatically read?"

None of these give an AI agent what it needs: a complete, disposable identity with real communication channels and an API to read incoming messages.

## What Is Needed

A second agent in the loop. One that provisions real identities on demand -- with real email inboxes and real phone numbers -- and can autonomously receive messages, extract verification codes, and complete signup flows. This agent reports results back to the coding agent, closing the feedback loop entirely. No human required. The development cycle runs 24/7.
