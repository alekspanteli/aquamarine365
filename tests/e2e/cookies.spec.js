import { test, expect } from '@playwright/test';

test.describe('Cookie banner (live)', () => {
  test.use({ baseURL: 'https://aquamarine365.vercel.app' });
  test.setTimeout(60_000);

  // Each test gets a fresh Playwright context, so localStorage starts empty.
  // Don't use context.addInitScript to clear it — that runs on every
  // navigation (including page.reload()) and will wipe out the decision
  // we just saved.

  test('appears on first visit, hides and persists after Accept', async ({ page }) => {
    await page.goto('/');
    const banner = page.getByRole('dialog', { name: /cookie notice/i });
    await expect(banner).toBeVisible({ timeout: 10_000 });

    await banner.getByRole('button', { name: /^accept$/i }).click();
    await expect(banner).toBeHidden({ timeout: 3000 });

    const stored = await page.evaluate(() => localStorage.getItem('aq-cookie-consent'));
    expect(stored).toBe('accepted');

    // Reload — banner must stay hidden because localStorage still has "accepted"
    await page.reload();
    await page.waitForTimeout(2000); // past the 800ms reveal delay
    await expect(banner).toBeHidden();
  });

  test('"Essential only" writes "essential"', async ({ page }) => {
    await page.goto('/');
    const banner = page.getByRole('dialog', { name: /cookie notice/i });
    await expect(banner).toBeVisible({ timeout: 10_000 });

    await banner.getByRole('button', { name: /essential only/i }).click();
    await expect(banner).toBeHidden({ timeout: 3000 });

    const stored = await page.evaluate(() => localStorage.getItem('aq-cookie-consent'));
    expect(stored).toBe('essential');
  });

  test('X dismiss writes "dismissed"', async ({ page }) => {
    await page.goto('/');
    const banner = page.getByRole('dialog', { name: /cookie notice/i });
    await expect(banner).toBeVisible({ timeout: 10_000 });

    await banner.getByRole('button', { name: /^dismiss$/i }).click();
    await expect(banner).toBeHidden({ timeout: 3000 });

    const stored = await page.evaluate(() => localStorage.getItem('aq-cookie-consent'));
    expect(stored).toBe('dismissed');
  });

  test('stays hidden on subsequent visit when decision is stored', async ({ page }) => {
    // First visit: accept.
    await page.goto('/');
    const banner = page.getByRole('dialog', { name: /cookie notice/i });
    await expect(banner).toBeVisible({ timeout: 10_000 });
    await banner.getByRole('button', { name: /^accept$/i }).click();

    // Second visit in the same context: banner must not reappear.
    await page.goto('/#stays');
    await page.waitForTimeout(1500);
    await expect(banner).toBeHidden();
  });
});
