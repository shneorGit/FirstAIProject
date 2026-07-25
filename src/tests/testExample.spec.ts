import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage'; // Adjust the import path as needed

// Ensure Playwright is imported here
import { Page } from '@playwright/test';

test.describe('Example Tests', () => {
  let basePage: BasePage;

  // Define the type for 'page' in the beforeEach function
  test.beforeEach(async ({ page }: { page: Page }) => {
    basePage = new BasePage(page);
    await basePage.navigateTo('https://www.sport5.co.il/');
  });

  test('Check title of the page', async () => {
    await expect(basePage.page).toHaveTitle(/ספורט 5/); // Adjust the title as needed
  });

  test('Take a screenshot', async () => {
    await basePage.takeScreenshot('sport5-page');
  });
});
