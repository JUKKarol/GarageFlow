import { test, expect } from '@playwright/test';
import { BrandPage } from '../pages/brand.page';
import { NavPage } from '../pages/nav.page';
import { faker } from '@faker-js/faker';

test.describe('Brand tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('should create brand', async ({ page }) => {
    const brandPage = new BrandPage(page);
    const navPage = new NavPage(page);
    const brandName = `${faker.vehicle.manufacturer()}${faker.number.int({ min: 1, max: 1000 })}`;

    await brandPage.createBrand(brandName, page);

    const brandNames = await page
      .locator('div[class*="overflow-hidden rounded-lg"]')
      .first()
      .innerText();
    expect(brandNames).toContain(brandName);
  });
});
