import type { Page } from '@playwright/test';

export async function login(page: Page): Promise<void> {
  await page.goto('http://localhost:5174/login');
  await page.waitForLoadState('domcontentloaded');
  console.log('loaded');
  await page.fill('#email', 'playwright@playwright.com');
  await page.fill('#password', 'Password1234!');
  await page.click('button[type="submit"]');
}
