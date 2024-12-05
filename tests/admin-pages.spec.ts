import { test, expect } from '@playwright/test';

test('Admin Pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Verify navigation links
  await expect(page.getByRole('link', { name: 'Weekend Warrior' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Activities' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Users' })).toBeVisible();

  // Test navigation to Activities
  await page.getByRole('link', { name: 'Activities' }).click();
  await expect(page.getByRole('heading', { name: 'Activities' })).toBeVisible();

  // Test navigation to Admin
  await page.getByRole('link', { name: 'Users' }).click();
  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
});
