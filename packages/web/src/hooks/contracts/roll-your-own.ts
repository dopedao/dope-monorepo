import { Abi } from 'starknet';
import { useContract, UseContract } from '@starknet-react/core';

import DOPEWARS from '../../abi/01_DopeWars.json';
import LocationOwned from '../../abi/02_LocationOwned.json';
import UserOwned from '../../abi/03_UserOwned.json';
import UserRegistry from '../../abi/04_UserRegistry.json';

export const RYO_ITEM_IDS: {
  [id: number]: number
} = {
  // weed
  6: 1,
  // cocaine
  65542: 2,
  // ludes
  131078: 3,
  // acid
  196614: 4,
  // speed
  262150: 5,
  // heroin
  327686: 6,
  // oxy
  393222: 7,
  // zoloft
  458758: 8,
  // fentanyl
  524294: 9,
  // krokodil
  589830: 10,
  // coke
  655366: 11,
  // crack
  720902: 12,
  // pcp
  786438: 13,
  // lsd
  851974: 14,
  // shrooms
  917510: 15,
  // soma
  983046: 16,
  // xanax
  1048582: 17,
  // molly
  1114118: 18,
  // adderall
  1179654: 19,
};

const RYO_LOCATIONS = {
  'The Bayou': ['Upriver', 'Highground', 'Platoon', 'Old Bridge'],
  Atlanta: ['Oakland City', 'West End', 'Grove Park', 'Adamsville'],
  Compton: ['Long Beach', 'Inglewood', 'Hollywood', 'Venice'],
  Oakland: ['Eastmont', 'Webster', 'Claremont', 'Piedmont'],
  SOMA: ['South Branch', 'Yerba Buena', 'Rincon Hill', 'Central'],
  'Hong Kong': ['Kowloon City', 'Wan Chai', 'Lan Kwai Fong', 'Chunking Mansions'],
  London: ['East End', 'Camden Town', 'Brixton', 'Elephant & Castle'],
  Chicago: ['Englewood', 'West Garfield Park', 'Lincoln Park', 'Beverly'],
  Brooklyn: ['Brownsville', 'Bushwick', 'Fort Greene', 'Brooklyn Heights'],
  Detroit: ['Van Steuban', 'Warrendale', 'Fiskorn', 'Palmer Woods'],
  'Mob Town': ['Grove Park', 'Riverside', 'Canton', 'Berea'],
  Murdertown: ['Pike Creek', 'Highland', 'Downtown', 'Wooster'],
  'Sin City': ['The Strip', 'Downtown', 'North Vegas', 'Green Valley'],
  'Big Smoke': ['Old Bridge', 'Dock Lands', 'Central', 'High Rise'],
  'The Backwoods': ['Old Town', 'Deep North', 'Hillside', 'West Rim'],
  'The Big Easy': ['Central City', 'Saint Roch', 'Audoubon', 'Uptown'],
  Queens: ['Long Island City', 'Ridgewood', 'Rochdale', 'Howard Beach'],
  BedStuy: ['Bedford', 'Stuyvesant Heights', 'Ocean Hill', 'Central'],
  Buffalo: ['Parkside', 'North Park', 'Kenfield', 'Emerson'],
};

/**
 * Load the DopeWars contract.
 * @returns The `DopeWars` contract or undefined.
 */
export function useDopeWarsContract(): UseContract {
  const contract = useContract({
    abi: DOPEWARS as Abi,
    address: '0x00be7e9dcc9a7baa62a755b9900da235a9eb99a310901c0eca00c3f011cf380d'
  })

  return contract
}

/**
 * Load the LocationOwned contract.
 * @returns The `LocationOwned` contract or undefined.
 */
export function useLocationOwnedContract(): UseContract {
  const contract = useContract({
    abi: LocationOwned as Abi,
    address: '0x05a70a60046e5a68b6aa462a6b19bbd46c79b519e65c208f634792607d5bb5ad'
  })

  return contract
}

/**
 * Load the UserOwned contract.
 * @returns The `UserOwned` contract or undefined.
 */
export function useUserOwnedContract(): UseContract {
  const contract = useContract({
    abi: UserOwned as Abi,
    address: "0x01bc4e832d9f5b7885cb9c0cdcec37b24dea18968a8aec0401ca2d9356cc1edc"
  })

  return contract;
}

/**
 * Load the UserRegistry contract.
 * @returns The `UserRegistry` contract or undefined.
 */
export function useUserRegistryContract(): UseContract {
  const contract = useContract({
    abi: UserRegistry as Abi,
    address: '0x04ba64675e055085167fd9011597ff3226cea1836bbc147382df6368e87d5ee5'
  })

  return contract
}
