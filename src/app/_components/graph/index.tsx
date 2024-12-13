import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useGraph } from '@/app/_components/graph/hook';

import { AXIS_CONFIG, GRAPH_LAYOUT, TOOLTIP_CONFIG } from './config';

import type { UseGraph } from '@/app/_components/graph/hook';
import type { GraphData } from '@global-states';

import styles from './styles.module.scss';

const Graph = () => {
  const { graphData }: UseGraph = useGraph();
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={GRAPH_LAYOUT.width}
          height={GRAPH_LAYOUT.height}
          margin={GRAPH_LAYOUT.margin}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            type="category"
            allowDuplicatedCategory={false}
            {...AXIS_CONFIG}
          />
          <YAxis dataKey="value" {...AXIS_CONFIG} />
          <Tooltip {...TOOLTIP_CONFIG} />
          <Legend />
          {graphData.map((value: GraphData) => {
            const { label, color, detail } = value;
            return (
              <Line
                dataKey="value"
                data={detail}
                name={label}
                key={label}
                stroke={color}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { Graph };
