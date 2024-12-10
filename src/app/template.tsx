'use client';

import React, { useEffect } from 'react';

import { useSystemMutators } from '@global-states';
import { useWindowSizeValue } from '@hooks';

import type { UseSystemMutators } from '@global-states';
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Template: FC<Props> = (props: Props) => {
  const { children }: Props = props;

  // jotai ------------------------------------------
  const { setSystem }: UseSystemMutators = useSystemMutators();
  useWindowSizeValue();

  // useEffect ------------------------------------------
  useEffect(() => {
    setSystem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{children}</div>;
};

export default Template;
