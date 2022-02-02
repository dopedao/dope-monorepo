/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { ethers, BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import ENS, { getEnsAddress } from '@ensdomains/ensjs';
import { formatLargeNumber, getShortAddress } from 'utils/utils';
import DesktopWindowTitleButton from 'components/DesktopWindowTitleButton';
import { Header, RightColumn, TitleBar, TitleBarDescription, ENSAddressWrapper } from './styles';
import { usePaper } from 'hooks/contracts';

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
  children,
}: WindowTitleBarProps) => {
  const [ensAddress, setEnsAddress] = useState<string | null>(null);
  const { account, library } = useWeb3React();
  const router = useRouter();
  const [balance, setBalance] = useState<BigNumber>();

  const paper = usePaper();

  useEffect(() => {
    if (account) {
      paper.balanceOf(account).then(setBalance);
    }
  }, [paper, account]);

  const closeWindow = (): void => {
    router.replace('/');
  };

  useEffect(() => {
    const getEns = async () => {
      if (!account) {
        return null;
      }

      try {
        const ens = new ENS({ provider: library, ensAddress: getEnsAddress(1) });
        const name = await ens.getName(account);
        setEnsAddress(name?.name);
      } catch (error) {
        setEnsAddress(null);
      } finally {
        Promise.resolve();
      }
    };

    getEns();
  }, [account, library]);

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
            <div
              css={css`
                cursor: pointer;
                cursor: hand;
                white-space: nowrap;
                display: flex;
              `}
              onClick={() => router.replace('/wallet')}
            >
              {account && (
                <>
                  {balance === undefined ? (
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
            </div>
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
