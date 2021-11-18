import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 128px;
  border-bottom: 2px solid #1c1c1c;
  border-top: 2px solid #1c1c1c;
  position: fixed;
  width: 100%;
  background: #434345;
  @media (max-width: 640px) {
    width: 80%;
  }
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

  ${({ isActive }) =>
    isActive && `background: #202221;`
  }
`;

export const Item = styled.div``;
