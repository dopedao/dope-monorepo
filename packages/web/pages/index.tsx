import styled from '@emotion/styled';
import Head from '../components/Head';
import { PageWrapper } from '../styles/components';

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;

export default () => {
  return (
    <IndexWrapper>
      <Head />
    </IndexWrapper>
  );
};
