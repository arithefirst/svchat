import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  projects: [
    {
      name: 'signup',
      testMatch: /signup\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // Make all other tests depend on the signup,
    // since they need user accounts to run

    {
      name: 'main',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['signup'],
      testMatch: /(.+\.)?(test|spec)\.[jt]s/,
    },
  ],
  reporter: 'list',
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
  },
  workers: 1,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
});
