import { test, expect, type Page, type Locator } from '@playwright/test';
import { login } from './utils';

test.describe('Username Update Form', () => {
  let page: Page;
  let usernameInput: Locator;
  let submitButton: Locator;
  let currentUsernameElement: Locator;
  const newUsername: string = 'testuser' + Math.floor(Math.random() * 10000);

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    // Initialize locators
    usernameInput = page.locator('input#username');
    submitButton = page.getByRole('button', { name: 'Update Username' });
    currentUsernameElement = page.locator('#currentuser-username');

    await login(page);
    page.goto('/account');
  });

  // Test that the username will change
  test('should successfully update the username', async () => {
    await page.waitForLoadState('domcontentloaded');
    await usernameInput.fill(newUsername);
    await submitButton.click();

    // Check for success message
    const successMessageLocator = page.locator('p.text-sm.text-green-500:has-text("Username updated.")');
    await expect(successMessageLocator).toBeVisible();

    // Verify the username displayed in the UI has been updated
    const updatedUsername: string = (await currentUsernameElement.textContent()) || '';
    expect(updatedUsername).toBe(newUsername);
  });

  // Test invalidator
  test('should show validation error for invalid username', async () => {
    await page.waitForLoadState('domcontentloaded');
    await usernameInput.fill('a');
    await submitButton.click();

    // Check for error message
    const errorMessageLocator = page.locator('span.text-sm.text-red-500:has-text("Username must be at least 3 characters.")');
    await expect(errorMessageLocator).toBeVisible();

    // Ensure the username wasn't updated
    const currentUsername: string = (await currentUsernameElement.textContent()) || '';
    expect(currentUsername).not.toBe('a');
  });
});
