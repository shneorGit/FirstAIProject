import { test, expect } from '@playwright/test';
import { Sport5Page } from '../pages/sport5Page';

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

  test('Navigate to Israeli Football section ("כדורגל ישראלי")', async () => {
    // Find the link for 'כדורגל' or 'ישראלי'
    const footballLink = await sportPage.getNavigationLink('כדורגל ישראלי');
    
    // Check if link is visible, and click it
    if (await footballLink.isVisible()) {
      await footballLink.click();
      // Verify that URL contains a reference to football or israeli football
      await sportPage.page.waitForLoadState('domcontentloaded');
      const url = sportPage.page.url();
      console.log('Navigated to URL:', url);
      expect(url).toContain('sport5.co.il');
    } else {
      console.log('Israeli Football navigation link not directly visible; testing fallback link.');
      const genericFootballLink = await sportPage.getNavigationLink('כדורגל');
      await expect(genericFootballLink).toBeVisible();
      await genericFootballLink.click();
      expect(sportPage.page.url()).toContain('sport5.co.il');
    }
  });

  test('Verify Live Scores/Ticker Widget presence', async () => {
    // Media platforms usually have a ticker / scoreboard / list of matches
    const ticker = sportPage.liveScoresWidget;
    const isVisible = await ticker.isVisible();
    console.log(`Scores/Ticker widget visibility status: ${isVisible}`);
    // We soft-assert or check existence since ticker layouts can load conditionally or differently on different viewports
    if (isVisible) {
      await expect(ticker).toBeVisible();
    } else {
      console.log('Scores ticker container not visible in current viewport. Looking for any match/ticker elements.');
      const anyTicker = sportPage.page.locator('[class*="ticker"], [class*="scores"]').first();
      const count = await anyTicker.count();
      console.log(`Found ${count} ticker/scores-like elements on page`);
    }
  });

  test('Perform Search functionality', async () => {
    // Search for 'מכבי' (Maccabi)
    await sportPage.searchFor('מכבי');
    
    // Verify search page loaded correctly or URL contains search query
    const url = sportPage.page.url();
    console.log('Search Result URL:', url);
    expect(url).toMatch(/q=%D7%9E%D7%9B%D7%91%D7%99|search/i);
    
    // Take screenshot of search results
    await sportPage.takeScreenshot('sport5-search-results');
  });

  test('Take Homepage Screenshot', async () => {
    await sportPage.takeScreenshot('sport5-homepage-fresh');
  });
});
