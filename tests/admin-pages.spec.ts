import { test, expect } from '@playwright/test';

test.use({
  storageState: 'admin-auth.json',
});

test('Admin Pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Verify navigation links
  await expect(page.getByRole('link', { name: 'Weekend Warrior' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Activities' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

  // Verify admin-specific button
  await expect(page.getByRole('button', { name: 'admin@foo.com' })).toBeVisible();

  // Test navigation to Activities
  await page.getByRole('link', { name: 'Activities' }).click();
  await expect(page.getByRole('heading', { name: /activities/i })).toBeVisible();

  // Test navigation to Admin
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('heading', { name: /list activities admin/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /list users admin/i })).toBeVisible();
});
