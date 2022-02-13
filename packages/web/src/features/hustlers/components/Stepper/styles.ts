import styled from '@emotion/styled';
import { returnBreakpoint } from 'ui/styles/breakpoints';

export const StepContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 64px;
  border-bottom: 2px solid #1c1c1c;
  border-top: 2px solid #1c1c1c;
  height: 40px;
  width: 100%;
  background: #434345;
  @media (max-width: ${returnBreakpoint('tablet')}) {
    padding: 4px 32px;
  }
  // prevent Hustler slide over bar sometimes when scrolling
  z-index: 2;
`;

type ButtonProps = {
  isActive?: boolean;
};

export const Button = styled.button<ButtonProps>`
  padding: 4px 12px;
  border-radius: 8px;
  color: #ffffff;

  &:disabled {
    cursor: not-allowed;
  }

  ${({ isActive }) => isActive && `background: #202221;`}
`;

export const Item = styled.div``;
