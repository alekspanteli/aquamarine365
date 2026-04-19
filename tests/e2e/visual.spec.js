import { test, expect } from '@playwright/test';

test.describe('Visual + interaction sweep', () => {
  test('search dialog closes when clicking outside the box', async ({ page }) => {
    await page.goto('/');
    // Open the dialog via the search trigger (first visible one)
    await page.getByRole('button', { name: /search/i }).first().click();
    const input = page.getByPlaceholder(/Search villas/i);
    await expect(input).toBeVisible();

    // Click the top-left corner of the viewport — outside the centered box
    await page.mouse.click(10, 10);
    await expect(input).toBeHidden({ timeout: 2000 });
  });

  test('search dialog closes on Escape', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /search/i }).first().click();
    const input = page.getByPlaceholder(/Search villas/i);
    await expect(input).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(input).toBeHidden({ timeout: 2000 });
  });

  test('stay carousel shows all three villa thumbs with visible active border', async ({ page }) => {
    await page.goto('/#stays');
    const thumbs = page.getByRole('tab').filter({ hasText: /Ocean Dreams|Tropicana|Valerian/ });
    await expect(thumbs).toHaveCount(3);
    // First is selected; border color should be the Aegean accent, not line
    const active = thumbs.first();
    await expect(active).toHaveAttribute('aria-selected', 'true');
    const borderColor = await active.evaluate((el) => getComputedStyle(el).borderTopColor);
    // #0E7C88 → rgb(14, 124, 136)
    expect(borderColor).toMatch(/rgb\(14,\s*124,\s*136\)/);
  });

  test('villa gallery hero image loads (skeleton gets replaced)', async ({ page }) => {
    await page.goto('/stays/ocean-dreams-suites');
    // Find the main gallery image by its alt-prefix
    const img = page.locator('img[alt^="Ocean Dreams Suites — image"]').first();
    await expect(img).toBeAttached({ timeout: 10_000 });
    // Wait for the actual load event — naturalWidth > 0 is the definitive signal
    await expect(async () => {
      const loaded = await img.evaluate((el) => el.complete && el.naturalWidth > 0);
      expect(loaded).toBe(true);
    }).toPass({ timeout: 15_000 });
  });

  test('home page screenshot — desktop', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'desktop screenshot only');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: testInfo.outputPath('home-desktop.png'),
      fullPage: true
    });
  });

  test('home page screenshot — mobile', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-mobile', 'mobile screenshot only');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: testInfo.outputPath('home-mobile.png'),
      fullPage: true
    });
  });
});
