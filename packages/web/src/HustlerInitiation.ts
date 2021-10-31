
// For storing state relating to initiating a hustler
import { makeVar } from '@apollo/client';
import { getRandomNumber } from './utils';
const randomHustlerId = getRandomNumber(8001, 20000).toString();

export const HustlerIdToInitiate = makeVar(randomHustlerId);
