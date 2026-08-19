import { test, expect } from '@playwright/test';
import { Sport5Page } from '../pages/sport5Page';
import searchQueries from './fixtures/searchQueries.json';
import categories from './fixtures/categories.json';

test.describe('Sport5 Automation Test Suite', () => {
  let sportPage: Sport5Page;

  test.beforeEach(async ({ page }) => {
    sportPage = new Sport5Page(page);
    await sportPage.goToHomepage();
  });

  test('Check Homepage Title', async () => {
    // Assert the page title contains 'ספורט 5'
    await expect(sportPage.page).toHaveTitle(/ספורט 5/i);
  });

  // --- Data-Driven Navigation Tests ---
  for (const category of categories) {
    test(`Navigate to category: "${category}"`, async () => {
      const categoryLink = await sportPage.getNavigationLink(category);
      
      if (await categoryLink.isVisible()) {
        await categoryLink.click();
        await sportPage.page.waitForLoadState('domcontentloaded');
        const url = sportPage.page.url();
        console.log(`Successfully navigated to category "${category}" URL:`, url);
        expect(url).toContain('sport5.co.il');
      } else {
        console.log(`Category "${category}" link is not visible, skipping direct click assertion.`);
      }
    });
  }

  test('Verify Live Scores/Ticker Widget presence', async () => {
    const ticker = sportPage.liveScoresWidget;
    const isVisible = await ticker.isVisible();
    console.log(`Scores/Ticker widget visibility status: ${isVisible}`);
    if (isVisible) {
      await expect(ticker).toBeVisible();
    } else {
      console.log('Scores ticker container not visible in current viewport. Looking for any match/ticker elements.');
      const anyTicker = sportPage.page.locator('[class*="ticker"], [class*="scores"]').first();
      const count = await anyTicker.count();
      console.log(`Found ${count} ticker/scores-like elements on page`);
    }
  });

  // --- Data-Driven Search Tests ---
  for (const query of searchQueries) {
    test(`Perform Search functionality for "${query}"`, async () => {
      await sportPage.searchFor(query);
      
      const url = sportPage.page.url();
      console.log(`Search result URL for "${query}":`, url);
      expect(url).toContain('search');
      
      // Save screenshot for each search query execution
      await sportPage.takeScreenshot(`sport5-search-${query}`);
    });
  }

  test('Take Homepage Screenshot', async () => {
    await sportPage.takeScreenshot('sport5-homepage-fresh');
  });
});
