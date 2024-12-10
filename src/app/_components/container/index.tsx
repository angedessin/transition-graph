import { Graph } from '../graph';
import { Prefectures } from '../prefectures';

import type { NextPage } from 'next';

import styles from './styles.module.scss';

const Container: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>都道府県別の総人口推移グラフ</h1>
      <Prefectures />
      <Graph />
    </div>
  );
};

export { Container };
