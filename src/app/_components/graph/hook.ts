import { useGraphsDataState } from '@global-states';

import type { GraphData } from '@global-states';

export type UseGraph = {
  graphData: GraphData[];
};

export const useGraph = () => {
  // hooks --------------------------------------------------
  const graphData = useGraphsDataState();

  return { graphData };
};
