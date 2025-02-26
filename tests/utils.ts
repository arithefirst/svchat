import type { Page } from '@playwright/test';

export async function login(page: Page): Promise<void> {
  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');
  await page.fill('#email', 'playwright@playwright.com');
  await page.fill('#password', 'Password1234!');
  await page.click('button[type="submit"]');
}

export async function signup(page: Page): Promise<void> {
  await page.goto('/signup');
  await page.waitForLoadState('domcontentloaded');
  await page.fill('#username', 'playwrightuser');
  await page.fill('#email', 'playwright@playwright.com');
  await page.fill('#password', 'Password1234!');
  await page.fill('#verify', 'Password1234!');
  await page.click('button[type="submit"]');
}
