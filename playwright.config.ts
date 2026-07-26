import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 45 * 1000,
  retries: 2,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }]
  ],
  projects: [
    {
      name: 'Desktop Chrome',
      testIgnore: /.*Mobile\.spec\.ts/, // Skip mobile tests in desktop project
      use: {
        ...devices['Desktop Chrome'],
        headless: !process.env.CI, // Runs headed locally, headless on CI
        baseURL: 'https://www.sport5.co.il/',
        screenshot: 'on',
        trace: 'on-first-retry',
      },
    },
    {
      name: 'Mobile Chrome',
      testMatch: /.*Mobile\.spec\.ts/, // Only run mobile spec in mobile project
      use: {
        ...devices['Pixel 5'],
        headless: !process.env.CI, // Runs headed locally, headless on CI
        baseURL: 'https://www.sport5.co.il/',
        screenshot: 'on',
        trace: 'on-first-retry',
      },
    }
  ]
});
