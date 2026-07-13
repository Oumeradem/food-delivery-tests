import { faker } from '@faker-js/faker'; // Fixed the import path
import { Page, Locator, FrameLocator } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  
  // Auth Locators
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly termsCheckbox: Locator;
  readonly createAccountButton: Locator;
  readonly loginButton: Locator;
  readonly profileIcon: Locator;
  readonly logoutButton: Locator;

  // Delivery Locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly deliveryEmailInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;
  readonly countryInput: Locator;
  readonly phoneInput: Locator;

// Stripe locators
readonly stripeEmailInput: Locator;
readonly stripePhoneInput: Locator;
readonly stripeCardNumber: Locator;
readonly stripeExpiry: Locator;
readonly stripeCVC: Locator;
readonly stripePayButton: Locator;


  constructor(page: Page) {
    this.page = page;

    // Auth Initialization
    this.nameInput = page.locator('input[placeholder*="name" i]');
    this.emailInput = page.locator('input[type="email"]').first();
    this.passwordInput = page.locator('input[type="password"]');
    this.termsCheckbox = page.locator('input[type="checkbox"]');
    this.createAccountButton = page.getByRole('button', { name: /create account/i });
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.profileIcon = page.getByRole('img', { name: 'Profile' });
    this.logoutButton = page.locator('p', { hasText: /^Logout$/i });

    // Delivery Initialization
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.deliveryEmailInput = page.locator('input[name="email"]').last(); 
    this.streetInput = page.locator('input[name="street"]');
    this.cityInput = page.locator('input[name="city"]');
    this.stateInput = page.locator('input[name="state"]');
    this.zipInput = page.locator('input[name="zipcode"]');
    this.countryInput = page.locator('input[name="country"]');
    this.phoneInput = page.locator('input[name="phone"]');


    // Stripe initialization in constructor
this.stripeEmailInput = page.locator('input[type="email"]').first();
this.stripePhoneInput = page.locator('input[type="tel"]').first();
this.stripeCardNumber = page.locator('input[placeholder*="1234"]');
this.stripeExpiry = page.locator('input[placeholder*="MM"]');
this.stripeCVC = page.locator('input[placeholder*="CVC"]');
this.stripePayButton = page.getByRole('button', { name: /pay/i });

  }

  async clickSignIn() {
    if (await this.profileIcon.isVisible()) {
      await this.profileIcon.click();
    } else {
      await this.page.getByRole('button', { name: 'Sign In' }).click();
    }
  }
}