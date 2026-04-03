# AliasKit

Two products:
1. **@aliaskit/test** — TypeScript SDK for testing signup/verification flows with real email + SMS
2. **AliasKit Identity API** — REST API powering the SDK (Next.js + Supabase + Resend + Twilio)

## Project Structure

```
analysis/        — Requirements, research, design docs
design/          — Wireframes, architecture decisions, UI specs
implementation/  — The codebase (Next.js app + SDK package)
testing/         — Test plans, QA reports
```

## Stack

- Next.js (App Router) on Vercel
- Supabase (Postgres + Auth)
- Resend (email send/receive)
- Twilio (SMS send/receive)
- Playwright (browser automation in SDK)

## Deployment

- Pushing to `main` auto-deploys to aliaskit.com via Vercel
- `npm run build` must pass before merging

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
