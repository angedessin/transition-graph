import { getRepository } from '@/repositories/repository';

import type {
  PrefecturesResponseDetail,
  PrefecturesResponseDetailData,
  PrefecturesResponseList,
  PrefecturesResponseListData,
  TPrefecturesDetailParams,
} from '@/repositories/type';

/**
 * 都道府県API用のオブジェクト
 */
export const PrefecturesApi = {
  list(): PrefecturesResponseList {
    const repository = getRepository({});
    return repository.get<PrefecturesResponseListData>('/api/v1/prefectures');
  },
  detail(params: TPrefecturesDetailParams): PrefecturesResponseDetail {
    const repository = getRepository({});
    return repository.get<PrefecturesResponseDetailData>(
      '/api/v1/population/composition',
      { params }
    );
  },
};
