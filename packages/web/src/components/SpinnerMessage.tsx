import { Spinner } from '@chakra-ui/react';
import styled from "@emotion/styled";

const SpinnerContainer = styled.div`
  border: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  & > div {
    flex: 0;
  }
`;

const SpinnerMessage = ({text}: {text: string}) => {
  return(
    <SpinnerContainer>
      <div>
        <Spinner size="xs" />
      </div>
      <div>
        { text }
      </div>
    </SpinnerContainer>
  );
}

export default SpinnerMessage;