import { useCallback, useEffect, useRef, useState } from 'react';

import { usePopulationComposition } from '@/repositories/hooks';
import { useGraphMutators, useGraphsDataState } from '@global-states';

import type { PopulationCompositionResultData } from '@/repositories/type';
import type { UseGraphMutators, GraphData } from '@global-states';
import type { ChangeEvent, MouseEvent } from 'react';

export type UsePrefectures = {
  checkedId: number[];
  currentCategoryIndex: number;
  isLoading: boolean;
  onChange: (event: ChangeEvent) => void;
  onClickCategoryButton: (event: MouseEvent<HTMLButtonElement>) => void;
};

type PopulationCompositionLoadedData = {
  color: string;
  data: PopulationCompositionResultData[][];
  label: string;
  prefCode: number;
};

export const usePrefectures = (): UsePrefectures => {
  // global-state --------------------------------------------------
  const graphData = useGraphsDataState();
  const graphDataRef = useRef<GraphData[]>(graphData);
  graphDataRef.current = graphData;
  const { setGraphData }: UseGraphMutators = useGraphMutators();

  // hooks --------------------------------------------------
  const { response, setParams, isLoading } = usePopulationComposition();

  // useState --------------------------------------------------
  const [checkedId, setCheckedId] = useState<number[]>([]);

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
  const currentCategoryRef = useRef<number>(currentCategoryIndex);
  currentCategoryRef.current = currentCategoryIndex;

  // APIから読み込み済みのデータ
  const [populationCompositionLoadedData, setPopulationCompositionLoadedData] =
    useState<PopulationCompositionLoadedData[]>([]);
  const populationCompositionLoadedDataRef = useRef<
    PopulationCompositionLoadedData[]
  >(populationCompositionLoadedData);
  populationCompositionLoadedDataRef.current = populationCompositionLoadedData;

  // useRef --------------------------------------------------
  const currentLabelRef = useRef<string>('');
  const prefCodeRef = useRef<number>(-1);

  // useCallback --------------------------------------------------
  const onClickCategoryButton = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const target = event.target as HTMLButtonElement;
      const index = Number(target.dataset.index);
      setCurrentCategoryIndex(index);

      // graphDataRefのprefCodeを取得する
      const code: number[] = graphDataRef.current.map((data) => data.prefCode);
      // codeに該当するallPopulationDataRefをデータを取得
      const selectedData = populationCompositionLoadedDataRef.current.filter(
        (data) => code.includes(data.prefCode)
      );

      const data: GraphData[] = selectedData.map((populationData) => {
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

      // populationCompositionLoadedDataRefにcurrentLabelRef.currentが存在するか
      const isExist = populationCompositionLoadedDataRef.current.some(
        (data) => data.label === currentLabelRef.current
      );

      if (target.checked) {
        setCheckedId([...checkedId, prefCodeRef.current]);
        if (!isExist) {
          setParams({ prefCode: prefCodeRef.current });
        } else {
          const loadedData = populationCompositionLoadedDataRef.current
            .filter((loadedData) => loadedData.prefCode === prefCodeRef.current)
            .map((loadedData) => {
              const { label, prefCode, color, data } = loadedData;
              const detail =
                typeof data[currentCategoryIndex] !== 'undefined'
                  ? data[currentCategoryIndex]
                  : [];
              return {
                label: label,
                prefCode: prefCode,
                color: color,
                detail,
              };
            });

          setGraphData([...graphDataRef.current, ...loadedData]);
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
        const loadedData = {
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
        setPopulationCompositionLoadedData([
          ...populationCompositionLoadedDataRef.current,
          loadedData,
        ]);

        const { label, color, prefCode } = loadedData;
        const detail = loadedData.data[currentCategoryRef.current];
        if (typeof detail !== 'undefined') {
          const data = [
            ...graphDataRef.current,
            {
              label,
              color,
              detail,
              prefCode,
            },
          ];
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
    currentCategoryIndex,
  };
};
