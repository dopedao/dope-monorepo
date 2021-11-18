import styled from '@emotion/styled';

export const HustlerContainer = styled.div`
  background-color: #a8a9ae;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  .chakra-aspect-ratio > img {
    width: 400px;
    height: 750px;
    margin: 0 auto;
  }

  & > * {
    flex: 1;
  }
`;
