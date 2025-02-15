import { expect, type Locator, type Page } from '@playwright/test';
import { NavPage } from './nav.page';

export class BrandPage {
  readonly page: Page;
  readonly addBrandBtn: Locator;
  readonly CreateBtn: Locator;
  readonly SavingBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addBrandBtn = page.getByRole('button', { name: 'Dodaj Markę' });
    this.CreateBtn = page.getByRole('button', { name: 'Dodaj' });
    this.SavingBtn = page.getByText('AnulujZapisywanie...');
  }

  async createBrand(brandName: string, page: Page) {
    const navPage = new NavPage(page);

    await navPage.ModelsAndBrands.click();
    await this.addBrandBtn.click();
    await page.getByRole('textbox').fill(brandName);
    await this.CreateBtn.click();
    await this.SavingBtn.waitFor();
    await this.SavingBtn.waitFor({ state: 'hidden' });
    await expect(this.addBrandBtn).toBeVisible();
  }
}
