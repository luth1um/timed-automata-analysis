import { TaFixture } from '../test/fixture/timedAutomatonFixture';
import { TEST_BASE_URL } from './helper/endToEndTestConstants';
import { test } from './helper/testOptions';
import { expect } from '@playwright/test';

test.describe('For resetting the TA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_BASE_URL);
  });

  test('the initial page should contain an enabled button for resetting', async ({ page }) => {
    await expect(page.getByTestId('button-open-reset')).toBeVisible();
    await expect(page.getByTestId('button-open-reset')).toBeEnabled();
  });

  test('the reset button should reset the TA to its original state', async ({ page, taUiHelper }) => {
    // given
    const initialTa = await taUiHelper.readTaFromUi();
    const otherTa = TaFixture.withTwoLocationsAndTwoSwitches();
    await taUiHelper.setTimedAutomatonTo(otherTa);

    // when
    await page.getByTestId('button-open-reset').click();
    await page.getByTestId('button-confirm-ta-reset').click();

    // then
    const taAfterReset = await taUiHelper.readTaFromUi();
    expect(taAfterReset, 'TA after reset should be the same as the initial TA').toEqual(initialTa);
  });
});
