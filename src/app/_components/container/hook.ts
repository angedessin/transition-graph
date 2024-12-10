import { useMemo } from 'react';

import { usePrefecturesList } from '@/repositories/hooks';

import type { PrefecturesResponseListResultData } from '@/repositories/type';

export type UseContainer = {
  checkboxData: PrefecturesResponseListResultData[];
};

export const useContainer = (): UseContainer => {
  // hooks --------------------------------------------------
  const { response } = usePrefecturesList();

  // useMemo --------------------------------------------------
  // チェックボックスに表示する都道府県のデータを取得
  const checkboxData: PrefecturesResponseListResultData[] = useMemo(() => {
    if (!response) return [];
    return response.result;
  }, [response]);

  return { checkboxData };
};
