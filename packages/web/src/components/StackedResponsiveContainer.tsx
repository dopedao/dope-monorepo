import styled from '@emotion/styled';
import { media } from 'ui/styles/mixins';

// Contains side-by-side columns on desktop, stacked items on mobile.
const StackedResponsiveContainer = styled.div`
  // Mobile phones just stack regularly with box layout
  display: block;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > div {
    margin-bottom: 16px;
    height: auto;
  }
  .panelFooter {
    flex: 0;
  }

  // Screen > Tablet display items side by side via FlexBox
  ${media.tablet`
    flex-direction: row;
    height: 100%;
    padding: 32px;
    gap: 16px;
    & > div {
      margin: 0;
      flex: 2;
      overflow-y: auto;
      height: 100%;
    }
    flex-flow: row nowrap;
      & > div:last-child {
        flex: 3;
      } 
    `}
`;

export default StackedResponsiveContainer;
