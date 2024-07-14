import { test, expect } from '@playwright/test';

['Location', 'Switch', 'Clock'].forEach((elementType: string) => {
  test.describe('The initial page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173/timed-automata-analysis/');
    });

    test(`displays a button for hiding the ${elementType.toLowerCase()} table when the page is loaded`, async ({
      page,
    }) => {
      await expect(page.getByTestId(`button-hide-${elementType}`)).toBeVisible();
    });

    test(`displays a button for add a ${elementType.toLowerCase()} when the page is loaded`, async ({ page }) => {
      await expect(page.getByTestId(`button-add-${elementType}`)).toBeVisible();
    });

    test(`displays a table of ${elementType.toLowerCase()} elements when the page is loaded`, async ({ page }) => {
      await expect(page.getByTestId(`table-${elementType}`)).toBeVisible();
    });

    test(`displays a button for editing a ${elementType.toLowerCase()} when the page is loaded`, async ({ page }) => {
      await expect(page.getByTestId(`button-edit-${elementType}-0`)).toBeVisible();
    });

    test(`displays a button for deleting a ${elementType.toLowerCase()} when the page is loaded`, async ({ page }) => {
      await expect(page.getByTestId(`button-delete-${elementType}-0`)).toBeVisible();
    });
  });
});
