import { test, expect } from '@playwright/test';

test.describe('The rendered website', () => {
  test('displays the tables and the TA visualization when the page is loaded', async ({ page }) => {
    await page.goto('http://localhost:5173/timed-automata-analysis/');
    await expect(page).toHaveScreenshot();
  });
});
