import React from 'react';
import styled from '@emotion/styled';
import { PageWrapper } from '../styles/components';
import AppWindowTitleBar from './AppWindowTitleBar';
import AppWindowFooter from './AppWindowFooter';

const AppWindowWrapper = styled(PageWrapper)`
  width: 1024px;
  border: 2px solid #000;
  background-color: #ffffff;
  padding: 0;
  filter: drop-shadow(8px 8px rgba(0,0,0, 0.15));
  position: absolute;
  top: 64px;
  left: 128px;
`;

const AppWindowBody = styled(PageWrapper)`
  min-height: 500px;
  padding: 32px;
  background-color: #A8A9AE;
`;

interface AppWindowProps {
  children: React.ReactNode;
};

export default function AppWindow(props: AppWindowProps) {
  return (
    <AppWindowWrapper>
      <AppWindowTitleBar />
      <AppWindowBody>{ props.children }</AppWindowBody>
      <AppWindowFooter />
    </AppWindowWrapper>
  );
};
