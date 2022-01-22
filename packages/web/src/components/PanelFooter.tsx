import styled from '@emotion/styled';

export const PanelFooter = styled.div`
  border-top: 2px solid #000;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px;
  background-color: #dededd;
  div {
    flex-grow: 1;
  }
  * > button, div {
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export default PanelFooter;
