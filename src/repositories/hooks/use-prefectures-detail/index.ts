import { useCallback, useEffect, useState } from 'react';

import { HTTP_STATUS } from '@/repositories/config';
import { PrefecturesApi } from '@/repositories/fetcher/prefectures';

import type {
  PrefecturesResponseDetailData,
  TPrefecturesDetailParams,
} from '@/repositories/type';

export type UsePrefecturesDetail = {
  errors: string[] | null;
  hasError: boolean;
  isLoading: boolean;
  response: PrefecturesResponseDetailData | null;
  setParams: (params: TPrefecturesDetailParams) => void;
};
export const usePrefecturesDetail = (): UsePrefecturesDetail => {
  // useState -----------------------------------------------
  // APIのローディング状態のstate
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // APIエラーのstate
  const [hasError, setHasError] = useState<boolean>(false);
  // APIレスポンスデータのstate
  const [response, setResponse] =
    useState<PrefecturesResponseDetailData | null>(null);
  // APIエラーメッセージのstate
  const [apiErrors, setApiErrors] = useState<string[] | null>(null);
  // 都道府県詳細のパラメータのstate
  const [params, setParams] = useState<TPrefecturesDetailParams | null>(null);

  // useCallback --------------------------------------------
  /**
   * 都道府県詳細データを取得する
   */
  const load: () => void = useCallback(async () => {
    if (params === null) {
      return;
    }
    const repository = PrefecturesApi.detail;
    setIsLoading(true);
    setHasError(false);
    try {
      const { data, status } = await repository(params);
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
  }, [params]);

  // useEffect --------------------------------------------
  useEffect(() => {
    if (params) {
      load();
    }
  }, [params, load]);

  return {
    isLoading,
    hasError,
    response,
    setParams,
    errors: apiErrors,
  };
};
