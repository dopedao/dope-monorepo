import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 111px;

  @media (max-width: 640px) {
    width: 80%;
  }
`;

type ButtonProps = {
  isActive?: boolean;
};

export const Button = styled.button<ButtonProps>`
  padding: 8px 16px;
  border-radius: 8px;
  color: #ffffff;

  ${({ isActive }) =>
    isActive &&
    `
    background: #434345;
  `}
`;

export const Item = styled.div``;
