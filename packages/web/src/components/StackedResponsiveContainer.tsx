import styled from '@emotion/styled';
import { media } from 'ui/styles/mixins';

// Contains side-by-side columns on desktop, stacked items on mobile.
// Default, ratio is 1:2 with the left panel being more slim.
const StackedResponsiveContainer = styled.div`
  // Mobile phones just stack regularly with box layout
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  & > div {
    margin-bottom: 16px;
    height: auto;
  }

  // Screen > Tablet display items side by side via FlexBox
  ${media.tablet`
    height: 100%;
    padding: 32px;
    gap: 16px;
    flex-flow: row nowrap;
    & > div {
      margin: 0;
      flex: 1;
      overflow-y: auto;
    }
    & > div:last-child {
      flex: 2;
    } 
  `}
`;

export default StackedResponsiveContainer;
