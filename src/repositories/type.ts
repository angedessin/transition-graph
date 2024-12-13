import type { Response } from 'redaxios';

// 都道府県一覧のAPIレスポンスデータ型
export type PrefecturesResultData = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesData = {
  message: string;
  result: PrefecturesResultData[];
};

// 都道府県詳細のAPIレスポンスデータ型
export type PopulationCompositionResultData = {
  rate?: number;
  value: number;
  year: number;
};

export type PopulationCompositionData = {
  message: string;
  result: {
    boundaryYear: number;
    data: {
      data: PopulationCompositionResultData[];
      label: string;
    }[];
  };
};

// 都道府県一覧のaxiosでのレスポンス型
export type PrefecturesDataResponse = Promise<Response<PrefecturesData>>;

// 都道府県詳細のaxiosでのレスポンス型
export type PopulationCompositionResponse = Promise<
  Response<PopulationCompositionData>
>;

// 都道府県詳細のパラメータ型
export type PopulationCompositionParams = {
  prefCode: number;
};
