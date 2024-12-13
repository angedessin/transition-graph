import {
  POPULATION_COMPOSITION_RESPONSE,
  PREFECTURES_RESPONSE,
} from '@/repositories/data';
import {
  Api,
  POPULATION_COMPOSITION_API,
  PREFECTURES_API,
} from '@/repositories/fetcher';
import { getRepository } from '@/repositories/repository';

jest.mock('./repository', () => ({
  getRepository: jest.fn(),
}));

describe('APIテスト', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('都道府県一覧API', async () => {
    const mockResponse = PREFECTURES_RESPONSE;
    const getMock = jest.fn().mockResolvedValue(mockResponse);
    (getRepository as jest.Mock).mockReturnValue({ get: getMock });

    const result = await Api.prefectures();

    expect(getRepository).toHaveBeenCalledWith({});
    expect(getMock).toHaveBeenCalledWith(PREFECTURES_API);
    expect(result).toEqual(mockResponse);
  });

  it('人口構成API', async () => {
    const mockResponse = POPULATION_COMPOSITION_RESPONSE;
    const getMock = jest.fn().mockResolvedValue(mockResponse);
    const mockParams = { prefCode: 1 };
    (getRepository as jest.Mock).mockReturnValue({ get: getMock });

    const result = await Api.populationComposition(mockParams);
    expect(getRepository).toHaveBeenCalledWith({});
    expect(getMock).toHaveBeenCalledWith(POPULATION_COMPOSITION_API, {
      params: mockParams,
    });
    expect(result).toEqual(mockResponse);
  });
});
