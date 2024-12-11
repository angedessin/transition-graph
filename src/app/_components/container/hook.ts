import { useMemo } from 'react';

import { usePrefecturesList } from '@/repositories/hooks';

import type { PrefecturesResultData } from '@/repositories/type';

export type UseContainer = {
  checkboxData: PrefecturesResultData[];
};

export const useContainer = (): UseContainer => {
  // hooks --------------------------------------------------
  const { response } = usePrefecturesList();

  // useMemo --------------------------------------------------
  // チェックボックスに表示する都道府県のデータを取得
  const checkboxData: PrefecturesResultData[] = useMemo(() => {
    if (!response) return [];
    return response.result;
  }, [response]);

  return { checkboxData };
};
