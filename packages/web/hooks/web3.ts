import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
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

const useWeb3Provider = () => {
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

export default useWeb3Provider;
