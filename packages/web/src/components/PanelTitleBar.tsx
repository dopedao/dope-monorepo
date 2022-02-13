import styled from '@emotion/styled';

const PanelTitleBar = styled.div<{ centered?: boolean | undefined }>`
  line-height: 44px;
  background: #fff;
  box-shadow: inset 0 -2px 0 #000;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  font-size: var(--text-00);
  position: 'sticky';
  padding: 8px;
  text-align: ${({ centered }) => (centered ? 'center' : 'unset')};
`;

export default PanelTitleBar;
