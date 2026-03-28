# `@aliaskit/sdk`

Zero-dependency TypeScript SDK for AliasKit v1.

## Install

```bash
npm install @aliaskit/sdk
```

## Quickstart

```ts
import { AliasKit } from '@aliaskit/sdk'

const client = new AliasKit({
  apiKey: process.env.ALIASKIT_API_KEY!,
  baseUrl: 'https://your-domain.com/api/v1',
})

const identity = await client.identities.create({
  name: 'Alex Mercer',
  metadata: { campaign: 'spring-launch' },
})

const list = await client.identities.list({ limit: 20 })
const one = await client.identities.get(identity.id)

await client.identities.sendEmail(identity.id, {
  to: 'inbox@example.com',
  subject: 'Hello from AliasKit',
  body_text: 'SDK smoke test',
})
```

## API

- `new AliasKit({ apiKey, baseUrl?, fetch? })`
- `identities.create(data?)`
- `identities.list(opts?)`
- `identities.get(id)`
- `identities.update(id, data)`
- `identities.delete(id)`
- `identities.emails(identityId, opts?)`
- `identities.getEmail(identityId, emailId)`
- `identities.sendEmail(identityId, data)`
- `identities.deleteEmail(identityId, emailId)`
- `identities.sms(identityId, opts?)`
- `identities.getSms(identityId, smsId)`
- `identities.deleteSms(identityId, smsId)`

## Runtime support

Uses native `fetch` and works in Node 18+, browsers, Deno, and Bun.  
If `fetch` is not globally available in your runtime, pass `fetch` in constructor options.
