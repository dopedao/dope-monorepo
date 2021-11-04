
// For storing state relating to initiating a hustler
import { makeVar } from '@apollo/client';
import { getRandomNumber } from './utils';

const HUSTLER_SEXES = ['male', 'female'];
type HustlerSex = 'male' | 'female';

interface HustlerCustomization {
  mint_og: boolean;
  dope_id: string;
  sex: HustlerSex;
  body: number;
  hair: number;
  facialHair: number;
}

/**
 * Set random ID > NUM_DOPE_TOKENS because we use this 
 * as a check to see if it was set randomly or intentionally 
 * elsewhere in the code.
 */
export function getRandomHustlerId(): string {
  return getRandomNumber(8001, 20000).toString();
}

export function getRandomHustler(): HustlerCustomization {
  return {
    mint_og: false,
    dope_id: getRandomHustlerId(),
    sex: HUSTLER_SEXES[getRandomNumber(0,1)] as HustlerSex,
    body: 0,
    hair: 0,
    facialHair: 0
  };
};

export const HustlerInitConfig = makeVar(getRandomHustler());
