import styled from '@emotion/styled';
import { media } from 'ui/styles/mixins';

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  // Mobile screens stack, 16px gap
  flex-flow: column nowrap;
  gap: 16px;
  & > div {
    flex: 1;
    overflow-y: auto;
  }
  & > div:last-child {
    flex: 2;
  }
  // Screen > Tablet display items side by side
  ${media.tablet`
    flex-flow: row nowrap;
    & > div:last-child {
      flex: 1;
    } 
  `}
`;

export default Container;
