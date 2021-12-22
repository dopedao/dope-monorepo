import styled from '@emotion/styled';
import { media } from 'ui/styles/mixins';

const Container = styled.div`
  padding: 16px 8px;
  // Important the immediate parent container for InfiniteScroll
  // is scrollable so it works properly.
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  .dopeGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }
  .dopeCard {
    max-height: auto;
  }
  ${media.tablet`
    padding: 16px 32px;
  `}
`;

export default Container;
