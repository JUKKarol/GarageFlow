import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RepairPage } from '../pages/repair.page';

test.describe('Repair tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('should create repair', async ({ page }) => {
    const repairPage = new RepairPage(page);
    const name = faker.person.firstName();
    const phone = faker.phone.number({ style: 'national' });
    const email = faker.internet.email();
    const description = faker.lorem.sentence();

    await repairPage.createRepair(name, phone, email, description, page);

    await page.getByRole('link', { name: name }).first().click();

    const customerInfo = await page
      .locator('div[class*="rounded-xl border shadow"]')
      .first()
      .innerText();

    expect(customerInfo).toContain(name);
    expect(customerInfo).toContain(phone);
    expect(customerInfo).toContain(email);
  });
});
