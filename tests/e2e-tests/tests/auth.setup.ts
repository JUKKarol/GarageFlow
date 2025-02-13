import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page
    .getByPlaceholder('Wprowadź swój email')
    .fill('employee@example.com');
  await page.getByPlaceholder('Wprowadź swoje hasło').fill('GarageFlow1!');
  await page.getByRole('button', { name: 'Zaloguj się' }).click();

  await page
    .getByRole('heading', { name: 'Dashboard' })
    .waitFor({ state: 'visible' });

  await page.getByRole('button', { name: 'Wizyty' }).click();

  await page.waitForTimeout(10000);

  await page.context().storageState({ path: authFile });
});
