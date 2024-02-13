import { useOptimism } from 'hooks/web3';
import AppWindow, { AppWindowProps } from './AppWindow';
import DialogSwitchNetwork from 'components/DialogSwitchNetwork';
import { useIsOnOptimism } from 'hooks/web3';

const AppWindowOptimism = ({ children, ...rest }: AppWindowProps) => {
  useOptimism();
  const isOnOpNet = useIsOnOptimism();

  return (
    <AppWindow {...rest}>
      {!isOnOpNet && <DialogSwitchNetwork networkName="Optimism" />}
      {isOnOpNet && children}
    </AppWindow>
  );
};

export default AppWindowOptimism;
