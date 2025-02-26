import type { Page } from '@playwright/test';

export async function login(page: Page): Promise<void> {
  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');
  await page.fill('#email', 'playwright@playwright.com');
  await page.fill('#password', 'Password1234!');
  await page.click('button[type="submit"]');
}

async function signupTemplate(page: Page, email: string, username: string): Promise<void> {
  await page.goto('/signup');
  await page.waitForLoadState('domcontentloaded');
  await page.fill('#username', username);
  await page.fill('#email', email);
  await page.fill('#password', 'Password1234!');
  await page.fill('#verify', 'Password1234!');
  await page.click('button[type="submit"]');
}

export async function dupeSignup(page: Page): Promise<void> {
  await signupTemplate(page, 'playwright2@playwright.com', 'existing_user');
}

export async function signup(page: Page): Promise<void> {
  await signupTemplate(page, 'playwright@playwright.com', 'playwrightuser');
}
