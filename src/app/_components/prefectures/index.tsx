import { Checkbox } from '@ui';

import { CATEGORY_BUTTON_DATA } from './config';
import { usePrefectures } from './hook';

import type { CheckboxData } from '../container/hook';

import styles from './styles.module.scss';

type Props = {
  checkboxData: CheckboxData[];
};

const Prefectures = (props: Props) => {
  const { checkboxData } = props;
  const {
    onChange,
    checkedId,
    onClickCategoryButton,
    currentCategoryIndex,
    isOperable,
  } = usePrefectures({
    colors: checkboxData.map((data) => data.color),
  });

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>都道府県</h2>
      <div className={styles.categoryList}>
        {CATEGORY_BUTTON_DATA.map((data, i) => {
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
      <div className={styles.loading} data-is-oerable={isOperable}>
        <div className={styles.loadingIcon} />
        <p className={styles.loadingText}>データ取得中</p>
      </div>
    </section>
  );
};

export { Prefectures };
