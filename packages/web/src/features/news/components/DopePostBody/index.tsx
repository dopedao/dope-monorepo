import styled from '@emotion/styled';
import { Box, Flex, Text, Button, useBreakpointValue } from '@chakra-ui/react';
import { PostType } from 'features/news/types';
import { css } from '@emotion/react';
import { Image } from '@chakra-ui/image';
import Link from 'next/link';
import { splitPosts } from 'utils/split-news-posts';
import { truncate } from 'utils/truncateString';
import { useRouter } from 'next/router';
import useCurrentPageNumber from 'features/news/hooks/useCurrentPageNumber';

const MiddlePosts = Box,
  LeftPosts = Box,
  RightPosts = Box;

const Body = styled.div`
  padding-top: 8px;

  h1,
  a,
  p {
    font-family: Dope !important;
  }
`;

type DopePostBodyProps = { posts: PostType[]; hasMore: boolean };

const DopePostBody = ({ posts, hasMore }: DopePostBodyProps) => {
  const router = useRouter();
  const isTabletOrMobile = useBreakpointValue({ base: true, md: false });
  const page = useCurrentPageNumber();
  const heroPost = posts[0];
  const { leftPosts, middlePosts, rightPosts } = splitPosts(posts.slice(1), isTabletOrMobile);

  if (!heroPost)
    return (
      <Body>
        <Text fontSize="xl" textAlign="center" textTransform="uppercase" paddingTop="6">
          no posts found
        </Text>
      </Body>
    );

  return (
    <Body>
      <Flex width="full" flexWrap="wrap" justifyContent="space-between">
        {Boolean(leftPosts.length) && (
          <LeftPosts flex={3} padding="0 10px">
            {leftPosts.map((post, index) => {
              const isLargerTitle = index == 0;
              return (
                <>
                  <Box
                    borderTop={isLargerTitle ? undefined : '1px solid black'}
                    borderBottom={isLargerTitle ? undefined : '1px solid black'}
                    padding={isLargerTitle ? '20px 0px' : '10px 0px'}
                    marginBottom={isLargerTitle ? '0' : '2'}
                  >
                    <Link href={`/news/${post.slug}`} passHref>
                      <Text
                        as="a"
                        css={css`
                          max-width: 600px;
                        `}
                        padding={isLargerTitle ? '20px 0px' : '10px 0px'}
                        color="#000"
                        fontWeight="normal"
                        textTransform="uppercase"
                        lineHeight="30px"
                        fontSize={isLargerTitle ? '3xl' : '2xl'}
                      >
                        {post.title}
                      </Text>
                    </Link>
                  </Box>
                  <Text fontSize="md">{truncate(post.excerpt)}</Text>
                </>
              );
            })}
          </LeftPosts>
        )}
        <MiddlePosts
          flex={{ base: 1, md: 5 }}
          textAlign={{ base: 'center', md: 'unset' }}
          padding="0 5px"
          borderRight={{ md: '1px solid black' }}
          borderLeft={{ md: '1px solid black' }}
        >
          <Box padding="20px">
            <Link href={`/news/${heroPost.slug}`} passHref>
              <Text
                as="a"
                css={css`
                  max-width: 600px;
                `}
                color="#000"
                textTransform="uppercase"
                fontWeight="normal"
                lineHeight="55px"
                marginBottom="0"
                fontSize="6xl"
              >
                {heroPost.title}
              </Text>
            </Link>
          </Box>
          <Box maxW="427px" margin="0 auto">
            <Image src={heroPost.coverImage} alt={`Cover Image for ${heroPost.title}`} />
            {heroPost.coverImageText && (
              <Text padding="10px" textTransform="uppercase">
                {heroPost.coverImageText}
              </Text>
            )}
          </Box>
          <Flex justifyContent="center" padding="0 20px 20px 20px">
            <Box maxW="200px" w="full" paddingRight="10px">
              <Text fontSize="md">{truncate(heroPost.excerpt)}</Text>
            </Box>
            <Box maxW="200px" w="full" paddingLeft="10px">
              <Text fontSize="md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor inventore qui quia
                cupiditate commodi voluptas magni molestias cumque,
              </Text>
            </Box>
          </Flex>
          {middlePosts.map(post => (
            <Box padding="0 10px">
              <Box
                borderTop={'1px solid black'}
                borderBottom={'1px solid black'}
                padding={'10px 0px'}
                marginBottom={'2'}
              >
                <Link href={`/news/${post.slug}`} passHref>
                  <Text
                    as="a"
                    css={css`
                      max-width: 600px;
                    `}
                    padding={'10px 0px'}
                    color="#000"
                    fontWeight="normal"
                    textTransform="uppercase"
                    lineHeight="30px"
                    fontSize={'2xl'}
                  >
                    {post.title}
                  </Text>
                </Link>
              </Box>
              <Text fontSize="md">{truncate(post.excerpt)}</Text>
            </Box>
          ))}
        </MiddlePosts>
        <RightPosts flex={{ base: 1, md: 3 }} padding={{ base: '0 5px', md: '0 10px' }}>
          {rightPosts.map((post, index) => {
            const isLargerTitle = index == 0 && !isTabletOrMobile;

            return (
              <>
                <Box
                  borderTop={isLargerTitle ? undefined : '1px solid black'}
                  borderBottom={isLargerTitle ? undefined : '1px solid black'}
                  padding={isLargerTitle ? '20px 0px' : '10px 0px'}
                  marginBottom={isLargerTitle ? '0' : '2'}
                >
                  <Link href={`/news/${post.slug}`} passHref>
                    <Text
                      as="a"
                      css={css`
                        max-width: 600px;
                      `}
                      color="#000"
                      fontWeight="normal"
                      textTransform="uppercase"
                      lineHeight="30px"
                      fontSize={isLargerTitle ? '3xl' : '2xl'}
                    >
                      {post.title}
                    </Text>
                  </Link>
                </Box>
                <Text fontSize="md">{truncate(post.excerpt)}</Text>
              </>
            );
          })}
        </RightPosts>
      </Flex>
      <Flex justifyContent="center">
        <Button
          width="full"
          maxW="100px"
          marginRight="10px"
          isDisabled={page - 1 <= 0}
          onClick={() => router.push({ pathname: '/news', query: { page: page - 1 } })}
        >
          {'< previous'}
        </Button>
        <Button
          width="full"
          maxW="100px"
          isDisabled={!hasMore}
          onClick={() => router.push({ pathname: '/news', query: { page: page + 1 } })}
        >
          {'next >'}
        </Button>
      </Flex>
    </Body>
  );
};

export default DopePostBody;
