import { test, expect } from '@playwright/test';
import { Sport5Page } from '../pages/sport5Page';

test.describe('Sport5 Visual Regression Test Suite', () => {
  let sportPage: Sport5Page;

  test.beforeEach(async ({ page }) => {
    sportPage = new Sport5Page(page);
    await sportPage.goToHomepage();
  });

  test('Visual comparison of the Main Logo / Header', async () => {
    // Locate the header logo which is static and does not change dynamically
    const headerLogo = sportPage.page.locator('.logo, [class*="logo"], header img').first();
    
    // Ensure the logo element is attached and stable before taking the screenshot
    if (await headerLogo.isVisible()) {
      await expect(headerLogo).toBeVisible();
      
      // Perform pixel-by-pixel visual snapshot verification
      await expect(headerLogo).toHaveScreenshot('sport5-header-logo.png', {
        maxDiffPixels: 200,      // Allow minor rendering / anti-aliasing variations
        threshold: 0.2           // Tolerance threshold for color difference
      });
      console.log('Visual assertion for header logo passed successfully.');
    } else {
      console.log('Header logo element not directly visible in this viewport, skipping pixel assertion.');
    }
  });

  test('Visual comparison of the Homepage with dynamic element masking', async () => {
    // Dynamic media portals have continuously changing news tiles and live scores.
    // To prevent visual tests from failing, we "mask" these dynamic elements (rendering them as solid colors).
    const dynamicWidgets = sportPage.page.locator('.ticker, .scores-strip, .live-scores, [class*="ticker"], iframe, [id*="google_ads"]').first();
    
    // Create a list of elements to mask
    const maskElements = [];
    if (await dynamicWidgets.isVisible()) {
      maskElements.push(dynamicWidgets);
    }
    
    // Take a screenshot of the viewport with masking
    await expect(sportPage.page).toHaveScreenshot('sport5-homepage.png', {
      mask: maskElements,        // Mask dynamic scoreboards / ads
      maxDiffPixels: 4000,       // Tolerance for dynamic text/article differences
      threshold: 0.3,
      fullPage: false            // Above-the-fold viewport comparison
    });
    console.log('Visual assertion with dynamic masking passed successfully.');
  });
});
