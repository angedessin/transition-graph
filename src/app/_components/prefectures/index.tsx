import { usePrefectures } from '@/app/_components/prefectures/hook';
import { Checkbox } from '@ui';

import type { PrefecturesResponseListResultData } from '@/repositories/type';

import styles from './styles.module.scss';

type Props = {
  checkboxData: PrefecturesResponseListResultData[];
};

const Prefectures = (props: Props) => {
  const { checkboxData } = props;
  const { onChange, checkedId } = usePrefectures();
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
              onChange={onChange}
              isChecked={checkedId.includes(data.prefCode)}
            />
          ))}
        </li>
      </ul>
    </section>
  );
};

export { Prefectures };
