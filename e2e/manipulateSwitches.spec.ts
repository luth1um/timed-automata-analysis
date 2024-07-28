import { TEST_BASE_URL } from './helper/endToEndTestConstants';
import { test } from './helper/testOptions';
import { expect } from '@playwright/test';
import { switchFixtureASwitch } from '../test/fixture/switchFixture';

test.describe('While manipulating a TA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_BASE_URL);
  });

  test('the TA contains the correct set of switches when a switch is added', async ({ switchUiHelper }) => {
    // given
    const sw = switchFixtureASwitch();
    const initSwitchNumber = await switchUiHelper.readNumberOfSwitchesFromUi();

    // when
    await switchUiHelper.addSwitch(sw);

    // then
    const switches = await switchUiHelper.readSwitchesFromUi();
    expect(switches.length, 'number of switches should have increased by 1').toBe(initSwitchNumber + 1);
    expect(switches, 'freshly added switch should actually be in the list').toContainEqual(sw);
  });

  // TODO: editing switch works
  // TODO: deleting switch works
});
