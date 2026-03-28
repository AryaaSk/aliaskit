# AliasKit Company Restructure Plan

*Goal: Set up AliasKit as a near-autonomous company where the board (Arya) sets goals and specs, and agents execute with minimal intervention.*

---

## Current State

- 15 agents, most paused
- 1 goal (MVP), no routines, 0 open issues
- All agents on claude_local except Lead Engineer (codex_local)
- All heartbeats at 300s (5 min) — too fast for managers, fine for engineers
- No workspace isolation — all agents share the same working directory
- No budget limits set
- No routines configured

---

## New Org Structure

```
Board (Arya)
  └── CTO (claude-sonnet-4-6, 2hr heartbeat)
        ├── Lead Engineer (claude-sonnet-4-6, 1hr heartbeat)
        │     ├── Full Stack Engineer (claude-sonnet-4-6, 15min heartbeat)
        │     ├── Backend Engineer (claude-sonnet-4-6, 15min heartbeat)
        │     ├── Backend Engineer II (claude-sonnet-4-6, 15min heartbeat)
        │     ├── Frontend Engineer (claude-sonnet-4-6, 15min heartbeat)
        │     └── DevOps Engineer (claude-sonnet-4-6, 30min heartbeat)
        │
        └── QA Lead (claude-sonnet-4-6, 30min heartbeat)
              └── QA Engineer [NEW] (claude-haiku-4-5, 15min heartbeat)
```

**Remove entirely:** CEO, CMO, Competitive Analyst, Content Strategist, Devrel Manager, Growth Marketer, UX Designer. They produced negative value. When marketing is needed, hire fresh agents with focused instructions.

**Why this structure:**
- CTO is the only manager — wakes every 2 hours to check progress, unblock, create new tasks from the spec
- Lead Engineer wakes hourly to review completed work and rebalance if needed
- Engineers do the actual work at 15-min intervals
- QA runs automated tests continuously

---

## Heartbeat Strategy

| Role | Interval | Rationale |
|---|---|---|
| CTO | 7200s (2hr) | Check progress, create tasks from spec, unblock. Doesn't need to be fast. |
| Lead Engineer | 3600s (1hr) | Review completed work, reassign if stuck. Light coordination. |
| Engineers (x4) | 900s (15min) | Active coding. Fast enough to iterate, slow enough to avoid rate limits. |
| DevOps | 1800s (30min) | Infrastructure tasks are less frequent. |
| QA Lead | 1800s (30min) | Run tests, review results, file bugs. |
| QA Engineer | 900s (15min) | Execute test scripts, take screenshots, report issues. |

**Stagger start times** — don't let all engineers wake at the same time. Set different `cooldownSec` values or start them at different offsets.

---

## Workspace Strategy

**Enable isolated workspaces** so agents don't conflict with each other.

Configure on the MVP project:
```
Mode: isolated_workspace
Strategy: git_worktree
Base ref: main
Branch template: agent/{agentSlug}/{issueIdentifier}
```

This means:
- Each agent works in its own git worktree
- Each task gets its own branch automatically
- No merge conflicts between agents
- PR-based workflow for merging to main

**DevOps and QA** stay on shared workspace (they read, not write).

---

## Goals Hierarchy

Replace the single flat goal with a proper hierarchy:

```
Company Goal: "Ship AliasKit to production with paying users"
  │
  ├── Goal: "Core Platform" (active)
  │     ├── Milestone: User ownership & auth (ALI-71/74)
  │     ├── Milestone: Email integration (send + receive)
  │     ├── Milestone: SMS/Twilio integration (send + receive)
  │     └── Milestone: Identity CRUD fully working
  │
  ├── Goal: "Dashboard" (active)
  │     ├── Milestone: Email inbox client
  │     ├── Milestone: SMS messaging client
  │     ├── Milestone: Google sign-in
  │     └── Milestone: API key management
  │
  ├── Goal: "SDK & Developer Experience" (planned)
  │     ├── Milestone: TypeScript SDK (@aliaskit/sdk)
  │     ├── Milestone: API documentation
  │     └── Milestone: Quickstart guide
  │
  └── Goal: "Launch" (planned)
        ├── Milestone: Production deployment
        ├── Milestone: Landing page update
        └── Milestone: Beta user onboarding
```

Each issue should be linked to a goal so agents always know WHY they're doing something.

---

## Routines

Set up recurring automated tasks:

### 1. Nightly Build Check
```
Agent: QA Lead
Schedule: 0 2 * * * (2am daily)
Task: "Run npm run build on main branch. If it fails, create a critical bug issue and assign to Lead Engineer."
```

### 2. Nightly Integration Tests
```
Agent: QA Engineer
Schedule: 0 3 * * * (3am daily)
Task: "Run the Playwright test suite (testing/integration-test.js). Save screenshots. Create issues for any failures."
```

### 3. CTO Daily Review
```
Agent: CTO
Schedule: 0 9 * * * (9am daily)
Task: "Review all open issues. Check git log for last 24 hours of commits. Identify blocked work. Create new tasks from SPEC.md for any unstarted features. Post a daily summary comment on the company goal."
```

### 4. Weekly Progress Report
```
Agent: CTO
Schedule: 0 10 * * 1 (Monday 10am)
Task: "Write a weekly progress report to docs/reports/. Summarize: issues completed, issues in progress, blockers, git stats (commits, lines changed). Reference the company goal."
```

---

## Model Strategy

Not every agent needs the same model:

| Agent | Model | Rationale |
|---|---|---|
| CTO | claude-sonnet-4-6 | Needs reasoning for task breakdown and architecture decisions |
| Lead Engineer | claude-sonnet-4-6 | Reviews code, needs good judgment |
| Engineers (all) | claude-sonnet-4-6 | Writing code — Sonnet is the sweet spot |
| DevOps | claude-sonnet-4-6 | Infrastructure needs careful reasoning |
| QA Lead | claude-haiku-4-5 | Running tests and filing bugs — simpler tasks |
| QA Engineer | claude-haiku-4-5 | Executing test scripts — doesn't need heavy reasoning |

**Consider pi_local for engineers** if you want model diversity:
- Pi supports `xai/grok-4`, `openai/gpt-4o`, and others via provider/model routing
- Different models may handle different code tasks better
- Pi has built-in tools (read, bash, edit, write, grep, find, ls) similar to Claude Code

---

## Budget Configuration

Set guardrails to prevent runaway spending:

| Agent | Monthly Budget | Rationale |
|---|---|---|
| Company total | $200/month | Hard cap for entire company |
| CTO | $20/month | Only coordinates, shouldn't need much |
| Lead Engineer | $20/month | Light coordination + occasional code |
| Each Engineer | $30/month | Primary code producers |
| DevOps | $15/month | Less frequent tasks |
| QA Lead | $10/month | Haiku model, simple tasks |
| QA Engineer | $10/month | Haiku model, test execution |

These numbers assume Max Max plan. Adjust based on actual spend after 1 week.

---

## Agent Instructions Template

Every agent should have instructions following this structure:

```markdown
# Role Definition
One line: what you are, what you do.

# Critical Guardrails
1. NEVER modify settings/permissions/config
2. NEVER debug env vars
3. Work on FEATURE BRANCHES only
4. Always update task status when done (MANDATORY)
5. Leave a comment summarizing what you did (MANDATORY)

# How to Work
Step-by-step process for this specific role.

# Project Context
Stack, key files, spec location.

# What You Do / Don't Do
Clear boundaries for this role.

# References
HEARTBEAT.md, SOUL.md, TOOLS.md
```

---

## Custom Skills to Create

### 1. `aliaskit-codebase` skill
```
Description: "Use when working on AliasKit code. Contains project structure, key file locations, coding patterns, and conventions."
Content: Map of the codebase, common patterns, how auth works, how to add new API routes, how to add new dashboard pages.
```

### 2. `git-workflow` skill
```
Description: "Use when committing code, creating branches, or requesting merges."
Content: Branch naming, commit message format, PR creation, merge approval process. Essentially the CLAUDE.md git policy as a loadable skill.
```

### 3. `testing-guide` skill
```
Description: "Use when writing or running tests for AliasKit."
Content: How to run tests, Playwright setup, test file locations, how to take screenshots, how to file bugs from test failures.
```

---

## Implementation Checklist

### Step 1: Clean Up Agents
- [ ] Delete all marketing/non-engineering agents (CEO, CMO, Content Strategist, Devrel Manager, Growth Marketer, Competitive Analyst, UX Designer)
- [ ] Create QA Engineer agent (claude-haiku-4-5)
- [ ] Update all agent configs per the model/heartbeat table above
- [ ] Ensure ALL agents have: skipPermissions=true, API key, managed instructions, correct cwd

### Step 2: Set Up Goals
- [ ] Create goal hierarchy (Company → Core Platform, Dashboard, SDK, Launch)
- [ ] Link existing issues to appropriate goals

### Step 3: Configure Workspace Isolation
- [ ] Enable git_worktree strategy on MVP project
- [ ] Test that agents create proper branches

### Step 4: Set Up Routines
- [ ] Create nightly build check routine
- [ ] Create nightly integration test routine
- [ ] Create CTO daily review routine
- [ ] Create weekly progress report routine

### Step 5: Set Budgets
- [ ] Set company monthly budget
- [ ] Set per-agent budgets

### Step 6: Create Custom Skills
- [ ] aliaskit-codebase skill
- [ ] git-workflow skill
- [ ] testing-guide skill

### Step 7: Update Instructions
- [ ] Rewrite all agent instructions per template
- [ ] Add CTO-specific delegation rules (with agent IDs)
- [ ] Reset all sessions

### Step 8: Resume & Test
- [ ] Resume CTO, Lead Engineer, all engineers, QA
- [ ] Create 3-5 new tasks from SPEC.md
- [ ] Monitor for 2 hours
- [ ] Verify: agents pick up tasks, write code, update status, work on branches

---

## What This Achieves

With this setup, your daily workflow becomes:

1. **Morning**: Check inbox for blocked items, approve merges
2. **During day**: Optionally create new issues from product ideas
3. **Evening**: Review what was done, approve any pending merges
4. **Overnight**: Agents continue working, QA tests automatically

The CTO handles task creation from the spec, Lead Engineer handles coordination, engineers write code, QA catches bugs. You only intervene for:
- Approving merges to main (production deploys)
- Unblocking external dependencies (API keys, DNS, third-party configs)
- Setting new goals and priorities

This isn't fully autonomous (the memory problem still exists), but it's the most autonomous setup Paperclip can support today.
