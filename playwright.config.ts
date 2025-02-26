import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  reporter: 'list',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  webServer: {
    command: 'npm run dev',
    port: 5174,
    reuseExistingServer: true,
  },
});
