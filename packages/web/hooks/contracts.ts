import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  Paper__factory,
  Initiator__factory,
  Hustler__factory,
  SwapMeet__factory,
} from '@dopewars/contracts';

import { NETWORK } from 'src/constants';
import { useEthereum, useOptimism } from 'hooks/web3';

export const useInitiator = () => {
  const { chainId, provider } = useEthereum();
  return useMemo(
    () => Initiator__factory.connect(NETWORK[chainId].contracts.initiator, provider),
    [chainId, provider],
  );
};

export const usePaper = () => {
  const { chainId, provider } = useEthereum();
  return useMemo(
    () => Paper__factory.connect(NETWORK[chainId].contracts.paper, provider),
    [chainId, provider],
  );
};

export const useSwapMeet = () => {
  const { chainId, provider } = useOptimism();

  return useMemo(
    () => SwapMeet__factory.connect(NETWORK[chainId].contracts.swapmeet, provider),
    [chainId, provider],
  );
};

export const useHustler = () => {
  const { chainId, provider } = useOptimism();

  return useMemo(
    () => Hustler__factory.connect(NETWORK[chainId].contracts.hustlers, provider),
    [chainId, provider],
  );
};

export const useReleaseDate = () => {
  const initator = useInitiator();
  return useMemo(async () => {
    const release = await initator?.release();
    return release;
  }, [initator]);
};
