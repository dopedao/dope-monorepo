// For storing state relating to initiating a hustler
import { Dispatch, SetStateAction } from 'react';
import { IHustlerActions } from '@dopewars/contracts/dist/Initiator';
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

export type ZoomWindow = [bigint, bigint, bigint, bigint];
export const ZOOM_WINDOWS = [
  [0n, 0n, 0n, 0n] as ZoomWindow, // default
  [135n, 15n, 60n, 100n] as ZoomWindow, // mugshot
  [40n, 110n, 255n, 100n] as ZoomWindow, // vehicle
  // This view will crop certain vehicles like Lowrider,
  // but shows other at higher resolution. A decent tradeoff.
  [70n, 110n, 210n, 100n] as ZoomWindow, // vehicle bigger zoom
  [0n, 0n, 320n, 320n] as ZoomWindow, // full body
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
  showVehicle: bool;
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
  showVehicle,
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
    showVehicle: showVehicle || true,
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
export const createConfig = (config: HustlerCustomization): IHustlerActions.SetMetadataStruct => {
  const { body, bgColor, facialHair, hair, name, renderName, sex, textColor, zoomWindow } = config;

  const setname = name ? name.replaceAll(`"`, `'`) : '';
  const color = `0x${textColor.slice(1)}ff`;
  const background = `0x${bgColor.slice(1)}ff`;
  const bodyParts: [bigint, bigint, bigint, bigint] = [
    sex === 'male' ? 0n : BigInt(1),
    BigInt(body),
    BigInt(hair),
    sex === 'male' ? BigInt(facialHair) : 0n,
  ];

  let bitoptions = 0;

  if (renderName) {
    // title
    bitoptions += 10;
    // name
    bitoptions += 100;
  }

  const options = `0x${parseInt(`${bitoptions}`, 2).toString(16).padStart(4, '0')}`;

  let bitmask = 11110110;
  if (setname.length > 0) {
    bitmask += 1;
  }

  if (zoomWindow[0] > 0 || zoomWindow[0] > 1 || zoomWindow[0] > 2 || zoomWindow[0] > 3) {
    bitmask += 1000;
  }

  const mask = `0x${parseInt(`${bitmask}`, 2).toString(16).padStart(4, '0')}`;

  const metadata: IHustlerActions.SetMetadataStruct = {
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
