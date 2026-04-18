import { test, expect } from '@playwright/test';

test.describe('Aquamarine homepage', () => {
  test('hero renders key copy + primary CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Villas in Ayia Napa/i);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/run like a hotel/i);
    await expect(page.getByRole('link', { name: /check availability/i }).first()).toBeVisible();
  });

  test('stays carousel navigates forward', async ({ page }) => {
    await page.goto('/#stays');
    const initial = await page.locator('text=/Ocean Dreams|Tropicana|Valerian/').first().textContent();
    await page.getByRole('button', { name: /next stay/i }).click();
    await page.waitForTimeout(700);
    const after = await page.locator('text=/Ocean Dreams|Tropicana|Valerian/').first().textContent();
    expect(after).not.toBe(initial);
  });

  test('FAQ accordion toggles open and closed', async ({ page }) => {
    await page.goto('/#faq');
    // Find the FAQ section button for a known question
    const trigger = page.getByRole('button', { name: /Is booking direct actually cheaper/i });
    await expect(trigger).toBeVisible();
    // Default state: first item is open
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('command palette opens via trigger button and searches', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'Trigger button is desktop-only');
    await page.goto('/');
    await page.getByRole('button', { name: /open command palette/i }).click();
    const input = page.getByPlaceholder(/Search villas/i);
    await expect(input).toBeVisible();
    await input.fill('ocean');
    // cmdk uses role=option for items
    await expect(page.locator('[cmdk-item]').filter({ hasText: /Ocean Dreams/i }).first()).toBeVisible();
  });

  test('theme toggle switches between light and dark', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const toggle = page.getByRole('button', { name: /switch to (dark|light) mode|toggle theme/i }).first();
    await toggle.click();
    await page.waitForTimeout(300);
    const cls = await html.getAttribute('class');
    expect(cls === null ? '' : cls).toMatch(/dark|light/);
  });

  test('mobile drawer opens and shows navigation', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'chromium-desktop', 'Drawer is hidden on desktop');
    await page.goto('/');
    await page.getByRole('button', { name: /open menu/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link').filter({ hasText: /Stays/i }).first()).toBeVisible();
  });

  test('villa detail page renders gallery + booking sidebar', async ({ page }) => {
    await page.goto('/stays/ocean-dreams-suites');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Ocean Dreams/i);
    await expect(page.getByRole('link', { name: /enquire now/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /next image/i }).first()).toBeVisible();
  });
});
