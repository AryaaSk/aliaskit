# Paperclip Setup Audit — AliasKit Company

*Conducted: March 28, 2026*
*Based on a full day of operating the AliasKit agent company*

---

## Executive Summary

Paperclip successfully enabled building a basic AliasKit MVP in ~1 day. However, the system is far from autonomous — it required constant human intervention to keep agents productive. The primary issues are: management agents burning credits without producing value, agents failing to report status, permission misconfigurations, and the fundamental lack of memory across heartbeats.

This document outlines every issue observed and provides concrete recommendations to make the company more autonomous.

---

## Issues Found

### 1. Management Agents Are Net Negative at Small Scale

**Problem:** CTO, CEO, and Lead Engineer consumed 60%+ of total credits on coordination — commenting, triaging, reassigning, "checking in" — while producing zero code. They also actively harmed productivity by:
- Reassigning tasks away from engineers back to themselves
- Creating meta-tasks ("research agentmail.to", "hire more agents") instead of advancing the product
- Spawning 7-8 concurrent runs that rate-limited the actual engineers

**Root cause:** Every heartbeat is a fresh LLM call with no memory. The CTO sees tasks assigned to engineers and re-triages them every 10 minutes because it doesn't remember it already delegated them.

**Recommendation:**
- At current scale (<8 engineers), **pause all management agents**. The human should assign tasks directly.
- If managers are needed, set heartbeat intervals to **2-4 hours** (not 10 minutes) so they only check in periodically.
- Add to manager instructions: "If a task is assigned to an engineer and is in_progress, DO NOT reassign it. Check the comments for updates instead."

### 2. Agents Don't Update Task Status

**Problem:** Engineers completed work (wrote code, committed, even merged to main) but never updated the issue status to `done` or left a completion comment. From the board's perspective, tasks appeared stuck when they were actually finished.

**Root cause:** The default agent instructions didn't emphasize status updates. The Paperclip API auth issue (PAPERCLIP_API_KEY) may have also prevented some agents from calling the status update endpoint.

**Recommendation:**
- Added to AGENTS.md (done): mandatory task update rules
- Verify all agents have working API keys (`/agents/:id/keys`)
- Consider adding a Paperclip hook that flags runs which complete without any issue status change

### 3. Permission Misconfigurations

**Problem:** The Backend Engineer ran for hours without being able to write any files because `dangerouslySkipPermissions` was not set. Every heartbeat it reported "blocked on approvals" and exited, wasting credits.

**Root cause:** When agents are created (especially by the CEO's hiring process), they don't always inherit the correct adapter config. The `dangerouslySkipPermissions` flag needs to be explicitly set.

**Recommendation:**
- **Checklist for every new agent:**
  1. `dangerouslySkipPermissions: true`
  2. `cwd: /Users/aryaask/Documents/aliaskit`
  3. Proper instructions file exists
  4. At least 1 API key created
  5. `instructionsBundleMode: managed`
- Consider creating a Paperclip skill that automates this checklist

### 4. PAPERCLIP_API_KEY Auth Failures

**Problem:** Agents couldn't authenticate with the Paperclip API to update task status, read issues, or coordinate. They spent entire heartbeats trying to debug their own auth instead of writing code.

**Root cause:** `PAPERCLIP_AGENT_JWT_SECRET` environment variable is not set, so the JWT-based auth returns null. Per-agent API keys work as a fallback, but need to be created manually.

**Recommendation:**
- Set `PAPERCLIP_AGENT_JWT_SECRET` in the Paperclip server environment (this enables automatic JWT token generation for all agents)
- OR ensure every agent has at least one API key created via the UI
- Add to agent instructions: "If PAPERCLIP_API_KEY is not available, skip API calls and focus on writing code. Do NOT spend time debugging auth."

### 5. Agents Modify Their Own Config Instead of Coding

**Problem:** Frontend Engineer and other agents spent heartbeats trying to run `update-config` skill, modify `~/.claude/settings.json`, or read Paperclip internal files instead of doing their assigned tasks.

**Root cause:** Default agent instructions don't forbid this. When an agent encounters a permission issue, it tries to "fix" it by modifying its own config rather than working around it.

**Recommendation:**
- Added to all agent instructions (done): "NEVER try to modify Claude Code settings, permissions, or configuration files"
- Added to all agent instructions (done): "If the Paperclip API is not available, SKIP IT and focus on writing code"

### 6. Marketing Agents Creating Premature Busywork

**Problem:** The CEO hired a CMO, who hired Content Strategist, Growth Marketer, Devrel Manager, Competitive Analyst. These agents created 45+ marketing documents (launch playbooks, press releases, survey templates, investor pitches) before the product even had a working database schema.

**Root cause:** The CEO's instructions say to delegate marketing to CMO, and the CMO's instructions say to create content. Neither has awareness that the product isn't ready for marketing.

**Recommendation:**
- **Don't create marketing agents until the product is ready for launch**
- If they exist, keep them paused until Phase 5+ of development
- Add a goal/milestone system: "Marketing agents should not create any tasks until the MVP is feature-complete and deployed"

### 7. No Memory Across Heartbeats

**Problem:** This is the fundamental limitation. Every heartbeat starts fresh. The CTO doesn't remember it delegated a task 10 minutes ago. The Backend Engineer doesn't remember it was blocked on permissions last heartbeat. This causes:
- Redundant re-triaging
- Repeated failed approaches
- No learning from mistakes

**Root cause:** Paperclip's agent model has no persistent memory beyond session state (which resets frequently).

**Recommendation:**
- This is not fixable within Paperclip's current architecture
- The session persistence feature helps somewhat but gets reset on config changes
- Long-term: this is exactly what Arya's agi-architecture memory system (EB/KB with ST/LT hierarchy) would solve

### 8. Too Many Concurrent Runs

**Problem:** Agents triggered multiple concurrent heartbeats (CTO: 7 live, Lead Engineer: 8 live) which:
- Burned credits on duplicate work
- Rate-limited LLM API calls for all agents
- Created conflicting state (multiple runs reading/writing the same files)

**Root cause:** `maxConcurrentRuns` is set to 1 but wake-on-demand assignments trigger additional runs. Task reassignments trigger heartbeats.

**Recommendation:**
- Set `maxConcurrentRuns: 1` for all agents (verify it's actually enforced)
- Avoid bulk-reassigning tasks (each reassignment triggers a wake)
- Stagger heartbeat intervals so agents don't all wake at the same time

### 9. Instruction Quality Varies Wildly

**Problem:** The CEO had 55 lines of detailed instructions. All other agents had 3 lines: "You are an agent at Paperclip company. Keep the work moving."

**Root cause:** The CEO was created with the default Paperclip template which is rich. Hired agents get minimal instructions.

**Recommendation:**
- Every agent needs role-specific instructions covering:
  1. What their job is (specific, not generic)
  2. Critical guardrails (what NOT to do)
  3. How to do their work (step-by-step)
  4. Project context (key files, stack, spec location)
  5. References to HEARTBEAT.md, SOUL.md, TOOLS.md
- Create a template in the company skills that the CEO uses when hiring

### 10. Documents Scattered Everywhere

**Problem:** Agents created documents in the repo root, in Paperclip issue documents, and in random folders. No central organization.

**Root cause:** No policy existed for where documents should go.

**Recommendation:**
- Added to CLAUDE.md (done): documents policy with `docs/` folder structure
- Added to AGENTS.md (done): same policy
- Issue documents in Paperclip should only contain references to files in `docs/`, not full document content

---

## Recommended Company Structure (For Autonomous Operation)

### Phase 1: Build (current)
```
Active:
  Backend Engineer      — API routes, database, integrations
  Backend Engineer II   — Bug fixes, secondary backend work
  Frontend Engineer     — Dashboard UI, components
  Full Stack Engineer   — Critical path features
  DevOps Engineer       — Infrastructure, DNS, deployment
  QA Lead               — Testing when features land

Paused:
  CEO, CTO, CMO, Lead Engineer (all management)
  All marketing agents

Human role: Assign tasks, review merges, unblock
```

### Phase 2: Stabilize (when MVP is feature-complete)
```
Active:
  All engineers (reduced heartbeat: 30 min)
  QA Lead (10 min heartbeat — continuous testing)
  Lead Engineer (2 hr heartbeat — progress checks)

Paused:
  CEO, CTO, CMO, marketing agents

Human role: Review QA reports, approve merges
```

### Phase 3: Launch (when ready for users)
```
Active:
  Engineers (30 min heartbeat)
  QA Lead (10 min)
  Lead Engineer (1 hr)
  CTO (2 hr — technical oversight)
  CMO + 1-2 marketing agents (for actual launch)

Human role: Strategy, approvals, user feedback
```

### Phase 4: Operate (post-launch, autonomous target)
```
Active:
  All agents with appropriate heartbeat intervals
  CEO (4 hr — high-level coordination)
  CTO (2 hr — technical oversight)

Human role: Set goals, approve major decisions, review weekly
```

---

## Optimal Agent Configuration Checklist

For every agent, verify:

```
[ ] adapterConfig.dangerouslySkipPermissions = true
[ ] adapterConfig.cwd = /Users/aryaask/Documents/aliaskit
[ ] adapterConfig.model = claude-sonnet-4-6 (or appropriate)
[ ] adapterConfig.instructionsBundleMode = managed
[ ] Instructions file exists with role-specific content
[ ] At least 1 API key created
[ ] heartbeat.maxConcurrentRuns = 1
[ ] heartbeat.intervalSec appropriate for role:
    - Engineers: 600 (10 min) during active dev, 1800 (30 min) otherwise
    - Managers: 7200 (2 hr) or paused
    - QA: 600 (10 min) during testing phases
```

---

## What Paperclip Does Well

1. **Task tracking and assignment** — the issue system works, status tracking is clear
2. **Adapter flexibility** — supports Claude, Codex, Gemini, Pi, etc.
3. **Budget controls** — per-agent spending limits prevent runaway costs
4. **Approval gates** — board approval for merges and major decisions
5. **Run transparency** — full transcripts of what agents did each heartbeat
6. **Org chart** — clear reporting structure (even if managers aren't useful yet)
7. **Local-first** — all data on your machine, no external dependencies
8. **API accessibility** — everything manageable via REST API

## What Paperclip Cannot Do (Yet)

1. **Persistent memory** — agents forget everything between heartbeats
2. **Intelligent scheduling** — heartbeats fire on fixed intervals, not based on whether there's useful work
3. **Self-optimization** — agents can't learn from past mistakes
4. **Cost awareness** — no mechanism for agents to know their actions cost money
5. **Autonomous management** — managers burn more value than they create at small scale
6. **Natural communication** — no chat, only structured issue comments
7. **Cross-agent coordination** — agents can't directly talk to each other in real-time

---

## Bottom Line

Paperclip is a good **task execution framework** but not yet a good **autonomous company platform**. The gap is memory and intelligence — exactly what Arya's agi-architecture is designed to fill.

For now, the most productive setup is: **human assigns tasks directly to engineer agents, engineers code and commit, human reviews and merges**. No management layer. Scale the management back in gradually as the product matures and the team grows.
