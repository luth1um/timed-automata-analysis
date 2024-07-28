import { Page } from '@playwright/test';
import { Clock } from '../../src/model/ta/clock';
import { ClockConstraint } from '../../src/model/ta/clockConstraint';
import { UtilHelper } from './utilHelper';

export class ClockUiHelper {
  readonly page: Page;
  readonly utilHelper: UtilHelper;

  constructor(page: Page, utilHelper: UtilHelper) {
    this.page = page;
    this.utilHelper = utilHelper;
  }

  async addClock(name: string): Promise<void> {
    await this.page.getByTestId('button-add-clock').click();
    await this.page.getByTestId('input-clock-name').locator('input').fill(name);
    await this.page.getByTestId('button-add-clock-ok').click();
  }

  async readClocksFromUi(): Promise<Clock[]> {
    const numberOfClocks = await this.utilHelper.readNumberOfElementsWithPartialTestId('table-cell-clock-');
    const clockNames: (string | null)[] = [];
    for (let i = 0; i < numberOfClocks; i++) {
      const clockName = await this.page.getByTestId(`table-cell-clock-${i}`).textContent();
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

  async addClocksOfConstraintsIfNotPresent(ccs: (ClockConstraint | undefined)[]): Promise<void> {
    const clockNames = ccs
      .filter((cc) => !!cc)
      .map((cc) => cc.clauses.map((clause) => clause.lhs.name))
      .flat();
    const uniqueClockNames = [...new Set(clockNames)];
    await this.addClocksIfNotPresent(uniqueClockNames);
  }
}
