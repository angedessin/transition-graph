import { useEffect, useState } from 'react';

export type UseLandscape = {
  isLandscape: boolean;
};

export const useLandscape = (): UseLandscape => {
  // useState ------------------------------------------
  const [isLandscape, updateOrientation] = useState<boolean>(false);

  // functions ------------------------------------------
  /**
   * window.orientationの値を取得
   * @returns {boolean}
   */
  const getOrientation = (): boolean => {
    if (typeof window !== 'undefined') {
      return Math.abs(Number(window.orientation)) === 90;
    }

    return false;
  };

  /**
   * orientationchange時に呼ばれるlistener
   */
  const onOrientation = (): void => {
    updateOrientation(getOrientation());
  };

  // useEffect ------------------------------------------
  useEffect(() => {
    updateOrientation(getOrientation());
    window.addEventListener('orientationchange', onOrientation);

    return () => {
      window.removeEventListener('orientationchange', onOrientation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLandscape,
  };
};
