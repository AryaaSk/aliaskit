/**
 * High-level test runner — orchestrates the full signup flow test.
 *
 * Flow:
 *   create identity ──▶ launch browser ──▶ navigate ──▶ fill form ──▶ submit
 *       ──▶ wait for verification ──▶ extract code ──▶ complete ──▶ report
 */

import { chromium } from 'playwright';
import { AliasKitClient, Identity } from './client';
import { IdentityManager } from './identity';
import { OtpExtractor } from './otp';
import { fillSignupForm, completeVerification, captureEvidence, FormSelectors, VerificationSelectors } from './browser';

export interface TestConfig {
  flow: 'email-password' | 'email-only' | 'phone-sms';
  fields: FormSelectors;
  verification: {
    method: 'email-otp' | 'sms-otp' | 'magic-link';
  } & VerificationSelectors;
  success: {
    urlContains?: string;
    textContains?: string;
  };
  /** Timeout for the entire test run in ms. Default: 120000 */
  timeout?: number;
  /** Run browser in headed mode. Default: false (headless) */
  headed?: boolean;
}

export interface TestStep {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  screenshot?: Buffer;
}

export interface TestResult {
  passed: boolean;
  steps: TestStep[];
  screenshots: Buffer[];
  duration: number;
  identity?: { email: string; phone: string | null };
  error?: string;
}

export class TestRunner {
  private client: AliasKitClient;
  private identityManager: IdentityManager;
  private otpExtractor: OtpExtractor;

  constructor(client: AliasKitClient) {
    this.client = client;
    this.identityManager = new IdentityManager(client);
    this.otpExtractor = new OtpExtractor(client);
  }

  async run(targetUrl: string, config: TestConfig): Promise<TestResult> {
    const startTime = Date.now();
    const steps: TestStep[] = [];
    const screenshots: Buffer[] = [];
    let identity: Identity | null = null;

    const provisionPhone = config.flow === 'phone-sms' || config.verification.method === 'sms-otp';

    try {
      // Step 1: Create identity
      const stepStart = Date.now();
      identity = await this.identityManager.create({ provisionPhone });
      steps.push({
        name: 'create-identity',
        status: 'passed',
        duration: Date.now() - stepStart,
      });

      // Step 2: Launch browser and navigate
      const browser = await chromium.launch({ headless: !config.headed });
      const page = await browser.newPage();

      try {
        const navStart = Date.now();
        await page.goto(targetUrl, { waitUntil: 'networkidle' });
        const navEvidence = await captureEvidence(page);
        screenshots.push(navEvidence.screenshot);
        steps.push({
          name: 'navigate',
          status: 'passed',
          duration: Date.now() - navStart,
          screenshot: navEvidence.screenshot,
        });

        // Step 3: Fill signup form
        const fillStart = Date.now();
        await fillSignupForm(page, identity, config.fields);
        const fillEvidence = await captureEvidence(page);
        screenshots.push(fillEvidence.screenshot);
        steps.push({
          name: 'fill-form',
          status: 'passed',
          duration: Date.now() - fillStart,
          screenshot: fillEvidence.screenshot,
        });

        // Step 4: Wait for verification
        const verifyStart = Date.now();
        const beforeVerify = new Date();
        let code: string;

        // Wait a moment for the form submission to trigger the verification email/SMS
        await page.waitForTimeout(2000);

        if (config.verification.method === 'email-otp') {
          code = await this.otpExtractor.waitForEmailCode(identity.id, { after: beforeVerify });
        } else if (config.verification.method === 'sms-otp') {
          code = await this.otpExtractor.waitForSmsCode(identity.id, { after: beforeVerify });
        } else if (config.verification.method === 'magic-link') {
          const link = await this.otpExtractor.waitForMagicLink(identity.id, { after: beforeVerify });
          await page.goto(link);
          code = ''; // No code needed for magic links
        } else {
          throw new Error(`Unknown verification method: ${config.verification.method}`);
        }

        steps.push({
          name: 'wait-verification',
          status: 'passed',
          duration: Date.now() - verifyStart,
        });

        // Step 5: Complete verification (if OTP, not magic link)
        if (code && config.verification.codeField) {
          const completeStart = Date.now();
          await completeVerification(page, code, config.verification);
          await page.waitForTimeout(2000);
          const completeEvidence = await captureEvidence(page);
          screenshots.push(completeEvidence.screenshot);
          steps.push({
            name: 'complete-verification',
            status: 'passed',
            duration: Date.now() - completeStart,
            screenshot: completeEvidence.screenshot,
          });
        }

        // Step 6: Check success condition
        const checkStart = Date.now();
        let passed = true;

        if (config.success.urlContains) {
          passed = page.url().includes(config.success.urlContains);
        }
        if (config.success.textContains && passed) {
          const pageText = await page.textContent('body');
          passed = pageText?.includes(config.success.textContains) ?? false;
        }

        const finalEvidence = await captureEvidence(page);
        screenshots.push(finalEvidence.screenshot);
        steps.push({
          name: 'check-success',
          status: passed ? 'passed' : 'failed',
          duration: Date.now() - checkStart,
          screenshot: finalEvidence.screenshot,
          error: passed ? undefined : `Success condition not met. URL: ${page.url()}`,
        });

        return {
          passed,
          steps,
          screenshots,
          duration: Date.now() - startTime,
          identity: { email: identity.email, phone: identity.phone_number },
        };
      } finally {
        await browser.close();
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err);
      steps.push({
        name: 'error',
        status: 'failed',
        duration: Date.now() - startTime,
        error,
      });
      return {
        passed: false,
        steps,
        screenshots,
        duration: Date.now() - startTime,
        identity: identity ? { email: identity.email, phone: identity.phone_number } : undefined,
        error,
      };
    } finally {
      // Always clean up the identity
      if (identity) {
        await this.identityManager.cleanup(identity.id);
      }
    }
  }
}
