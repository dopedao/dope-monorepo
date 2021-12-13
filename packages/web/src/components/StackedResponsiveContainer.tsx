import styled from '@emotion/styled';
import { media } from 'ui/styles/mixins';

// Contains side-by-side columns on desktop, stacked items on mobile.
const StackedResponsiveContainer = styled.div`
  // Mobile phones just stack regularly with box layout
  display: block;
  padding: 32px;

  & > div {
    margin-bottom: 16px;
  }

  // Screen > Tablet display items side by side via FlexBox
  ${media.tablet`
    height: 100%;
    display: flex;
    justify-content: center;
    // Mobile screens stack, 16px gap  
    gap: 16px;
    & > div {
      margin: 0;
      flex: 1;
      overflow-y: auto;
    }
    flex-flow: row nowrap;
      & > div:last-child {
        flex: 1;
      } 
    `}
`;

export default StackedResponsiveContainer;
