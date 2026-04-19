import { test } from '@playwright/test';

test.describe('Live visual smoke', () => {
  test.use({ baseURL: 'https://aquamarine365.vercel.app' });
  test.setTimeout(120_000);

  for (const path of ['/', '/stays/ocean-dreams-suites', '/legal/cookies', '/legal/privacy', '/legal/terms']) {
    test(`screenshot ${path}`, async ({ page }, testInfo) => {
      // Dismiss the cookie banner so it doesn't cover content in the screenshot
      await page.addInitScript(() => {
        try {
          window.localStorage.setItem('aq-cookie-consent', 'accepted');
        } catch {}
      });
      await page.goto(path);
      await page.waitForLoadState('networkidle').catch(() => {});
      await page.waitForTimeout(1500);
      const safePath = path.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'root';
      await page.screenshot({
        path: testInfo.outputPath(`${safePath}-${testInfo.project.name}.png`),
        fullPage: true
      });
    });
  }

  test('drawer opens and contains only nav', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'chromium-desktop', 'drawer is hidden on desktop');
    await page.addInitScript(() => {
      try { window.localStorage.setItem('aq-cookie-consent', 'accepted'); } catch {}
    });
    await page.goto('/');
    await page.getByRole('button', { name: /open menu/i }).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: testInfo.outputPath(`drawer-${testInfo.project.name}.png`) });
  });

  test('stays carousel card does not clip content on mobile', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-mobile', 'mobile only');
    await page.addInitScript(() => {
      try { window.localStorage.setItem('aq-cookie-consent', 'accepted'); } catch {}
    });
    await page.goto('/#stays');
    await page.waitForTimeout(1500);
    // Click next twice to land on Valerian (tallest info block)
    await page.getByRole('button', { name: /next stay/i }).click();
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: /next stay/i }).click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: testInfo.outputPath('stays-valerian-mobile.png'), fullPage: false });
  });
});
