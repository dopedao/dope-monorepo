import React from 'react';
import styled from '@emotion/styled';
import { media } from "../styles/mixins";
import AppWindowTitleBar from './AppWindowTitleBar';
import AppWindowFooter from './AppWindowFooter';

const AppWindowWrapper = styled.div`
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


  // 
  background-color: #ffffff;
  padding: 0;
  border: 2px solid #000;
  filter: drop-shadow(8px 8px rgba(0, 0, 0, 0.15));
`;

const AppWindowBody = styled.div`
  height: 100%;
  overflow: scroll;
  padding: 32px;
  background-color: #a8a9ae;
`;

interface AppWindowProps {
  children: React.ReactNode;
}

export default function AppWindow(props: AppWindowProps) {
  return (
    <AppWindowWrapper>
      <AppWindowTitleBar />
      <AppWindowBody>{props.children}</AppWindowBody>
      <AppWindowFooter />
    </AppWindowWrapper>
  );
}
