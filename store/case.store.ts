import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OpenCaseResponse, CaseItemDTO } from '@/types/cases.types';
import { CaseCategory } from '@/app/components/Сase/case-item-name.map';
import { CasePhase } from '@/types/cases.types';

type CaseUIState = {
  phase: CasePhase;
  result?: OpenCaseResponse;

  spinItems?: CaseItemDTO[];
  loading: boolean;

  openings: number;
  selectedCaseName?: string;
  selectedCaseType?: CaseCategory;
  withoutAnimation: boolean;

  setSelectedCaseName(name: string): void;
  setWithoutAnimation(v: boolean): void;
  setLoading(v: boolean): void;

  startSpin(items: CaseItemDTO[]): void;
  setResult(result: OpenCaseResponse): void;
  finishSpin(): void;
  reset(): void;
};

export const useCaseStore = create<CaseUIState>()(
  persist(
    (set) => ({
      phase: CasePhase.IDLE,
      result: undefined,
      spinItems: undefined,
      loading: false,

      openings: 1,
      selectedCaseName: undefined,
      selectedCaseType: undefined,
      withoutAnimation: false,

      setSelectedCaseName: (name) => set({ selectedCaseName: name }),
      setWithoutAnimation: (v) => set({ withoutAnimation: v }),
      setLoading: (v) => set({ loading: v }),

      startSpin: (items) =>
        set({
          phase: CasePhase.SPINNING,
          spinItems: items,
          result: undefined,
        }),

      setResult: (result) => set({ result }),

      finishSpin: () =>
        set({
          phase: CasePhase.RESULT,
        }),

      reset: () =>
        set({
          phase: CasePhase.IDLE,
          result: undefined,
          spinItems: undefined,
          withoutAnimation: false,
        }),
    }),
    {
      name: 'case-ui-store',
      partialize: (state) => ({
        phase: state.phase,
        result: state.result,
        spinItems: state.spinItems,
        selectedCaseName: state.selectedCaseName,
      }),
    },
  ),
);
