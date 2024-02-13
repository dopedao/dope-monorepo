import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { useAccount, useChainId, useSwitchNetwork } from 'wagmi';
import { getEthersProvider } from './ethersProvider';
import { ChainIdContext } from 'providers/ChainIdProvider';

export const useContextualChainId = () => {
  const chainId = useContext(ChainIdContext);
  return chainId;
};

export const useIsOnEthereum = () => {
  const account = useAccount();
  const chainId = useContextualChainId();
  return useMemo(() => {
    return !(account && chainId !== 1 && chainId !== 42);
  }, [account, chainId]);
};

export const useEthereum = (): {
  chainId: 1 | 42;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const chainId: 1 | 42 = 1;
  const { error, isError, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (switchNetwork) {
      switchNetwork(chainId);
    }
  }, [switchNetwork]);

  return { chainId, isLoading, isError, error };
};

export const useIsOnOptimism = () => {
  const account = useAccount();
  const chainId = useContextualChainId();
  return useMemo(() => {
    return !(account && chainId !== 10 && chainId !== 69);
  }, [account, chainId]);
};

export const useOptimism = (): {
  chainId: 10 | 69;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const chainId: 10 | 69 = 10;
  const { error, isError, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (switchNetwork) {
      switchNetwork(chainId);
    }
  }, [switchNetwork]);

  return { chainId, isLoading, isError, error };
};

export const useIsContract = (account: string | null | undefined) => {
  const chainId = useContextualChainId();
  const provider = getEthersProvider({ chainId });
  const [isContract, setIsContract] = useState<boolean>();

  useEffect(() => {
    if (account) {
      provider.getCode(account).then(code => setIsContract(code !== '0x'));
    }
  }, [account, provider]);

  return isContract;
};
