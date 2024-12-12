'use client';
import { Graph } from '../graph';
import { Prefectures } from '../prefectures';
import { useContainer } from './hook';

import type { UseContainer } from './hook';
import type { NextPage } from 'next';

import styles from './styles.module.scss';

const Container: NextPage = () => {
  const { checkboxData }: UseContainer = useContainer();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>都道府県別の総人口推移グラフ</h1>
      <div className={styles.inner}>
        {checkboxData.length > 0 && (
          <>
            <Prefectures checkboxData={checkboxData} />
            <Graph />
          </>
        )}
      </div>
    </div>
  );
};

export { Container };
