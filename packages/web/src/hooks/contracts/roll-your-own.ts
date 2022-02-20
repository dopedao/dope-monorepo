import { useEffect, useState } from 'react';
import { Contract, Abi } from 'starknet';
import { useStarknet } from '@starknet-react/core';

import DOPEWARS from '../../abi/01_DopeWars.json';
import LocationOwned from '../../abi/02_LocationOwned.json';
import UserOwned from '../../abi/03_UserOwned.json';
import UserRegistry from '../../abi/04_UserRegistry.json';

const MAP_RYO_ITEM_ID = {
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
        '0x0036e62e336e0bb1b26b036d4f92025f4682040bf77f6b38eb6837b0ada8bfa2',
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
        '0x005e07fea9b12b155d9c4651a5a1c5aa7c3e6cd5099c5ecf7d6af1518ee62ca4',
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
        '0x03a286c81e087aedc0a7a54fdd4da90a681f51bee3310a58423d019926f11a0c',
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
        '0x00559805d11dd8b96baca171027442d8725d82ed65d9096384d265683f1ff0db',
        library,
      ),
    );
  }, [library]);

  return contract;
}
