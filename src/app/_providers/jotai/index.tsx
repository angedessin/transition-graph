'use client';

import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';

import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const JotaiProvider: FC<Props> = ({ children }: Props) => (
  <Provider>
    {!process.env.isProduction && <DevTools />}
    {children}
  </Provider>
);

export { JotaiProvider };
