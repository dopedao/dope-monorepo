import styled from '@emotion/styled';

import { PageWrapper } from '../styles/components';

export default function Home() {
  return <IndexWrapper>
    This is the remix
  </IndexWrapper>;
}

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;
