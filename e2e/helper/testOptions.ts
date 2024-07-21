import { ClockUiHelper } from './clockUiHelper';
import { test as base } from '@playwright/test';
import { LocationUiHelper } from './locationUiHelper';
import { ClauseUiHelper } from './clauseUiHelper';
import { ClockConstraintHelper } from './clockConstraintHelper';

export type TestOptions = {
  clockUiHelper: ClockUiHelper;
  locationUiHelper: LocationUiHelper;
};

export const test = base.extend<TestOptions>({
  clockUiHelper: async ({ page }, use) => {
    await use(new ClockUiHelper(page));
  },
  locationUiHelper: async ({ page }, use) => {
    await use(
      new LocationUiHelper(page, new ClockUiHelper(page), new ClauseUiHelper(page), new ClockConstraintHelper(page))
    );
  },
});
