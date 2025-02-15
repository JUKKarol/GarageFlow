import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/login.page';
import dotenv from 'dotenv';

dotenv.config();

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const email = process.env.EMPLOYEE_EMAIL;
  const password = process.env.EMPLOYEE_PASSWORD;

  if (!email || !password) {
    throw new Error('Email or Password environment variables are not set');
  }

  loginPage.login(email, password, page);

  await page
    .getByRole('heading', { name: 'Dashboard' })
    .waitFor({ state: 'visible' });

  await page.context().storageState({ path: authFile });
});
