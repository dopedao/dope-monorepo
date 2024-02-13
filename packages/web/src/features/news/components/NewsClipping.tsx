import { Box, Text, Image } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { PostType } from 'features/news/types';
import { truncate } from 'utils/truncateString';
import Link from 'next/link';

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

type Props = {
  post: PostType;
  titleSize?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  showImage?: boolean;
};

const NewsClipping = ({ post, titleSize = 'md', showImage = false }: Props) => {
  const isLargerTitle = titleSize != 'md';
  return (
    <Box
      borderBottom="1px solid black"
      padding={isLargerTitle ? '24px 0' : '8px 0'}
      paddingTop="0"
      marginBottom="4"
    >
      <Link href={`/news/${post.slug}`} passHref>
        <Box>
          <Text
            as="a"
            css={css`
              max-width: 600px;
            `}
            padding={isLargerTitle ? '16px 0px' : '8px 0px'}
            color="#000"
            fontWeight="normal"
            textTransform="uppercase"
            lineHeight="1em"
            fontSize={titleSize}
          >
            {post.title}
          </Text>
          {showImage && (
            <Image
              src={post.coverImage}
              alt={`Cover Image for ${post.title}`}
              css={css`
                filter: saturate(0);
                cursor: pointer;
                cursor: hand;
              `}
            />
          )}
        </Box>
      </Link>
      <Text
        css={css`
          font-size: var(--text-smallest);
        `}
      >
        {new Date(post.date).toLocaleDateString('en-us', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </Text>
      <Text fontSize="md">{getPostSnippet(post)}</Text>
    </Box>
  );
};

export default NewsClipping;
