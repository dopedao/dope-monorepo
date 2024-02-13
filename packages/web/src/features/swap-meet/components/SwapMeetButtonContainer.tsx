import { VStack } from '@chakra-ui/react';
import { css } from '@emotion/react';

export const SwapMeetButtonContainer = ({ children }: { children: React.ReactNode }) => (
  <VStack
    width="100%"
    padding="16px"
    paddingTop="0px"
    css={css`
      *,
      > * {
        width: 100%;
        justify-content: center;
        text-align: center;
      }
    `}
  >
    {children}
  </VStack>
);
