import { useResize } from '../use-resize';

// hooks ------------------------------------------
export const useWindowSizeValue = (): void => {
  // functions ------------------------------------------
  const resize = (): void => {
    const vw = (window.innerWidth * 0.01).toFixed(2);
    const vh = (window.innerHeight * 0.01).toFixed(2);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useResize({ isMobileMode: true, resize });
};
