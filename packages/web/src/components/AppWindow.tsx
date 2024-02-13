import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { getBreakpointWidth } from 'ui/styles/breakpoints';
import { useAccount } from 'wagmi';
import AppWindowFooter from 'components/AppWindowFooter';
import Account from 'components/web3account/Account';
import DesktopWindow from 'components/DesktopWindow';
import { NoSSR } from './NoSSR';

export interface AppWindowProps {
  background?: string;
  children: ReactNode;
  footer?: ReactNode;
  height?: number | string;
  navbar?: ReactNode;
  padBody?: boolean;
  requiresWalletConnection?: boolean;
  scrollable?: boolean;
  title?: string | undefined;
  width?: number | string;
  onlyFullScreen?: boolean;
  fullScreen?: boolean;
}

export const getBodyPadding = () => {
  const defaultBodyPadding = '16px';
  if (typeof window === 'undefined') {
    return defaultBodyPadding;
  }
  return window.innerWidth >= getBreakpointWidth('tablet') ? '32px' : defaultBodyPadding;
};

export const AppWindowBody = styled.div<{
  scrollable: boolean;
  padBody: boolean;
  background: string | undefined;
}>`
  position: relative;
  height: 100%;
  overflow-y: ${({ scrollable }) => (scrollable ? 'scroll' : 'hidden')};
  overflow-x: hidden;
  background: ${({ background }) => (background ? background : '#a8a9ae')}
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
  onlyFullScreen,
  fullScreen,
  background,
}: AppWindowProps) {
  const { address: account } = useAccount();

  return (
    <DesktopWindow
      title={title || 'DOPE WARS'}
      titleChildren={navbar}
      width={width}
      height={height}
      onlyFullScreen={onlyFullScreen}
      fullScreen={fullScreen}
      background={background}
    >
      <NoSSR>
        {requiresWalletConnection && !account ? (
          <Account />
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
      </NoSSR>
      <AppWindowFooter>{footer}</AppWindowFooter>
    </DesktopWindow>
  );
}
