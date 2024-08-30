import { TEST_BASE_URL } from './helper/endToEndTestConstants';
import { test, expect } from '@playwright/test';

test.describe('For analyzing TA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_BASE_URL);
  });

  test('the initial page should contain an enabled button for analyses', async ({ page }) => {
    await expect(page.getByTestId('button-open-analysis')).toBeVisible();
    await expect(page.getByTestId('button-open-analysis')).toBeEnabled();
  });

  test('the reachability analysis should produce a result', async ({ page }) => {
    await page.getByTestId('button-open-analysis').click();
    await page.getByTestId('button-start-analysis').click();
    await expect(page.getByTestId('analysis-result-all-reachable')).toBeVisible();
  });
});
