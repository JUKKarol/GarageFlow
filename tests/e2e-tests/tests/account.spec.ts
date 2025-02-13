import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({ storageState: authFile });

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
});

test.describe('Account Functionality', () => {
  test.beforeEach(async ({ page }) => {
    //change to goto(/) after front fix
    await page.goto('http://localhost:3000/admin/dashboard');
  });
  test('should login and verify is dashboard visible', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Dashboard' }),
    ).toBeVisible();
  });
});
