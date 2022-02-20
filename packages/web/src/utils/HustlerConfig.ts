// For storing state relating to initiating a hustler
import { Dispatch, SetStateAction } from 'react';
import { BigNumber } from 'ethers';
import { SetMetadataStruct } from '@dopewars/contracts/dist/Initiator';
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
  [BigNumber.from(40), BigNumber.from(110), BigNumber.from(255), BigNumber.from(100)] as ZoomWindow, // vehicle
  // This view will crop certain vehicles like Lowrider,
  // but shows other at higher resolution. A decent tradeoff.
  [BigNumber.from(70), BigNumber.from(110), BigNumber.from(210), BigNumber.from(100)] as ZoomWindow, // vehicle bigger zoom
];

export type HustlerCustomization = {
  bgColor: string;
  body: number;
  dopeId: string;
  facialHair: number;
  hair: number;
  name?: string;
  title?: string;
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
  isVehicle,
}: Partial<HustlerCustomization>): HustlerCustomization => {
  return {
    bgColor: bgColor || DEFAULT_BG_COLORS[getRandomNumber(0, DEFAULT_BG_COLORS.length - 1)],
    body: body !== undefined ? body : getRandomNumber(0, MAX_BODIES),
    dopeId: dopeId || getRandomHustlerId(),
    facialHair: facialHair !== undefined ? facialHair : getRandomNumber(0, MAX_FACIAL_HAIR),
    hair: hair !== undefined ? hair : getRandomNumber(0, MAX_HAIR),
    name: name || HUSTLER_NAMES[getRandomNumber(0, HUSTLER_NAMES.length - 1)],
    renderName: renderName || false,
    sex: sex || (HUSTLER_SEXES[getRandomNumber(0, 1)] as HustlerSex),
    textColor: textColor || '#000000',
    zoomWindow: zoomWindow || ZOOM_WINDOWS[2],
    isVehicle: isVehicle || true,
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
export const createConfig = (config: HustlerCustomization): SetMetadataStruct => {
  const { body, bgColor, facialHair, hair, name, renderName, sex, textColor, zoomWindow } = config;

  const setname = name ? name : '';
  const color = '0x' + textColor.slice(1) + 'ff';
  const background = '0x' + bgColor.slice(1) + 'ff';
  const bodyParts: [BigNumber, BigNumber, BigNumber, BigNumber] = [
    sex == 'male' ? BigNumber.from(0) : BigNumber.from(1),
    BigNumber.from(body),
    BigNumber.from(hair),
    sex == 'male' ? BigNumber.from(facialHair) : BigNumber.from(0),
  ];

  let bitoptions = 0;

  if (renderName) {
    // title
    bitoptions += 10;
    // name
    bitoptions += 100;
  }

  const options =
    '0x' +
    parseInt('' + bitoptions, 2)
      .toString(16)
      .padStart(4, '0');

  let bitmask = 11110110;
  if (setname.length > 0) {
    bitmask += 1;
  }

  if (zoomWindow[0].gt(0) || zoomWindow[0].gt(1) || zoomWindow[0].gt(2) || zoomWindow[0].gt(3)) {
    bitmask += 1000;
  }

  const mask =
    '0x' +
    parseInt('' + bitmask, 2)
      .toString(16)
      .padStart(4, '0');

  const metadata: SetMetadataStruct = {
    name: setname,
    color,
    background,
    options,
    viewbox: zoomWindow,
    body: bodyParts,
    order: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    mask,
  };

  return metadata;
};
