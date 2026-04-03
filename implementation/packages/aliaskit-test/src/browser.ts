/**
 * Playwright browser helpers — optional, only used if playwright is installed.
 * These are convenience wrappers, not required for core SDK functionality.
 */

import type { Page } from 'playwright';
import { Identity } from './client';

export interface FormSelectors {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  submit?: string;
}

export interface VerificationSelectors {
  codeField?: string;
  submit?: string;
}

/**
 * Fill a signup form with identity data.
 */
export async function fillSignupForm(
  page: Page,
  identity: Identity,
  selectors: FormSelectors
): Promise<void> {
  if (selectors.email) {
    await page.fill(selectors.email, identity.email);
  }
  if (selectors.name) {
    await page.fill(selectors.name, identity.name);
  }
  if (selectors.phone && identity.phone_number) {
    await page.fill(selectors.phone, identity.phone_number);
  }
  if (selectors.password) {
    // Generate a deterministic test password
    await page.fill(selectors.password, 'AliasKitTest123!');
  }
  if (selectors.submit) {
    await page.click(selectors.submit);
  }
}

/**
 * Enter a verification code and submit.
 */
export async function completeVerification(
  page: Page,
  code: string,
  selectors: VerificationSelectors
): Promise<void> {
  if (selectors.codeField) {
    await page.fill(selectors.codeField, code);
  }
  if (selectors.submit) {
    await page.click(selectors.submit);
  }
}

/**
 * Capture evidence from the current page state.
 */
export async function captureEvidence(page: Page): Promise<{
  screenshot: Buffer;
  url: string;
  title: string;
  consoleErrors: string[];
}> {
  const consoleErrors: string[] = [];

  // Collect console errors (if listener not already attached)
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const screenshot = await page.screenshot({ fullPage: true });
  const url = page.url();
  const title = await page.title();

  return { screenshot, url, title, consoleErrors };
}
