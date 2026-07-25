import { expect, Page } from '@playwright/test';

export class BasePage {
  constructor(public readonly page: Page) {} 
    async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async takeScreenshot(fileName: string) {
    const screenshotPath = `screenshots/${fileName}.png`;
    await this.page.screenshot({ path: screenshotPath });
  }
}