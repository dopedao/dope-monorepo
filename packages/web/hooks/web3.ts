import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const injected = new InjectedConnector({
  supportedChainIds: [1, 4],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: 'https://rinkeby.infura.io/v3/e5aa7a5479d34ead8cfbf074cf05fd67' },
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
