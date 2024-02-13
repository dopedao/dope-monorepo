import { useEthereum, useIsOnEthereum } from 'hooks/web3';
import AppWindow, { AppWindowProps } from './AppWindow';
import DialogSwitchNetwork from 'components/DialogSwitchNetwork';

const AppWindowEthereum = ({ children, ...rest }: AppWindowProps) => {
  useEthereum();
  const isOnEth = useIsOnEthereum();

  return (
    <AppWindow {...rest}>
      {!isOnEth && <DialogSwitchNetwork networkName="Ethereum" />}
      {isOnEth && children}
    </AppWindow>
  );
};

export default AppWindowEthereum;
