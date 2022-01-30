import { media } from 'ui/styles/mixins';
import styled from '@emotion/styled';

const IconGrid = styled.div`
  position: fixed;
  z-index: 0;
  bottom: 0px;
  left: 0px;
  top: 16px;
  display: flex;
  // Default
  width: auto;
  height: 100%;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  ${media.tablet`
    gap: 16px;
    padding: 16px;
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
