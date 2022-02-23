import { useEffect, useState } from 'react';
import { Contract, Abi } from 'starknet';
import { useStarknet } from '@starknet-react/core';

import DOPEWARS from '../../abi/01_DopeWars.json';
import LocationOwned from '../../abi/02_LocationOwned.json';
import UserOwned from '../../abi/03_UserOwned.json';
import UserRegistry from '../../abi/04_UserRegistry.json';

const RYO_ITEM_IDS = {
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
export function useDopeWarsContract(): Contract | undefined {
  const { library } = useStarknet();
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  useEffect(() => {
    setContract(
      new Contract(
        DOPEWARS as Abi[],
        '0x02e819f964b0e31300bb97c7571d4fc2d3952837ad4826bb7d252603741d3805',
        library,
      ),
    );
  }, [library]);

  return contract;
}

/**
 * Load the LocationOwned contract.
 * @returns The `LocationOwned` contract or undefined.
 */
export function useLocationOwnedContract(): Contract | undefined {
  const { library } = useStarknet();
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  useEffect(() => {
    setContract(
      new Contract(
        LocationOwned as Abi[],
        '0x02a43a37fb3c24859e460483f39b94279a47cd3856849399e5deec406305bbfb',
        library,
      ),
    );
  }, [library]);

  return contract;
}

/**
 * Load the UserOwned contract.
 * @returns The `UserOwned` contract or undefined.
 */
export function useUserOwnedContract(): Contract | undefined {
  const { library } = useStarknet();
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  useEffect(() => {
    setContract(
      new Contract(
        UserOwned as Abi[],
        '0x020468fd2c028f56c30cdc807848d25eaa027076302ace30d722ef7400e4afbc',
        library,
      ),
    );
  }, [library]);

  return contract;
}

/**
 * Load the UserRegistry contract.
 * @returns The `UserRegistry` contract or undefined.
 */
export function useUserRegistryContract(): Contract | undefined {
  const { library } = useStarknet();
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  useEffect(() => {
    setContract(
      new Contract(
        UserRegistry as Abi[],
        '0x023c010a16d330407bec66548a71f9cf3c8d7c16dcc74a79e67ea80efb04890c',
        library,
      ),
    );
  }, [library]);

  return contract;
}
