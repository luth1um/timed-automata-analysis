import {
  TimedAutomaton as AnalyzerTimedAutomaton,
  Clock as AnalyzerClock,
  Clause as AnalyzerClause,
  ClockComparator as AnalyzerClockComparator,
  Location as AnalyzerLocation,
  ClockConstraint as AnalyzerClockConstraint,
  Switch as AnalyzerSwitch,
} from 'timed-automata-analyzer';
import { TimedAutomaton as InternalTimedAutomaton } from '../model/ta/timedAutomaton';
import { useCallback } from 'react';
import { Clock as InternalClock } from '../model/ta/clock';
import { Clause as InternalClause } from '../model/ta/clause';
import { ClockComparator as InternalClockComparator } from '../model/ta/clockComparator';
import { ClockConstraint as InternalClockConstraint } from '../model/ta/clockConstraint';
import { Location as InternalLocation } from '../model/ta/location';
import { Switch as InternalSwitch } from '../model/ta/switch';

interface AnalyzerMappingUtils {
  mapTaToAnalyzerModel(ta: InternalTimedAutomaton): AnalyzerTimedAutomaton;
}

export function useAnalyzerMappingUtils(): AnalyzerMappingUtils {
  const mapClock = useCallback((clock: InternalClock) => new AnalyzerClock(clock.name), []);

  const mapClocks = useCallback((clocks: InternalClock[]) => clocks.map(mapClock), [mapClock]);

  const mapClause = useCallback(
    (clause: InternalClause) => {
      let analyzerOp: AnalyzerClockComparator;
      switch (clause.op) {
        case InternalClockComparator.LESSER:
          analyzerOp = AnalyzerClockComparator.LESSER;
          break;
        case InternalClockComparator.LEQ:
          analyzerOp = AnalyzerClockComparator.LEQ;
          break;
        case InternalClockComparator.GEQ:
          analyzerOp = AnalyzerClockComparator.GEQ;
          break;
        case InternalClockComparator.GREATER:
          analyzerOp = AnalyzerClockComparator.GREATER;
          break;
        case InternalClockComparator.EQ:
          throw Error('Comparator EQ not supported by analyzer');
      }
      return new AnalyzerClause(mapClock(clause.lhs), analyzerOp, clause.rhs);
    },
    [mapClock]
  );

  const mapClockConstraint = useCallback(
    (cc?: InternalClockConstraint) => {
      if (!cc) {
        return undefined;
      }

      const analyzerClauses: AnalyzerClause[] = [];
      for (let i = 0; i < cc.clauses.length; i++) {
        const clause = cc.clauses[i];
        if (clause.op == InternalClockComparator.EQ) {
          // analyzer does not support EQ directly
          const clauseLeq = { ...structuredClone(clause), op: InternalClockComparator.LEQ };
          const clauseGeq = { ...structuredClone(clause), op: InternalClockComparator.GEQ };
          analyzerClauses.push(mapClause(clauseLeq));
          analyzerClauses.push(mapClause(clauseGeq));
        } else {
          analyzerClauses.push(mapClause(clause));
        }
      }

      return new AnalyzerClockConstraint(analyzerClauses);
    },
    [mapClause]
  );

  const mapLocation = useCallback(
    (loc: InternalLocation) => new AnalyzerLocation(loc.name, !!loc.isInitial, mapClockConstraint(loc.invariant)),
    [mapClockConstraint]
  );

  const mapLocations = useCallback((locs: InternalLocation[]) => locs.map(mapLocation), [mapLocation]);

  const mapSwitch = useCallback(
    (sw: InternalSwitch) =>
      new AnalyzerSwitch(
        mapLocation(sw.source),
        mapClockConstraint(sw.guard),
        sw.actionLabel,
        mapClocks(sw.reset),
        mapLocation(sw.target)
      ),
    [mapLocation, mapClockConstraint, mapClocks]
  );

  const mapSwitches = useCallback((switches: InternalSwitch[]) => switches.map(mapSwitch), [mapSwitch]);

  const mapTaToAnalyzerModel = useCallback(
    (ta: InternalTimedAutomaton) =>
      new AnalyzerTimedAutomaton(mapLocations(ta.locations), mapClocks(ta.clocks), mapSwitches(ta.switches)),
    [mapClocks, mapLocations, mapSwitches]
  );

  return { mapTaToAnalyzerModel };
}
