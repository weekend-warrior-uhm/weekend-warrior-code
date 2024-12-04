import { test, expect } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('User Pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Verify navigation links
  await expect(page.getByRole('link', { name: 'Activities' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'john@foo.com' })).toBeVisible();

  // Test navigation to Activities
  await page.getByRole('link', { name: 'Activities' }).click();
  await expect(page.getByRole('heading', { name: /activities/i })).toBeVisible();
});
