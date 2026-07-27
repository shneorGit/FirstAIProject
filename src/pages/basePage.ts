import { expect, Page } from '@playwright/test';

export class BasePage {
  constructor(public readonly page: Page) {} 
    async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async takeScreenshot(fileName: string) {
    // WebKit on headless CI has known rendering bugs that hang on heavy sites.
    // Skip screenshots only for WebKit when running on CI to prevent timeouts.
    const isWebKit = this.page.context().browser()?.browserType().name() === 'webkit';
    if (process.env.CI && isWebKit) {
      console.log(`Skipping screenshot "${fileName}" on WebKit (Safari) in CI to prevent hang.`);
      return;
    }
    const screenshotPath = `screenshots/${fileName}.png`;
    await this.page.screenshot({ path: screenshotPath });
  }
}
