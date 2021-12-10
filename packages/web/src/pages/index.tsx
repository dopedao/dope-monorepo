import styled from '@emotion/styled';
import { PageWrapper } from 'styles/components';
import Head from 'components/Head';
import StickyNoteHustlerMint from 'components/StickyNoteHustlerMint';

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;

const IndexPage = () => (
  <IndexWrapper>
    <Head />
    <StickyNoteHustlerMint />
  </IndexWrapper>
);

export default IndexPage;
