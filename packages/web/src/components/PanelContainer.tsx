import styled from '@emotion/styled';

const PanelContainer = styled.div`
  border: 2px solid #000;
  border-radius: 8px;
  background-color: #fff;

  @media (max-width: 768px) {
    background-color: #edefee;
  }

  display: flex;
  flex-direction: column;
  justify-content: stretch;
`;

export default PanelContainer;
