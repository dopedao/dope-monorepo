import styled from '@emotion/styled';
import { Box, Flex, Text } from '@chakra-ui/react';
import { DopePostType } from 'features/news/types';
import { css } from '@emotion/react';
import { Image } from '@chakra-ui/image';

const Body = styled.div`
  padding-top: 8px;

  h1 {
    font-family: Dope !important;
  }

  p {
    font-family: Dope !important;
  }
`;

type DopePostBodyProps = Pick<
  DopePostType,
  | 'title'
  | 'date'
  | '$paper'
  | 'subTitleLeft1'
  | 'subTitleLeft2'
  | 'subTitleRight'
  | 'coverImage'
  | 'textLeft1'
  | 'textLeft2'
  | 'textRight1'
  | 'textRight2'
  | 'textMiddle1'
  | 'textMiddle2'
  | 'imageText'
>;

const DopePostBody = ({
  title,
  subTitleLeft1,
  subTitleRight,
  coverImage,
  textMiddle1,
  textMiddle2,
  imageText,
  textLeft1,
  subTitleLeft2,
  textLeft2,
  textRight1,
  textRight2,
}: DopePostBodyProps) => {
  return (
    <Body>
      <Flex width="full" justifyContent="space-between">
        <Box flex="3" padding="0 10px">
          <Text
            css={css`
              max-width: 600px;
            `}
            padding="20px 0px"
            color="#000"
            fontWeight="normal"
            textTransform="uppercase"
            lineHeight="30px"
            marginBottom="0"
            fontSize="3xl"
          >
            {subTitleLeft1}
          </Text>
          <Text fontSize="md">{textLeft1}</Text>

          <Text
            css={css`
              max-width: 600px;
            `}
            padding="10px 0px"
            color="#000"
            fontWeight="normal"
            textTransform="uppercase"
            lineHeight="30px"
            marginBottom="2"
            fontSize="2xl"
            borderTop="1px solid black"
            borderBottom="1px solid black"
          >
            {subTitleLeft2}
          </Text>

          <Text fontSize="md">{textLeft2}</Text>
        </Box>
        <Box flex="5" padding="0 5px" borderRight="1px solid black" borderLeft="1px solid black">
          <Text
            css={css`
              max-width: 600px;
            `}
            padding="20px"
            color="#000"
            textTransform="uppercase"
            fontWeight="normal"
            lineHeight="55px"
            marginBottom="0"
            fontSize="6xl"
          >
            {title}
          </Text>
          <Box maxW="427px" margin="0 auto">
            <Image src={coverImage} alt={`Cover Image for ${title}`} />
            <Text padding="10px" textTransform="uppercase">
              {imageText}
            </Text>
          </Box>
          {textMiddle1 && textMiddle2 && (
            <Flex justifyContent="center" padding="0 20px 20px 20px">
              <Box maxW="200px" w="full" paddingRight="10px">
                <Text fontSize="md">{textMiddle1}</Text>
              </Box>
              <Box maxW="200px" w="full" paddingLeft="10px">
                <Text fontSize="md">{textMiddle2}</Text>
              </Box>
            </Flex>
          )}
        </Box>
        <Box flex="3" padding="0 10px">
          <Text
            css={css`
              max-width: 600px;
            `}
            padding="20px 0px"
            textTransform="uppercase"
            color="#000"
            fontWeight="normal"
            lineHeight="30px"
            marginBottom="2"
            fontSize="3xl"
            borderBottom="1px solid black"
          >
            {subTitleRight}
          </Text>

          <Text fontSize="md" marginBottom="4">
            {textRight1}
          </Text>
          <Text fontSize="md">{textRight2}</Text>
        </Box>
      </Flex>
    </Body>
  );
};

export default DopePostBody;
