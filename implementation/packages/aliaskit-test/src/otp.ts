/**
 * OTP extraction — polls AliasKit email/SMS endpoints and extracts verification codes.
 *
 * Flow:
 *   poll GET /emails ──▶ check for new messages ──▶ regex extract code ──▶ return
 *        ↑                       │ (no match)
 *        └───── wait interval ───┘
 */

import { AliasKitClient, EmailMessage, SmsMessage } from './client';

export interface WaitOptions {
  /** Polling interval in ms. Default: 2000 */
  interval?: number;
  /** Timeout in ms. Default: 60000 */
  timeout?: number;
  /** Only match messages received after this timestamp */
  after?: Date;
}

// Common OTP patterns: 4-8 digit codes
const OTP_PATTERNS = [
  /\b(\d{6})\b/,   // 6-digit (most common)
  /\b(\d{4})\b/,   // 4-digit
  /\b(\d{8})\b/,   // 8-digit
  /\b(\d{5})\b/,   // 5-digit
  /\b([A-Z0-9]{6,8})\b/, // alphanumeric codes
];

// URL patterns for magic links
const MAGIC_LINK_PATTERN = /https?:\/\/[^\s<>"]+(?:verify|confirm|activate|token|magic)[^\s<>"]*/i;

function extractCode(text: string): string | null {
  for (const pattern of OTP_PATTERNS) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractMagicLink(text: string): string | null {
  const match = text.match(MAGIC_LINK_PATTERN);
  return match ? match[0] : null;
}

export class OtpExtractor {
  constructor(private client: AliasKitClient) {}

  /**
   * Poll for a verification code in email messages.
   * Returns the extracted code string.
   */
  async waitForEmailCode(identityId: string, options: WaitOptions = {}): Promise<string> {
    const { interval = 2000, timeout = 60000, after = new Date() } = options;
    const deadline = Date.now() + timeout;

    while (Date.now() < deadline) {
      const { data: emails } = await this.client.getEmails(identityId);

      // Check newest emails first
      for (const email of emails) {
        if (new Date(email.received_at) < after) continue;

        const text = email.body_text || email.body_html || '';
        const code = extractCode(text);
        if (code) return code;
      }

      if (Date.now() + interval > deadline) break;
      await sleep(interval);
    }

    throw new Error(
      `[aliaskit] Timed out waiting for email verification code after ${timeout}ms. ` +
      `Check that the target app sends verification emails to the identity's address.`
    );
  }

  /**
   * Poll for a verification code in SMS messages.
   * Returns the extracted code string.
   */
  async waitForSmsCode(identityId: string, options: WaitOptions = {}): Promise<string> {
    const { interval = 2000, timeout = 60000, after = new Date() } = options;
    const deadline = Date.now() + timeout;

    while (Date.now() < deadline) {
      const { data: messages } = await this.client.getSms(identityId);

      for (const sms of messages) {
        if (new Date(sms.received_at) < after) continue;

        const code = extractCode(sms.body);
        if (code) return code;
      }

      if (Date.now() + interval > deadline) break;
      await sleep(interval);
    }

    throw new Error(
      `[aliaskit] Timed out waiting for SMS verification code after ${timeout}ms. ` +
      `Check that the target app sends SMS to the identity's phone number.`
    );
  }

  /**
   * Poll for a magic link (verify/confirm URL) in email messages.
   * Returns the extracted URL string.
   */
  async waitForMagicLink(identityId: string, options: WaitOptions = {}): Promise<string> {
    const { interval = 2000, timeout = 60000, after = new Date() } = options;
    const deadline = Date.now() + timeout;

    while (Date.now() < deadline) {
      const { data: emails } = await this.client.getEmails(identityId);

      for (const email of emails) {
        if (new Date(email.received_at) < after) continue;

        const text = email.body_text || email.body_html || '';
        const link = extractMagicLink(text);
        if (link) return link;
      }

      if (Date.now() + interval > deadline) break;
      await sleep(interval);
    }

    throw new Error(
      `[aliaskit] Timed out waiting for magic link after ${timeout}ms.`
    );
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
