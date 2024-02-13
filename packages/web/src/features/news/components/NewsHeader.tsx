import styled from '@emotion/styled';
import { Text, Box, Flex, Spacer } from '@chakra-ui/react';
import { format } from 'date-fns';
import { media } from 'ui/styles/mixins';
import { getRandomNumber } from 'utils/utils';

const Wrapper = styled.div`
  h1 {
    font-family: Dope !important;
    font-size: 3.5em !important;
    padding: 0em 2em;
    ${media.tablet`
      font-size: 4.5em !important;
      text-align: center;
    `}
  }

  p {
    font-family: Dope !important;
  }
`;

const Description = styled.div`
  text-align: left;
  padding: 0;
  ${media.tablet`
  `}
`;

const TitleWrapper = styled.div`
  > h1 {
    margin: 0 !important;
    padding: 0 !important;
  }
`;

type DopePostHeaderProps = {
  location?: string;
  date?: string;
  $paper?: number;
  description?: string;
};

export const PHRASES = [
  'This is how we FLEX 💪',
  '$PAPER to the moon 🚀 ',
  'WEN GAME 🕹',
  'Devs always doing something',
  'Based devs',
  'Welcome to the MURDERVERSE',
  'Hustle Hard',
  'The truth and something else',
  'We need marketing',
  'Always trending #1 on DEXTOOLS',
  'The talk of Crypto Twitter',
  'Doing shit different because we can',
  'We heard play-to-own metaverse games are going to be big',
];

const NewsHeader = ({
  $paper = 20,
  description = PHRASES[getRandomNumber(0, PHRASES.length - 1)],
  location = 'DOPECITY',
  date,
}: DopePostHeaderProps) => (
  <Wrapper>
    <Flex padding="12px 0">
      <TitleWrapper>
        <Text color="#000" fontWeight="normal" marginBottom={0} paddingBottom={0} as="h1">
          The Daily Dope
        </Text>
        <Description>
          <Flex height="full">
            <Text
              fontSize="xs"
              textTransform="uppercase"
              color="#000"
              width="80%"
              padding={0}
              paddingLeft=".5em"
            >
              {description}
            </Text>
          </Flex>
        </Description>
      </TitleWrapper>

      <Spacer />

      <Box textAlign="right" paddingRight="20px">
        <Flex height="100%" align="center" justify="center" gap="0">
          <Box>
            <Text fontSize="md" paddingBottom="0px" textTransform="uppercase">
              {new Date().getHours() > 12 ? 'Evening' : 'Morning'} EDITION
            </Text>
            <Text
              fontSize="sm"
              paddingBottom={0}
              textTransform="uppercase"
            >{`${$paper} $paper`}</Text>
          </Box>
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
        fontSize="xs"
      >{`${location} ${format(date ? new Date(date) : new Date(), 'MMMM Y')}`}</Text>
    </Box>
  </Wrapper>
);

export default NewsHeader;
