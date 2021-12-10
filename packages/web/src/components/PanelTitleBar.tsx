import styled from '@emotion/styled';

const PanelTitleBar = styled.div`
  line-height: 32px;
  background: #dededd;
  border-bottom: 2px solid #000;
  box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25);
  font-size: var(--text-00);
  position: 'sticky';
  text-align: center;
  & > * {
  }
`;

export default PanelTitleBar;
