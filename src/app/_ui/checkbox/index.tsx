import type { ChangeEvent } from 'react';

import styles from './styles.module.scss';

type Props = {
  color: string;
  id: string;
  isChecked: boolean;
  name: string;
  onChange: (event: ChangeEvent) => void;
  text: string;
  type: string;
};

const Checkbox = (props: Props) => {
  const { type, id, name, text, onChange, isChecked, color } = props;
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
      <span
        className={styles.color}
        style={{
          backgroundColor: color,
        }}
      ></span>
    </label>
  );
};

export { Checkbox };
