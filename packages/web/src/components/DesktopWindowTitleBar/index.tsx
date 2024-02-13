/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { formatLargeNumber, getShortAddress } from 'utils/utils';
import DesktopWindowTitleButton from 'components/DesktopWindowTitleButton';
import { Header, RightColumn, TitleBar, TitleBarDescription, ENSAddressWrapper } from './styles';
import { usePaper } from 'hooks/contracts';
import { Box, Image } from '@chakra-ui/react';
import { useAccount, useEnsName } from 'wagmi';
import { NoSSR } from 'components/NoSSR';
import { NextRouter } from 'next/router';

type WindowTitleBarProps = {
  title: string | undefined;
  isTouchDevice: boolean;
  isFullScreen: boolean;
  toggleFullScreen(): void;
  onClose?: () => void;
  children: React.ReactNode;
  windowRef?: HTMLDivElement | null;
  hideWalletAddress?: boolean;
};

const WalletBalance = ({
  address,
  router,
}: {
  address: `0x${string}` | undefined;
  router: NextRouter;
}) => {
  const [balance, setBalance] = useState<bigint>();

  const { isSuccess: ensSuccess, data: ensName } = useEnsName({
    address,
    chainId: 1,
  });
  const paper = usePaper();

  useEffect(() => {
    let isMounted = true;
    if (address) {
      paper.balanceOf(address).then(value => {
        if (isMounted) setBalance(value);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [paper, address]);

  return (
    <Box
      css={css`
        cursor: pointer;
        cursor: hand;
        white-space: nowrap;
        display: flex;
      `}
      onClick={() => router.replace('/wallet')}
    >
      {address && (
        <>
          {balance === undefined ? (
            <Box>__.__ $PAPER</Box>
          ) : (
            <Box>{balance ? formatLargeNumber(Number(ethers.formatEther(balance))) : 0} $PAPER</Box>
          )}
          <span>|</span>
          <ENSAddressWrapper>
            {ensSuccess && ensName ? ensName : getShortAddress(address)}
          </ENSAddressWrapper>
        </>
      )}
      {!address && (
        <DesktopWindowTitleButton
          icon={'ethereum-white'}
          title={'Connect'}
          clickAction={() => {}}
        />
      )}
    </Box>
  );
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
  const { address } = useAccount();
  const router = useRouter();

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

  return (
    <Box className="windowTitleBar">
      <Header>
        <TitleBar id="app-title-bar" onDoubleClick={() => toggleFullScreen()}>
          <Box>
            <DesktopWindowTitleButton icon="close" title="Close Window" clickAction={closeWindow} />
          </Box>
          <TitleBarDescription id="app-title-bar_description">
            {title || 'UNTITLED'}
          </TitleBarDescription>
          <RightColumn>
            {!hideWalletAddress && (
              <NoSSR>
                <WalletBalance address={address} router={router} />
              </NoSSR>
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
    </Box>
  );
};

export default DesktopWindowTitleBar;
