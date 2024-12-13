import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { usePopulationComposition } from '@/repositories/hooks';
import { useGraphMutators, useGraphsDataState } from '@global-states';
import { getColor } from '@utils';

import type { PopulationCompositionResultData } from '@/repositories/type';
import type { UseGraphMutators, GraphData } from '@global-states';
import type { ChangeEvent, MouseEvent } from 'react';

export type UsePrefectures = {
  checkedId: number[];
  currentCategoryIndex: number;
  isOperable: boolean;
  onChange: (event: ChangeEvent) => void;
  onClickCategoryButton: (event: MouseEvent<HTMLButtonElement>) => void;
};

type PopulationCompositionLoadedData = {
  color: string;
  data: PopulationCompositionResultData[][];
  label: string;
  prefCode: number;
};

type UsePrefecturesProps = {
  colors: string[];
};

export const usePrefectures = (props: UsePrefecturesProps): UsePrefectures => {
  const { colors } = props;

  // global-state --------------------------------------------------
  const graphData = useGraphsDataState();
  const graphDataRef = useRef<GraphData[]>(graphData);
  graphDataRef.current = graphData;
  const { setGraphData }: UseGraphMutators = useGraphMutators();

  // hooks --------------------------------------------------
  const { response, setParams, isLoading } = usePopulationComposition();

  // useState --------------------------------------------------
  // チェックされた都道府県のID
  const [checkedId, setCheckedId] = useState<number[]>([]);

  // カテゴリーのインデックス
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

  // グラフデータが設定されているか
  const [isSetGraphData, setIsSetGraphData] = useState<boolean>(true);

  // useRef --------------------------------------------------
  // チェックされた都道府県のラベル
  const currentLabelRef = useRef<string>('');
  // チェックされた都道府県のコード
  const prefCodeRef = useRef<number>(-1);

  // useMemo --------------------------------------------------
  // 操作可能か
  const isOperable = useMemo(() => {
    return !isLoading && isSetGraphData;
  }, [isLoading, isSetGraphData]);

  // useCallback --------------------------------------------------
  /**
   * カテゴリーボタンがクリックされた際の処理
   */
  const onClickCategoryButton = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (!isOperable) {
        return;
      }

      const target = event.target as HTMLButtonElement;
      const index = Number(target.dataset.index);
      setCurrentCategoryIndex(index);

      // graphDataRefのprefCodeを取得する
      const code: number[] = graphDataRef.current.map((data) => data.prefCode);
      // codeに該当するallPopulationDataRefをデータを取得
      const selectedData = populationCompositionLoadedDataRef.current.filter(
        (data) => code.includes(data.prefCode)
      );

      // selectedDataに基づいてグラフデータを設定
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
    [isOperable]
  );

  /**
   * 都道府県のチェックボックスが変更された際の処理
   */
  const onChange = useCallback(
    (event: ChangeEvent) => {
      if (!isOperable) {
        return;
      }

      const target = event.target as HTMLInputElement;
      prefCodeRef.current = Number(target.id.replace('prefecture-', ''));
      currentLabelRef.current = target.name;

      if (target.checked) {
        // チェックボックスをチェック時
        setIsSetGraphData(false);
        setCheckedId([...checkedId, prefCodeRef.current]);

        // populationCompositionLoadedDataRefにcurrentLabelRef.currentが存在するか
        const isExist = populationCompositionLoadedDataRef.current.some(
          (data) => data.label === currentLabelRef.current
        );

        if (!isExist) {
          // APIからデータを取得
          setParams({ prefCode: prefCodeRef.current });
        } else {
          // 既にデータが読み込まれている場合はローカルからデータを取得
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
          setIsSetGraphData(true);
        }
      } else {
        // チェックボックスを解除時
        setCheckedId(checkedId.filter((id) => id !== prefCodeRef.current));
        const data = graphDataRef.current.filter(
          (data) => data.prefCode !== prefCodeRef.current
        );

        setGraphData(data);
      }
    },
    [checkedId, isOperable]
  );

  // useEffect --------------------------------------------------
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
        // prefCodeに基づいて色を取得
        const graphColor = colors[prefCodeRef.current - 1];

        // stateに保存するためのデータ
        const loadedData = {
          label: currentLabelRef.current,
          prefCode: prefCodeRef.current,
          color: typeof graphColor === 'undefined' ? getColor() : graphColor,
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
        setIsSetGraphData(true);
      }
    } else {
      setIsSetGraphData(true);
    }
  }, [response]);

  return {
    onChange,
    isOperable,
    checkedId,
    onClickCategoryButton,
    currentCategoryIndex,
  };
};
