import { useCallback, useEffect, useRef, useState } from 'react';

import { usePrefecturesDetail } from '@/repositories/hooks';
import { useGraphMutators, useGraphsDataState } from '@global-states';

import type { PrefecturesData } from '@/app/_components/graph/type';
import type { UseGraphMutators } from '@global-states';
import type { ChangeEvent } from 'react';

export type UsePrefectures = {
  checkedId: number[];
  isLoading: boolean;
  onChange: (event: ChangeEvent) => void;
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
  const [checkedId, setCheckedId] = useState<number[]>([]);
  prefecturesDetailDataRef.current = prefecturesDetailData;

  // useRef --------------------------------------------------
  const currentLabelRef = useRef<string>('');
  const prefCodeRef = useRef<number>(-1);

  // useCallback --------------------------------------------------
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
      const resultData = response.result.data[0]?.data;
      if (typeof resultData === 'undefined') {
        return;
      }

      const data = [
        ...prefecturesDetailDataRef.current,
        {
          label: currentLabelRef.current,
          color: '#8884d8',
          detail: resultData,
          prefCode: prefCodeRef.current,
        },
      ];
      setPrefecturesDetailData(data);
      setGraphData(data);
    }
  }, [response]);

  return { onChange, isLoading, checkedId };
};
