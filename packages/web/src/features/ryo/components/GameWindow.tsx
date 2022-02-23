import { useStarknet } from '@starknet-react/core';
import { AppWindowProps, AppWindowBody } from 'components/AppWindow';
import ConnectStarknetWallet from 'components/ConnectStarknetWallet';
import DesktopWindow from 'components/DesktopWindow';
import AppWindowFooter from 'components/AppWindowFooter';

const GameWindow = ({
  title,
  padBody = true,
  scrollable = true,
  width,
  height,
  children,
  footer,
  onlyFullScreen,
  fullScreen,
  background,
}: AppWindowProps) => {
  const { account } = useStarknet();

  return (
    <DesktopWindow
      title={title || 'DOPE WARS'}
      width={width || 375}
      height={height || 667}
      onlyFullScreen={onlyFullScreen}
      fullScreen={fullScreen}
      background={background}
    >
      {!account ? (
        <ConnectStarknetWallet />
      ) : (
        <AppWindowBody
          className="appWindowBody"
          background={background}
          scrollable={scrollable}
          padBody={padBody}
        >
          {children}
        </AppWindowBody>
      )}
      <AppWindowFooter>{footer}</AppWindowFooter>
    </DesktopWindow>
  );
};

export default GameWindow;
