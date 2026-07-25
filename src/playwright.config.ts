import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 5 * 1000,
  retries: 2,
  use: {
    headless: false, // Set to true for automated testing
    baseURL: 'https://www.sport5.co.il/', // Set the base URL of your application
    browserName: 'chromium', // You can change this to 'firefox' or 'webkit' if needed
  },
});