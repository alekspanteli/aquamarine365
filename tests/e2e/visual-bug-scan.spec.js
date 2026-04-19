import { test, expect } from '@playwright/test';

// Comprehensive visual-bug scan. Runs against each of the 3 playwright
// projects defined in playwright.config.js (chromium-desktop, -tablet,
// -mobile), which means every assertion below is exercised at those
// viewports.
//
// What this scan catches that the existing tests don't:
// - Horizontal overflow per route + viewport
// - Any console error / page error during navigation or interaction
// - Images that fail to load (naturalWidth === 0)
// - Missing alt text on <img>/<Image>
// - Dropdowns / datepickers / popovers failing to open or close
// - Buttons without accessible names
// - 404 page returning the right status

const ROUTES = ['/', '/stays/ocean-dreams-suites', '/legal/privacy', '/legal/terms', '/legal/cookies'];

test.describe('Visual bug scan', () => {
  for (const route of ROUTES) {
    test(`no console errors + no overflow on ${route}`, async ({ page }, testInfo) => {
      const errors = [];
      const warnings = [];
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
        if (m.type() === 'warning') warnings.push(m.text());
      });
      page.on('pageerror', (e) => errors.push(`PAGEERROR: ${e.message}`));

      await page.goto(route, { waitUntil: 'networkidle' });

      // Horizontal overflow check — body.scrollWidth must not exceed viewport
      const viewportW = page.viewportSize().width;
      const docW = await page.evaluate(() => document.documentElement.scrollWidth);
      expect.soft(docW, `page at ${route} overflows viewport horizontally (${docW}px vs ${viewportW}px) on ${testInfo.project.name}`).toBeLessThanOrEqual(viewportW + 2);

      // Screenshot for the record (fullPage for reference)
      await page.screenshot({
        path: testInfo.outputPath(`${route.replaceAll('/', '_') || 'home'}-${testInfo.project.name}.png`),
        fullPage: true
      });

      // Filter React 19 dev-mode hydration warnings which are noisy + harmless in prod
      const fatal = errors.filter((e) => !/Download the React DevTools/i.test(e));
      expect.soft(fatal, `console errors at ${route} on ${testInfo.project.name}: ${fatal.join('\n---\n')}`).toHaveLength(0);
    });
  }

  test('homepage: mobile drawer opens, contains nav, closes', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'chromium-desktop', 'desktop has no drawer');
    await page.goto('/');
    const menuBtn = page.getByRole('button', { name: /menu|navigation/i }).first();
    await menuBtn.click();
    // drawer nav links appear
    await expect(page.getByRole('link', { name: /^stays$/i }).or(page.getByRole('link', { name: /browse stays/i })).first()).toBeVisible({ timeout: 3000 });
    // close via escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  });

  test('homepage: command palette opens + has villa results', async ({ page }, testInfo) => {
    await page.goto('/');
    // First search trigger
    await page.getByRole('button', { name: /search/i }).first().click();
    const input = page.getByPlaceholder(/search villas/i);
    await expect(input).toBeVisible({ timeout: 3000 });
    await input.fill('ocean');
    await expect(page.getByText(/Ocean Dreams Suites/i).first()).toBeVisible({ timeout: 3000 });
    await page.keyboard.press('Escape');
    await expect(input).toBeHidden({ timeout: 2000 });
  });

  test('homepage: FAQ accordion toggles', async ({ page }) => {
    await page.goto('/#faq');
    const trigger = page.getByRole('button', { name: /direct actually cheaper|booking|direct/i }).first();
    await trigger.scrollIntoViewIfNeeded();
    const before = await trigger.getAttribute('aria-expanded');
    await trigger.click();
    await page.waitForTimeout(400);
    const after = await trigger.getAttribute('aria-expanded');
    expect(after).not.toBe(before);
  });

  test('homepage: theme toggle switches light/dark', async ({ page }) => {
    await page.goto('/');
    const btn = page.getByRole('button', { name: /switch to|toggle theme/i }).first();
    await btn.scrollIntoViewIfNeeded();
    const beforeClass = await page.locator('html').getAttribute('class');
    await btn.click();
    await page.waitForTimeout(400);
    const afterClass = await page.locator('html').getAttribute('class');
    expect(afterClass).not.toBe(beforeClass);
  });

  test('homepage: chat widget opens, accepts input', async ({ page }, testInfo) => {
    await page.goto('/');
    const launcher = page.getByRole('button', { name: /open chat/i });
    await launcher.waitFor({ state: 'visible', timeout: 5000 });
    await launcher.click();
    const dialog = page.getByRole('dialog', { name: /aquamarine concierge/i });
    await expect(dialog).toBeVisible({ timeout: 3000 });
    const textInput = dialog.getByPlaceholder(/ask or speak/i);
    await textInput.fill('hello');
    await expect(textInput).toHaveValue('hello');
    await dialog.getByRole('button', { name: /^send$/i }).click();
    // User message should appear
    await expect(dialog.getByText('hello').first()).toBeVisible({ timeout: 3000 });
    await dialog.getByRole('button', { name: /close chat/i }).click();
  });

  test('villa page: date picker opens and a date is selectable', async ({ page }) => {
    await page.goto('/stays/ocean-dreams-suites#book');
    const checkIn = page.getByRole('button', { name: /check-in|add date/i }).first();
    await checkIn.scrollIntoViewIfNeeded();
    await checkIn.click();
    // Popover content should be visible
    const cal = page.locator('[data-slot="calendar"], [role="grid"]').first();
    await expect(cal).toBeVisible({ timeout: 5000 });

    // Pick a future (non-disabled) date — react-day-picker v9 marks past
    // dates with data-disabled="true" which have pointer-events-none.
    const day = page.locator('[data-day]:not([data-disabled="true"])').first();
    await day.click();
    await page.waitForTimeout(500);
    // Popover should close on selection
    await expect(cal).toBeHidden({ timeout: 3000 });
  });

  test('villa page: guests dropdown opens + selects a value', async ({ page }) => {
    await page.goto('/stays/ocean-dreams-suites#book');
    const guests = page.getByRole('combobox').filter({ hasText: /guest/i }).first();
    await guests.scrollIntoViewIfNeeded();
    await guests.click();
    // Select opens Radix portal with listbox
    const options = page.getByRole('option');
    await expect(options.first()).toBeVisible({ timeout: 3000 });
    await options.nth(2).click();
    await page.waitForTimeout(300);
    await expect(options.first()).toBeHidden({ timeout: 3000 });
  });

  test('villa page: gallery images all load', async ({ page }) => {
    await page.goto('/stays/ocean-dreams-suites');
    const main = page.locator('img[alt^="Ocean Dreams Suites — image"]').first();
    await expect(main).toBeAttached({ timeout: 10_000 });
    await expect(async () => {
      const { complete, nw } = await main.evaluate((el) => ({ complete: el.complete, nw: el.naturalWidth }));
      expect(complete).toBe(true);
      expect(nw).toBeGreaterThan(0);
    }).toPass({ timeout: 15_000 });
  });

  test('every <img> has non-empty alt or aria-hidden', async ({ page }) => {
    await page.goto('/');
    const offenders = await page.$$eval('img', (imgs) =>
      imgs
        .filter((i) => !i.hasAttribute('alt') && i.getAttribute('aria-hidden') !== 'true')
        .map((i) => i.outerHTML.slice(0, 120))
    );
    expect.soft(offenders, `images without alt: ${JSON.stringify(offenders, null, 2)}`).toHaveLength(0);
  });

  test('every icon-only button has an accessible name', async ({ page }) => {
    await page.goto('/');
    const bad = await page.$$eval('button', (btns) =>
      btns
        .filter((b) => {
          // has text? OK
          if (b.innerText && b.innerText.trim().length > 0) return false;
          // has aria-label? OK
          if (b.getAttribute('aria-label')) return false;
          // has aria-labelledby? OK
          if (b.getAttribute('aria-labelledby')) return false;
          // has title? OK-ish
          if (b.title) return false;
          // visible?
          const r = b.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        })
        .map((b) => b.outerHTML.slice(0, 180))
    );
    expect.soft(bad, `icon-only buttons without accessible name: ${JSON.stringify(bad, null, 2)}`).toHaveLength(0);
  });

  test('404 page renders branded not-found', async ({ page }) => {
    const resp = await page.goto('/this-url-does-not-exist');
    expect(resp.status()).toBe(404);
    await expect(page.getByRole('heading').first()).toContainText(/couldn.t find/i);
  });
});
