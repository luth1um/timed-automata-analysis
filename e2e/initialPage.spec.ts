import { test, expect } from '@playwright/test';

test.describe('The initial page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/timed-automata-analysis/');
  });

  test('contains a button for hiding the location table when the page is loaded', async ({ page }) => {
    //await page.getByRole('button', { name: 'Hide Locations' }).isVisible();
    await expect(page.getByRole('button', { name: 'Hide Locations' })).toBeVisible();
  });

  // TODO: find tables by using test IDs (see https://playwright.dev/docs/locators#locate-by-test-id)
});
