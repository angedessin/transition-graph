import { useEffect, useMemo, useRef } from 'react';

import { useSystemState } from '@global-states';

export type UseResizeProps = {
  delay?: number;
  isMobileMode: boolean;
  resize: () => void;
};

export const useResize = (props: UseResizeProps): void => {
  const { isMobileMode, resize, delay } = props;

  // hooks ------------------------------------------
  const systemState = useSystemState();

  // useRef ------------------------------------------
  const resizeTimerRef = useRef(0);

  // useMemo ------------------------------------------
  const isMobile = useMemo(
    () =>
      (systemState.device.type === 'mobile' && isMobileMode) ||
      systemState.device.type === 'tablet',
    [systemState, isMobileMode]
  );

  // functions ------------------------------------------
  const delayReset = (): void => {
    window.clearTimeout(resizeTimerRef.current);
    resizeTimerRef.current = window.setTimeout(() => {
      window.clearTimeout(resizeTimerRef.current);
      resize();
    }, delay || 1000);
  };

  // useEffect --------------------------------
  useEffect(() => {
    if (isMobile) {
      window.addEventListener('orientationchange', delayReset);
    } else {
      window.addEventListener('resize', delayReset);
    }
    resize();

    return () => {
      window.removeEventListener('orientationchange', delayReset);
      window.removeEventListener('resize', delayReset);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
};
