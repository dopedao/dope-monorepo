import styled from '@emotion/styled';
import Head from 'components/Head';
import { PageWrapper } from 'styles/components';

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;

const IndexPage = () => (
  <IndexWrapper>
    <Head />
  </IndexWrapper>
);

export default IndexPage;
