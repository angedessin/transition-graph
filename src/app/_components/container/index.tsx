import React, { memo } from 'react';

import type { NextPage } from 'next';

import styles from './styles.module.scss';

const Container: NextPage = memo(() => <div className={styles.container} />);

Container.displayName = 'Top';

export { Container };
