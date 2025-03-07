import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly goToLoginBtn: Locator;
  readonly LoginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.goToLoginBtn = page.getByRole('button', { name: 'Logowanie' });
    this.LoginBtn = page.getByRole('button', { name: 'Zaloguj się' });
  }

  async login(email: string, password: string, page: Page) {
    await page.goto('/');

    await this.goToLoginBtn.click();

    await page.getByPlaceholder('Wprowadź swój email').fill(email);
    await page.getByPlaceholder('Wprowadź swoje hasło').fill(password);

    await this.LoginBtn.click();
  }
}
