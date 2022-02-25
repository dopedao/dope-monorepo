import { media } from 'ui/styles/mixins';
import styled from '@emotion/styled';

const IconGrid = styled.div`
  position: fixed;
  z-index: 0;
  left: 0px;
  top: 16px;
  display: flex;
  // Default
  width: auto;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  padding: 32px;
  ${media.tablet`
    justify-content: flex-start;
    width: 50%;
  `}
  ${media.laptop`
    gap: 32px;
    padding: 32px;
    // flex-flow: column wrap;
    // justify-content: flex-start;
    // align-items: flex-start;
  `}
`;

export default IconGrid;
