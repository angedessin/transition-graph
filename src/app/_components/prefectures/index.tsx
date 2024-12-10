import { Checkbox } from '@ui';

import styles from './styles.module.scss';

const Prefectures = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>都道府県</h2>
      <ul className={styles.checkBoxList}>
        <li className={styles.checkBoxItem}>
          <Checkbox id="test" name="test" text="test" />
        </li>
      </ul>
    </section>
  );
};

export { Prefectures };
