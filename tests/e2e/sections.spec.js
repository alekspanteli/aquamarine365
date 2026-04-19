import { test, expect } from '@playwright/test';

/**
 * Verify every homepage section actually renders content (not just an empty
 * padded band) when scrolled into view — i.e. that whileInView animations
 * trigger correctly in a real browser.
 */
test.describe('Section rendering', () => {
  test.use({ baseURL: 'https://aquamarine365.vercel.app' });

  test('all homepage sections have visible content when scrolled to', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-mobile', 'mobile only');
    await page.addInitScript(() => {
      try { window.localStorage.setItem('aq-cookie-consent', 'accepted'); } catch {}
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle').catch(() => {});

    const sections = [
      { selector: 'h2:has-text("We help travelers")', name: 'Clarity' },
      { selector: '#stays', name: 'Stays' },
      { selector: 'h2:has-text("Fewer surprises")', name: 'WhyUs' },
      { selector: 'h2:has-text("Book direct. Here")', name: 'Compare' },
      { selector: 'h2:has-text("Four steps")', name: 'HowItWorks' },
      { selector: 'h2:has-text("Real reviews")', name: 'Testimonials' },
      { selector: '#faq', name: 'FAQ' },
      { selector: '#book', name: 'Offer' }
    ];

    for (const s of sections) {
      const el = page.locator(s.selector).first();
      await expect(el, `${s.name} element must exist`).toHaveCount(1);
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await expect(el, `${s.name} must be visible`).toBeVisible();
      // Capture opacity — animations should have run and settled near 1
      const opacity = await el.evaluate((n) => {
        let cur = n;
        while (cur) {
          const v = getComputedStyle(cur).opacity;
          if (v && Number(v) < 0.99) return Number(v);
          cur = cur.parentElement;
        }
        return 1;
      });
      expect(opacity, `${s.name} nearest opacity-animated ancestor`).toBeGreaterThan(0.5);
    }
  });
});
