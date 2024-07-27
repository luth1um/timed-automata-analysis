import { Page } from '@playwright/test';
import { Location } from '../../src/model/ta/location';
import { ClockUiHelper } from './clockUiHelper';
import { ClauseUiHelper } from './clauseUiHelper';
import { ClockConstraintHelper } from './clockConstraintHelper';

export class LocationUiHelper {
  readonly page: Page;
  readonly clockUiHelper: ClockUiHelper;
  readonly clausesUiHelper: ClauseUiHelper;
  readonly clockConstraintHelper: ClockConstraintHelper;

  constructor(
    page: Page,
    clockUiHelper: ClockUiHelper,
    clausesUiHelper: ClauseUiHelper,
    clockConstraintHelper: ClockConstraintHelper
  ) {
    this.page = page;
    this.clockUiHelper = clockUiHelper;
    this.clausesUiHelper = clausesUiHelper;
    this.clockConstraintHelper = clockConstraintHelper;
  }

  async addLocation(location: Location): Promise<void> {
    // add needed clocks before opening location dialog
    if (location.invariant) {
      await this.clockUiHelper.addClocksOfConstraintIfNotPresent(location.invariant);
    }

    await this.page.getByTestId('button-add-location').click();
    await this.page.getByTestId('input-location-name').locator('input').fill(location.name);

    if (location.isInitial) {
      await this.page.getByTestId('checkbox-location-isInitial').check();
    } else {
      await this.page.getByTestId('checkbox-location-isInitial').uncheck();
    }

    if (location.invariant) {
      await this.page.getByTestId('checkbox-location-hasInvariant').check();
      await this.clausesUiHelper.setClausesTo(location.invariant);
    } else {
      await this.page.getByTestId('checkbox-location-hasInvariant').uncheck();
    }

    await this.page.getByTestId('button-add-location-ok').click();
  }

  async readLocationsFromUi(): Promise<Location[]> {
    const numberOfLocs = (await this.page.$$('[data-testid^="table-cell-location-"]')).length;
    const locs: Location[] = [];
    for (let i = 0; i < numberOfLocs; i++) {
      const locText = await this.page.getByTestId(`table-cell-location-${i}`).textContent();

      if (locText !== null) {
        const textParts = locText.split(', ');
        const locName = textParts[0];
        const invariant =
          textParts.length > 1 ? await this.clockConstraintHelper.parseClockConstraintFromUi(textParts[1]) : undefined;
        const isInitial = (await this.page.$$(`[data-testid^="icon-is-initial-row-${i}"]`)).length === 1;
        locs.push({ name: locName, isInitial: isInitial, invariant: invariant, xCoordinate: 0, yCoordinate: 0 });
      }
    }

    return locs;
  }

  async readNumberOfLocationsFromUi(): Promise<number> {
    return (await this.readLocationsFromUi()).length;
  }
}
