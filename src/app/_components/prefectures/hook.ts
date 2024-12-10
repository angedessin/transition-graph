import { useCallback, useMemo } from 'react';

import { usePrefecturesList } from '@/repositories/hooks';
import { usePrefecturesIdsState, usePrefecturesMutators } from '@global-states';

import type { PrefecturesResponseListResultData } from '@/repositories/type';
import type { ChangeEvent } from 'react';

export type UsePrefectures = {
  checkboxData: PrefecturesResponseListResultData[];
  onChange: (event: ChangeEvent) => void;
};

export const usePrefectures = (): UsePrefectures => {
  // hooks --------------------------------------------------
  const { response } = usePrefecturesList();

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
      if (target.checked) {
        setPrefecturesAtomIds([...checkedIds, currentId]);
      } else {
        setPrefecturesAtomIds(checkedIds.filter((id) => id !== currentId));
      }
    },
    [checkedIds]
  );

  // useMemo --------------------------------------------------
  // チェックボックスに表示する都道府県のデータを取得
  const checkboxData: PrefecturesResponseListResultData[] = useMemo(() => {
    if (!response) return [];
    return response.result;
  }, [response]);

  return { checkboxData, onChange };
};
