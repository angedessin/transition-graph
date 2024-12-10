import type { ChangeEvent } from 'react';

import styles from './styles.module.scss';

type Props = {
  id: string;
  isChecked: boolean;
  name: string;
  onChange: (event: ChangeEvent) => void;
  text: string;
  type: string;
};

const Checkbox = (props: Props) => {
  const { type, id, name, text, onChange, isChecked } = props;
  const checkboxId = `${type}-${id}`;
  return (
    <label id={checkboxId} className={styles.container}>
      <input
        onChange={onChange}
        className={styles.checkBox}
        type="checkbox"
        id={checkboxId}
        name={name}
        checked={isChecked}
      />
      <span className={styles.text}>{text}</span>
    </label>
  );
};

export { Checkbox };
