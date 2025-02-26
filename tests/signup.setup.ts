import { test } from '@playwright/test';
import { signup } from './utils';

test('Signup', async ({ page }) => {
  await signup(page);
});
