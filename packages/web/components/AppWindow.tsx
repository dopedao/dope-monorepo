import React from 'react';
import { useWeb3React } from '@web3-react/core';
import styled from '@emotion/styled';
import { media } from '../styles/mixins';
import ConnectWallet from './ConnectWallet';
import AppWindowTitleBar from './AppWindowTitleBar';
import AppWindowFooter from './AppWindowFooter';

const AppWindowWrapper = styled.div`
  ${media.phone`
    width: 100%;
    height: 100vh;
    margin: 0;
  `}
  ${media.tablet`
    width: 100%;
    height: 100vh;
    margin: 0;
  `}
  ${media.laptop`
    width: 80%;
    max-width: 1024px;
    height: calc(100vh - 64px);
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

const AppWindowBody = styled.div`
  height: 100%;
  overflow: scroll;
  background-color: #a8a9ae;
  padding: 32px;
`;

interface AppWindowProps {
  requiresWalletConnection?: boolean;
  children: React.ReactNode;
}

export default function AppWindow({ requiresWalletConnection = false, children }: AppWindowProps) {
  const { account } = useWeb3React();

  return (
    <AppWindowWrapper>
      <AppWindowTitleBar />
      {requiresWalletConnection === true && !account ? (
        <ConnectWallet />
      ) : (
        <AppWindowBody>{children}</AppWindowBody>
      )}
      <AppWindowFooter />
    </AppWindowWrapper>
  );
}
