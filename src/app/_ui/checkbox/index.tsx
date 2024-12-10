import styles from './styles.module.scss';

type Props = {
  id: string;
  name: string;
  text: string;
};

const Checkbox = (props: Props) => {
  const { id, name, text } = props;
  return (
    <label id="checkbox1" className={styles.container}>
      <input className={styles.checkBox} type="checkbox" id={id} name={name} />
      <span className={styles.text}>{text}</span>
    </label>
  );
};

export { Checkbox };
