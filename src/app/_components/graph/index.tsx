import React from 'react';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  AXIS_CONFIG,
  AXIS_LABEL_FONT_STYLE,
  GRAPH_LAYOUT,
  LEGEND_WRAPPER_STYLE_CONFIG,
  TOOLTIP_CONFIG,
} from './config';
import { useGraph } from './hook';

import type { UseGraph } from './hook';
import type { GraphData } from '@global-states';

import styles from './styles.module.scss';

const Graph = () => {
  const { graphData }: UseGraph = useGraph();
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart {...GRAPH_LAYOUT}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            type="category"
            allowDuplicatedCategory={false}
            {...AXIS_CONFIG}
          >
            <Label
              value="年度"
              offset={0}
              position="insideBottom"
              {...AXIS_LABEL_FONT_STYLE}
            />
          </XAxis>
          <YAxis dataKey="value" {...AXIS_CONFIG}>
            <Label
              value="人口数"
              offset={0}
              position="insideLeft"
              angle={-90}
              {...AXIS_LABEL_FONT_STYLE}
            />
          </YAxis>
          <Tooltip {...TOOLTIP_CONFIG} />
          <Legend
            verticalAlign="top"
            margin={{ bottom: 20 }}
            iconSize={10}
            wrapperStyle={LEGEND_WRAPPER_STYLE_CONFIG}
          />
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
