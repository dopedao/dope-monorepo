import styled from '@emotion/styled';
import { media } from 'ui/styles/mixins';

// Contains side-by-side columns on desktop, stacked items on mobile.
const StackedResponsiveContainer = styled.div`
  // Mobile phones just stack regularly with box layout
  display: block;

  & > div {
    margin-bottom: 16px;
  }

  // Screen > Tablet display items side by side via FlexBox
  ${media.tablet`
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 32px;
    padding-top: 64px;
    gap: 16px;
    & > div {
      margin: 0;
      flex: 2;
      overflow-y: auto;
    }
    flex-flow: row nowrap;
      & > div:last-child {
        flex: 3;
      } 
    `}
`;

export default StackedResponsiveContainer;
