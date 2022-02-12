import { useEffect, useState } from 'react';
import { useSwitchOptimism } from 'hooks/web3';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import AppWindow, { AppWindowProps } from './AppWindow';
import DialogSwitchNetwork from 'components/DialogSwitchNetwork';

const AppWindowOptimism = ({ children, ...rest }: AppWindowProps) => {
  const [showNetworkAlert, setShowNetworkAlert] = useState(false);
  const { account, chainId } = useWeb3React();

  useSwitchOptimism(chainId, account);

  useEffect(() => {
    const localNetworkAlert = localStorage.getItem('networkAlertOptimism');

    if (localNetworkAlert !== 'true') {
      setShowNetworkAlert(true);
    }
  }, []);

  const onProperNetwork = useMemo(() => {
    return !(account && chainId !== 10 && chainId !== 69 && showNetworkAlert);
  }, [account, chainId, showNetworkAlert]);

  return (
    <AppWindow {...rest}>
      {!onProperNetwork && <DialogSwitchNetwork networkName="Optimism" />}
      {onProperNetwork && children}
    </AppWindow>
  );
};

export default AppWindowOptimism;
