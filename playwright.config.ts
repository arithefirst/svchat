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
      name: 'tests',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['signup'],
      testMatch: /(.+\.)?(test|spec)\.[jt]s/,
      fullyParallel: true,
    },
  ],
  reporter: 'list',
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
});
