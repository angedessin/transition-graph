import { atom } from 'jotai';
import { useAtomValue, useSetAtom } from 'jotai/index';
import { useCallback } from 'react';

export type UsePrefecturesMutators = {
  setPrefecturesAtomIds: (ids: string[]) => void;
};

// atom
const prefecturesAtomIds = atom<string[]>([]);
prefecturesAtomIds.debugLabel = 'prefecturesAtomIds';

// mutators
export const usePrefecturesMutators = (): UsePrefecturesMutators => {
  const setStateIds = useSetAtom(prefecturesAtomIds);

  /**
   * 選択された都道府県のIDを更新
   */
  const setPrefecturesAtomIds = useCallback(
    (ids: string[]) => {
      setStateIds(ids);
    },
    [setStateIds]
  );

  return { setPrefecturesAtomIds };
};

// value
export const usePrefecturesIdsState = (): string[] => {
  return useAtomValue(prefecturesAtomIds);
};
