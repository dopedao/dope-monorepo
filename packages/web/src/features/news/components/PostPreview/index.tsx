import Image from 'next/image';
import Link from 'next/link';
import { Box, Heading, Text, Stack, Avatar, useColorModeValue } from '@chakra-ui/react';
import DateFormatter from 'features/news/components/DateFormatter';
import { PostType } from 'features/news/types';
import { css } from '@emotion/react';

type PostPreviewProps = Omit<PostType, 'ogImage' | 'content'>;

const PostPreview = ({ title, coverImage, date, author, slug, excerpt }: PostPreviewProps) => (
  <Box
    maxW="445px"
    w="full"
    bg={useColorModeValue('white', 'gray.900')}
    boxShadow="2xl"
    rounded="md"
    p={6}
    overflow="hidden"
  >
    <Box h="210px" bg="gray.100" mt={-6} mx={-6} mb={6} pos="relative">
      <Image src={coverImage} layout="fill" unoptimized={true} alt={title} />
    </Box>
    <Stack>
      <Heading color={useColorModeValue('gray.700', 'white')} fontSize="2xl" fontFamily="body">
        <Link href={`/news/${slug}`}>
          <a>{title}</a>
        </Link>
      </Heading>
      <Text color="gray.500">{excerpt}</Text>
    </Stack>
    <Stack mt={6} direction="row" spacing={4} align="center">
      <Image
        src={author.picture}
        alt={author.name}
        width={48}
        height={48}
        layout="fixed"
        unoptimized
        css={css`
          border-radius: 50%;
        `}
      />
      <Stack direction="column" spacing={0} fontSize="sm">
        <Text fontWeight={600} paddingBottom="unset">
          {author.name}
        </Text>
        <Text color="gray.500" paddingBottom="unset">
          <DateFormatter dateString={date} />
        </Text>
      </Stack>
    </Stack>
  </Box>
);

export default PostPreview;
