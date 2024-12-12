import { useMemo } from 'react';

import { usePrefecturesList } from '@/repositories/hooks';
import { getColor } from '@utils';

import type { PrefecturesResultData } from '@/repositories/type';

export type CheckboxData = {
  color: string;
} & PrefecturesResultData;

export type UseContainer = {
  checkboxData: CheckboxData[];
};

export const useContainer = (): UseContainer => {
  // hooks --------------------------------------------------
  const { response } = usePrefecturesList();

  // useMemo --------------------------------------------------
  // チェックボックスに表示する都道府県のデータを取得
  const checkboxData: CheckboxData[] = useMemo(() => {
    if (!response) return [];
    return response.result.map((value: PrefecturesResultData) => {
      return {
        ...value,
        color: getColor(),
      };
    });
  }, [response]);

  console.log(response);

  return { checkboxData };
};
