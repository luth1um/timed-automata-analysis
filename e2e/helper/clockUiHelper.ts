import { Page } from '@playwright/test';
import { Clock } from '../../src/model/ta/clock';
import { ClockConstraint } from '../../src/model/ta/clockConstraint';

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

  async addClocksIfNotPresent(clockNames: string[]): Promise<void> {
    const presentClockNames = (await this.readClocksFromUi()).map((clock) => clock.name);
    const clocksToAdd = clockNames.filter((clockName) => !presentClockNames.includes(clockName));
    for (const clockName of clocksToAdd) {
      await this.addClock(clockName);
    }
  }

  async addClocksOfConstraintIfNotPresent(cc: ClockConstraint): Promise<void> {
    const clockNames = cc.clauses.map((clause) => clause.lhs.name);
    const uniqueClockNames = [...new Set(clockNames)];
    await this.addClocksIfNotPresent(uniqueClockNames);
  }
}
