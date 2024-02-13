import styled from '@emotion/styled';
import { media } from 'ui/styles/mixins';

const Container = styled.div`
  // Important the immediate parent container for InfiniteScroll
  // is scrollable, with height set properly so it works.
  min-height: 100%;
  height: 100%;
  overflow-y: scroll;
  // overflow-x: hidden;
  padding: 16px 16px;
  padding-bottom: 128px;
  .cardGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }
  .dopeCard {
    max-height: auto;
  }
  ${media.tablet`
    
  `}
`;

export default Container;
