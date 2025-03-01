import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  projects: [
    {
      name: 'setup',
      testMatch: /setup\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // Make all other tests depend on the signup,
    // since they need user accounts to run

    {
      name: 'test',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
      testMatch: /(.+\.)?(test|spec)\.[jt]s/,
    },
  ],
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  workers: 1,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
});
