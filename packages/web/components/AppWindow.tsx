import React from 'react';
import styled from '@emotion/styled';
import { PageWrapper } from '../styles/components';
import { Header } from './Header';
import { Footer } from './Footer';

const AppWindowWrapper = styled(PageWrapper)`
  // max-width: var(--content-width-xl);
  width: 100%;
  background-color: #ffffff;
  padding: 0;
  margin: 2vh;
  border: 2px solid #000;
  filter: drop-shadow(8px 8px rgba(0,0,0, 0.15));
`;

interface AppWindowProps {
  children: React.ReactNode;
}

export default function AppWindow(props: AppWindowProps) {
  return (
    <AppWindowWrapper>
      <Header />
      { props.children }
      <Footer />
    </AppWindowWrapper>
  );
}
