import { media } from '../styles/mixins';
import { useWeb3React } from '@web3-react/core';
import AppWindowFooter from './AppWindowFooter';
import AppWindowTitleBar from './AppWindowTitleBar';
import ConnectWallet from './ConnectWallet';
import DesktopWindow from './DesktopWindow';
import React from 'react';
import styled from '@emotion/styled';

const AppWindowWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  ${media.tablet`
    width: 100%;
    height: 100%;
    margin: 0;
  `}
  ${media.laptop`
    width: 80%;
    max-width: 1024px;
    max-height: 768px;
    margin: auto;
    margin-top: 32px;
  `}

  background-color: #ffffff;
  padding: 0;
  border: 2px solid #000;
  filter: drop-shadow(8px 8px rgba(0, 0, 0, 0.15));
  display: flex;
  flex-direction: column;
`;

interface AppWindowProps {
  title?: string | undefined;
  requiresWalletConnection?: boolean;
  padBody?: boolean;
  children: React.ReactNode;
}

export default function AppWindow({
  title,
  requiresWalletConnection = false,
  padBody = true,
  children,
}: AppWindowProps) {
  const { account } = useWeb3React();

  return (
    <DesktopWindow title={title} titleChildren={<AppWindowTitleBar />} padBody={padBody}>
      {requiresWalletConnection === true && !account ? <ConnectWallet /> : <>{children}</>}
      <AppWindowFooter />
    </DesktopWindow>
  );
}
