import { test } from '@playwright/test';
import { signup, dupeSignup } from './utils';

test('Create playwright user', async ({ page }) => {
  await signup(page);
});

test('Create duplicate-detector user', async ({ page }) => {
  await dupeSignup(page);
});
