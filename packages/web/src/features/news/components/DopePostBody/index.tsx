import styled from '@emotion/styled';
import { Box, Flex, Text } from '@chakra-ui/react';
import { PostType } from 'features/news/types';
import { css } from '@emotion/react';
import { Image } from '@chakra-ui/image';
import Link from 'next/link';
import { splitPosts } from 'utils/split-news-posts';

const MiddlePosts = styled.div`
  flex: 5;
  padding: 0 5px;
  border-right: 1px solid black;
  border-left: 1px solid black;
`;

const LeftPosts = styled.div`
  flex: 3;
  padding: 0 10px;
`;

const RightPosts = styled.div`
  flex: 3;
  padding: 0 10px;
`;

const Body = styled.div`
  padding-top: 8px;

  h1,
  a,
  p {
    font-family: Dope !important;
  }
`;

type DopePostBodyProps = { posts: PostType[] };

const truncate = (str: string, maxLength: number = 250) =>
  str.length > maxLength ? `${str.substring(0, maxLength - 3)}...` : str.substring(0, maxLength);

const DopePostBody = ({ posts }: DopePostBodyProps) => {
  const heroPost = posts[0];
  const { leftPosts, middlePosts, rightPosts } = splitPosts(posts.slice(1));

  return (
    <Body>
      <Flex width="full" justifyContent="space-between">
        <LeftPosts>
          {leftPosts.map((post, index) => {
            const isFirst = index == 0;
            return (
              <>
                <Box
                  borderTop={isFirst ? undefined : '1px solid black'}
                  borderBottom={isFirst ? undefined : '1px solid black'}
                  padding={isFirst ? '20px 0px' : '10px 0px'}
                  marginBottom={isFirst ? '0' : '2'}
                >
                  <Link href={`/news/${post.slug}`} passHref>
                    <Text
                      as="a"
                      css={css`
                        max-width: 600px;
                      `}
                      padding={isFirst ? '20px 0px' : '10px 0px'}
                      color="#000"
                      fontWeight="normal"
                      textTransform="uppercase"
                      lineHeight="30px"
                      fontSize={isFirst ? '3xl' : '2xl'}
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
        <MiddlePosts>
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
        <RightPosts>
          {rightPosts.map((post, index) => {
            const isFirst = index == 0;

            return (
              <>
                <Box
                  borderTop={isFirst ? undefined : '1px solid black'}
                  borderBottom={isFirst ? undefined : '1px solid black'}
                  padding={isFirst ? '20px 0px' : '10px 0px'}
                  marginBottom={isFirst ? '0' : '2'}
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
                      fontSize={isFirst ? '3xl' : '2xl'}
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
    </Body>
  );
};

export default DopePostBody;
