import { useMemo } from 'react';

import { usePrefecturesList } from '@/repositories/hooks';

import type { PrefecturesResponseListResultData } from '@/repositories/type';

export type UsePrefectures = {
  checkboxData: PrefecturesResponseListResultData[];
};

export const usePrefectures = (): UsePrefectures => {
  const { response } = usePrefecturesList();

  const checkboxData: PrefecturesResponseListResultData[] = useMemo(() => {
    if (!response) return [];
    return response.result;
  }, [response]);

  return { checkboxData };
};
