import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';

setDefaultTimeout(30000);

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000,
    args: ['--start-maximized'] 
  });
});

Before(async function () {
  this.context = await browser.newContext({
    viewport: null,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  this.page = await this.context.newPage();
});

After(async function () {
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
});


/*
import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';

setDefaultTimeout(30000);

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000,
    args: ['--start-maximized'] 
  });
});

Before(async function () {
  // Create context with video recording enabled
  this.context = await browser.newContext({
    viewport: null,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    recordVideo: {
      dir: 'videos/',
      size: { width: 1280, height: 720 }
    }
  });
  this.page = await this.context.newPage();
});

After(async function (scenario) {
  await this.page?.close();
  
  // Save video with scenario name so it's easy to find
  const video = await this.page?.video();
  if (video) {
    const scenarioName = scenario.pickle.name.replace(/\s+/g, '_');
    await video.saveAs(`videos/${scenarioName}.webm`);
  }
  
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
});
*/