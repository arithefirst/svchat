import { test, expect, type Page, type Locator } from '@playwright/test';
import { login } from './utils';

async function getImgSrc(image: Locator) {
  return await image.getAttribute('src');
}

test.describe('Profile Photo Update', () => {
  let page: Page;
  let fileInput: Locator;
  let profileImage: Locator;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();

    // Login and navigate
    await login(page);
    await page.goto('/account', { timeout: 30000, waitUntil: 'domcontentloaded' });

    // Initialize locators
    profileImage = page.locator('img#userimage');
    fileInput = page.locator('input[type="file"]');
  });

  test('successfully update profile image', async () => {
    await page.waitForTimeout(1000);

    // Get the inital image src
    const initalSrc = await getImgSrc(profileImage);

    // Upload the new image
    await fileInput.setInputFiles(['./static/freakybear.jpg']);
    await page.waitForTimeout(500);
    await page.getByTestId('crop').click();

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
    await page.waitForTimeout(500);

    // Check for error
    const errorMessageLocator = page.locator(`.text-sm.text-red-500:has-text("Please upload a valid image.")`);
    await expect(errorMessageLocator).toBeVisible();

    // Make sure the src is the same as the original
    expect(await getImgSrc(profileImage)).toEqual(initalSrc);
  });
});
