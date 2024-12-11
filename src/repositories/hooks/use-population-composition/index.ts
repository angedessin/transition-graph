import { useCallback, useEffect, useState } from 'react';

import { HTTP_STATUS } from '@/repositories/config';
import { Api } from '@/repositories/fetcher';

import type {
  PopulationCompositionData,
  PopulationCompositionParams,
} from '@/repositories/type';

export type UsePopulationComposition = {
  errors: string[] | null;
  hasError: boolean;
  isLoading: boolean;
  response: PopulationCompositionData | null;
  setParams: (params: PopulationCompositionParams) => void;
};
export const usePopulationComposition = (): UsePopulationComposition => {
  // useState -----------------------------------------------
  // APIのローディング状態のstate
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // APIエラーのstate
  const [hasError, setHasError] = useState<boolean>(false);
  // APIレスポンスデータのstate
  const [response, setResponse] = useState<PopulationCompositionData | null>(
    null
  );
  // APIエラーメッセージのstate
  const [apiErrors, setApiErrors] = useState<string[] | null>(null);
  // 都道府県詳細のパラメータのstate
  const [params, setParams] = useState<PopulationCompositionParams | null>(
    null
  );

  // useCallback --------------------------------------------
  /**
   * 都道府県詳細データを取得する
   */
  const load: () => void = useCallback(async () => {
    if (params === null) {
      return;
    }
    const repository = Api.populationComposition;
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
