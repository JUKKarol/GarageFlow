import { expect, type Locator, type Page } from '@playwright/test';
import { NavPage } from './nav.page';

export class RepairPage {
  readonly page: Page;
  readonly addRepairBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addRepairBtn = page.getByRole('button', { name: 'Dodaj wizytę' });
  }

  async createRepair(
    name: string,
    phone: string,
    email: string,
    description: string,
    page: Page,
  ) {
    const navPage = new NavPage(page);

    await navPage.Visits.click();
    await this.addRepairBtn.click();
    await page.getByLabel('Imię klienta').fill(name);
    await page.getByLabel('Numer telefonu').fill(phone);
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Opis').fill(description);
    await this.addRepairBtn.click();
  }
}
