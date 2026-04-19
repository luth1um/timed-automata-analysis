import { useCallback, useMemo, useState } from 'react';
import { ClockConstraint } from '../model/ta/clockConstraint';

export interface ClausesViewModel {
  state: ClausesState;
  clauses: ClauseViewData[];
  isValidationError: boolean;
  resetClauses: (viewModel: ClausesViewModel) => void;
  setClausesFromClockConstraint: (viewModel: ClausesViewModel, clockConstraint?: ClockConstraint) => void;
  addClause: (viewModel: ClausesViewModel) => void;
  deleteClause: (viewModel: ClausesViewModel, id: number) => void;
  changeClause: (viewModel: ClausesViewModel, id: number, field: keyof ClauseViewData, value: string) => void;
}

export enum ClausesState {
  INIT = 'INIT',
  READY = 'READY',
}

export interface ClauseViewData {
  id: number;
  clockValue: string;
  comparisonValue: string;
  numberInput: string; // string so that input field can be empty
  isClockInvalid: boolean;
  isComparisonInvalid: boolean;
  isNumberInvalid: boolean;
}

interface ClausesViewModelData {
  state: ClausesState;
  clauses: ClauseViewData[];
}

export function useClausesViewModel(): ClausesViewModel {
  const [emptyClauseId] = useState(Date.now);

  const emptyClause: ClauseViewData = useMemo(
    () => ({
      id: emptyClauseId,
      clockValue: '',
      comparisonValue: '',
      numberInput: '0',
      isClockInvalid: true,
      isComparisonInvalid: true,
      isNumberInvalid: false,
    }),
    [emptyClauseId]
  );

  const [data, setData] = useState<ClausesViewModelData>({
    state: ClausesState.READY,
    clauses: [emptyClause],
  });

  const isValidationError = useMemo(
    () =>
      data.clauses
        .map((c) => c.isClockInvalid || c.isComparisonInvalid || c.isNumberInvalid)
        .reduce((result, current) => result || current, false),
    [data.clauses]
  );

  const resetClauses = useCallback(
    (_viewModel: ClausesViewModel) => {
      setData((prev) => ({ ...prev, clauses: [emptyClause] }));
    },
    [emptyClause]
  );

  const setClausesFromClockConstraint = useCallback(
    (_viewModel: ClausesViewModel, clockConstraint?: ClockConstraint) => {
      if (!clockConstraint) {
        setData((prev) => ({ ...prev, clauses: [emptyClause] }));
        return;
      }
      // don't just call Date.now() for every clause because generation is too fast
      let idCounter: number = Date.now();
      const clauseData = clockConstraint.clauses.map<ClauseViewData>((c) => {
        const clauseData: ClauseViewData = {
          id: idCounter++,
          clockValue: c.lhs.name,
          comparisonValue: c.op,
          numberInput: '' + c.rhs,
          isClockInvalid: false,
          isComparisonInvalid: false,
          isNumberInvalid: false,
        };
        return clauseData;
      });
      setData((prev) => ({ ...prev, clauses: clauseData }));
    },
    [emptyClause]
  );

  const addClause = useCallback(
    (_viewModel: ClausesViewModel) => {
      setData((prev) => ({ ...prev, clauses: [...prev.clauses, { ...emptyClause, id: Date.now() }] }));
    },
    [emptyClause]
  );

  const deleteClause = useCallback((_viewModel: ClausesViewModel, id: number) => {
    setData((prev) => {
      if (prev.clauses.length <= 1) {
        return prev;
      }
      return { ...prev, clauses: prev.clauses.filter((row) => row.id !== id) };
    });
  }, []);

  const changeClause = useCallback(
    (_viewModel: ClausesViewModel, id: number, field: keyof ClauseViewData, value: string) => {
      setData((prev) => {
        const updatedClauses = prev.clauses.map((row) => {
          if (row.id === id) {
            let updatedRow = { ...row, [field]: value };
            // Update validation flags based on the new value
            if (field === 'clockValue') {
              updatedRow.isClockInvalid = !value;
            }
            if (field === 'comparisonValue') {
              updatedRow.isComparisonInvalid = !value;
            }
            if (field === 'numberInput') {
              updatedRow.isNumberInvalid = !value;
            }
            // Update for number value if it changed
            if (field === 'numberInput' && value) {
              updatedRow = { ...updatedRow, [field]: '' + Math.max(0, parseInt(value, 10)) };
            }
            return updatedRow;
          }
          return row;
        });
        return { ...prev, clauses: updatedClauses };
      });
    },
    []
  );

  // ===================================================================================================================

  return useMemo(
    () => ({
      state: data.state,
      clauses: data.clauses,
      isValidationError,
      resetClauses,
      setClausesFromClockConstraint,
      addClause,
      deleteClause,
      changeClause,
    }),
    [data, isValidationError, resetClauses, setClausesFromClockConstraint, addClause, deleteClause, changeClause]
  );
}
