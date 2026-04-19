import { test, expect } from '@playwright/test';

test.describe('Live carousel + spinner', () => {
  test.use({ baseURL: 'https://aquamarine365.vercel.app' });
  test.setTimeout(120_000);

  test('spinner shows while the villa gallery image loads', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'Desktop only');

    // Stall Unsplash + Next.js Image optimizer requests for 3s so the
    // loader stays visible long enough to assert.
    await page.route(/images\.unsplash\.com|\/_next\/image\?/, async (route) => {
      await new Promise((r) => setTimeout(r, 3000));
      try { await route.continue(); } catch {}
    });

    await page.goto('/stays/ocean-dreams-suites', { waitUntil: 'commit' });

    // Loader must be visible while image is stalled
    const loader = page.locator('[aria-label="Loading image"]').first();
    await expect(loader).toBeVisible({ timeout: 10_000 });
    await page.screenshot({
      path: testInfo.outputPath('01-loader-visible.png'),
      fullPage: false
    });

    // Wait for it to settle and then screenshot gallery stage
    await expect(loader).toBeHidden({ timeout: 30_000 });
    await page.screenshot({ path: testInfo.outputPath('02-image-loaded.png'), fullPage: false });

    // Click next — loader should reappear for the next image
    await page.getByRole('button', { name: /next image/i }).click();
    await expect(page.locator('[aria-label="Loading image"]').first())
      .toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: testInfo.outputPath('03-loader-on-next.png'), fullPage: false });
  });

  test('thumbnail strip visual', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'Desktop only');
    await page.goto('/stays/ocean-dreams-suites');
    await page.waitForLoadState('networkidle');

    const thumbs = page.locator('button[aria-label^="Show image"]');
    await expect(thumbs.first()).toBeVisible();
    await thumbs.first().scrollIntoViewIfNeeded();

    // Screenshot the whole thumbnail row by measuring first & last thumb
    const first = await thumbs.first().boundingBox();
    const last = await thumbs.last().boundingBox();
    if (first && last) {
      await page.screenshot({
        path: testInfo.outputPath('thumbs-default-state.png'),
        clip: {
          x: Math.max(0, first.x - 20),
          y: Math.max(0, first.y - 30),
          width: Math.min(1280, last.x + last.width - first.x + 40),
          height: first.height + 60
        }
      });
    }

    // Click the 3rd thumb — active state should move
    await thumbs.nth(2).click();
    await page.waitForTimeout(600);
    const f2 = await thumbs.first().boundingBox();
    const l2 = await thumbs.last().boundingBox();
    if (f2 && l2) {
      await page.screenshot({
        path: testInfo.outputPath('thumbs-third-active.png'),
        clip: {
          x: Math.max(0, f2.x - 20),
          y: Math.max(0, f2.y - 30),
          width: Math.min(1280, l2.x + l2.width - f2.x + 40),
          height: f2.height + 60
        }
      });
    }
  });
});
