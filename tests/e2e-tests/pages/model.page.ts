import { expect, type Locator, type Page } from '@playwright/test';
import { NavPage } from './nav.page';

export class ModelPage {
  readonly page: Page;
  readonly addModelBtn: Locator;
  readonly CreateBtn: Locator;
  readonly SavingBtn: Locator;
  readonly BrandList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addModelBtn = page.getByRole('button', { name: 'Dodaj Model' });
    this.CreateBtn = page.getByRole('button', { name: 'Dodaj' });
    this.SavingBtn = page.getByText('AnulujZapisywanie...');
    this.BrandList = page.locator('#brand-select');
  }

  async createModel(brandName: string, modelName: string, page: Page) {
    const navPage = new NavPage(page);

    await navPage.ModelsAndBrands.click();

    await this.BrandList.click();
    await page.getByLabel(brandName, { exact: true }).click();
    await this.addModelBtn.click();
    await page.getByRole('textbox').fill(modelName);
    await this.CreateBtn.click();
    await this.SavingBtn.waitFor();
    await this.SavingBtn.waitFor({ state: 'hidden' });
    await expect(this.addModelBtn).toBeVisible();
  }
}
