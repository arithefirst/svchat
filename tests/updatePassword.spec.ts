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

  // Test that passwords can't be the same
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

  // Test empty fields validation
  test('should show validation errors when fields are empty', async () => {
    // Leave fields empty and try to submit
    await submitButton.click();

    // Check for error messages on both fields
    await expectError('Password must not be empty.', page);
  });

  // Test validation error for missing uppercase letter
  test('should show validation error for password without uppercase letter', async () => {
    await currentPasswordInput.fill(currentPassword);
    await newPasswordInput.fill('password123!');
    await submitButton.click();

    // Check for error message
    await expectError('New password must contain an uppercase letter.', page);
  });

  // Test validation error for missing lowercase letter
  test('should show validation error for password without lowercase letter', async () => {
    await currentPasswordInput.fill(currentPassword);
    await newPasswordInput.fill('PASSWORD123!');
    await submitButton.click();

    // Check for error message
    await expectError('New password must contain a lowercase letter.', page);
  });

  // Test validation error for missing number
  test('should show validation error for password without number', async () => {
    await currentPasswordInput.fill(currentPassword);
    await newPasswordInput.fill('Password!!!');
    await submitButton.click();

    // Check for error message
    await expectError('New password must contain at least one number.', page);
  });

  // Test validation error for missing special character
  test('should show validation error for password without special character', async () => {
    await currentPasswordInput.fill(currentPassword);
    await newPasswordInput.fill('Password123');
    await submitButton.click();

    // Check for error message
    await expectError('New password must contain at least one special character.', page);
  });

  // Test validation error for using example password
  test('should show validation error for using example password', async () => {
    await currentPasswordInput.fill(currentPassword);
    await newPasswordInput.fill('Password123!');
    await submitButton.click();

    // Check for error message
    await expectError("You can't use the example password, silly", page);
  });

  // Test update functionality
  test('should successfully update user password', async () => {
    await currentPasswordInput.fill(currentPassword);
    await newPasswordInput.fill('newPassword123!');
    await submitButton.click();

    await page.waitForTimeout(1000);

    // Undo password change so other tests still pass
    await currentPasswordInput.fill('newPassword123!');
    await newPasswordInput.fill(currentPassword);
    await submitButton.click();

    // Look for the success message
    const successMessageLocator = page.locator('p.text-sm.text-green-500:has-text("Password updated.")');
    await expect(successMessageLocator).toBeVisible();
  });
});
