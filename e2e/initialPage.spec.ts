import { test, expect } from '@playwright/test';
import { TEST_BASE_URL } from './helper/endToEndTestConstants';

['location', 'switch', 'clock'].forEach((elementType: string) => {
  test.describe('The initial page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(TEST_BASE_URL);
    });

    test(`displays an enabled button for hiding the ${elementType} table when the page is loaded`, async ({ page }) => {
      await expect(page.getByTestId(`button-hide-${elementType}`)).toBeVisible();
      await expect(page.getByTestId(`button-hide-${elementType}`)).toBeEnabled();
    });

    test(`displays an enabled button to add a ${elementType} when the page is loaded`, async ({ page }) => {
      await expect(page.getByTestId(`button-add-${elementType}`)).toBeVisible();
      await expect(page.getByTestId(`button-add-${elementType}`)).toBeEnabled();
    });

    test(`displays a table of ${elementType} elements when the page is loaded`, async ({ page }) => {
      await expect(page.getByTestId(`table-${elementType}`)).toBeVisible();
    });

    test(`displays an enabled button for editing a ${elementType} when the page is loaded`, async ({ page }) => {
      await expect(page.getByTestId(`button-edit-${elementType}-0`)).toBeVisible();
      await expect(page.getByTestId(`button-edit-${elementType}-0`)).toBeEnabled();
    });

    test(`displays an enabled button for deleting a ${elementType} when the page is loaded`, async ({ page }) => {
      await expect(page.getByTestId(`button-delete-${elementType}-0`)).toBeVisible();
      await expect(page.getByTestId(`button-delete-${elementType}-0`)).toBeEnabled();
    });
  });
});
