// For storing state relating to initiating a hustler
import { makeVar } from '@apollo/client';
import { getRandomNumber } from './utils';
import { NUM_DOPE_TOKENS } from './constants';
import { HUSTLER_NAMES } from './hustler-names';
import { BigNumber } from 'ethers';
const HUSTLER_SEXES = ['male', 'female'];
export type HustlerSex = 'male' | 'female';
export const MAX_BODIES = 5;
export const MAX_HAIR = 18;
export const MAX_FACIAL_HAIR = 12;
export const DEFAULT_BG_COLORS = ['#434345', '#97ADCC', '#F1D8AB', '#F2C4C5', '#B6CCC3', '#EDEFEE'];
export const DEFAULT_TEXT_COLORS = ['#000000', '#333333', '#dddddd', '#ffffff'];
// From lightest to darkest
export const SKIN_TONE_COLORS = [
  '#FFD99C',
  '#E6A46E',
  '#CC8850',
  '#AE6C37',
  '#983B0F',
  // Alien for OGs only
  '#77F8F8',
];

export type ZoomWindow = [BigNumber, BigNumber, BigNumber, BigNumber];
export const ZOOM_WINDOWS = [
  [BigNumber.from(0), BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)] as ZoomWindow, // default
  [BigNumber.from(110), BigNumber.from(20), BigNumber.from(100), BigNumber.from(100)] as ZoomWindow, // mugshot
];

export type HustlerCustomization = {
  bgColor: string;
  body: number;
  dopeId: string;
  facialHair: number;
  hair: number;
  mintOg: boolean;
  name?: string;
  renderName?: boolean;
  sex: HustlerSex;
  textColor: string;
  zoomWindow: ZoomWindow;
  mintAddress?: string;
};

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
    bgColor: DEFAULT_BG_COLORS[getRandomNumber(0, DEFAULT_BG_COLORS.length - 1)],
    body: getRandomNumber(0, MAX_BODIES),
    dopeId: getRandomHustlerId(),
    facialHair: getRandomNumber(0, MAX_FACIAL_HAIR),
    hair: getRandomNumber(0, MAX_HAIR),
    mintOg: false,
    name: HUSTLER_NAMES[getRandomNumber(0, HUSTLER_NAMES.length - 1)],
    renderName: false,
    sex: HUSTLER_SEXES[getRandomNumber(0, 1)] as HustlerSex,
    textColor: '#000000',
    zoomWindow: ZOOM_WINDOWS[0],
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
