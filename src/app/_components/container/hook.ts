import { useEffect, useMemo, useState } from 'react';

import { usePrefecturesList } from '@/repositories/hooks';
import { getColor } from '@utils';

import type { PrefecturesResultData } from '@/repositories/type';

export type CheckboxData = {
  color: string;
} & PrefecturesResultData;

export type UseContainer = {
  checkboxData: CheckboxData[];
  isReadyContents: boolean;
};

export const useContainer = (): UseContainer => {
  // hooks --------------------------------------------------
  const { response } = usePrefecturesList();

  // useState --------------------------------------------------
  // コンテンツの表示準備ができたかどうか
  const [isReadyContents, setIsReadyContents] = useState<boolean>(false);

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

  // useEffect --------------------------------------------------
  // チェックボックスに表示する都道府県のデータが取得できたら、コンテンツの表示準備をする
  useEffect(() => {
    if (checkboxData.length > 0) {
      window.setTimeout(() => {
        setIsReadyContents(true);
      }, 500);
    }
  }, [response]);

  return { checkboxData, isReadyContents };
};
