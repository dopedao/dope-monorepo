import styled from '@emotion/styled';

const PanelFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  background: #dededd;
  border-top: 2px solid #000;
  padding: 0 8px;
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

export default PanelFooter;
