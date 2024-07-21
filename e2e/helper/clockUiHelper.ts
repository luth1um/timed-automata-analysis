import { Page } from '@playwright/test';
import { Clock } from '../../src/model/ta/clock';

export class ClockUiHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addClock(name: string): Promise<void> {
    await this.page.getByTestId('button-add-Clock').click();
    await this.page.getByTestId('input-clock-name').locator('input').fill(name);
    await this.page.getByTestId('button-add-clock-ok').click();
  }

  async readClocksFromUi(): Promise<Clock[]> {
    const numberOfClocks = (await this.page.$$('[data-testid^="table-cell-Clock-"]')).length;
    const clockNames: (string | null)[] = [];
    for (let i = 0; i < numberOfClocks; i++) {
      const clockName = await this.page.getByTestId(`table-cell-Clock-${i}`).textContent();
      clockNames.push(clockName);
    }
    return clockNames.filter((clockName) => clockName !== null).map<Clock>((clockName) => ({ name: clockName }));
  }

  async readNumberOfClocksFromUi(): Promise<number> {
    return (await this.readClocksFromUi()).length;
  }
}
