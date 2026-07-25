import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class Sport5Page extends BasePage {
  readonly navMenu: Locator;
  readonly searchButton: Locator;
  readonly searchInput: Locator;
  readonly mainArticle: Locator;
  readonly liveScoresWidget: Locator;

  constructor(page: Page) {
    super(page);
    // Common selectors on sport5.co.il
    this.navMenu = this.page.locator('nav, .menu, .main-navigation');
    this.searchButton = this.page.locator('.search-btn, .search-icon, #search-btn, [class*="search"]');
    this.searchInput = this.page.locator('input[type="search"], input[name="q"], .search-input');
    // Sport5 main article wrapper or direct link to main news
    this.mainArticle = this.page.locator('.main-article, .lead-article, .main-story, article').first();
    // Live scores strip or widget usually located near header or sidebar
    this.liveScoresWidget = this.page.locator('.ticker, .scores-strip, .live-scores, .games-ticker, [class*="ticker"]').first();
  }

  async goToHomepage() {
    await this.navigateTo('https://www.sport5.co.il/');
    // Wait for critical parts of the body to be visible
    await this.page.waitForSelector('body', { state: 'visible' });
  }

  async searchFor(query: string) {
    // If search input is not visible, click search button first to open it
    if (await this.searchButton.isVisible()) {
      await this.searchButton.click();
    }
    // Type in search query and press Enter
    const searchInputVisible = await this.searchInput.isVisible();
    if (searchInputVisible) {
      await this.searchInput.fill(query);
      await this.searchInput.press('Enter');
    } else {
      // Fallback search navigation if input is not easily interactable
      const searchUrl = `https://www.sport5.co.il/search.html?q=${encodeURIComponent(query)}`;
      await this.navigateTo(searchUrl);
    }
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getNavigationLink(text: string): Promise<Locator> {
    // Find link in the page containing the navigation text (e.g. 'כדורגל', 'כדורסל')
    return this.page.locator('a').filter({ hasText: text }).first();
  }
}
