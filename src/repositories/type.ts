import type { Response } from 'redaxios';

// 都道府県一覧のAPIレスポンスデータ型
export type PrefecturesResponseListResultData = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesResponseListData = {
  message: string;
  result: PrefecturesResponseListResultData[];
};

// 都道府県詳細のAPIレスポンスデータ型
export type PrefecturesResponseResultData = {
  rate: number;
  value: number;
  year: number;
};

export type PrefecturesResponseDetailData = {
  message: string;
  result: {
    boundaryYear: number;
    data: {
      data: PrefecturesResponseResultData[];
      label: string;
    }[];
  };
};

// 都道府県一覧のaxiosでのレスポンス型
export type PrefecturesResponseList = Promise<
  Response<PrefecturesResponseListData>
>;

// 都道府県詳細のaxiosでのレスポンス型
export type PrefecturesResponseDetail = Promise<
  Response<PrefecturesResponseDetailData>
>;

// 都道府県詳細のパラメータ型
export type TPrefecturesDetailParams = {
  prefCode: number;
};
