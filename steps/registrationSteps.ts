import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegistrationPage } from '../pages/RegistrationPage';

let regPage: RegistrationPage;
const HUMAN_DELAY = 20;

// --- STEP 1: NAVIGATION & SETUP ---

// Initializes the page object and navigates to the Tomato App homepage
Given('the user navigates to the Tomato App homepage', async function () {
  regPage = new RegistrationPage(this.page);
  await this.page.goto('https://tomato-food-delivery-zeta.vercel.app');
  await this.page.waitForLoadState('networkidle');
});

// --- STEP 2: REGISTRATION FLOW ---

// Opens the Sign In modal from the top navigation
When('the user clicks the {string} button in the top header', async function (btnName: string) {
  await regPage.clickSignIn();
});

// Switches from Login view to Sign Up view inside the modal
When('the user switches to the sign-up form modal view', async function () {
  await this.page.locator('text=/Click here/i').click();
});

// Generates and types a random first name with human-like delay
When('the user enters a random name using faker', async function () {
  this.savedName = faker.person.firstName();
  await regPage.nameInput.waitFor({ state: 'visible', timeout: 5000 });
  await regPage.nameInput.clear();
  await regPage.nameInput.pressSequentially(this.savedName, { delay: HUMAN_DELAY });
});

// Generates and types a random email — saved for reuse in login and Stripe steps
When('the user enters a random registration email address using faker', async function () {
  this.savedEmail = faker.internet.email().toLowerCase();
  await regPage.emailInput.waitFor({ state: 'visible', timeout: 5000 });
  await regPage.emailInput.clear();
  await regPage.emailInput.pressSequentially(this.savedEmail, { delay: HUMAN_DELAY });
});

// Types a fixed strong password with human-like delay — saved for reuse in login step
When('the user enters a random registration password using faker', async function () {
  this.savedPassword = 'SecurePass!1234';
  await regPage.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
  await regPage.passwordInput.clear();
  await regPage.passwordInput.pressSequentially(this.savedPassword, { delay: HUMAN_DELAY });
});

// Checks the terms and conditions checkbox to enable account creation
When('the user confirms the registration agreement checkbox', async function () {
  await regPage.termsCheckbox.check();
});

// Submits the registration form and waits for the modal to close
Then('the user clicks the {string} button to submit', async function (_btn: string) {
  await regPage.createAccountButton.click();
  await this.page.waitForSelector('.login-popup', { state: 'hidden', timeout: 10000 });
});

// --- STEP 3: AUTHENTICATION FLOW ---

// Clicks the profile icon to open the dropdown menu
When('the user clicks the profile icon', async function () {
  await regPage.profileIcon.waitFor({ state: 'visible', timeout: 10000 });
  await regPage.profileIcon.click();
});

// Types the previously saved registration email with human-like delay
When('the user enters their registered email', async function () {
  await regPage.emailInput.waitFor({ state: 'visible', timeout: 5000 });
  await regPage.emailInput.clear();
  await regPage.emailInput.pressSequentially(this.savedEmail, { delay: HUMAN_DELAY });
});

// Types the previously saved registration password with human-like delay
When('the user enters their registered password', async function () {
  await regPage.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
  await regPage.passwordInput.clear();
  await regPage.passwordInput.pressSequentially(this.savedPassword, { delay: HUMAN_DELAY });
});

// Checks the terms and conditions checkbox before login
When('user confirms agreement to terms checkbox', async function () {
  await regPage.termsCheckbox.check();
});

// Clicks the login button to submit credentials
When('user clicks login submission button', async function () {
  await regPage.loginButton.click();
});

// Verifies login was successful by checking profile icon is visible
Then('the login process should be completed', async function () {
  await expect(regPage.profileIcon).toBeVisible({ timeout: 10000 });
});

// --- STEP 4: ORDER & CART MANAGEMENT ---

// Waits for food items to load on the page
When('the user selects a {string} from the menu', async function (_dishName: string) {
  await this.page.waitForSelector('.food-item', { timeout: 10000 });
});

// Clicks the first add to cart icon on the page using alt text
When('the user adds the dish to the cart', async function () {
  const addIcon = this.page.getByAltText(/add/i);
  await addIcon.first().waitFor({ state: 'visible', timeout: 15000 });
  await addIcon.first().click();
});

// Navigates to the cart page via the navbar cart icon
When('the user clicks the cart icon', async function () {
  await this.page.getByRole('link', { name: /cart/i }).click();
});

// Verifies the checkout page has loaded by checking the URL
Then('the checkout page should be loaded', async function () {
  await expect(this.page).toHaveURL(/.*order|.*checkout/);
});

// --- STEP 5: GENERAL UI INTERACTIONS ---

// Handles dynamic button clicks — routes to specific handlers for Logout and Sign In
When('the user clicks the {string} button', async function (btnName: string) {
  if (btnName === 'Logout') {
    await regPage.logoutButton.click();
  } else if (btnName === 'Sign In') {
    await regPage.clickSignIn();
  } else {
    await this.page.getByRole('button', { name: new RegExp(btnName, 'i') }).click();
  }
});

// --- STEP 6: DELIVERY FORM ---

// Fills the delivery form with consistent US-based address data using human-like typing
When('the user fills out the delivery information form', { timeout: 60000 }, async function () {

  // A consistent 20ms delay triggers every keyup and change event
  // while keeping the form fill fast enough for CI pipelines
  const fillFastHuman = async (locator: any, value: string) => {
    await locator.waitFor({ state: 'visible', timeout: 5000 });
    await locator.clear();
    await locator.pressSequentially(value, { delay: HUMAN_DELAY });
  };

  // Generate a US state so state and country always match
  const usState = faker.location.state({ abbreviated: false });

  await fillFastHuman(regPage.firstNameInput, faker.person.firstName());
  await fillFastHuman(regPage.lastNameInput, faker.person.lastName());
  await fillFastHuman(regPage.deliveryEmailInput, this.savedEmail);
  await fillFastHuman(regPage.streetInput, faker.location.streetAddress());
  await fillFastHuman(regPage.cityInput, faker.location.city());
  await fillFastHuman(regPage.stateInput, usState);
  await fillFastHuman(regPage.zipInput, faker.location.zipCode());
  await fillFastHuman(regPage.countryInput, 'United States');
  await fillFastHuman(regPage.phoneInput, faker.phone.number());
});

// --- STRIPE REDIRECT ---

// Waits for Stripe checkout page to load after payment redirect
Then('the user should be redirected to Stripe checkout', async function () {
  await this.page.waitForURL(/stripe\.com|checkout\.stripe/, { timeout: 30000 });
  await this.page.waitForLoadState('domcontentloaded');
});

// --- STRIPE PAYMENT FORM ---

// Fills the Stripe checkout form in order: email, card, name, country, zipcode, uncheck Link
When('the user fills out the Stripe payment form', { timeout: 90000 }, async function () {
  await this.page.waitForLoadState('domcontentloaded');
  await this.page.waitForTimeout(3000);

  // Step 1: Fill email using same email from registration
  const emailField = this.page.locator('input[placeholder*="email" i]').first();
  await emailField.waitFor({ state: 'visible', timeout: 10000 });
  await emailField.pressSequentially(this.savedEmail, { delay: 30 });
  await this.page.waitForTimeout(1000);

  // Step 2: Click Card payment method via JavaScript
  await this.page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    for (const button of Array.from(buttons)) {
      if (button.getAttribute('aria-label')?.toLowerCase().includes('card')) {
        button.click();
        break;
      }
    }
  });
  await this.page.waitForTimeout(3000);

  // Step 3: Fill card number, expiry and CVC inside Stripe iframe
  const frames = this.page.frames();
  let cardFilled = false;
  for (let attempt = 0; attempt < 5; attempt++) {
    for (const frame of frames as any[]) {
      try {
        const cardInput = frame.locator('input[autocomplete="cc-number"]');
        if (await cardInput.isVisible({ timeout: 2000 })) {
          await cardInput.click();
          await cardInput.pressSequentially('4242424242424242', { delay: 50 });
          await frame.locator('input[autocomplete="cc-exp"]').click();
          await frame.locator('input[autocomplete="cc-exp"]').pressSequentially('1226', { delay: 50 });
          await frame.locator('input[autocomplete="cc-csc"]').click();
          await frame.locator('input[autocomplete="cc-csc"]').pressSequentially('123', { delay: 50 });
          cardFilled = true;
          break;
        }
      } catch (e) {}
    }
    if (cardFilled) break;
    await this.page.waitForTimeout(2000);
  }

  // Step 4: Fill cardholder name with human-like delay
  const nameField = this.page.locator('input[placeholder*="name" i], input[name*="name" i]').last();
  if (await nameField.isVisible({ timeout: 3000 })) {
    await nameField.pressSequentially(this.savedName || 'Test User', { delay: HUMAN_DELAY });
  }

  // Step 5: Select United States as billing country
  const countrySelect = this.page.locator('select').first();
  if (await countrySelect.isVisible({ timeout: 3000 })) {
    await countrySelect.selectOption('US');
  }

  // Step 6: Fill zipcode with human-like delay
  const zipcodeField = this.page.locator('input[placeholder*="zip" i], input[name*="postal" i]').first();
  if (await zipcodeField.isVisible({ timeout: 3000 })) {
    await zipcodeField.pressSequentially('98052', { delay: HUMAN_DELAY });
  }

  // Step 7: Uncheck Link "Save my info" to remove phone number requirement
  await this.page.evaluate(() => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (const checkbox of Array.from(checkboxes) as HTMLInputElement[]) {
      if (checkbox.checked) {
        checkbox.click();
      }
    }
  });
  await this.page.waitForTimeout(1000);
});

// --- STRIPE PAY BUTTON ---

// Clicks the Stripe hosted payment submit button to process the payment
When('the user clicks the Stripe pay button', async function () {
  const payButton = this.page.locator('[data-testid="hosted-payment-submit-button"]');
  await payButton.waitFor({ state: 'visible', timeout: 10000 });
  await payButton.click({ force: true });
});

// --- ORDER CONFIRMED ---

// Verifies the order was placed by checking redirect to My Orders page
Then('the order should be confirmed', async function () {
  // Stripe redirects directly to myorders after successful payment
  await expect(this.page).toHaveURL(/myorders/, { timeout: 30000 });
  await this.page.waitForLoadState('networkidle');

  // Verify My Orders heading is visible confirming order was placed
  const heading = this.page.locator('h2:has-text("My Orders")');
  await expect(heading).toBeVisible({ timeout: 10000 });
  console.log('✅ Order confirmed — My Orders page loaded!');

  // Stay on page briefly to confirm the result visually
  await this.page.waitForTimeout(1000);
});