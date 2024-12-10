import type { PrefecturesData } from './type';

export const DUMMY_PREFECTURES_DATA: PrefecturesData[] = [
  {
    label: '東京都',
    color: '#8884d8',
    detail: [
      { year: 2014, value: 10000 },
      { year: 2015, value: 50000 },
      { year: 2016, value: 10000 },
    ],
  },
  {
    label: '大阪府',
    color: '#82ca9d',
    detail: [
      { year: 2014, value: 1000 },
      { year: 2015, value: 2000 },
      { year: 2016, value: 3000 },
    ],
  },
];
