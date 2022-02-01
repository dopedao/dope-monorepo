import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { getBreakpointWidth } from 'ui/styles/breakpoints';
import { useWeb3React } from '@web3-react/core';
import AppWindowFooter from 'components/AppWindowFooter';
import ConnectWallet from 'components/ConnectWallet';
import DesktopWindow from 'components/DesktopWindow';

export interface AppWindowProps {
  children: ReactNode;
  footer?: ReactNode;
  height?: number | string;
  navbar?: ReactNode;
  padBody?: boolean;
  requiresWalletConnection?: boolean;
  scrollable?: boolean;
  title?: string | undefined;
  width?: number | string;
  fullPage?: boolean;
  fullScreen?: boolean;
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
  overflow-y: ${({ scrollable }) => (scrollable ? 'scroll' : 'hidden')};
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
  children,
  navbar,
  footer,
  fullPage,
  fullScreen,
}: AppWindowProps) {
  const { account } = useWeb3React();

  return (
    <DesktopWindow
      title={title || 'DOPEWARS.EXE'}
      titleChildren={navbar}
      width={width}
      height={height}
      fullPage={fullPage}
      fullScreen={fullScreen}
    >
      {requiresWalletConnection && !account ? (
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
