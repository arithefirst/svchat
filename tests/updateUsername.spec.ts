import { test, expect, type Page, type Locator } from '@playwright/test';
import { login } from './utils';

async function expectError(message: string, page: Page) {
  const errorMessageLocator = page.locator(`.text-sm.text-red-500:has-text("${message}")`);
  await expect(errorMessageLocator).toBeVisible();
}

test.describe('Username Update Form', () => {
  let page: Page;
  let usernameInput: Locator;
  let submitButton: Locator;
  let currentUsernameElement: Locator;
  const newUsername: string = 'testuser' + Math.floor(Math.random() * 10000);

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();

    // Login and navigate
    await login(page);
    await page.goto('/account', { timeout: 30000, waitUntil: 'domcontentloaded' });

    // Initialize locators
    usernameInput = page.locator('input#username');
    submitButton = page.getByRole('button', { name: 'Update Username' });
    currentUsernameElement = page.locator('#currentuser-username');
  });

  // Test that the username will change
  test('should successfully update the username', async () => {
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
    await usernameInput.fill('a');
    await submitButton.click();

    // Check for error message
    await expectError('Username must be at least 3 characters.', page);

    // Ensure the username wasn't updated
    const currentUsername: string = (await currentUsernameElement.textContent()) || '';
    expect(currentUsername).not.toBe('a');
  });

  // Test that new and old username can't be the same
  test('should not allow same username', async () => {
    const currentUsername = await currentUsernameElement.textContent();
    expect(currentUsername).toBeTruthy();

    await usernameInput.fill(currentUsername!);
    await submitButton.click();

    // Check for error message
    await expectError('New username cannot be the same as old username.', page);
  });

  // Test non-duplicate usernames
  test('should not allow duplicate usernames', async () => {
    await usernameInput.fill('existing_user');
    await submitButton.click();

    await expectError('Username taken.', page);
  });
});
