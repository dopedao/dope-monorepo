import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import ErrorPage from 'next/error';
import { getPostBySlug, getAllPosts, markdownToHtml } from 'utils/lib';
import Head from 'components/Head';
import { PostType } from 'features/news/types';
import PostHeader from 'features/news/components/PostHeader';
import PostBody from 'features/news/components/PostBody';
import { media } from 'ui/styles/mixins';
import AppWindow from 'components/AppWindow';
import AppWindowNavBar from 'components/AppWindowNavBar';

const brickBackground = "#000000 url('/images/tile/brick-black.png') center/25% fixed";

const Container = styled.div`
  padding: 32px 16px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background: ${brickBackground};
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
        <Image src="/images/icon/arrow-back.svg" width="16px" alt="Arrow" />
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
    <AppWindow padBody={false} navbar={<Nav />} fullScreen>
      {post.ogImage && <Head ogImage={post.ogImage.url} title={post.title} />}
      <Container>
        {router.isFallback ? (
          <h4>Loading…</h4>
        ) : (
          <>
            <article>
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
