import { getBreakpointWidth } from '../styles/breakpoints';
import { useWeb3React } from '@web3-react/core';
import AppWindowFooter from './AppWindowFooter';
import AppWindowTitleBar from './AppWindowTitleBar';
import ConnectWallet from './ConnectWallet';
import DesktopWindow from './DesktopWindow';
import React from 'react';
import styled from '@emotion/styled';

interface AppWindowProps {
  title?: string | undefined;
  requiresWalletConnection?: boolean;
  padBody?: boolean;
  children: React.ReactNode;
}

const getBodyPadding = () => {
  const defaultBodyPadding = '16px';
  if (typeof window === 'undefined') {
    return defaultBodyPadding;
  }
  return window.innerWidth >= getBreakpointWidth('tablet') ? '32px' : defaultBodyPadding;
};

export default function AppWindow({
  title,
  requiresWalletConnection = false,
  padBody = true,
  children,
}: AppWindowProps) {
  const { account } = useWeb3React();

  const AppWindowBody = styled.div`
    position: relative;
    height: 100%;
    overflow: scroll;
    background-color: #a8a9ae;
    padding: ${padBody ? getBodyPadding() : '0px'};
  `;

  return (
    <DesktopWindow title={title || 'DOPEWARS.EXE'} titleChildren={<AppWindowTitleBar />}>
      {requiresWalletConnection === true && !account ? (
        <ConnectWallet />
      ) : (
        <AppWindowBody>{children}</AppWindowBody>
      )}
      <AppWindowFooter />
    </DesktopWindow>
  );
}
