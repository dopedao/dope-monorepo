import { useEffect, useState } from 'react';
import { useSwitchEthereum } from 'hooks/web3';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import AppWindow, { AppWindowProps } from './AppWindow';
import DialogSwitchNetwork from 'components/DialogSwitchNetwork';

const AppWindowEthereum = ({ children, ...rest }: AppWindowProps) => {
  const [showNetworkAlert, setShowNetworkAlert] = useState(false);
  const { account, chainId } = useWeb3React();

  useSwitchEthereum(chainId, account);

  useEffect(() => {
    const localNetworkAlert = localStorage.getItem('networkAlertEthereum');

    if (localNetworkAlert !== 'true') {
      setShowNetworkAlert(true);
    }
  }, []);

  const onProperNetwork = useMemo(() => {
    return !(account && chainId !== 1 && chainId !== 42 && showNetworkAlert);
  }, [account, chainId, showNetworkAlert]);

  return (
    <AppWindow {...rest}>
      {!onProperNetwork && <DialogSwitchNetwork networkName="Ethereum" />}
      {onProperNetwork && children}
    </AppWindow>
  );
};

export default AppWindowEthereum;
