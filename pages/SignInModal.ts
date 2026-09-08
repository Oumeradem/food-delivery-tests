import { Page, Locator } from '@playwright/test';

export class SignInModal {
  readonly page: Page;
  readonly modalTitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalTitle = page.locator('text=Login');
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
  }

  async verifyModalVisible(expectedTitle: string) {
    await this.modalTitle.waitFor({ state: 'visible' });
  }
}