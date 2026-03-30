@AGENTS.md

## Git & Deployment Policy

### Branching

- Work on **feature branches**, not directly on `main`
- Branch naming: `feat/<short-description>`, `fix/<short-description>`, `chore/<short-description>`
- Commit frequently with descriptive messages
- Push to remote at least once per completed task

### Merging to main

- **Do NOT merge to main yourself** — the Release Engineer handles all merges
- When your feature branch is ready, push it to remote and comment on the issue: "Ready for merge: branch `feat/xyz`, build passes"
- The Release Engineer will review, request board approval, and merge
- Never force-push to `main`
- Never force-push anywhere

### Deployment

- Pushing to `main` on GitHub (aryaask) auto-deploys to **aliaskit.com** via Vercel
- This means every merge to main is a production deployment — treat it accordingly
- Test locally before merging (`npm run build` must pass)

### Pull Requests

- Create PRs for feature branches when ready for review
- Include a summary of what changed and why
- Tag the relevant reviewer (Lead Engineer for code, CTO for architecture)

## Task Updates (MANDATORY)

When you finish working on a task, you MUST do ALL of the following before your heartbeat ends:

1. **Update the issue status** — set it to `done` if complete, `blocked` if stuck
2. **Leave a comment** on the issue summarizing what you did: what code you wrote, what branch it's on, what files changed
3. **If requesting merge approval**, list the branch name, number of commits, and a summary of changes

Failing to update task status is unacceptable. The board cannot see your work if you don't report it. A task with no status update looks like no work was done, even if you wrote 500 lines of code.

## File Organization

- Never create marketing, strategy, or planning documents in the repo root
- Keep only essential config files in the root (README.md, SPEC.md, CLAUDE.md, AGENTS.md)

## Documents Policy

All company documents (plans, playbooks, strategies, guides, reports, analyses) MUST be stored as files in the `docs/` folder within this repo — NOT in Paperclip issue documents.

### Folder structure

```
docs/
├── marketing/       # GTM, content calendars, social media, launch plans
├── engineering/     # Architecture decisions, API docs, technical guides
├── strategy/        # Competitive analysis, market validation, investor materials
├── playbooks/       # Operational playbooks, onboarding, processes
└── reports/         # Status reports, test reports, QA results
```

### How to reference documents in issues

When you create or update a document, reference it in the relevant Paperclip issue by file path:

> "See `docs/engineering/api-design.md` for the full API specification."

Do NOT paste full document contents into issue descriptions or Paperclip issue documents. Keep issues lightweight — use file paths as references to the actual documents in `docs/`.

### When to create a document

- Plans that will be referenced across multiple issues
- Guides or playbooks that are reusable
- Reports that need to be reviewed later
- Any content longer than a few paragraphs

### When NOT to create a document

- Quick status updates — just comment on the issue
- One-off notes — just comment on the issue
- Task-specific context that won't be reused — put it in the issue description

## gstack

Use the `/browse` skill from gstack for **all web browsing**. Never use `mcp__claude-in-chrome__*` tools.

Available skills: `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation`, `/design-shotgun`, `/design-html`, `/review`, `/ship`, `/land-and-deploy`, `/canary`, `/benchmark`, `/browse`, `/connect-chrome`, `/qa`, `/qa-only`, `/design-review`, `/setup-browser-cookies`, `/setup-deploy`, `/retro`, `/investigate`, `/document-release`, `/codex`, `/cso`, `/autoplan`, `/careful`, `/freeze`, `/guard`, `/unfreeze`, `/gstack-upgrade`, `/learn`

If gstack skills aren't working, run `cd .claude/skills/gstack && ./setup` to build the binary and register skills.

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
