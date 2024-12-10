import type { Response } from 'redaxios';

// 都道府県一覧のAPIレスポンスデータ型
export type PrefecturesResponseListData = {
  message: string;
  result: { prefCode: number; prefName: string }[];
};

// 都道府県詳細のAPIレスポンスデータ型
export type PrefecturesResponseDetailData = {
  message: string;
  result: {
    boundaryYear: number;
    data: {
      data: { rate: number; value: number; year: number }[];
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
