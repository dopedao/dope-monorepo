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
  onClose?: () => void;
  balance?: string;
  loadingBalance?: boolean;
  children: React.ReactNode;
  windowRef?: HTMLDivElement | null;
  hideWalletAddress?: boolean;
};

const DesktopWindowTitleBar = ({
  title,
  isTouchDevice,
  isFullScreen,
  toggleFullScreen,
  onClose,
  children,
  windowRef,
  hideWalletAddress = false,
}: WindowTitleBarProps) => {
  const [ensAddress, setEnsAddress] = useState<string | null>(null);
  const { account, library } = useWeb3React();
  const router = useRouter();
  const [balance, setBalance] = useState<BigNumber>();

  const paper = usePaper();

  useEffect(() => {
    let isMounted = true;
    if (account) {
      paper.balanceOf(account).then((value) => {
        if (isMounted) setBalance(value);
      });
    }
    return () => {isMounted = false};
  }, [paper, account]);

  const closeWindow = (): void => {
    // Allows us to call other logic to persist changes
    // if we have windows that appear multiple times…like on the Desktop Home
    if (onClose) onClose();
    if (router.pathname === '/' && windowRef) {
      // Close desktop window if one is open by default on home page
      windowRef.style.display = 'none';
    } else {
      router.replace('/');
    }
  };

  useEffect(() => {
    let isMounted = true;
    // No sense to do this work if no wallet address shown
    if (hideWalletAddress) return;
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

    if (isMounted) getEns();
    // Cleanup
    return () => {isMounted = false}
  }, [account, library, hideWalletAddress]);

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
            {!hideWalletAddress && (
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
