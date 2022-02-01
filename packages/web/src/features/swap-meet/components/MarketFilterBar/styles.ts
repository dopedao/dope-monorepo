import { media } from 'ui/styles/mixins';
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 8px;
  background-color: #878783;
  border-bottom: 1px solid #434345;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;

  > * {
    flex: 1 1 25%;
  }
  div:first-of-type {
    flex: 1 1 100%;
  }

  ${media.tablet`
    height: 52px;
    flex-flow: row nowrap;
    gap: 16px;
    > * {
      flex: 1;
    }
    div:first-of-type {
      flex: 1;
    }
  `}

  input,
  select,
  div.toggleButton {
    border-collapse: collapse;
    height: 32px;
    border-radius: 0;
    border: 1px solid #000;
    white-space: nowrap;
  }
`;
