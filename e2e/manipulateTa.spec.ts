import { TEST_BASE_URL } from './helper/endToEndTestConstants';
import { test } from './helper/testOptions';

test.describe('While manipulating a TA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_BASE_URL);
  });

  // TODO: website is correct when several removals and adds of all elements are performed
  // TODO: website is rendered correctly when several removals and adds of all elements are performed
});
