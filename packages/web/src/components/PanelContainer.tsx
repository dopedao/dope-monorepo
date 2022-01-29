import styled from '@emotion/styled';

const PanelContainer = styled.div`
  border: 2px solid #000;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-basis: 1;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  @media (max-width: 768px) {
    background-color: #edefee;
  }
`;

export default PanelContainer;
