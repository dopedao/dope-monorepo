import styled from '@emotion/styled';
import { Text, Box, Flex, Spacer } from '@chakra-ui/react';
import { format } from 'date-fns';

const Wrapper = styled.div`
  h1 {
    font-family: Dope !important;
  }

  p {
    font-family: Dope !important;
  }
`;

type DopePostHeaderProps = {
  location?: string;
  date?: string;
  $paper?: number;
  description?: string;
};

const DopePostHeader = ({
  $paper = 0.5,
  description = 'The truth and something else',
  location = 'DOPECITY',
  date,
}: DopePostHeaderProps) => (
  <Wrapper>
    <Flex padding="12px 0">
      <Box border="1px solid black" textAlign="center" padding="8px 20px">
        <Flex align="center" justify="center" height="100%">
          <Text
            fontSize="xs"
            textTransform="uppercase"
            color="#000"
            width="80%"
            padding={0}
          >{`"${description}"`}</Text>
        </Flex>
      </Box>

      <Spacer />

      <Box textAlign="right">
        <Text
          color="#000"
          fontWeight="normal"
          marginBottom={0}
          fontSize="7xl"
          paddingBottom={0}
          as="h1"
        >
          The Daily Dope
        </Text>
      </Box>

      <Spacer />

      <Box textAlign="right" paddingRight="20px">
        <Flex height="100%" align="center" justify="center">
          <div>
            <Text fontSize="lg" paddingBottom="2px" textTransform="uppercase">
              MORNING EDITION
            </Text>
            <Text
              fontSize="lg"
              paddingBottom={0}
              textTransform="uppercase"
            >{`${$paper} $paper`}</Text>
          </div>
        </Flex>
      </Box>
    </Flex>
    <Box
      padding="1 0"
      borderBottom="1px solid black"
      borderTop="1px solid black"
      textAlign="center"
    >
      <Text
        textTransform="uppercase"
        padding="4px"
        color="#000"
        fontWeight="bold"
        fontSize="xs"
      >{`${location} ${format(date ? new Date(date) : new Date(), 'MMMM Y')}`}</Text>
    </Box>
  </Wrapper>
);

export default DopePostHeader;
