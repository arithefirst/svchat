import { test, expect, type Page, type Locator } from '@playwright/test';
import { login } from './utils';

async function expectError(message: string, page: Page) {
  const errorMessageLocator = page.locator(`.text-sm.text-red-500:has-text("${message}")`);
  await expect(errorMessageLocator).toBeVisible();
}

test.describe('Password Update Form', () => {
  let page: Page;
  let currentPasswordInput: Locator;
  let newPasswordInput: Locator;
  let submitButton: Locator;
  const currentPassword = 'Password1234!';

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();

    // Login and navigate
    await login(page);
    await page.goto('/account', { timeout: 30000, waitUntil: 'domcontentloaded' });

    // Initialize locators
    currentPasswordInput = page.locator('input#currentPassword');
    newPasswordInput = page.locator('input#newPassword');
    submitButton = page.getByRole('button', { name: 'Update Password' });
  });

  // Test passwords can't be the same
  test('show not allow same password', async () => {
    await currentPasswordInput.fill(currentPassword);
    await newPasswordInput.fill(currentPassword);
    await submitButton.click();

    // Check for error message
    await expectError('New password cannot be the same as old password.', page);
  });

  // Test invalid current password
  test('should show error for invalid current password', async () => {
    await currentPasswordInput.fill('wrongPassword');
    await newPasswordInput.fill('newPassword123!');
    await submitButton.click();

    // Check for error message
    await expectError('Invalid password', page);
  });

  // Test validation error for weak new password
  test('should show validation error for weak new password', async () => {
    await currentPasswordInput.fill(currentPassword);
    await newPasswordInput.fill('weak');
    await submitButton.click();

    // Check for error message
    await expectError('New password must be at least 8 characters.', page);
  });

  // Test empty fields validation
  test('should show validation errors when fields are empty', async () => {
    // Leave fields empty and try to submit
    await submitButton.click();

    // Check for error messages on both fields
    await expectError('Password must not be empty.', page);
  });

  // Test update functionality
  test('should successfully update user password', async () => {
    await currentPasswordInput.fill(currentPassword);
    await newPasswordInput.fill('newPassword123!');
    await submitButton.click();

    // Undo password change so other tests still pass
    await currentPasswordInput.fill('newPassword123!');
    await newPasswordInput.fill(currentPassword);
    await submitButton.click();

    // Look for the success message
    const successMessageLocator = page.locator('p.text-sm.text-green-500:has-text("Password updated.")');
    await expect(successMessageLocator).toBeVisible();
  });
});
