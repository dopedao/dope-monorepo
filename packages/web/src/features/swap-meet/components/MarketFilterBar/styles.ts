import { media } from 'ui/styles/mixins';
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 10px;
  background-color: #202221;
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
  `}
  div.toggleButton {
    min-width: 32px;
    max-width: 32px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #000;
    border-radius: 5px;
    white-space: nowrap;
    background-color: #434345;
  }
  ,
  div.toggleButton img {
    height: 18px;
    width: 18px;
  }
  ,
  .search {
    color: #878783;
    border: 2px solid #000;
    cursor: text;
    border-radius: 5px;
    background-color: #141011;
    box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.25), inset -1px -1px 0px rgba(255, 255, 255, 0.25);
  }
  ,
  select {
    color: #fff;
    border: 2px solid #000;
    cursor: pointer;
    border-radius: 5px;
    background-color: #434345;
  }
  ,
  select option {
    background-color: #434345;
  }
`;
