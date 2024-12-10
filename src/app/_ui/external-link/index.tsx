import clsx from 'clsx';

import { getDataAttribute } from '@utils';

import type { ComponentProps, FC } from 'react';

import styles from './styles.module.scss';

type Props = ComponentProps<'a'>;

const ExternalLink: FC<Props> = (props: Props) => {
  const { id, href, children, className, target }: Props = props;

  return (
    <a
      {...getDataAttribute(props)}
      id={id || undefined}
      className={clsx(styles.container, className)}
      href={href}
      target={target || '_blank'}
    >
      {children}
    </a>
  );
};

export { ExternalLink };
