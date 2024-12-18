import { useCallback, useEffect, useState } from 'react';

import { HTTP_STATUS } from '@/repositories/config';
import { Api } from '@/repositories/fetcher';

import type { PrefecturesData } from '@/repositories/type';

export type UsePrefecturesList = {
  errors: string[] | null;
  hasError: boolean;
  isLoading: boolean;
  response: PrefecturesData | null;
};
export const usePrefecturesList = (): UsePrefecturesList => {
  // useState -----------------------------------------------
  // APIのローディング状態のstate
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // APIエラーのstate
  const [hasError, setHasError] = useState<boolean>(false);
  // APIレスポンスデータのstate
  const [response, setResponse] = useState<PrefecturesData | null>(null);
  // APIエラーメッセージのstate
  const [apiErrors, setApiErrors] = useState<string[] | null>(null);

  // useCallback --------------------------------------------
  /**
   * 都道府県一覧データを取得する
   */
  const load: () => void = useCallback(async () => {
    const repository = Api.prefectures;
    setIsLoading(true);
    setHasError(false);
    try {
      const { data, status } = await repository();
      if (status === HTTP_STATUS.SUCCESS) {
        setResponse(data);
      } else {
        setApiErrors([data.message]);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setHasError(true);
      setApiErrors([error.message]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect --------------------------------------------
  useEffect(() => {
    load();
  }, [load]);

  return {
    isLoading,
    hasError,
    response,
    errors: apiErrors,
  };
};
