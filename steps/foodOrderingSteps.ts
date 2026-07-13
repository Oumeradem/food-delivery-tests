import { Given, When, Then } from '@cucumber/cucumber';
import { FoodMenuPage } from '../pages/FoodMenuPage';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegistrationPage } from '../pages/RegistrationPage';

// -------------------------------------------------------------------------
// INITIALIZATION
// -------------------------------------------------------------------------


// -------------------------------------------------------------------------
// SCENARIO 1: HOMEPAGE ELEMENTS
// -------------------------------------------------------------------------
Then('the header navigation should display {string}, {string}, {string}, and {string}', async function (s1, s2, s3, s4) {
  await this.foodMenuPage.verifyHeaderLinks();
});

Then('the main hero banner heading should read {string}', async function (expectedHeader) {
  await expect(this.foodMenuPage.heroHeader).toHaveText(expectedHeader);
});

// -------------------------------------------------------------------------
// SCENARIO 2: FILTER & DISHES (Matches your @focus scenarios)
// -------------------------------------------------------------------------
Given('the user is looking at the {string} section', async function (sectionName: string) {
  await this.foodMenuPage.exploreMenuHeader.waitFor({ state: 'visible' });
});

When('the user selects the category {string}', async function (categoryName: string) {
  await this.foodMenuPage.clickCategory(categoryName);
  await this.page.waitForTimeout(750);
});

Then('the {string} section should display {string} for {string}', async function (section, dish, price) {
  await this.foodMenuPage.verifyDishValue(dish, price);
});

// -------------------------------------------------------------------------
// SCENARIO 3: FOOTER CONTACT INFO
// -------------------------------------------------------------------------
When('the user scrolls down to the {string} section', async function (sectionName) {
  await this.foodMenuPage.getInTouchSection.scrollIntoViewIfNeeded();
});

Then('the phone number should display {string}', async function (phoneNumber) {
  await expect(this.foodMenuPage.getInTouchSection).toContainText(phoneNumber);
});

Then('the support email should display {string}', async function (email) {
  await expect(this.foodMenuPage.getInTouchSection).toContainText(email);
});

// -------------------------------------------------------------------------
// AUTHENTICATION MODAL (Your previous work)
// -------------------------------------------------------------------------
Then('a login popup form with the title {string} should appear', async function (title) {
  await this.signInModal.verifyModalVisible(title);
});

// ... (Add your other registration/login steps here if needed)

// Add these to the bottom of your file
When('the user enters random email address using faker', async function () {
  this.savedEmail = faker.internet.email();
  await this.signInModal.emailInput.fill(this.savedEmail);
});

When('the user enters random password using faker', async function () {
  this.savedPassword = `SecurePass!123`;
  await this.signInModal.passwordInput.fill(this.savedPassword);
});


