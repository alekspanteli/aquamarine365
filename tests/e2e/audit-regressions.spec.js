import { test, expect } from '@playwright/test';

// Regressions codified from the April 2026 audit. Each test locks in a
// specific fix so a refactor won't silently break it.

test.describe('a11y: no Radix DialogTitle errors on mobile drawer', () => {
  test('opening the drawer fires zero console errors', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'chromium-desktop', 'drawer is xl:hidden on desktop');
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

    await page.addInitScript(() => {
      try { window.localStorage.setItem('aq-cookie-consent', 'accepted'); } catch {}
    });
    await page.goto('/');
    await page.getByRole('button', { name: /open menu/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Drawer must have a title for screen readers (may be sr-only).
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAccessibleName(/menu/i);

    // Visible close button in the drawer header.
    await expect(dialog.getByRole('button', { name: /close menu/i })).toBeVisible();

    // Radix's a11y warnings show up as console errors in dev.
    const radixA11yErrors = errors.filter((e) => /DialogTitle|DialogContent/i.test(e));
    expect(radixA11yErrors).toHaveLength(0);
  });
});

test.describe('seo: favicon + per-page canonicals', () => {
  test('favicon is served (no 404)', async ({ page }) => {
    const res = await page.request.get('/icon.svg');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toMatch(/svg/);
  });

  test('legal privacy page has its own canonical', async ({ page }) => {
    await page.goto('/legal/privacy');
    const href = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(href).toMatch(/\/legal\/privacy$/);
  });

  test('legal pages do not canonicalize to homepage', async ({ page }) => {
    for (const path of ['/legal/privacy', '/legal/cookies', '/legal/terms']) {
      await page.goto(path);
      const href = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(href, `canonical for ${path}`).toContain(path);
    }
  });

  test('page titles do not contain "Aquamarine" twice', async ({ page }) => {
    for (const path of ['/', '/legal/privacy', '/legal/cookies', '/legal/terms', '/stays/ocean-dreams-suites']) {
      await page.goto(path);
      const title = await page.title();
      const count = (title.match(/Aquamarine/g) || []).length;
      expect(count, `title of ${path}: "${title}"`).toBeLessThanOrEqual(1);
    }
  });
});

test.describe('booking: /api/book replaces mailto:', () => {
  test('valid enquiry returns ok and shows success toast', async ({ page }) => {
    await page.addInitScript(() => {
      try { window.localStorage.setItem('aq-cookie-consent', 'accepted'); } catch {}
    });
    await page.goto('/#book');
    await page.getByLabel(/your name/i).fill('Playwright Tester');
    await page.getByLabel(/^email$/i).fill('test@example.com');
    await page.getByLabel(/dates/i).fill('12-19 July, 4 adults');
    const requestPromise = page.waitForRequest(/\/api\/book/);
    await page.getByRole('button', { name: /check my dates/i }).click();
    const req = await requestPromise;
    expect(req.method()).toBe('POST');
    await expect(page.getByText(/enquiry received/i).first()).toBeVisible();
  });

  test('empty body returns 400 with field errors', async ({ request }) => {
    const res = await request.post('/api/book', { data: {} });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.errors).toMatchObject({ name: expect.any(String), email: expect.any(String), dates: expect.any(String) });
  });

  test('bad email returns 400', async ({ request }) => {
    const res = await request.post('/api/book', {
      data: { name: 'X', email: 'not-an-email', dates: '2 nights' }
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.errors?.email).toBeTruthy();
  });

  test('honeypot silently succeeds (bot path)', async ({ request }) => {
    const res = await request.post('/api/book', {
      data: { name: '', email: '', dates: '', website: 'bot-filled' }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  test('valid POST returns 200', async ({ request }) => {
    const res = await request.post('/api/book', {
      data: {
        name: 'Jane Tester',
        email: 'jane@example.com',
        dates: '12-19 July, 4 adults',
        code: 'DIRECT7'
      }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});

test.describe('a11y: Testimonials tablist has tabpanel', () => {
  test('active tab is linked to a tabpanel', async ({ page }) => {
    await page.addInitScript(() => {
      try { window.localStorage.setItem('aq-cookie-consent', 'accepted'); } catch {}
    });
    await page.goto('/#guests');
    const tablist = page.getByRole('tablist', { name: /testimonials/i });
    await expect(tablist).toBeVisible();
    const tabs = tablist.getByRole('tab');
    const n = await tabs.count();
    expect(n).toBe(4);
    // The selected tab controls a tabpanel that exists in the DOM.
    const selected = tablist.locator('[aria-selected="true"]').first();
    const controls = await selected.getAttribute('aria-controls');
    expect(controls).toBeTruthy();
    await expect(page.locator(`#${controls}`)).toBeVisible();
  });
});

test.describe('quiz: FindMyVilla cannot double-advance', () => {
  test('rapid double-click on same step does not skip', async ({ page }) => {
    await page.addInitScript(() => {
      try { window.localStorage.setItem('aq-cookie-consent', 'accepted'); } catch {}
    });
    await page.goto('/');
    await page.getByRole('button', { name: /or let us match you|find your villa/i }).first().click();
    const dialog = page.getByRole('dialog', { name: /find your villa/i });
    await expect(dialog).toBeVisible();
    // Click the first option TWICE before the 180ms transition completes.
    const first = dialog.getByRole('button').filter({ hasText: /A couple|2 guests/i }).first();
    await first.click();
    await first.click({ force: true }).catch(() => {});
    // After the transition we should be on question 2, NOT question 3.
    await expect(dialog.getByText(/Question 2 of 4/i)).toBeVisible();
  });
});

test.describe('search: stricter fuzzy filter', () => {
  test('"ocean" does not match Tropicana through letter-scatter', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'search pill is desktop-only');
    await page.addInitScript(() => {
      try { window.localStorage.setItem('aq-cookie-consent', 'accepted'); } catch {}
    });
    await page.goto('/');
    await page.getByRole('button', { name: /search/i }).first().click();
    const input = page.getByPlaceholder(/Search villas/i);
    await input.fill('ocean');
    // Only Ocean Dreams should match.
    await expect(page.locator('[cmdk-item]').filter({ hasText: /Ocean Dreams/i })).toHaveCount(1);
    await expect(page.locator('[cmdk-item]').filter({ hasText: /Tropicana/i })).toHaveCount(0);
  });
});

test.describe('mobile layout: chat + floating CTA do not overlap', () => {
  test('chat launcher sits above the floating CTA', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-mobile', 'mobile only');
    await page.addInitScript(() => {
      try { window.localStorage.setItem('aq-cookie-consent', 'accepted'); } catch {}
    });
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 1400));
    await page.waitForTimeout(600);
    const chatRect = await page.getByRole('button', { name: /open chat/i }).boundingBox();
    const ctaRect = await page.getByRole('link', { name: /check availability/i }).last().boundingBox();
    expect(chatRect, 'chat button present').toBeTruthy();
    expect(ctaRect, 'floating CTA present').toBeTruthy();
    // Chat must sit ABOVE the CTA with a clear gap.
    expect(chatRect.bottom).toBeLessThan(ctaRect.top);
    expect(ctaRect.top - chatRect.bottom).toBeGreaterThan(16);
  });
});

test.describe('security: CSP and key headers', () => {
  test('homepage sends hardening headers', async ({ request }) => {
    const res = await request.get('/');
    const headers = res.headers();
    // In `next dev` these come from vercel.json only after deploy. Skip if absent.
    if (!headers['x-content-type-options']) test.skip(true, 'headers only apply on Vercel deploy');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['referrer-policy']).toBeTruthy();
    expect(headers['strict-transport-security']).toBeTruthy();
    expect(headers['content-security-policy']).toBeTruthy();
  });
});
