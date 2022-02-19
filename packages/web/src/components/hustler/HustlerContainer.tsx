import styled from '@emotion/styled';

//background-color: #a8a9ae;
const HustlerContainer = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 16px;

  .chakra-aspect-ratio > img {
    width: 100%;
    margin: 0 auto;
  }

  & > * {
    flex: 0 auto;
  }
`;

export default HustlerContainer;
