import { expect, type Locator, type Page } from '@playwright/test';

export class NavPage {
  readonly page: Page;
  readonly Dashboard: Locator;
  readonly Workeres: Locator;
  readonly Visits: Locator;
  readonly Cars: Locator;
  readonly ModelsAndBrands: Locator;
  readonly Finances: Locator;
  readonly Settings: Locator;
  readonly Logout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.Dashboard = page.getByRole('button', { name: 'Dashboard' });
    this.Workeres = page.getByRole('button', { name: 'Pracownicy' });
    this.Visits = page.getByRole('button', { name: 'Wizyty' });
    this.Cars = page.getByRole('button', { name: 'Auta' });
    this.ModelsAndBrands = page.getByRole('button', { name: 'Modele i marki' });
    this.Finances = page.getByRole('button', { name: 'Finanse' });
    this.Settings = page.getByRole('button', { name: 'Ustawienia' });
    this.Logout = page.getByRole('button', { name: 'Wyloguj' });
  }
}
