import { Box, Flex, Text, Button, useBreakpointValue } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Image } from '@chakra-ui/image';
import { PostType } from 'features/news/types';
import { splitPosts } from 'utils/split-news-posts';
import { truncate } from 'utils/truncateString';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import useCurrentPageNumber from 'features/news/hooks/useCurrentPageNumber';
import NewsClipping from './NewsClipping';

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

// Allow for posts using Excerpt or Body content
const getPostSnippet = (post: PostType) => {
  let snippet = '';
  if (post.excerpt && post.excerpt.length > 0) {
    snippet = post.excerpt;
  } else if (post.content && post.content.length > 0) {
    snippet = post.content;
  }
  return truncate(snippet);
};

type DopePostBodyProps = { posts: PostType[]; hasMore: boolean };

const NewsBody = ({ posts, hasMore }: DopePostBodyProps) => {
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
              return (
                <NewsClipping key={post.slug} post={post} titleSize={index === 0 ? 'xl' : 'md'} />
              );
            })}
          </LeftPosts>
        )}
        <MiddlePosts
          flex={{ base: 1, md: 5 }}
          textAlign={{ base: 'center', md: 'unset' }}
          padding="0 8px"
          borderRight={{ md: '1px solid black' }}
          borderLeft={{ md: '1px solid black' }}
        >
          <NewsClipping key={heroPost.slug} post={heroPost} showImage titleSize="4xl" />
          {middlePosts.map(post => (
            <NewsClipping key={post.slug} post={post} titleSize="xl" />
          ))}
        </MiddlePosts>
        <RightPosts flex={{ base: 1, md: 3 }} padding={{ base: '0 4px', md: '0 10px' }}>
          {rightPosts.map((post, index) => {
            return (
              <NewsClipping
                key={post.slug}
                post={post}
                titleSize={index === 0 && !isTabletOrMobile ? 'md' : 'xl'}
              />
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

export default NewsBody;
