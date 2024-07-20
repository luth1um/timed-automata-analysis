import { ClockUiHelper } from './clockUiHelper';
import { test as base } from '@playwright/test';

export type TestOptions = {
  clockUiHelper: ClockUiHelper;
};

export const test = base.extend<TestOptions>({
  clockUiHelper: async ({ page }, use) => {
    await use(new ClockUiHelper(page));
  },
});
