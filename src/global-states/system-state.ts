'use client';

import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useRef } from 'react';
import { UAParser } from 'ua-parser-js';

import type { MutableRefObject } from 'react';
import type { IBrowser, ICPU, IDevice, IEngine, IOS } from 'ua-parser-js';

export type SystemState = {
  browser: IBrowser;
  cpu: ICPU;
  device: IDevice;
  engine: IEngine;
  os: IOS;
};

export type UseSystemMutators = {
  setSystem: () => void;
};

// atom
const systemAtom = atom<SystemState>({
  browser: {} as IBrowser,
  cpu: {} as ICPU,
  device: {} as IDevice,
  engine: {} as IEngine,
  os: {} as IOS,
});

systemAtom.debugLabel = 'systemAtom';

// データを更新
export const useSystemMutators = (): UseSystemMutators => {
  const uaParserRef: MutableRefObject<UAParser> = useRef(new UAParser());
  // const [, setState] = useAtom(systemAtom);
  // const setAnime = useSetAtom(animeAtom)
  const setState = useSetAtom(systemAtom);

  const setSystem = useCallback(() => {
    const uaParser: UAParser = uaParserRef.current;
    setState({
      browser: uaParser.getBrowser(),
      cpu: uaParser.getCPU(),
      device: uaParser.getDevice(),
      engine: uaParser.getEngine(),
      os: uaParser.getOS(),
    });
  }, [setState]);

  return { setSystem };
};

// system情報を取得
export const useSystemState = (): SystemState => {
  // const [state] = useAtom(systemAtom);
  // const anime = useAtomValue(animeAtom)
  const state = useAtomValue(systemAtom);
  return state;
};
