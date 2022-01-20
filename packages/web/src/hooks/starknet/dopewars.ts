import React from 'react';
import { Contract, Abi } from 'starknet';
import { useStarknet } from './StarknetProvider';

import DOPEWARS from '../../abi/01_DopeWars.json';

const ADDRESS = '0x06ab912fbcc27c3f6ed4d998f2cc56fc65ab4fa6796259fc1855a099b0c92804';

/**
 * Load the DopeWars contract.
 * @returns The `DopeWars` contract or undefined.
 */
export function useDopeWarsContract(): Contract | undefined {
  const { library } = useStarknet();
  const [contract, setContract] = React.useState<Contract | undefined>(undefined);

  React.useEffect(() => {
    setContract(new Contract(DOPEWARS as Abi[], ADDRESS, library));
  }, [library]);

  return contract;
}
