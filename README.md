# AliasKit

Test signup and verification flows end-to-end with real email and SMS.

## What is this?

AliasKit has two parts:

1. **@aliaskit/test** — TypeScript SDK that lets your tests complete real signup flows (create accounts, receive verification emails/SMS, extract codes)
2. **Identity API** — REST API that provisions ephemeral identities with real email inboxes and phone numbers

## Project Structure

```
analysis/        — Requirements and research
design/          — Architecture and design decisions
implementation/  — The codebase
testing/         — Test plans and QA
```

## Quick Start

```bash
cd implementation
npm install
npm run dev
```

## SDK Usage

```typescript
import { AliasKitTest } from '@aliaskit/test'

const ak = new AliasKitTest({ apiKey: 'ak_live_...' })

await ak.withIdentity(async (identity) => {
  // identity.email and identity.phone_number are real
  // use them to test your signup flow
  const code = await ak.waitForEmailCode(identity.id)
  // identity is auto-cleaned up after this block
})
```
