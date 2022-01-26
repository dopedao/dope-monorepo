import { useMemo } from 'react';

import { NETWORK } from 'utils/constants';
import { useEthereum, useOptimism } from 'hooks/web3';

export const useOptimismClient = () => {
  const { chainId } = useOptimism();

  const uri = useMemo(
    () => (chainId ? NETWORK[chainId as 10 | 69].subgraph : NETWORK[10].subgraph),
    [chainId],
  );

  return uri;
};

export const useEthereumClient = () => {
  const { chainId } = useEthereum();

  const uri = useMemo(
    () => (chainId ? NETWORK[chainId as 1 | 42].subgraph : NETWORK[1].subgraph),
    [chainId],
  );

  return uri;
};
