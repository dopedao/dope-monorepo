// For storing state relating to initiating a hustler
import { Dispatch, SetStateAction } from 'react';
import { BigNumber } from 'ethers';
import { getRandomNumber } from 'utils/utils';
import { NUM_DOPE_TOKENS } from 'utils/constants';
import { HUSTLER_NAMES } from 'utils/hustler-names';
import { bool } from 'aws-sdk/clients/signer';
const HUSTLER_SEXES = ['male', 'female'];
export type HustlerSex = 'male' | 'female';
export const MAX_BODIES = 4;
export const MAX_HAIR = 18;
export const MAX_FACIAL_HAIR = 12;
export const DEFAULT_BG_COLORS = ['#434345', '#97ADCC', '#F1D8AB', '#F2C4C5', '#B6CCC3', '#EDEFEE'];
export const DEFAULT_TEXT_COLORS = ['#000000', '#333333', '#dddddd', '#ffffff'];
// From lightest to darkest
export const SKIN_TONE_COLORS = ['#FFD99C', '#E6A46E', '#CC8850', '#AE6C37', '#983B0F', '#77F8F8'];

export type ZoomWindow = [BigNumber, BigNumber, BigNumber, BigNumber];
export const ZOOM_WINDOWS = [
  [BigNumber.from(0), BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)] as ZoomWindow, // default
  [BigNumber.from(110), BigNumber.from(20), BigNumber.from(100), BigNumber.from(100)] as ZoomWindow, // mugshot
  [BigNumber.from(40), BigNumber.from(120), BigNumber.from(255), BigNumber.from(100)] as ZoomWindow, // vehicle
  // This view will crop certain vehicles like Lowrider,
  // but shows other at higher resolution. A decent tradeoff.
  [BigNumber.from(80), BigNumber.from(120), BigNumber.from(200), BigNumber.from(100)] as ZoomWindow, // vehicle bigger zoom
];

export type HustlerCustomization = {
  bgColor: string;
  body: number;
  dopeId: string;
  facialHair: number;
  hair: number;
  name?: string;
  renderName?: boolean;
  sex: HustlerSex;
  textColor: string;
  zoomWindow: ZoomWindow;
  isVehicle: bool;
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

export const getRandomHustler = ({
  sex,
  name,
  bgColor,
  body,
  dopeId,
  facialHair,
  hair,
  renderName,
  textColor,
  zoomWindow,
}: Partial<HustlerCustomization>): HustlerCustomization => {
  return {
    bgColor: bgColor || DEFAULT_BG_COLORS[getRandomNumber(0, DEFAULT_BG_COLORS.length - 1)],
    body: body || getRandomNumber(0, MAX_BODIES),
    dopeId: dopeId || getRandomHustlerId(),
    facialHair: facialHair || getRandomNumber(0, MAX_FACIAL_HAIR),
    hair: hair || getRandomNumber(0, MAX_HAIR),
    name: name || HUSTLER_NAMES[getRandomNumber(0, HUSTLER_NAMES.length - 1)],
    renderName: renderName || false,
    sex: sex || (HUSTLER_SEXES[getRandomNumber(0, 1)] as HustlerSex),
    textColor: textColor || '#000000',
    zoomWindow: zoomWindow || ZOOM_WINDOWS[0],
    isVehicle: false,
  };
};

export const isHustlerRandom = (): boolean => {
  return parseInt(getRandomHustler({}).dopeId) > NUM_DOPE_TOKENS;
};

export const randomizeHustlerAttributes = (
  dopeId: string,
  setHustlerConfig: Dispatch<SetStateAction<HustlerCustomization>>,
) => {
  const randomHustler = getRandomHustler({});
  setHustlerConfig({
    ...randomHustler,
    dopeId,
  });
};
