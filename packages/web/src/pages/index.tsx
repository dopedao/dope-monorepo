import styled from '@emotion/styled';
import { PageWrapper } from 'ui/styles/components';
import Head from 'components/Head';
// import StickyNoteHustlerMint from 'components/StickyNoteHustlerMint';
import StickyNoteLunarAirdrop from 'components/StickyNoteLunarAirdrop';


const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;

const IndexPage = () => (
  <IndexWrapper>
    <Head />
    {/* <StickyNoteHustlerMint /> */}
    <StickyNoteLunarAirdrop />
  </IndexWrapper>
);

export default IndexPage;
