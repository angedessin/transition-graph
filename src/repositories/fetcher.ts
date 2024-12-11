import { getRepository } from '@/repositories/repository';

import type {
  PopulationCompositionData,
  PopulationCompositionParams,
  PopulationCompositionResponse,
  PrefecturesData,
  PrefecturesDataResponse,
} from '@/repositories/type';

/**
 * API取得用のオブジェクト
 */
export const Api = {
  prefectures(): PrefecturesDataResponse {
    const repository = getRepository({});
    return repository.get<PrefecturesData>('/api/v1/prefectures');
  },
  populationComposition(
    params: PopulationCompositionParams
  ): PopulationCompositionResponse {
    const repository = getRepository({});
    return repository.get<PopulationCompositionData>(
      '/api/v1/population/composition/perYear',
      { params }
    );
  },
};
