import { PageWrapper } from 'styles/components';
import Head from 'components/Head';
import StickyNoteHustlerMint from 'components/StickyNoteHustlerMint';
import styled from '@emotion/styled';

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
