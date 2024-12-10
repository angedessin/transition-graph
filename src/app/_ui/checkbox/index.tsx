import styles from './styles.module.scss';

type Props = {
  id: string;
  name: string;
  text: string;
  type: string;
};

const Checkbox = (props: Props) => {
  const { type, id, name, text } = props;
  const checkboxId = `${type}-${id}`;
  return (
    <label id={checkboxId} className={styles.container}>
      <input
        className={styles.checkBox}
        type="checkbox"
        id={checkboxId}
        name={name}
      />
      <span className={styles.text}>{text}</span>
    </label>
  );
};

export { Checkbox };
