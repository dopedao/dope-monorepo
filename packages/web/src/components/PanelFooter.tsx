import styled from '@emotion/styled';

const PanelFooter = styled.div`
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

export default PanelFooter;
