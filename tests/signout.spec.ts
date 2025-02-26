// import { test, expect, type Page, type Locator } from '@playwright/test';
// import { login } from './utils';

// test.describe('Sign Out Button', () => {
//   let page: Page;
//   let button: Locator;

//   test.beforeEach(async ({ browser }) => {
//     page = await browser.newPage();

//     // Login and navigate
//     await login(page);
//     await page.goto('/account', { timeout: 30000, waitUntil: 'domcontentloaded' });
//     // Initialize locators
//     button = page.getByRole('button', { name: 'Sign Out' });
//   });

//   test('sign out button signs user out', async ({ request }) => {
//     // Get cookies from the browser context
//     const cookies = await page.context().cookies();
//     const cookieHeader = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');

//     const initalfetch = await request.get('/api/checkauth', {
//       headers: {
//         Cookie: cookieHeader,
//       },
//     });
//     expect(initalfetch.status()).toEqual(200);

//     await button.click();

//     const finalfetch = await request.get('/api/checkauth', {
//       headers: {
//         Cookie: cookieHeader,
//       },
//     });
//     expect(finalfetch.status()).toEqual(401);
//   });
// });
