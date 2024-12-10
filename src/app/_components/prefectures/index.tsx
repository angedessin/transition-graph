import { usePrefectures } from '@/app/_components/prefectures/hook';
import { Checkbox } from '@ui';

import type { PrefecturesResponseListResultData } from '@/repositories/type';

import styles from './styles.module.scss';

type Props = {
  checkboxData: PrefecturesResponseListResultData[];
};

const BUTTON_DATA = [
  { text: '人口' },
  { text: '年少人口' },
  { text: '生産年齢人口' },
  { text: '老年人' },
];

const Prefectures = (props: Props) => {
  const { checkboxData } = props;
  const { onChange, checkedId, onClickCategoryButton, currentCategory } =
    usePrefectures();
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>都道府県</h2>
      <div className={styles.categoryList}>
        {BUTTON_DATA.map((data, i) => (
          <button
            className={styles.categoryButton}
            key={`category-button-${i}`}
            data-index={i}
            data-is-selected={i === currentCategory}
            onClick={onClickCategoryButton}
          >
            {data.text}
          </button>
        ))}
      </div>
      <div className={styles.checkBoxList}>
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
      </div>
    </section>
  );
};

export { Prefectures };
