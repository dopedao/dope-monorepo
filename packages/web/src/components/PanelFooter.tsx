import styled from '@emotion/styled';

const PanelFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 16px 14px 16px;
  div {
    flex-grow: 1;
  }
  * > button {
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }
  }
  @media (max-width: 768px) {
    height: 120px;
  }
`;

export default PanelFooter;
