import styled from '@emotion/styled';

export const PanelFooterLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background-color: #edefee;
  div {
    flex-grow: 1;
  }
`;

export const PanelFooterRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background-color: #dededd;
  div {
    flex-grow: 1;
  }
  * > button {
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export default PanelFooterLeft;
