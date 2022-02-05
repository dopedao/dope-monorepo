import styled from '@emotion/styled';

const PanelContainer = styled.div<{ justifyContent?: string | undefined }>`
  border: 2px solid #000;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'space-between')};
  overflow: hidden;
  @media (max-width: 768px) {
    background-color: #edefee;
  }
`;

export default PanelContainer;
