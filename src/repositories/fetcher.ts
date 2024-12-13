import { getRepository } from '@/repositories/repository';

import type {
  PopulationCompositionData,
  PopulationCompositionParams,
  PopulationCompositionResponse,
  PrefecturesData,
  PrefecturesDataResponse,
} from '@/repositories/type';

export const PREFECTURES_API = '/api/v1/prefectures';
export const POPULATION_COMPOSITION_API =
  '/api/v1/population/composition/perYear';

/**
 * API取得用のオブジェクト
 */
export const Api = {
  prefectures(): PrefecturesDataResponse {
    const repository = getRepository({});
    return repository.get<PrefecturesData>(PREFECTURES_API);
  },
  populationComposition(
    params: PopulationCompositionParams
  ): PopulationCompositionResponse {
    const repository = getRepository({});
    return repository.get<PopulationCompositionData>(
      POPULATION_COMPOSITION_API,
      { params }
    );
  },
};
