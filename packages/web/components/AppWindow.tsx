import styled from '@emotion/styled';
import { PageWrapper } from '../styles/components';
import { Header } from './Header';
import { Footer } from './Footer';

const AppWindowWrapper = styled(PageWrapper)`
  // max-width: var(--content-width-xl);
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  padding: 0;
  margin: 2vh;
  border: 2px solid #000;
`;

export default function AppWindow({ children }) {
  return (
    <AppWindowWrapper>
      <Header />
      { children }
      <Footer />
    </AppWindowWrapper>
  );
}
