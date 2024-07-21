import { TEST_BASE_URL } from './helper/endToEndTestConstants';
import { test } from './helper/testOptions';
import { expect } from '@playwright/test';
import { Clock } from '../src/model/ta/clock';
import { clockFixtureWithClockName } from '../test/fixture/clockFixture';

test.describe('While manipulating a TA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_BASE_URL);
  });

  test('the TA contains the correct set of clocks when clocks are added', async ({ clockUiHelper }) => {
    // given
    const clock: Clock = clockFixtureWithClockName('myTestClock');
    const initClockNumber = await clockUiHelper.readNumberOfClocksFromUi();

    // when
    await clockUiHelper.addClock(clock.name);

    // then
    const clocks = await clockUiHelper.readClocksFromUi();
    expect(clocks.length, 'number of clocks should have increased by 1').toBe(initClockNumber + 1);
    expect(clocks, 'freshly added clock should be in the list').toContainEqual(clock);
  });

  // TODO: add location works
  // TODO: add guard works
  // TODO: adding all types of elements works
  // TODO: removing all types of elements works
  // TODO: removing and then adding all types of elements works
  // TODO: website is rendered correctly when several removals and adds of all elements are performed
});
