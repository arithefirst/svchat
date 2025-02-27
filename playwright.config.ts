import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /setup\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // Make all other tests depend on the signup,
    // since they need user accounts to run

    {
      dependencies: ['setup'],
      name: 'test',
      testMatch: /(.+\.)?(test|spec)\.[jt]s/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: 'list',
  retries: process.env.CI ? 3 : 0,
  testDir: 'tests',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
    timeout: process.env.CI ? 120000 : 60000,
  },
  workers: 1,
});
