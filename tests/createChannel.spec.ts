import { test, expect, type Page } from '@playwright/test';
import { login } from './utils';
import { v4 as uuidv4 } from 'uuid';

function generate15CharUUID() {
  // Second regex prevents UUID from starting with a number
  return uuidv4().replace(/-/g, '').replace(/^\d*/g, '').substring(0, 15);
}

async function tryCreateChannel(page: Page, channelName: string) {
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Create Channel' }).click();
  await page.getByRole('textbox', { name: 'Channel Name' }).fill(channelName);
  await page.getByRole('button', { name: 'Create', exact: true }).click();
}

test.describe('Create Channel', () => {
  let page: Page;
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();

    // Login and navigate
    await login(page);
    await page.goto('/channel/general', { timeout: 30000, waitUntil: 'domcontentloaded' });
  });

  test('successfully create new channel', async ({ request }) => {
    const uuid: string = generate15CharUUID();

    // Try to create new channel
    await tryCreateChannel(page, uuid);

    // Check if channel exists
    const res = await request.get(`/channel/${uuid}`);
    expect(res.status()).toEqual(200);
  });

  test('should not allow channel names > 25 characters', async () => {
    // Try to create new channel
    await tryCreateChannel(page, 'thisisatwentyfivelongstring;');

    const error = page.getByText('Channel name cannot be longer than 24 characters.');
    await expect(error).toBeVisible();
  });

  test('should not allow channel names to start with a number', async () => {
    // Try to create new channel
    await tryCreateChannel(page, '00-test');

    const error = page.getByText('Channel name cannot start with a number.');
    await expect(error).toBeVisible();
  });

  test('should not duplicate channel names', async () => {
    const uuid: string = generate15CharUUID();

    // Try to create new channel
    await tryCreateChannel(page, uuid);
    await page.reload();
    await tryCreateChannel(page, uuid);

    const error = page.getByText('Channel already exists.');
    await expect(error).toBeVisible();
  });
});
