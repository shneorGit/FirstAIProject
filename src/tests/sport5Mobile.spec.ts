import { test, expect } from '@playwright/test';
import { Sport5Page } from '../pages/sport5Page';

test.describe('Sport5 Mobile Chrome Integration Tests', () => {
  let sportPage: Sport5Page;

  test.beforeEach(async ({ page }) => {
    sportPage = new Sport5Page(page);
    await sportPage.goToHomepage();
  });

  test('Check Mobile Homepage layout and mobile redirect', async () => {
    // Wait for the redirect and page stability
    await sportPage.page.waitForLoadState('domcontentloaded');
    
    // Assert the page title contains 'ספורט 5'
    await expect(sportPage.page).toHaveTitle(/ספורט 5/i);
    
    // Verify that the site automatically redirects to the mobile subdomain "m.sport5.co.il"
    const currentUrl = sportPage.page.url();
    console.log('Mobile Emulated URL:', currentUrl);
    expect(currentUrl).toContain('m.sport5.co.il');

    // Check if meta viewport tag is present (critical for mobile responsiveness)
    const viewportMeta = await sportPage.page.locator('meta[name="viewport"]');
    await expect(viewportMeta).toBeAttached();
    
    // Verify viewport dimensions are within emulated mobile range
    const viewportSize = sportPage.page.viewportSize();
    console.log('Emulated Mobile Viewport Size:', viewportSize);
    expect(viewportSize?.width).toBeLessThan(500);

    // Take a screenshot of the mobile homepage layout
    await sportPage.takeScreenshot('sport5-mobile-homepage');
  });

  test('Verify mobile navigation links presence in mobile DOM', async () => {
    // On the mobile site, ensure standard navigation items (like soccer/football) are present in the DOM
    const footballLink = sportPage.page.locator('a[href*="FolderID=4439"]').first();
    await expect(footballLink).toBeAttached();
    console.log('Mobile football navigation link is attached to the DOM.');
  });
});
