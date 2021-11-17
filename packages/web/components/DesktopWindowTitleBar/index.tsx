/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import ENS, { getEnsAddress } from '@ensdomains/ensjs';
import DesktopWindowTitleButton from 'components/DesktopWindowTitleButton';
import { formatLargeNumber, getShortAddress } from 'src/utils';
import { media } from 'styles/mixins';
import { Header, RightColumn, TitleBar, TitleBarDescription, ENSAddressWrapper } from './styles';

type WindowTitleBarProps = {
  title: string | undefined;
  isTouchDevice: boolean;
  isFullScreen: boolean;
  toggleFullScreen(): void;
  balance?: string;
  loadingBalance?: boolean;
  children: React.ReactNode;
};

const DesktopWindowTitleBar = ({
  title,
  isTouchDevice,
  isFullScreen,
  toggleFullScreen,
  balance,
  loadingBalance,
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
      if (!account || chainId === 42) {
        return null;
      }
      const ens = new ENS({ provider: library, ensAddress: getEnsAddress(chainId) });

      try {
        const name = await ens.getName(account);
        setEnsAddress(name?.name);
      } catch (error) {
        setEnsAddress(null);
      } finally {
        Promise.resolve();
      }
    };

    getEns();
  }, [account, chainId, library]);

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
                {loadingBalance ? (
                  <div>__.__ $PAPER</div>
                ) : (
                  <div>
                    {balance ? formatLargeNumber(Number(ethers.utils.formatEther(balance))) : 0}{' '}
                    $PAPER
                  </div>
                )}
                <span>|</span>
                <ENSAddressWrapper>{ensAddress || getShortAddress(account)}</ENSAddressWrapper>
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
