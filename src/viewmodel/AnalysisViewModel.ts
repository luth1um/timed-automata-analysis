import { useCallback, useEffect, useState } from 'react';
import { Location } from '../model/ta/location';
import { TimedAutomaton } from '../model/ta/timedAutomaton';
import { Clock } from '../model/ta/clock';
import { ClockConstraint } from '../model/ta/clockConstraint';
import { Switch } from '../model/ta/switch';
import { useMathUtils } from '../utils/mathUtils';
import { useSwitchUtils } from '../utils/switchUtils';
import { useClockConstraintUtils } from '../utils/clockConstraintUtils';
import { useClockUtils } from '../utils/clockUtils';
import { getInitAutomaton } from '../utils/initAutomaton';

export interface AnalysisViewModel {
  state: AnalysisState;
  ta: TimedAutomaton;
  addLocation: (
    viewModel: AnalysisViewModel,
    locationName: string,
    isInitial?: boolean,
    invariant?: ClockConstraint
  ) => void;
  editLocation: (
    viewModel: AnalysisViewModel,
    locationName: string,
    prevLocationName: string,
    isInitial?: boolean,
    invariant?: ClockConstraint
  ) => void;
  removeLocation: (viewModel: AnalysisViewModel, locationName: string) => void;
  setInitialLocation: (viewModel: AnalysisViewModel, locationName: string) => void;
  updateLocationCoordinates: (
    viewModel: AnalysisViewModel,
    locationName: string,
    xCoordinate: number,
    yCoordinate: number
  ) => void;
  addSwitch: (
    viewModel: AnalysisViewModel,
    sourceName: string,
    actionLabel: string,
    resetNames: string[],
    targetName: string,
    guard?: ClockConstraint
  ) => void;
  editSwitch: (
    viewModel: AnalysisViewModel,
    prevSwitch: Switch,
    sourceName: string,
    action: string,
    resetNames: string[],
    targetName: string,
    guard?: ClockConstraint
  ) => void;
  removeSwitch: (viewModel: AnalysisViewModel, switchToRemove: Switch) => void;
  addClock: (viewModel: AnalysisViewModel, clockName: string) => void;
  editClock: (viewModel: AnalysisViewModel, clockName: string, prevClockName: string) => void;
  removeClock: (viewModel: AnalysisViewModel, clock: Clock) => void;
  setStateAnalyzing: (viewModel: AnalysisViewModel) => void;
  setStateReady: (viewModel: AnalysisViewModel) => void;
  setStateReset: (viewModel: AnalysisViewModel) => void;
}

export enum AnalysisState {
  INIT = 'INIT',
  ANALYZING = 'ANALYZING',
  READY = 'READY',
  RESET = 'RESET',
}

export function useAnalysisViewModel(): AnalysisViewModel {
  const { avgRounded } = useMathUtils();
  const { switchesEqual } = useSwitchUtils();
  const { removeAllClausesUsingClock } = useClockConstraintUtils();
  const { removeClockFromAllResets } = useSwitchUtils();
  const { renameClock } = useClockUtils();

  // ===== manipulate locations ================================================

  const setInitialLocation = useCallback((viewModel: AnalysisViewModel, locationName: string) => {
    const ta = viewModel.ta;
    const updatedLocs = [...ta.locations];
    updatedLocs.forEach((l) => {
      if (l.name === locationName) {
        l.isInitial = true;
      } else {
        l.isInitial = false;
      }
    });
    const updatedTa = { ...ta, locations: updatedLocs };
    setViewModel({ ...viewModel, ta: updatedTa });
  }, []);

  const addLocation = useCallback(
    (viewModel: AnalysisViewModel, locationName: string, isInitial?: boolean, invariant?: ClockConstraint) => {
      const ta = viewModel.ta;
      const locations = ta.locations;
      let newLoc: Location;
      if (locations) {
        const xCoordAvg = avgRounded(locations.map((l) => l.xCoordinate));
        const yCoordAvg = avgRounded(locations.map((l) => l.yCoordinate));
        newLoc = {
          name: locationName,
          isInitial: isInitial,
          invariant: invariant,
          xCoordinate: xCoordAvg,
          yCoordinate: yCoordAvg,
        };
      } else {
        newLoc = { name: locationName, isInitial: true, invariant: invariant, xCoordinate: 0, yCoordinate: 0 };
      }
      const updatedLocs = [...locations, newLoc];
      if (isInitial) {
        updatedLocs.forEach((loc) => {
          if (loc.name !== locationName) {
            loc.isInitial = false;
          }
        });
      }
      const updatedTa = { ...ta, locations: updatedLocs };
      setViewModel({ ...viewModel, ta: updatedTa });
    },
    [avgRounded]
  );

  const editLocation = useCallback(
    (
      viewModel: AnalysisViewModel,
      locationName: string,
      prevLocationName: string,
      isInitial?: boolean,
      invariant?: ClockConstraint
    ) => {
      const ta = viewModel.ta;
      const locations = [...ta.locations];
      const loc = locations.filter((l) => l.name === prevLocationName)[0];
      loc.name = locationName;
      loc.invariant = invariant;
      const updatedTa = { ...ta, locations: locations };
      const updatedViewModel = { ...viewModel, ta: updatedTa };
      setViewModel(updatedViewModel);

      // make sure to set initial location correctly
      const isOtherLocInitial =
        locations.filter((l) => l.name !== locationName).filter((l) => !!l.isInitial).length === 1;
      if (isInitial) {
        setInitialLocation(updatedViewModel, locationName);
      } else if (!isOtherLocInitial) {
        // if not exactly one initial location: set first in array to initial
        // (when editing, there is at least one location)
        setInitialLocation(updatedViewModel, locations[0].name);
      }
    },
    [setInitialLocation]
  );

  const removeLocation = useCallback((viewModel: AnalysisViewModel, locationName: string) => {
    if (viewModel.ta.locations.length <= 1) {
      return;
    }
    const ta = viewModel.ta;
    const wasInitial = ta.locations.filter((l) => l.name === locationName)[0].isInitial;
    const updatedLocs = ta.locations.filter((l) => l.name !== locationName);
    if (wasInitial && updatedLocs) {
      updatedLocs[0].isInitial = true;
    }
    const updatedSwitches = ta.switches.filter((s) => s.source.name !== locationName && s.target.name !== locationName);
    const updatedTa = { ...ta, locations: updatedLocs, switches: updatedSwitches };
    setViewModel({ ...viewModel, ta: updatedTa });
  }, []);

  const updateLocationCoordinates = useCallback(
    (viewModel: AnalysisViewModel, locationName: string, xCoordinate: number, yCoordinate: number) => {
      const ta = viewModel.ta;
      const updatedLocs = [...ta.locations];
      const loc = updatedLocs.filter((l) => l.name === locationName)[0];
      loc.xCoordinate = xCoordinate;
      loc.yCoordinate = yCoordinate;
      const updatedTa = { ...ta, locations: updatedLocs };
      setViewModel({ ...viewModel, ta: updatedTa });
    },
    []
  );

  // ===== manipulate switches =================================================

  const addSwitch = useCallback(
    (
      viewModel: AnalysisViewModel,
      sourceName: string,
      actionLabel: string,
      resetNames: string[],
      targetName: string,
      guard?: ClockConstraint
    ) => {
      const ta = viewModel.ta;
      const newSwitch: Switch = {
        source: ta.locations.filter((l) => l.name === sourceName)[0],
        target: ta.locations.filter((l) => l.name === targetName)[0],
        actionLabel: actionLabel,
        reset: ta.clocks.filter((c) => resetNames.includes(c.name)),
        guard: guard,
      };
      const updatedSwitches = [...ta.switches, newSwitch];
      const updatedTa = { ...ta, switches: updatedSwitches };
      setViewModel({ ...viewModel, ta: updatedTa });
    },
    []
  );

  const editSwitch = useCallback(
    (
      viewModel: AnalysisViewModel,
      prevSwitch: Switch,
      sourceName: string,
      action: string,
      resetNames: string[],
      targetName: string,
      guard?: ClockConstraint
    ) => {
      const ta = viewModel.ta;
      const switches = [...ta.switches];
      const switchToEdit = switches.filter((sw) => switchesEqual(sw, prevSwitch))[0];
      switchToEdit.source = ta.locations.filter((l) => l.name === sourceName)[0];
      switchToEdit.target = ta.locations.filter((l) => l.name === targetName)[0];
      switchToEdit.actionLabel = action;
      switchToEdit.reset = ta.clocks.filter((c) => resetNames.includes(c.name));
      switchToEdit.guard = guard;
      const updatedTa = { ...ta, switches: switches };
      const updatedViewModel = { ...viewModel, ta: updatedTa };
      setViewModel(updatedViewModel);
    },
    [switchesEqual]
  );

  const removeSwitch = useCallback(
    (viewModel: AnalysisViewModel, switchToRemove: Switch) => {
      const ta = viewModel.ta;
      const updatedSwitches: Switch[] = [];

      for (const sw of ta.switches) {
        if (!switchesEqual(sw, switchToRemove)) {
          updatedSwitches.push(sw);
        }
      }

      const updatedTa = { ...ta, switches: updatedSwitches };
      setViewModel({ ...viewModel, ta: updatedTa });
    },
    [switchesEqual]
  );

  // ===== manipulate clocks ===================================================

  const addClock = useCallback((viewModel: AnalysisViewModel, clockName: string) => {
    const ta = viewModel.ta;
    const updatedClocks = [...ta.clocks, { name: clockName }];
    const updatedTa = { ...ta, clocks: updatedClocks };
    setViewModel({ ...viewModel, ta: updatedTa });
  }, []);

  const editClock = useCallback(
    (viewModel: AnalysisViewModel, clockName: string, prevClockName: string) => {
      const updatedTa = { ...viewModel.ta };
      renameClock(prevClockName, clockName, updatedTa);
      setViewModel({ ...viewModel, ta: updatedTa });
      setViewModel({ ...viewModel, ta: updatedTa });
    },
    [renameClock]
  );

  const removeClock = useCallback(
    (viewModel: AnalysisViewModel, clock: Clock) => {
      let updatedTa = { ...viewModel.ta };
      removeAllClausesUsingClock(clock, updatedTa);
      removeClockFromAllResets(clock, updatedTa);
      const updatedClocks = updatedTa.clocks.filter((c) => c.name !== clock.name);
      updatedTa = { ...updatedTa, clocks: updatedClocks };
      setViewModel({ ...viewModel, ta: updatedTa });
    },
    [removeAllClausesUsingClock, removeClockFromAllResets]
  );

  const setStateAnalyzing = useCallback((viewModel: AnalysisViewModel) => {
    setViewModel({ ...viewModel, state: AnalysisState.ANALYZING });
  }, []);

  const setStateReady = useCallback((viewModel: AnalysisViewModel) => {
    setViewModel({ ...viewModel, state: AnalysisState.READY });
  }, []);

  const setStateReset = useCallback((viewModel: AnalysisViewModel) => {
    setViewModel({ ...viewModel, state: AnalysisState.RESET });
  }, []);

  // ===== manipulate state ====================================================

  const [viewModel, setViewModel] = useState<AnalysisViewModel>({
    state: AnalysisState.INIT,
    ta: getInitAutomaton(),
    addLocation,
    editLocation,
    removeLocation,
    setInitialLocation,
    updateLocationCoordinates,
    addSwitch,
    editSwitch,
    removeSwitch,
    addClock,
    editClock,
    removeClock,
    setStateAnalyzing,
    setStateReady,
    setStateReset,
  });

  // ===================================================================================================================

  useEffect(() => {
    if (viewModel.state === AnalysisState.INIT) {
      // nothing to initialize at the moment, just set state to READY
      setViewModel({ ...viewModel, state: AnalysisState.READY });
    }
  }, [viewModel]);

  useEffect(() => {
    if (viewModel.state === AnalysisState.ANALYZING) {
      // nothing to do here at the moment
    }
  }, [viewModel]);

  useEffect(() => {
    if (viewModel.state === AnalysisState.RESET) {
      setViewModel({ ...viewModel, ta: getInitAutomaton(), state: AnalysisState.READY });
    }
  }, [viewModel]);

  // ===================================================================================================================

  return viewModel;
}
