/**
 * Cloudflare Email Worker — AliasKit Inbound Email Handler
 *
 * Receives all emails for *@aliaskit.com via Cloudflare Email Routing,
 * parses them with postal-mime, and forwards them to the AliasKit API.
 *
 * Deploy:
 *   cd workers/email-inbound
 *   npm install
 *   wrangler deploy
 *
 * Required Wrangler secrets (set via `wrangler secret put`):
 *   INBOUND_EMAIL_SECRET   — must match the value in AliasKit .env
 *   ALIASKIT_API_URL       — e.g. https://aliaskit.com
 */

import PostalMime from 'postal-mime'

interface EmailMessage {
  from: EmailAddress
  to: EmailAddress[]
  subject?: string
  text?: string
  html?: string
  headers: { name: string; value: string }[]
}

interface EmailAddress {
  address: string
  name?: string
}

interface Env {
  INBOUND_EMAIL_SECRET: string
  ALIASKIT_API_URL: string
}

// Cloudflare Email Worker handler signature
export default {
  async email(
    message: {
      from: string
      to: string
      raw: ReadableStream
      rawSize: number
      setReject(reason: string): void
    },
    env: Env,
  ): Promise<void> {
    if (!env.INBOUND_EMAIL_SECRET || !env.ALIASKIT_API_URL) {
      console.error('Missing INBOUND_EMAIL_SECRET or ALIASKIT_API_URL worker secrets')
      // Don't reject — silently drop so the sender doesn't get a bounce
      return
    }

    // Read the raw email stream
    const rawEmail = await streamToArrayBuffer(message.raw, message.rawSize)

    // Parse with postal-mime
    let parsed: EmailMessage
    try {
      const parser = new PostalMime()
      parsed = await parser.parse(rawEmail)
    } catch (err) {
      console.error('Failed to parse email:', err)
      return
    }

    // Convert header array to object
    const headers: Record<string, string> = {}
    for (const h of parsed.headers ?? []) {
      headers[h.name.toLowerCase()] = h.value
    }

    const payload = {
      from: message.from,
      to: message.to,
      subject: parsed.subject ?? '',
      text: parsed.text ?? null,
      html: parsed.html ?? null,
      headers,
    }

    const apiUrl = env.ALIASKIT_API_URL.replace(/\/$/, '')
    const res = await fetch(`${apiUrl}/api/internal/email/inbound`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.INBOUND_EMAIL_SECRET}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error(`AliasKit inbound API returned ${res.status}: ${body}`)
    }
  },
}

async function streamToArrayBuffer(stream: ReadableStream, size: number): Promise<ArrayBuffer> {
  const reader = stream.getReader()
  const buffer = new Uint8Array(size)
  let offset = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value) {
      buffer.set(value, offset)
      offset += value.length
    }
  }
  return buffer.buffer
}
