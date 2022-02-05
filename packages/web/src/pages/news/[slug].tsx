import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { getPostBySlug, getAllPosts, markdownToHtml } from 'utils/lib';
import { media } from 'ui/styles/mixins';
import { PostType } from 'features/news/types';
import { useRouter } from 'next/router';
import AppWindow from 'components/AppWindow';
import AppWindowNavBar from 'components/AppWindowNavBar';
import ArrowBack from 'ui/svg/ArrowBack';
import ErrorPage from 'next/error';
import Head from 'components/Head';
import Link from 'next/link';
import PostBody from 'features/news/components/PostBody';
import PostHeader from 'features/news/components/PostHeader';
import styled from '@emotion/styled';

const brickBackground = "#000000 url('/images/tile/brick-black.png') center/25% fixed";

const Container = styled.div`
  background-color: var(--gray-00);
  padding: 32px 16px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  ${media.tablet`
    padding: 32px;
  `}
`;

type PostProps = {
  post: PostType;
};

const Nav = () => (
  <AppWindowNavBar>
    <Link href="/news" passHref>
      <Button variant="navBar">
        <ArrowBack color="white" size={16} />
        Back to News
      </Button>
    </Link>
  </AppWindowNavBar>
);

const Post = ({ post }: PostProps) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <AppWindow padBody={false} navbar={<Nav />}>
      {post.ogImage && <Head ogImage={post.ogImage.url} title={post.title} />}
      <Container>
        {router.isFallback ? (
          <h4>Loading…</h4>
        ) : (
          <>
            <article
              css={css`
                max-width: 680px;
              `}
            >
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </AppWindow>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const post = getPostBySlug(params.slug, [
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'title',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export default Post;
