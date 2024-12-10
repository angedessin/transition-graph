import { atom } from 'jotai';
import { useAtomValue, useSetAtom } from 'jotai/index';
import { useCallback } from 'react';

export type PrefectureAtomId = {
  id: string;
  label: string;
};
export type UsePrefecturesMutators = {
  setPrefecturesAtomIds: (ids: PrefectureAtomId[]) => void;
};

// atom
const prefecturesAtomIds = atom<PrefectureAtomId[]>([]);
prefecturesAtomIds.debugLabel = 'prefecturesAtomIds';

// mutators
export const usePrefecturesMutators = (): UsePrefecturesMutators => {
  const setStateIds = useSetAtom(prefecturesAtomIds);

  /**
   * 選択された都道府県のIDを更新
   */
  const setPrefecturesAtomIds = useCallback(
    (ids: PrefectureAtomId[]) => {
      setStateIds(ids);
    },
    [setStateIds]
  );

  return { setPrefecturesAtomIds };
};

// value
export const usePrefecturesIdsState = (): PrefectureAtomId[] => {
  return useAtomValue(prefecturesAtomIds);
};
