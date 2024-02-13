import styled from '@emotion/styled';

export const PanelFooter = styled.div<{ stacked?: boolean | undefined }>`
  border-top: 2px solid #000;
  height: ${({ stacked }) => (stacked ? 'auto' : '44px')};
  display: flex;
  flex-direction: ${({ stacked }) => (stacked ? 'column' : 'row')};
  align-items: ${({ stacked }) => (stacked ? 'stretch' : 'center')};
  // justify-content: space-between;
  gap: 8px;
  padding: 8px;
  background-color: #dededd;
  div {
    flex-grow: 1;
  }
  * > button,
  div {
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export default PanelFooter;
