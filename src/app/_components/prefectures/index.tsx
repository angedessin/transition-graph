import { Checkbox } from '@ui';

import { usePrefectures } from '../prefectures/hook';

import type { CheckboxData } from '../container/hook';

import styles from './styles.module.scss';

type Props = {
  checkboxData: CheckboxData[];
};

const BUTTON_DATA = [
  { text: '人口' },
  { text: '年少人口' },
  { text: '生産年齢人口' },
  { text: '老年人' },
];

const Prefectures = (props: Props) => {
  const { checkboxData } = props;
  const { onChange, checkedId, onClickCategoryButton, currentCategoryIndex } =
    usePrefectures({
      colors: checkboxData.map((data) => data.color),
    });

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>都道府県</h2>
      <div className={styles.categoryList}>
        {BUTTON_DATA.map((data, i) => {
          return (
            <button
              className={styles.categoryButton}
              key={`category-button-${i}`}
              data-index={i}
              data-is-selected={i === currentCategoryIndex}
              onClick={onClickCategoryButton}
            >
              {data.text}
            </button>
          );
        })}
      </div>
      <div className={styles.checkBoxList}>
        {checkboxData.map((data) => {
          const { prefName, prefCode, color } = data;
          return (
            <Checkbox
              key={prefCode}
              type="prefecture"
              id={String(prefCode)}
              name={prefName}
              text={prefName}
              onChange={onChange}
              color={color}
              isChecked={checkedId.includes(prefCode)}
            />
          );
        })}
      </div>
    </section>
  );
};

export { Prefectures };
