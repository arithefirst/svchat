import { test, expect, type Page, type Locator } from '@playwright/test';
import { login } from './utils';

async function getImgSrc(image: Locator) {
  return await image.getAttribute('src');
}

test.describe('Profile Photo Update', () => {
  let page: Page;
  let fileInput: Locator;
  let profileImage: Locator;
  let submitButton: Locator;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();

    // Login and navigate
    await login(page);
    await page.goto('/account', { timeout: 30000, waitUntil: 'domcontentloaded' });

    // Initialize locators
    submitButton = page.getByRole('button', { name: 'Update Profile Photo' });
    profileImage = page.locator('img#userimage');
    fileInput = page.locator('input[type="file"]');
  });

  test('successfully update profile image', async () => {
    await page.waitForTimeout(1000);

    // Get the inital image src
    const initalSrc = await getImgSrc(profileImage);

    // Upload the new image
    await fileInput.setInputFiles(['./static/freakybear.jpg']);
    await submitButton.click();

    // Wait for upload to complete
    const response = await page.waitForResponse((response) => response.request().method() === 'POST', { timeout: 30000 });
    expect(response.status()).toBe(200);

    // Make sure the src is not the same as the original
    expect(await getImgSrc(profileImage)).not.toEqual(initalSrc);
  });

  test("shouldn't accept non-images", async () => {
    await page.waitForTimeout(1000);

    // Get the inital image src
    const initalSrc = await getImgSrc(profileImage);

    // Upload the new image
    await fileInput.setInputFiles(['./README.md']);
    await submitButton.click();

    // Wait for upload to complete
    const response = await page.waitForResponse((response) => response.request().method() === 'POST', { timeout: 30000 });
    expect(response.status()).toBe(500);

    // Make sure the src is the same as the original
    expect(await getImgSrc(profileImage)).toEqual(initalSrc);
  });
});
