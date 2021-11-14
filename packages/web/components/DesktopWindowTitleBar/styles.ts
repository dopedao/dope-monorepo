import styled from '@emotion/styled';
import { media } from 'styles/mixins';

export const Header = styled.header`
  background: #141011;
  height: var(--header-height);
  position: sticky;
  top: 0;
  z-index: var(--header-z);
  display: flex;
  flex-direction: column;
  cursor: move;
`;

export const TitleBar = styled.div`
  color: #fff;
  height: 32px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  box-shadow: -1px -1px 0px rgba(0, 0, 0, 0.25) inset, 1px 1px 0px rgba(255, 255, 255, 0.25) inset;
`;

export const RightColumn = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;

  div:first-child {
    @media (max-width: 680px) {
      display: none;
    }
  }

  span {
    margin: 0 12px;

    @media (max-width: 680px) {
      display: none;
    }
  }
`;

export const TitleBarDescription = styled.div`
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ENSAddressWrapper = styled.div`
  margin-right: 14px;
`;
