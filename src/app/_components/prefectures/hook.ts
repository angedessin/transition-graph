import { useCallback, useMemo, useState } from 'react';

import { usePrefecturesList } from '@/repositories/hooks';

import type { PrefecturesResponseListResultData } from '@/repositories/type';
import type { ChangeEvent } from 'react';

export type UsePrefectures = {
  checkboxData: PrefecturesResponseListResultData[];
  onChange: (event: ChangeEvent) => void;
};

export const usePrefectures = (): UsePrefectures => {
  // hooks --------------------------------------------------
  const { response } = usePrefecturesList();

  // useState --------------------------------------------------
  // 選択された都道府県のIDを管理するためのstateを定義
  const [checkedIds, setCheckedId] = useState<string[]>([]);

  // useCallback --------------------------------------------------
  /**
   * 都道府県のチェックボックスが変更された際の処理
   */
  const onChange = useCallback(
    (event: ChangeEvent) => {
      const target = event.target as HTMLInputElement;
      if (target.checked) {
        setCheckedId([...checkedIds, target.id.replace('prefecture-', '')]);
      } else {
        setCheckedId(checkedIds.filter((id) => id !== target.id));
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
