import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import ENS, { getEnsAddress } from '@ensdomains/ensjs';
import DesktopWindowTitleButton from 'components/DesktopWindowTitleButton';
import { formatLargeNumber } from 'src/utils';
import { Header, RightColumn, TitleBar, TitleBarDescription, ENSAddressWrapper } from './styles';

type WindowTitleBarProps = {
  title: string | undefined;
  isTouchDevice: boolean;
  isFullScreen: boolean;
  toggleFullScreen(): void;
  balance?: string;
  children: React.ReactNode;
};

const DesktopWindowTitleBar = ({
  title,
  isTouchDevice,
  isFullScreen,
  toggleFullScreen,
  balance,
  children,
}: WindowTitleBarProps) => {
  const [ensAddress, setEnsAddress] = useState<string | null>(null);
  const { account, library, chainId } = useWeb3React();
  const router = useRouter();

  const closeWindow = (): void => {
    router.replace('/');
  };

  useEffect(() => {
    const getEns = async () => {
      if (!account) {
        return null;
      }
      const ens = new ENS({ provider: library, ensAddress: getEnsAddress(chainId) });

      try {
        const name = await ens.getName(account);
        setEnsAddress(name?.name);
      } catch (error) {
        console.log(error);
        setEnsAddress(null);
      } finally {
        Promise.resolve();
      }
    };

    getEns();
  }, [account, chainId, library]);

  console.log({ balance });

  return (
    <div className="windowTitleBar">
      <Header>
        <TitleBar id="app-title-bar" onDoubleClick={() => toggleFullScreen()}>
          <div>
            <DesktopWindowTitleButton icon="close" title="Close Window" clickAction={closeWindow} />
          </div>
          <TitleBarDescription id="app-title-bar_description">
            {title || 'UNTITLED'}
          </TitleBarDescription>
          <RightColumn>
            {account && (
              <>
                {balance && <div>{formatLargeNumber(Number(120000))} $PAPER</div>}
                <span>|</span>
                <ENSAddressWrapper>{ensAddress}</ENSAddressWrapper>
              </>
            )}
            {!isTouchDevice && (
              <DesktopWindowTitleButton
                icon={isFullScreen ? 'window-restore' : 'window-maximize'}
                title={isFullScreen ? 'Minimize' : 'Maximize'}
                clickAction={toggleFullScreen}
              />
            )}
          </RightColumn>
        </TitleBar>
        {children}
      </Header>
    </div>
  );
};

export default DesktopWindowTitleBar;
