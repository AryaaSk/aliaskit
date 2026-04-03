/**
 * @aliaskit/test — Test signup/verification flows end-to-end with real email and SMS.
 *
 * Usage:
 *   import { AliasKitTest } from '@aliaskit/test'
 *   const ak = new AliasKitTest({ apiKey: 'ak_live_...' })
 *   const result = await ak.test('https://myapp.com/signup', config)
 */

export { AliasKitClient } from './client';
export type { AliasKitClientOptions, Identity, EmailMessage, SmsMessage } from './client';
export { IdentityManager } from './identity';
export { OtpExtractor } from './otp';
export type { WaitOptions } from './otp';
export { fillSignupForm, completeVerification, captureEvidence } from './browser';
export type { FormSelectors, VerificationSelectors } from './browser';
export { TestRunner } from './runner';
export type { TestConfig, TestStep, TestResult } from './runner';
export { generateReport } from './reporter';
export type { ReportOptions } from './reporter';

import { AliasKitClient, AliasKitClientOptions } from './client';
import { IdentityManager } from './identity';
import { OtpExtractor, WaitOptions } from './otp';
import { TestRunner, TestConfig, TestResult } from './runner';
import { Identity } from './client';

/**
 * Main entry point — combines all SDK functionality.
 */
export class AliasKitTest {
  private client: AliasKitClient;
  private identityManager: IdentityManager;
  private otpExtractor: OtpExtractor;
  private runner: TestRunner;

  constructor(options: AliasKitClientOptions = {}) {
    this.client = new AliasKitClient(options);
    this.identityManager = new IdentityManager(this.client);
    this.otpExtractor = new OtpExtractor(this.client);
    this.runner = new TestRunner(this.client);
  }

  /** Run a full signup flow test against a target URL. */
  async test(targetUrl: string, config: TestConfig): Promise<TestResult> {
    return this.runner.run(targetUrl, config);
  }

  /** Create a temporary identity, run the callback, then auto-cleanup. */
  async withIdentity<T>(
    callback: (identity: Identity) => Promise<T>,
    options?: { provisionPhone?: boolean; metadata?: Record<string, unknown> }
  ): Promise<T> {
    return this.identityManager.withIdentity(callback, options);
  }

  /** Poll for an email verification code. */
  async waitForEmailCode(identityId: string, options?: WaitOptions): Promise<string> {
    return this.otpExtractor.waitForEmailCode(identityId, options);
  }

  /** Poll for an SMS verification code. */
  async waitForSmsCode(identityId: string, options?: WaitOptions): Promise<string> {
    return this.otpExtractor.waitForSmsCode(identityId, options);
  }

  /** Poll for a magic link in email. */
  async waitForMagicLink(identityId: string, options?: WaitOptions): Promise<string> {
    return this.otpExtractor.waitForMagicLink(identityId, options);
  }
}
