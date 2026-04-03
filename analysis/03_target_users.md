# 03 -- Target Users

## Primary: Developers Using AI Coding Agents

The core user is a developer who uses an AI coding agent (Claude Code, Cursor, Devin, Copilot Workspace, or similar) as their primary development tool and is building a product that includes user authentication.

**Profile:**
- Building a SaaS application, marketplace, or any product with user accounts
- Uses an AI coding agent for feature development and iteration
- Wants to extend agent sessions beyond the point where manual testing is required
- Frustrated by the stop-and-test interruption pattern when building auth flows
- Comfortable with TypeScript, npm packages, and API keys

**Why they pay:** They are already paying for AI coding tools. AliasKit extends the value of those tools by removing the testing bottleneck. The alternative is their own time spent manually testing signup flows, which scales poorly as iteration speed increases.

## Secondary: Teams Running Autonomous Agent Sessions

Development teams that run AI coding agents in longer autonomous sessions -- overnight builds, weekend iterations, or batch feature development. These teams need verification testing that runs without any human present.

**Profile:**
- Engineering teams at startups or mid-size companies
- Running agent sessions measured in hours, not minutes
- Building or maintaining multiple products with auth flows
- Need confidence that agent-built features work before human review

**Why they pay:** The cost of AliasKit is trivial compared to the engineering time saved by not having to manually verify every change an agent makes to an auth flow. One broken signup flow that reaches production costs more than a year of AliasKit.

## Tertiary: CI/CD Pipelines and QA Teams

Teams that want real end-to-end verification testing in their continuous integration pipeline, regardless of whether an AI agent is involved.

**Profile:**
- Running Playwright or similar E2E test suites in CI
- Currently mocking email/SMS verification in tests (and uncomfortable with that gap)
- Want to catch integration failures (deliverability, rate limiting, provider outages) before production

**Why they pay:** They are already investing in E2E testing infrastructure. AliasKit fills the one gap their existing tools cannot: real email and SMS verification in automated tests.

## Who This Is Not For

- Developers building applications without user authentication
- Teams that only need unit tests or API-level integration tests
- Developers who are satisfied with mocked verification in their test suite
- Companies needing production identity verification or KYC (AliasKit provisions test identities, not real-person verification)
