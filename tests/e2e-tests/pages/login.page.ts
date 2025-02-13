import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly acceptCookiesBtn: Locator;
  readonly acceptAgeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesBtn = page.locator('#onetrust-accept-btn-handler');
    this.acceptAgeBtn = page.locator('.ageconfirmation__confirmBtn');
  }

  async acceptCookiesAndAge() {
    await this.acceptCookiesBtn.click();
    await this.acceptAgeBtn.click();
  }
}
