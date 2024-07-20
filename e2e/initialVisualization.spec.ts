import { test, expect } from '@playwright/test';
import { TEST_BASE_URL } from './helper/endToEndTestConstants';

test.describe('The initially rendered website', () => {
  test('displays the tables and the TA visualization when the page is loaded', async ({ page }) => {
    await page.goto(TEST_BASE_URL);
    await expect(page).toHaveScreenshot();
  });
});
