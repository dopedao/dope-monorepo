import { media } from 'ui/styles/mixins';
import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;

  > * {
    flex: 1 1 30%;
  }
  div:first-of-type {
    flex: 1 1 100%;
  }
  ${media.tablet`
    flex-flow: row;
    div:first-of-type {
      flex: 1 1 50%;
    }
  `}
  .toggleButton {
    min-width: 32px;
    max-width: 32px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    white-space: nowrap;
    border: 2px solid #000;
    padding: 4px;
    img {
      height: 18px;
      width: 18px;
    }
  }
  .search {
    // color: #878783;
    // background-color: #141011;
    border: 2px solid #000;
    cursor: text;
    border-radius: 4px;
    box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.25), inset -1px -1px 0px rgba(255, 255, 255, 0.25);
  }
  select {
    border: 2px solid #000;
    cursor: pointer;
    border-radius: 4px;
  }
  select option {
  }
`;
