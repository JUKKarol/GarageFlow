import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
});

test.describe('Account Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('should login and verify is dashboard visible', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Dashboard' }),
    ).toBeVisible();
  });
});
