import { getBreakpointWidth } from 'styles/breakpoints';
import { useWeb3React } from '@web3-react/core';
import AppWindowFooter from './AppWindowFooter';
import ConnectWallet from './ConnectWallet';
import DesktopWindow from './DesktopWindow';
import React from 'react';
import styled from '@emotion/styled';

interface AppWindowProps {
  balance?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  height?: number | string;
  loadingBalance?: boolean;
  navbar?: React.ReactNode;
  padBody?: boolean;
  requiresWalletConnection?: boolean;
  scrollable?: boolean;
  title?: string | undefined;
  width?: number | string;
}

const getBodyPadding = () => {
  const defaultBodyPadding = '16px';
  if (typeof window === 'undefined') {
    return defaultBodyPadding;
  }
  return window.innerWidth >= getBreakpointWidth('tablet') ? '32px' : defaultBodyPadding;
};

const AppWindowBody = styled.div<{ scrollable: boolean; padBody: boolean }>`
  position: relative;
  height: 100%;
  overflow: ${({ scrollable }) => (scrollable ? 'scroll' : 'hidden')};
  background-color: #a8a9ae;
  padding: ${({ padBody }) => (padBody ? getBodyPadding() : '0px')};
`;

export default function AppWindow({
  title,
  requiresWalletConnection = false,
  padBody = true,
  scrollable = true,
  width,
  height,
  balance,
  loadingBalance,
  children,
  navbar,
  footer,
}: AppWindowProps) {
  const { account } = useWeb3React();

  return (
    <DesktopWindow
      title={title || 'DOPEWARS.EXE'}
      titleChildren={navbar}
      width={width}
      height={height}
      balance={balance}
      loadingBalance={loadingBalance}
    >
      {requiresWalletConnection === true && !account ? (
        <ConnectWallet />
      ) : (
        <AppWindowBody className="appWindowBody" scrollable={scrollable} padBody={padBody}>
          {children}
        </AppWindowBody>
      )}
      <AppWindowFooter>{footer}</AppWindowFooter>
    </DesktopWindow>
  );
}
