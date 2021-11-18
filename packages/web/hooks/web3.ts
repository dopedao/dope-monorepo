import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { providers } from 'ethers';
import { provider } from 'aws-sdk/lib/credentials/credential_provider_chain';

const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 42, 69],
});

const rpc = {
  1: 'https://eth-mainnet.alchemyapi.io/v2/4YF7OoE2seG3X12m9bfIJdiRv2zwUaAx',
  10: 'https://opt-mainnet.g.alchemy.com/v2/k8J6YaoTtJVIs4ZxTo26zIPfBiCveX2m',
  42: 'https://eth-kovan.alchemyapi.io/v2/UloBYQ33fXVpI0WFONXO-CgTl4uy93T6',
  69: 'https://opt-kovan.g.alchemy.com/v2/GAJJKOHOzfVI1jmgOf2OcL--sj4Yyedg',
};

export const useRPCProvider = (id: 1 | 10 | 42 | 69) =>
  useMemo<providers.JsonRpcProvider>(() => new providers.JsonRpcProvider(rpc[id]), []);

export const useEthereum = (): {
  chainId: 1 | 42;
  provider: providers.JsonRpcProvider;
} => {
  // Default to mainnet
  let rpcProvider = useRPCProvider(1);
  const [provider, setProvider] = useState<providers.JsonRpcProvider>(rpcProvider);
  const { chainId, library } = useWeb3React();

  let ethChainId: 1 | 42 = 1;
  if (!chainId || chainId === 10) {
    ethChainId = 1;
  } else if (chainId === 1 || chainId === 42) {
    ethChainId = chainId;
  } else if (chainId === 69) {
    ethChainId = 42;
  }

  rpcProvider = useRPCProvider(ethChainId);

  useEffect(() => {
    if (chainId && chainId === ethChainId) {
      setProvider(library.getSigner());
    } else {
      setProvider(rpcProvider);
    }
  }, [chainId, ethChainId, rpcProvider]);

  return { provider, chainId: ethChainId };
};

export const useOptimism = (): {
  chainId: 10 | 69;
  provider: providers.JsonRpcProvider;
} => {
  // Default to optimism mainnet
  let rpcProvider = useRPCProvider(10);
  const [provider, setProvider] = useState<providers.JsonRpcProvider>(rpcProvider);
  const { chainId, library } = useWeb3React();

  let optimismChainId: 10 | 69 = 10;
  if (!chainId || chainId === 1) {
    optimismChainId = 10;
  } else if (chainId === 10 || chainId === 69) {
    optimismChainId = chainId;
  } else if (chainId === 42) {
    optimismChainId = 69;
  }

  rpcProvider = useRPCProvider(optimismChainId);

  useEffect(() => {
    if (chainId && chainId === optimismChainId) {
      setProvider(library.getSigner());
    } else {
      setProvider(rpcProvider);
    }
  }, [chainId, optimismChainId, rpcProvider]);

  return { provider, chainId: optimismChainId };
};

export const walletconnect = new WalletConnectConnector({
  rpc,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

const useWeb3Provider = (): {
  connect: (wallet: 'MetaMask' | 'WalletConnect') => Promise<void>;
} => {
  const { activate } = useWeb3React();

  const connect = useCallback(
    async (wallet: 'MetaMask' | 'WalletConnect'): Promise<void> => {
      const connector = wallet === 'MetaMask' ? injected : walletconnect;

      try {
        await activate(connector, undefined, true);
      } catch (error) {
        return Promise.reject(error);
      }

      return Promise.resolve();
    },
    [activate],
  );

  return { connect };
};

export const useEagerConnect = () => {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally only running on mount

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};

export const useInactiveListener = (suppress: boolean = false) => {
  const { active, error, activate } = useWeb3React();

  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        // console.log("Handling 'connect' event")
        activate(injected);
      };
      const handleChainChanged = (chainId: string | number) => {
        // console.log("Handling 'chainChanged' event with payload", chainId)
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        // console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        // console.log("Handling 'networkChanged' event with payload", networkId)
        activate(injected);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
};

export const useWAGMI = () => {
  const { connector } = useWeb3React<Web3Provider>();
  const [activatingConnector, setActivatingConnector] = useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager || !!activatingConnector);
};

export default useWeb3Provider;
