import { Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';

const SpinnerContainer = styled.div`
  border: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 1em;
  & > div {
  }
`;

const SpinnerMessage = ({ text }: { text: string }) => {
  return (
    <SpinnerContainer>
      <Box>
        <Spinner size="xs" />
      </Box>
      <Box>{text}</Box>
    </SpinnerContainer>
  );
};

export default SpinnerMessage;
