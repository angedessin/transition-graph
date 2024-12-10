import { useCallback } from 'react';

import { usePrefecturesIdsState, usePrefecturesMutators } from '@global-states';

import type { ChangeEvent } from 'react';

export type UsePrefectures = {
  onChange: (event: ChangeEvent) => void;
};

export const usePrefectures = (): UsePrefectures => {
  // global-state --------------------------------------------------
  // 選択された都道府県のIDを管理するためのstateを定義
  const checkedIds = usePrefecturesIdsState();
  const { setPrefecturesAtomIds } = usePrefecturesMutators();

  // useCallback --------------------------------------------------
  /**
   * 都道府県のチェックボックスが変更された際の処理
   */
  const onChange = useCallback(
    (event: ChangeEvent) => {
      const target = event.target as HTMLInputElement;
      const currentId = target.id.replace('prefecture-', '');
      const label = target.name;
      if (target.checked) {
        setPrefecturesAtomIds([...checkedIds, { label, id: currentId }]);
      } else {
        setPrefecturesAtomIds(
          checkedIds.filter((data) => data.id !== currentId)
        );
      }
    },
    [checkedIds]
  );

  return { onChange };
};
