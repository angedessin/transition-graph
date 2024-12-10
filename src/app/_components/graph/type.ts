type PrefecturesDetailData = {
  value: number;
  year: number;
};

export type PrefecturesData = {
  color: string;
  detail: PrefecturesDetailData[];
  label: string;
  prefCode: number;
};
