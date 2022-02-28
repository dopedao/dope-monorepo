import { media } from 'ui/styles/mixins';
import styled from '@emotion/styled';

const IconGrid = styled.div`
  position: fixed;
  z-index: 0;
  left: 0px;
  display: flex;
  // Default
  width: 100%;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  bottom: 32px;
  gap: 24px;
  padding: 24px;
  ${media.tablet`
    top: 32px;
    bottom: unset;
    align-items: flex-start;
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
