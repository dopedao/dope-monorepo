// For storing state relating to initiating a hustler
import { makeVar } from '@apollo/client';
import { getRandomNumber } from './utils';
import { NUM_DOPE_TOKENS } from './constants';

const HUSTLER_SEXES = ['male', 'female'];
export type HustlerSex = 'male' | 'female';
export const MAX_BODIES = 5;
export const MAX_HAIR = 18;
export const MAX_FACIAL_HAIR = 12;
export const DEFAULT_BG_COLORS = ['#434345', '#97ADCC', '#F1D8AB', '#F2C4C5', '#B6CCC3'];

interface HustlerCustomization {
  mintOg: boolean;
  dopeId: string;
  sex: HustlerSex;
  body: number;
  hair: number;
  facialHair: number;
  bgColor: string;
}

/**
 * Set random ID > NUM_DOPE_TOKENS because we use this
 * as a check to see if it was set randomly or intentionally
 * elsewhere in the code.
 */
export const getRandomHustlerId = (): string => {
  return getRandomNumber(NUM_DOPE_TOKENS + 1, NUM_DOPE_TOKENS * 2).toString();
};

export const getRandomHustler = (): HustlerCustomization => {
  return {
    mintOg: false,
    dopeId: getRandomHustlerId(),
    sex: HUSTLER_SEXES[getRandomNumber(0, 1)] as HustlerSex,
    body: getRandomNumber(0, MAX_BODIES),
    hair: getRandomNumber(0, MAX_HAIR),
    facialHair: getRandomNumber(0, MAX_FACIAL_HAIR),
    bgColor: DEFAULT_BG_COLORS[getRandomNumber(0, DEFAULT_BG_COLORS.length - 1)],
  };
};

export const HustlerInitConfig = makeVar(getRandomHustler());

export const isHustlerRandom = (): boolean => {
  return parseInt(HustlerInitConfig().dopeId) > NUM_DOPE_TOKENS;
};

export const randomizeHustlerAttributes = () => {
  const randomHustler = getRandomHustler();
  const hustlerConfig = HustlerInitConfig();
  HustlerInitConfig({
    ...randomHustler,
    mintOg: hustlerConfig.mintOg,
    dopeId: hustlerConfig.dopeId,
  });
};
