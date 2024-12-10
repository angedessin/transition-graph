import { atom } from 'jotai';
import { useAtomValue, useSetAtom } from 'jotai/index';
import { useCallback } from 'react';

export type PrefecturesState = {
  checkedIds: string[];
};

export type UsePrefecturesMutators = {
  setPrefecturesAtomIds: (ids: string[]) => void;
};

// atom
const prefecturesAtomIds = atom<string[]>([]);

prefecturesAtomIds.debugLabel = 'prefecturesAtomIds';

export const usePrefecturesMutators = (): UsePrefecturesMutators => {
  const setStateIds = useSetAtom(prefecturesAtomIds);

  const setPrefecturesAtomIds = useCallback(
    (ids: string[]) => {
      setStateIds(ids);
    },
    [setStateIds]
  );

  return { setPrefecturesAtomIds };
};

export const usePrefecturesIdsState = (): string[] => {
  return useAtomValue(prefecturesAtomIds);
};
