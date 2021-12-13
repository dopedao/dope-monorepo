import styled from '@emotion/styled';

export const Wrapper = styled.div`
  border: 2px solid #000000;
  margin-bottom: 16px !important;
  margin-top: unset !important;
`;

export const Header = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25);
  line-height: 32px;
  background: #dededd;
  font-size: var(--text-00);
  position: 'sticky';
  text-align: center;
  padding: 5px 12px;
`;
