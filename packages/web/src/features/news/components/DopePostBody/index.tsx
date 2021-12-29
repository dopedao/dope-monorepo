import styled from '@emotion/styled';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { PostType } from 'features/news/types';
import { css } from '@emotion/react';
import { Image } from '@chakra-ui/image';
import Link from 'next/link';
import { splitPosts } from 'utils/split-news-posts';
import { media } from 'ui/styles/mixins';
import { truncate } from 'utils/truncateString';
import { useRouter } from 'next/router';
import useCurrentPageNumber from 'features/news/hooks/useCurrentPageNumber';

const MiddlePosts = styled.div`
  flex: 5;
  order: -1;
  text-align: center;

  ${media.tablet`
	padding: 0 5px;
  	order: 1; 
    border-right: 1px solid black;
    border-left: 1px solid black;
  `}

  ${media.phone`
    text-align: unset;
  `}
`;

const LeftPosts = styled.div`
  order: 0;
  flex: 3;

  padding: 0 5px;
  ${media.tablet`
    padding: 0 10px;
  `}
`;

const RightPosts = styled.div`
  order: 2;
  flex: 3;

  padding: 0 5px;
  ${media.tablet`
    padding: 0 10px;
  `}
`;

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
  const page = useCurrentPageNumber();
  const heroPost = posts[0];
  const { leftPosts, middlePosts, rightPosts } = splitPosts(posts.slice(1));

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
