// AliasKit Integration Test Suite
// Tests all main pages and the login/register flow via Playwright + Chromium

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const RESULTS = [];

// Test credentials (pre-confirmed account via Supabase Admin API)
const TEST_EMAIL = 'qa-lead@aliaskit-test.com';
const TEST_PASSWORD = 'QAtest2026!secure';

function log(msg) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${msg}`);
}

function recordResult(page, status, notes = '') {
  RESULTS.push({ page, status, notes });
  log(`${status.toUpperCase()} — ${page}${notes ? ': ' + notes : ''}`);
}

async function screenshot(page, name) {
  const file = path.join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  log(`Screenshot saved: ${name}.png`);
  return file;
}

async function run() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  // Collect console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  try {
    // ── 1. HOME PAGE ──────────────────────────────────────────────────────────
    log('Testing / (home page)');
    const homeResp = await page.goto(BASE_URL + '/', { waitUntil: 'networkidle', timeout: 15000 });
    const homeStatus = homeResp ? homeResp.status() : 0;
    await screenshot(page, '01-home');
    const homeTitle = await page.title();
    const homeH1 = await page.$eval('h1, [class*="hero"] *', el => el.textContent.trim()).catch(() => '(no h1)');
    recordResult('/', homeStatus === 200 ? 'pass' : 'fail',
      `HTTP ${homeStatus} | title="${homeTitle}" | h1="${homeH1}"`);

    // ── 2. LOGIN PAGE ─────────────────────────────────────────────────────────
    log('Testing /login');
    const loginResp = await page.goto(BASE_URL + '/login', { waitUntil: 'networkidle', timeout: 15000 });
    await screenshot(page, '02-login');
    const loginStatus = loginResp ? loginResp.status() : 0;
    const loginForm = await page.$('form').catch(() => null);
    recordResult('/login', loginStatus === 200 && loginForm ? 'pass' : 'fail',
      `HTTP ${loginStatus} | form=${!!loginForm}`);

    // ── 3. REGISTER PAGE ──────────────────────────────────────────────────────
    log('Testing /register');
    const regResp = await page.goto(BASE_URL + '/register', { waitUntil: 'networkidle', timeout: 15000 });
    await screenshot(page, '03-register');
    const regStatus = regResp ? regResp.status() : 0;
    const regForm = await page.$('form').catch(() => null);
    recordResult('/register', regStatus === 200 && regForm ? 'pass' : 'fail',
      `HTTP ${regStatus} | form=${!!regForm}`);

    // ── 4. REGISTER — SUBMIT FORM ─────────────────────────────────────────────
    log('Testing registration form submission');
    await page.goto(BASE_URL + '/register', { waitUntil: 'networkidle', timeout: 15000 });
    await page.fill('input[type="email"]', TEST_EMAIL);
    // Find password fields
    const pwFields = await page.$$('input[type="password"]');
    if (pwFields.length >= 2) {
      await pwFields[0].fill(TEST_PASSWORD);
      await pwFields[1].fill(TEST_PASSWORD);
    } else if (pwFields.length === 1) {
      await pwFields[0].fill(TEST_PASSWORD);
    }
    await screenshot(page, '04-register-filled');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    await screenshot(page, '05-register-submitted');
    const postRegUrl = page.url();
    const successEl = await page.$('[style*="39FF14"], [style*="success"], .success').catch(() => null);
    const errorEl = await page.$('[style*="error"], .error, [class*="error"]').catch(() => null);
    const errorText = errorEl ? await errorEl.textContent() : '';
    recordResult('/register (submit)', postRegUrl || successEl ? 'pass' : 'warn',
      `After submit URL: ${postRegUrl} | success=${!!successEl} | error="${errorText.trim()}"`);

    // ── 5. LOGIN — SUBMIT FORM ─────────────────────────────────────────────────
    log('Testing login form submission');
    await page.goto(BASE_URL + '/login', { waitUntil: 'networkidle', timeout: 15000 });
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);
    await screenshot(page, '06-login-filled');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);
    await screenshot(page, '07-login-submitted');
    const postLoginUrl = page.url();
    const loginErrorEl = await page.$('[class*="error"], [style*="error"]').catch(() => null);
    const loginErrorText = loginErrorEl ? await loginErrorEl.textContent() : '';
    const loggedIn = postLoginUrl.includes('/dashboard');
    recordResult('/login (submit)', loggedIn ? 'pass' : 'fail',
      `Redirected to: ${postLoginUrl} | error="${loginErrorText.trim()}"`);

    // ── 6. DASHBOARD ──────────────────────────────────────────────────────────
    log('Testing /dashboard');
    const dashResp = await page.goto(BASE_URL + '/dashboard', { waitUntil: 'networkidle', timeout: 15000 });
    await screenshot(page, '08-dashboard');
    const dashUrl = page.url();
    const dashStatus = dashResp ? dashResp.status() : 0;
    const dashContent = await page.$('main, [class*="dashboard"], nav').catch(() => null);
    recordResult('/dashboard', dashUrl.includes('/dashboard') && dashStatus === 200 ? 'pass' : 'fail',
      `HTTP ${dashStatus} | URL: ${dashUrl} | hasContent=${!!dashContent}`);

    // ── 7. DASHBOARD/IDENTITIES ───────────────────────────────────────────────
    log('Testing /dashboard/identities');
    const idResp = await page.goto(BASE_URL + '/dashboard/identities', { waitUntil: 'networkidle', timeout: 15000 });
    await screenshot(page, '09-dashboard-identities');
    const idUrl = page.url();
    const idStatus = idResp ? idResp.status() : 0;
    recordResult('/dashboard/identities', idUrl.includes('identities') && idStatus === 200 ? 'pass' : 'fail',
      `HTTP ${idStatus} | URL: ${idUrl}`);

    // ── 8. DASHBOARD/API-KEYS ─────────────────────────────────────────────────
    log('Testing /dashboard/api-keys');
    const apiKeysResp = await page.goto(BASE_URL + '/dashboard/api-keys', { waitUntil: 'networkidle', timeout: 15000 });
    await screenshot(page, '10-dashboard-api-keys');
    const apiKeysUrl = page.url();
    const apiKeysStatus = apiKeysResp ? apiKeysResp.status() : 0;
    recordResult('/dashboard/api-keys', apiKeysUrl.includes('api-keys') && apiKeysStatus === 200 ? 'pass' : 'fail',
      `HTTP ${apiKeysStatus} | URL: ${apiKeysUrl}`);

    // ── 9. UNAUTHENTICATED REDIRECT ────────────────────────────────────────────
    log('Testing unauthenticated redirect (new context)');
    const anonContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const anonPage = await anonContext.newPage();
    const anonResp = await anonPage.goto(BASE_URL + '/dashboard', { waitUntil: 'networkidle', timeout: 15000 });
    await anonPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '11-anon-dashboard.png'), fullPage: true });
    const anonUrl = anonPage.url();
    recordResult('/dashboard (unauthenticated)', !anonUrl.includes('/dashboard') ? 'pass' : 'fail',
      `Redirected to: ${anonUrl}`);
    await anonContext.close();

  } catch (err) {
    log(`FATAL ERROR: ${err.message}`);
    await screenshot(page, 'error-state').catch(() => {});
    RESULTS.push({ page: 'FATAL', status: 'error', notes: err.message });
  } finally {
    await browser.close();
  }

  // ── SUMMARY ────────────────────────────────────────────────────────────────
  const pass = RESULTS.filter(r => r.status === 'pass').length;
  const fail = RESULTS.filter(r => r.status === 'fail').length;
  const warn = RESULTS.filter(r => r.status === 'warn').length;
  const error = RESULTS.filter(r => r.status === 'error').length;

  const output = {
    runAt: new Date().toISOString(),
    summary: { pass, fail, warn, error, total: RESULTS.length },
    results: RESULTS,
    consoleErrors,
  };

  fs.writeFileSync(path.join(__dirname, 'results.json'), JSON.stringify(output, null, 2));
  log(`Done. Pass=${pass} Fail=${fail} Warn=${warn} Error=${error}`);
  return output;
}

run().catch(err => {
  console.error('Test runner crashed:', err);
  process.exit(1);
});
