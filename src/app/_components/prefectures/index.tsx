'use client';
import { usePrefectures } from '@/app/_components/prefectures/hook';
import { Checkbox } from '@ui';

import styles from './styles.module.scss';

const Prefectures = () => {
  const { checkboxData } = usePrefectures();
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>都道府県</h2>
      <ul className={styles.checkBoxList}>
        <li className={styles.checkBoxItem}>
          {checkboxData.map((data) => (
            <Checkbox
              key={data.prefCode}
              type="prefecture"
              id={String(data.prefCode)}
              name={data.prefName}
              text={data.prefName}
            />
          ))}
        </li>
      </ul>
    </section>
  );
};

export { Prefectures };
