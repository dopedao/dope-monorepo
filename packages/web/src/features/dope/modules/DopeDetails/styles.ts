import styled from '@emotion/styled';
import { media } from 'ui/styles/mixins';

export const FlexFiftyContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  // Mobile screens stack, 16px gap
  flex-flow: column nowrap;
  gap: 16px;
  // Makes containers stack on one full screen – no scroll
  & > div {
    flex: 1;
    overflow-y: auto;
  }
  & > div:last-child {
    flex: 2;
  }
  // Screen > Tablet display items side by side
  ${media.tablet`
& > div {
  flex: 1;
  overflow-y: auto;
}
flex-flow: row nowrap;
  & > div:last-child {
    flex: 1;
  } 
`}
`;
