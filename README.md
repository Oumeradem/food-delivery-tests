### 🧪 Tomato App - E2E Test Suite
BDD automation test suite using Playwright + Cucumber covering registration, login, cart, Stripe payment, and order confirmation.
29 automated E2E steps — full user journey tested end to end.

**Tech:** Playwright · Cucumber · TypeScript · Faker.js
**Live App:** https://tomato-food-delivery-zeta.vercel.app
**Test Repo:** https://github.com/Oumeradem/food-delivery-tests



# 🍅 Tomato Food Delivery — E2E Test Automation Framework

> A production-grade BDD automation framework built with Playwright, Cucumber, and TypeScript that validates the complete end-to-end user journey of a full-stack MERN food delivery application — from account registration through Stripe payment confirmation.

---

## 🔗 Project Links

| Resource | Link |
|----------|------|
| 🌐 Live Application | https://tomato-food-delivery-zeta.vercel.app |
| 💻 Application Repo | https://github.com/Oumeradem/food-del |
| 🧪 Test Automation Repo | https://github.com/Oumeradem/food-delivery-tests |

---

## 🎯 What This Framework Demonstrates

- **BDD Methodology** — Human-readable Gherkin scenarios that bridge the gap between business requirements and automated tests
- **Page Object Model** — Scalable, maintainable test architecture separating locators from test logic
- **Real-world Payment Testing** — Automated Stripe checkout flow including iframe handling and third-party authentication
- **Human-like Interaction** — `pressSequentially()` with optimized 20ms delay to reliably trigger all browser events
- **Data-driven Testing** — Faker.js generates unique test data on every run, eliminating test pollution
- **Cross-step State Management** — Shared test context preserves credentials across registration, login, and payment steps

---

## 📊 Test Coverage — 29 Automated Steps



**Result: 29/29 steps passing in ~1m 17s**

---

## 🛠️ Tech Stack

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev)
[![Cucumber](https://img.shields.io/badge/Cucumber-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)](https://cucumber.io)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Faker.js](https://img.shields.io/badge/Faker.js-FF69B4?style=for-the-badge&logo=javascript&logoColor=white)](https://fakerjs.dev)

---

## 🏗️ Framework Architecture

food-delivery-tests/
├── features/
│   ├── registration.feature       # Full registration → payment E2E scenario
│   ├── authentication.feature     # Login/logout scenarios
│   └── food-ordering.feature      # Cart and order management scenarios
├── hooks/
│   └── globalHooks.ts             # Browser lifecycle, page initialization
├── pages/
│   └── RegistrationPage.ts        # Page Object Model — all locators & actions
├── steps/
│   └── registrationSteps.ts       # Step definitions — Gherkin → Playwright
├── cucumber.js                    # Cucumber config — timeout, paths, TS support
├── tsconfig.json                  # TypeScript compiler config
└── package.json                   # Scripts and dependencies


### Design Decisions

**Page Object Model** — All locators live in `RegistrationPage.ts`. When the UI changes, only one file needs updating — not every test.

**Human-like Typing** — Using `pressSequentially()` with 20ms delay instead of `fill()` ensures every `keyup`, `change`, and `input` event fires correctly, matching real user behavior.

**Stripe Iframe Handling** — Stripe embeds card fields in nested iframes for PCI compliance. The framework iterates all page frames to locate and fill card fields reliably across sessions.

**State Persistence** — `this.savedEmail`, `this.savedName`, and `this.savedPassword` are stored in Cucumber's World context, allowing credentials generated at registration to flow through login and Stripe payment steps without hardcoding.

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- npm v6+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Oumeradem/food-delivery-tests.git
cd food-delivery-tests
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install
```

---

## 🚀 Running Tests

```bash
# Run full registration and payment E2E scenario
npm run test:reg

# Run all BDD tests
npm test

# Run with HTML report
npm run test:bdd:report
```

---

## 📋 Key Technical Challenges Solved

| Challenge | Solution |
|-----------|----------|
| Stripe card fields inside nested iframes | Iterated all page frames to find and fill `cc-number`, `cc-exp`, `cc-csc` fields |
| Stripe Link popup blocking card form | Used JavaScript `evaluate()` to uncheck the "Save my info" checkbox |
| Card accordion not expanding via standard click | Used `aria-label` JavaScript button targeting to reliably open the card panel |
| State/country mismatch in delivery form | Used `faker.location.state()` paired with hardcoded `'United States'` for consistency |
| Vercel 404 on React Router deep links | Added `vercel.json` rewrite rules to serve `index.html` for all routes |

---

## 👤 Author

**Oumer Adem**
Aspiring Software Engineer | QA Automation | Full-Stack Development

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/oumer-adem)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Oumeradem)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:oumer.adamye@gmail.com)

### Design Decisions

**Page Object Model** — All locators live in `RegistrationPage.ts`. When the UI changes, only one file needs updating — not every test.

**Human-like Typing** — Using `pressSequentially()` with 20ms delay instead of `fill()` ensures every `keyup`, `change`, and `input` event fires correctly, matching real user behavior.

**Stripe Iframe Handling** — Stripe embeds card fields in nested iframes for PCI compliance. The framework iterates all page frames to locate and fill card fields reliably across sessions.

**State Persistence** — `this.savedEmail`, `this.savedName`, and `this.savedPassword` are stored in Cucumber's World context, allowing credentials generated at registration to flow through login and Stripe payment steps without hardcoding.

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- npm v6+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Oumeradem/food-delivery-tests.git
cd food-delivery-tests
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install
```

---

## 🚀 Running Tests

```bash
# Run full registration and payment E2E scenario
npm run test:reg

# Run all BDD tests
npm test

# Run with HTML report
npm run test:bdd:report
```

---

## 📋 Key Technical Challenges Solved

| Challenge | Solution |
|-----------|----------|
| Stripe card fields inside nested iframes | Iterated all page frames to find and fill `cc-number`, `cc-exp`, `cc-csc` fields |
| Stripe Link popup blocking card form | Used JavaScript `evaluate()` to uncheck the "Save my info" checkbox |
| Card accordion not expanding via standard click | Used `aria-label` JavaScript button targeting to reliably open the card panel |
| State/country mismatch in delivery form | Used `faker.location.state()` paired with hardcoded `'United States'` for consistency |
| Vercel 404 on React Router deep links | Added `vercel.json` rewrite rules to serve `index.html` for all routes |

---

## 👤 Author

**Oumer Adem**
Aspiring Software Engineer | QA Automation | Full-Stack Development

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/oumer-adem)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Oumeradem)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:oumer.adamye@gmail.com)
