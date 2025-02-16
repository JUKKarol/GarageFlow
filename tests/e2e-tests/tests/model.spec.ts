import { test, expect } from '@playwright/test';
import { BrandPage } from '../pages/brand.page';
import { NavPage } from '../pages/nav.page';
import { faker } from '@faker-js/faker';
import { ModelPage } from '../pages/model.page';

test.describe('Brand tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('should create model', async ({ page }) => {
    const brandPage = new BrandPage(page);
    const navPage = new NavPage(page);
    const modelPage = new ModelPage(page);

    const brandName = `${faker.vehicle.manufacturer()}${faker.number.int({ min: 1, max: 1000 })}`;
    const modelName = faker.vehicle.model();

    await brandPage.createBrand(brandName, page);
    await modelPage.createModel(brandName, modelName, page);

    await page.reload();

    await modelPage.BrandList.click();
    await page.getByLabel(brandName, { exact: true }).click();

    page.locator('div[class*="overflow-hidden rounded-lg"]').first().waitFor();

    const modelNames = await page
      .locator('div[class*="overflow-hidden rounded-lg"]')
      .nth(1)
      .innerText();
    await expect(modelNames).toContain(modelName);
  });
});
