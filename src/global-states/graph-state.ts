import { atom } from 'jotai';
import { useAtomValue, useSetAtom } from 'jotai/index';
import { useCallback } from 'react';

import type { PopulationCompositionResultData } from '@/repositories/type';

export type GraphData = {
  color: string;
  detail: PopulationCompositionResultData[];
  label: string;
  prefCode: number;
};

export type UseGraphMutators = {
  setGraphData: (data: GraphData[]) => void;
};

// atom
const graphDataAtom = atom<GraphData[]>([]);
graphDataAtom.debugLabel = 'graphDataAtom';

export const useGraphMutators = (): UseGraphMutators => {
  const setState = useSetAtom(graphDataAtom);

  /**
   * グラフのデータを更新
   */
  const setGraphData = useCallback(
    (data: GraphData[]) => {
      setState(data.sort((a, b) => a.prefCode - b.prefCode));
    },
    [setState]
  );

  return { setGraphData };
};

// value
export const useGraphsDataState = (): GraphData[] => {
  return useAtomValue(graphDataAtom);
};
