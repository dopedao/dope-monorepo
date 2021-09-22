import { media } from '../styles/mixins';
import { useWeb3React } from '@web3-react/core';
import AppWindowFooter from './AppWindowFooter';
import AppWindowTitleBar from './AppWindowTitleBar';
import ConnectWallet from './ConnectWallet';
import Draggable from 'react-draggable';
import React from 'react';
import styled from '@emotion/styled';
import ConditionalWrapper from './ConditionalWrapper';

const AppWindowWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
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

interface AppWindowProps {
  requiresWalletConnection?: boolean;
  padBody?: boolean;
  children: React.ReactNode;
}

export default function AppWindow({
  requiresWalletConnection = false,
  padBody = true,
  children,
}: AppWindowProps) {
  const { account } = useWeb3React();

  const AppWindowBody = styled.div`
    height: 100%;
    overflow: scroll;
    background-color: #a8a9ae;
    padding: ${padBody ? '32px' : '0px'};
  `;

  const isTouchDevice = () => {
    if(typeof window === 'undefined') {
      return false;
    }
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  };
    
  return (
    <ConditionalWrapper
      condition={!isTouchDevice()}
      wrap={children => <Draggable handle=".appWindowTitleBar">{children}</Draggable>}
    >
      <AppWindowWrapper>
        <AppWindowTitleBar />
        {requiresWalletConnection === true && !account ? (
          <ConnectWallet />
        ) : (
          <AppWindowBody>{children}</AppWindowBody>
        )}
        <AppWindowFooter />
      </AppWindowWrapper>
    </ConditionalWrapper>
  );
}
