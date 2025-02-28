import { test, expect, type Page, type Locator } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import { login } from './utils';

test.describe('Messages', () => {
  let page: Page;
  let textBox: Locator;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await login(page);
    await page.goto('/channel/general', { timeout: 30000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    textBox = page.getByRole('textbox', { name: 'Type Here' });
  });

  test('should send and receive messages', async () => {
    // Send a test message
    const testMessage = `${uuidv4()}-${uuidv4()}`;
    await textBox.fill(testMessage);
    await textBox.press('Enter');

    // Check if message appears in the chat
    await expect(page.getByText(testMessage)).toBeVisible({ timeout: 5000 });
  });

  test('should show error for messages > 2000 characters', async () => {
    // Create a message that exceeds 2000 characters
    const longMessage = 'a'.repeat(2001);
    await textBox.fill(longMessage);
    await textBox.press('Enter');

    // Message dialog should be visible with warning
    await expect(page.getByText('This message exceeds the maximum character limit')).toBeVisible({ timeout: 5000 });
  });

  test('messages should persist after page reload', async () => {
    // Send a unique message
    const uniqueMessage = `${uuidv4()}-${uuidv4()}`;
    await textBox.fill(uniqueMessage);
    await textBox.press('Enter');

    // Wait for message to appear
    await expect(page.getByText(uniqueMessage)).toBeVisible({ timeout: 5000 });

    // Reload the page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Message should still be visible
    await expect(page.getByText(uniqueMessage)).toBeVisible({ timeout: 5000 });
  });
});
