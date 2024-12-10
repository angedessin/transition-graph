import { useCallback, useEffect, useRef, useState } from 'react';

import { usePrefecturesDetail } from '@/repositories/hooks';
import { useGraphMutators, useGraphsDataState } from '@global-states';

import type { PrefecturesData } from '@/app/_components/graph/type';
import type { PrefecturesResponseResultData } from '@/repositories/type';
import type { UseGraphMutators } from '@global-states';
import type { ChangeEvent, MouseEvent } from 'react';

export type UsePrefectures = {
  checkedId: number[];
  currentCategory: number;
  isLoading: boolean;
  onChange: (event: ChangeEvent) => void;
  onClickCategoryButton: (event: MouseEvent<HTMLButtonElement>) => void;
};

type AllPopulationData = {
  color: string;
  data: PrefecturesResponseResultData[][];
  label: string;
  prefCode: number;
};

export const usePrefectures = (): UsePrefectures => {
  // global-state --------------------------------------------------
  const graphData = useGraphsDataState();
  const graphDataRef = useRef<PrefecturesData[]>(graphData);
  graphDataRef.current = graphData;
  const { setGraphData }: UseGraphMutators = useGraphMutators();

  // hooks --------------------------------------------------
  const { response, setParams, isLoading } = usePrefecturesDetail();

  // useState --------------------------------------------------
  const [prefecturesDetailData, setPrefecturesDetailData] = useState<
    PrefecturesData[]
  >([]);
  const prefecturesDetailDataRef = useRef<PrefecturesData[]>(
    prefecturesDetailData
  );
  prefecturesDetailDataRef.current = prefecturesDetailData;

  const [checkedId, setCheckedId] = useState<number[]>([]);

  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const currentCategoryRef = useRef<number>(currentCategory);
  currentCategoryRef.current = currentCategory;

  const [allPopulationData, setAllPopulationData] = useState<
    AllPopulationData[]
  >([]);
  const allPopulationDataRef = useRef<AllPopulationData[]>(allPopulationData);
  allPopulationDataRef.current = allPopulationData;

  // useRef --------------------------------------------------
  const currentLabelRef = useRef<string>('');
  const prefCodeRef = useRef<number>(-1);

  // useCallback --------------------------------------------------
  const onClickCategoryButton = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const target = event.target as HTMLButtonElement;
      const index = Number(target.dataset.index);
      setCurrentCategory(index);

      // graphDataRefのprefCodeを取得する
      const code: number[] = graphDataRef.current.map((data) => data.prefCode);
      // codeに該当するallPopulationDataRefをデータを取得
      const selectedData = allPopulationDataRef.current.filter((data) =>
        code.includes(data.prefCode)
      );

      const data: PrefecturesData[] = selectedData.map((populationData) => {
        const { label, prefCode, color, data } = populationData;
        const detail = data[index];
        return {
          label: label,
          color: color,
          detail: typeof detail !== 'undefined' ? detail : [],
          prefCode,
        };
      });
      setGraphData(data);
    },
    []
  );

  /**
   * 都道府県のチェックボックスが変更された際の処理
   */
  const onChange = useCallback(
    (event: ChangeEvent) => {
      if (isLoading) {
        return;
      }

      const target = event.target as HTMLInputElement;
      prefCodeRef.current = Number(target.id.replace('prefecture-', ''));
      currentLabelRef.current = target.name;
      const isExist = prefecturesDetailDataRef.current.some(
        (data) => data.label === currentLabelRef.current
      );

      if (target.checked) {
        setCheckedId([...checkedId, prefCodeRef.current]);
        if (!isExist) {
          setParams({ prefCode: prefCodeRef.current });
        } else {
          const data = prefecturesDetailDataRef.current.filter(
            (data) => data.prefCode === prefCodeRef.current
          );
          setGraphData([...graphDataRef.current, ...data]);
        }
      } else {
        setCheckedId(checkedId.filter((id) => id !== prefCodeRef.current));
        const data = graphDataRef.current.filter(
          (data) => data.prefCode !== prefCodeRef.current
        );

        setGraphData(data);
      }
    },
    [isLoading, checkedId]
  );

  useEffect(() => {
    if (response && response.result) {
      // 人口
      const populationData = response.result.data[0]?.data;
      const juvenilePopulationData = response.result.data[1]?.data;
      const workingAgePopulationData = response.result.data[2]?.data;
      const elderlyPopulationData = response.result.data[3]?.data;

      if (
        typeof populationData !== 'undefined' &&
        typeof juvenilePopulationData !== 'undefined' &&
        typeof workingAgePopulationData !== 'undefined' &&
        typeof elderlyPopulationData !== 'undefined'
      ) {
        const currentAllData = {
          label: currentLabelRef.current,
          prefCode: prefCodeRef.current,
          color: '#8884d8',
          data: [
            populationData,
            juvenilePopulationData,
            workingAgePopulationData,
            elderlyPopulationData,
          ],
        };
        setAllPopulationData([...allPopulationDataRef.current, currentAllData]);

        const detail = currentAllData.data[currentCategoryRef.current];
        if (typeof detail !== 'undefined') {
          const data = [
            ...prefecturesDetailDataRef.current,
            {
              label: currentAllData.label,
              color: currentAllData.color,
              detail,
              prefCode: currentAllData.prefCode,
            },
          ];
          setPrefecturesDetailData(data);
          setGraphData(data);
        }
      }
    }
  }, [response]);

  return {
    onChange,
    isLoading,
    checkedId,
    onClickCategoryButton,
    currentCategory,
  };
};
