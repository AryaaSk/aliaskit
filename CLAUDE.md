@AGENTS.md

## Git & Deployment Policy

### Branching

- Work on **feature branches**, not directly on `main`
- Branch naming: `feat/<short-description>`, `fix/<short-description>`, `chore/<short-description>`
- Commit frequently with descriptive messages
- Push to remote at least once per completed task

### Merging to main

- Only merge to `main` when code is **production-ready** — tested, compiles, no regressions
- **Always ask the board (human) for approval before merging to main** — post a comment on the issue with a summary of changes and request merge approval
- Never force-push to `main`

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
