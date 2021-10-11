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
  scrollable?: boolean;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
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
  scrollable = true,
  width,
  height,
  children,
}: AppWindowProps) {
  const { account } = useWeb3React();

  const AppWindowBody = styled.div`
    position: relative;
    height: 100%;
    overflow: ${scrollable ? 'scroll' : 'hidden'};
    background-color: #a8a9ae;
    padding: ${padBody ? getBodyPadding() : '0px'};
  `;

  return (
    <DesktopWindow 
      title={title || 'DOPEWARS.EXE'} 
      titleChildren={<AppWindowTitleBar />}
      width={width}
      height={height}
    >
      {requiresWalletConnection === true && !account ? (
        <ConnectWallet />
      ) : (
        <AppWindowBody className="appWindowBody">{children}</AppWindowBody>
      )}
      <AppWindowFooter />
    </DesktopWindow>
  );
}
