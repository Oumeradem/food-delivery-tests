import { Page, Locator, expect } from '@playwright/test';

export class FoodMenuPage {
  readonly page: Page;

  // Header navigation items
  readonly navHome: Locator;
  readonly navMenu: Locator;
  readonly navMobileApp: Locator;
  readonly navContactUs: Locator;
  readonly signInButton: Locator;

  // Structural sections
  readonly heroHeader: Locator;
  readonly exploreMenuHeader: Locator;
  readonly getInTouchSection: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation locators
    this.navHome = page.getByRole('link', { name: 'Home', exact: true });
    this.navMenu = page.getByRole('link', { name: 'Menu', exact: true });
    this.navMobileApp = page.getByRole('link', { name: 'Mobile App', exact: true });
    this.navContactUs = page.getByRole('link', { name: 'Contact Us', exact: true });
    // Replace your signInButton definition with this one
    this.signInButton = page.locator('//button[contains(text(), "Sign In")] | //a[contains(text(), "Sign In")]');

    // Hero banner and sections
   this.heroHeader = page.getByRole('heading', { name: 'Order your favourite food here' });
    this.exploreMenuHeader = page.getByRole('heading', { name: 'Explore our menu' });
    this.getInTouchSection = page.locator('div, footer').filter({ hasText: 'GET IN TOUCH' }).first();
  }

  // Action methods
  async navigateToHome() {
    await this.page.goto('https://tomato-food-delivery-zeta.vercel.app');
  }

  async verifyHeaderLinks() {
    await expect(this.navHome).toBeVisible();
    await expect(this.navMenu).toBeVisible();
    await expect(this.navMobileApp).toBeVisible();
    await expect(this.navContactUs).toBeVisible();
  }

  async clickCategory(categoryName: string) {
    // Dynamic text finder targeting category tabs (e.g., Salad, Rolls, Cake)
    await this.page.locator(`text=${categoryName}`).first().click();
  }


async verifyDishValue(dishName: string, expectedPrice: string) {
    // Locate the specific dish text card directly
    const itemCard = this.page.locator('div, li, p').filter({ hasText: dishName }).first();
    await itemCard.scrollIntoViewIfNeeded();
    
    // Confirm the price exists right next to or inside that container
    await expect(itemCard.locator(`text=${expectedPrice}`).first()).toBeVisible({ timeout: 5000 });
  }

}