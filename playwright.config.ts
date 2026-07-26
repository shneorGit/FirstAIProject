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
    // --- DESKTOP BROWSERS ---
    {
      name: 'Desktop Chrome',
      testIgnore: /.*Mobile\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        headless: !!process.env.CI, // Double negation ensures boolean conversion
        baseURL: 'https://www.sport5.co.il/',
        screenshot: 'only-on-failure', // Optimized: Only capture screenshot on failure
        trace: 'retain-on-failure',     // Optimized: Only keep execution trace on failure
      },
    },
    {
      name: 'Desktop Firefox',
      testIgnore: /.*Mobile\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        headless: !!process.env.CI,
        baseURL: 'https://www.sport5.co.il/',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'Desktop Safari (WebKit)',
      testIgnore: /.*Mobile\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        headless: !!process.env.CI,
        baseURL: 'https://www.sport5.co.il/',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
      },
    },

    // --- MOBILE BROWSERS ---
    {
      name: 'Mobile Chrome',
      testMatch: /.*Mobile\.spec\.ts/,
      use: {
        ...devices['Pixel 5'],
        headless: !!process.env.CI,
        baseURL: 'https://www.sport5.co.il/',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'Mobile Safari (WebKit)',
      testMatch: /.*Mobile\.spec\.ts/,
      use: {
        ...devices['iPhone 12'],
        headless: !!process.env.CI,
        baseURL: 'https://www.sport5.co.il/',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
      },
    }
  ]
});
