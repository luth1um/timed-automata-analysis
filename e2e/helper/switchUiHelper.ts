import { Page } from '@playwright/test';
import { Switch } from '../../src/model/ta/switch';
import { ClockUiHelper } from './clockUiHelper';
import { ClauseUiHelper } from './clauseUiHelper';
import { LocationUiHelper } from './locationUiHelper';
import { ClockConstraint } from '../../src/model/ta/clockConstraint';
import { Clock } from '../../src/model/ta/clock';
import { ClockConstraintHelper } from './clockConstraintHelper';
import { UtilHelper } from './utilHelper';

export class SwitchUiHelper {
  readonly page: Page;
  readonly utilHelper: UtilHelper;
  readonly clockUiHelper: ClockUiHelper;
  readonly clausesUiHelper: ClauseUiHelper;
  readonly locationUiHelper: LocationUiHelper;
  readonly clockConstraintHelper: ClockConstraintHelper;

  constructor(
    page: Page,
    utilHelper: UtilHelper,
    clockUiHelper: ClockUiHelper,
    clausesUiHelper: ClauseUiHelper,
    locationUiHelper: LocationUiHelper,
    clockConstraintHelper: ClockConstraintHelper
  ) {
    this.page = page;
    this.utilHelper = utilHelper;
    this.clockUiHelper = clockUiHelper;
    this.clausesUiHelper = clausesUiHelper;
    this.locationUiHelper = locationUiHelper;
    this.clockConstraintHelper = clockConstraintHelper;
  }

  async addSwitch(sw: Switch): Promise<void> {
    // add needed clocks and locations before opening switch dialog
    await this.clockUiHelper.addClocksOfConstraintsIfNotPresent([sw.guard, sw.source.invariant, sw.target.invariant]);
    if (sw.reset.length > 0) {
      await this.clockUiHelper.addClocksIfNotPresent(sw.reset.map((c) => c.name));
    }
    await this.locationUiHelper.addLocationsIfNotPresent([sw.source, sw.target]);

    await this.page.getByTestId('button-add-switch').click();
    await this.page.getByTestId('input-switch-action').locator('input').fill(sw.actionLabel);

    await this.page.getByTestId('select-switch-source').click();
    await this.page.getByTestId('menu-item-loc-' + sw.source.name).click();

    await this.page.getByTestId('select-switch-target').click();
    await this.page.getByTestId('menu-item-loc-' + sw.target.name).click();

    if (sw.guard) {
      await this.page.getByTestId('checkbox-switch-hasGuard').check();
      await this.clausesUiHelper.setClausesTo(sw.guard);
    } else {
      await this.page.getByTestId('checkbox-switch-hasGuard').uncheck();
    }

    const resetClockNames = sw.reset.map((c) => c.name);
    for (const clockName of resetClockNames) {
      if (resetClockNames.includes(clockName)) {
        await this.page.getByTestId('checkbox-switch-reset-' + clockName).check();
      } else {
        await this.page.getByTestId('checkbox-switch-reset-' + clockName).uncheck();
      }
    }

    await this.page.getByTestId('button-add-switch-ok').click();
  }

  async readSwitchesFromUi(): Promise<Switch[]> {
    const locations = await this.locationUiHelper.readLocationsFromUi();
    const numberOfSwitches = await this.utilHelper.readNumberOfElementsWithPartialTestId('table-cell-switch-');
    const switches: Switch[] = [];

    for (let i = 0; i < numberOfSwitches; i++) {
      const switchText = await this.page.getByTestId(`table-cell-switch-${i}`).textContent();
      if (switchText === null) {
        continue;
      }

      const textParts = switchText.split(', ');
      const sourceLoc = locations.find((loc) => loc.name === textParts[0])!;
      const targetLoc = locations.find((loc) => loc.name === textParts[textParts.length - 1])!;
      const action = textParts[1];

      const remainingElements = textParts.slice(2, textParts.length - 1);
      let guard: ClockConstraint | undefined = undefined;
      let reset: Clock[] = [];

      if (remainingElements.length > 0 && !remainingElements[0].startsWith('{')) {
        guard = await this.clockConstraintHelper.parseClockConstraintFromUi(remainingElements[0]);
      }
      if (remainingElements.length > 0 && remainingElements[remainingElements.length - 1].startsWith('{')) {
        const resetText = remainingElements[remainingElements.length - 1];
        reset = resetText
          .slice(1, resetText.length - 1)
          .split(',')
          .map<Clock>((c) => ({ name: c }));
      }

      switches.push({ source: sourceLoc, target: targetLoc, actionLabel: action, guard: guard, reset: reset });
    }

    return switches;
  }

  async readNumberOfSwitchesFromUi(): Promise<number> {
    return (await this.readSwitchesFromUi()).length;
  }
}