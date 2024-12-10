import { atom } from 'jotai';
import { useAtomValue, useSetAtom } from 'jotai/index';
import { useCallback } from 'react';

import type { PrefecturesData } from '@/app/_components/graph/type';

export type UseGraphMutators = {
  setGraphData: (data: PrefecturesData[]) => void;
};

// atom
const graphDataAtom = atom<PrefecturesData[]>([]);
graphDataAtom.debugLabel = 'graphDataAtom';

export const useGraphMutators = (): UseGraphMutators => {
  const setState = useSetAtom(graphDataAtom);

  /**
   * グラフのデータを更新
   */
  const setGraphData = useCallback(
    (data: PrefecturesData[]) => {
      setState(data.sort((a, b) => a.prefCode - b.prefCode));
    },
    [setState]
  );

  return { setGraphData };
};

// value
export const useGraphsDataState = (): PrefecturesData[] => {
  return useAtomValue(graphDataAtom);
};
