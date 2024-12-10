import { useGraphsDataState } from '@global-states';

import type { PrefecturesData } from '@/app/_components/graph/type';

export type UseGraph = {
  graphData: PrefecturesData[];
};
export const useGraph = () => {
  const graphData = useGraphsDataState();

  return { graphData };
};
