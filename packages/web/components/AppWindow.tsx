import React from 'react';
import styled from '@emotion/styled';
import AppWindowTitleBar from './AppWindowTitleBar';
import AppWindowFooter from './AppWindowFooter';

const AppWindowWrapper = styled.div`
  position: relative;
  height: calc(100vh - 64px);
  width: 1024px;
  border: 2px solid #000;
  background-color: #ffffff;
  padding: 0;
  filter: drop-shadow(8px 8px rgba(0, 0, 0, 0.15));
  margin: 0 auto;
`;

const AppWindowBody = styled.div`
  max-height: calc(100vh - 64px - 74px);
  min-height: 500px;
  padding: 32px;
  background-color: #a8a9ae;
  overflow: scroll;
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
