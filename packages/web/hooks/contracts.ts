import { useEffect, useMemo, useState } from 'react';
import {
  CrossDomainMessenger__factory,
  Controller__factory,
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

export const useController = () => {
  const { chainId, provider } = useOptimism();

  return useMemo(
    () => Controller__factory.connect(NETWORK[chainId].contracts.controller, provider),
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

export const useCrossDomainMessenger = () => {
  const { chainId, provider } = useOptimism();

  return useMemo(
    () =>
      CrossDomainMessenger__factory.connect('0x4200000000000000000000000000000000000007', provider),
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

export const useReleaseDate = (): Date | undefined => {
  const [releaseDate, setReleaseDate] = useState<Date>();
  const initator = useInitiator();

  useEffect(() => {
    initator.release().then(date => setReleaseDate(new Date(date.toNumber() * 1000)));
  }, [initator]);

  return releaseDate;
};
