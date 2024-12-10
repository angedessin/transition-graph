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

import { AXIS_CONFIG, TOOLTIP_CONFIG } from './config';

import type { PrefecturesData } from './type';
import type { UseGraph } from '@/app/_components/graph/hook';

import styles from './styles.module.scss';

const Graph = () => {
  const { graphData }: UseGraph = useGraph();
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
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
          {graphData.map((value: PrefecturesData) => {
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
