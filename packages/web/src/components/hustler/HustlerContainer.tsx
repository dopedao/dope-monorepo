import styled from '@emotion/styled';

 //background-color: #a8a9ae;
const HustlerContainer = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  height: 100%;
  width: 100%;
  // display: flex;
  // justify-content: flex-start;
  // align-items: flex-start;

  .chakra-aspect-ratio > img {
    width: 100%;
    margin: 0 auto;
  }

  // & > * {
  //   flex: 1;
  // }
`;

export default HustlerContainer;
