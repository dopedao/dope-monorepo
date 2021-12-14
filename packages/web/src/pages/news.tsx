import { css } from '@emotion/react';
import styled from '@emotion/styled';
import DesktopWindow from 'components/DesktopWindow';
import Head from 'components/Head';
import PostPreview from 'features/news/components/PostPreview';
import { PostType } from 'features/news/types';
import { media } from 'ui/styles/mixins';
import { getAllPosts } from 'utils/lib';

const brickBackground = "#000000 url('/images/tile/brick-black.png') center/25% fixed";

const Container = styled.div`
  padding: 32px 16px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background: ${brickBackground};
  .newsGrid {
    display: grid
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 3fr);
    grid-gap: 1.2rem;

    ${media.tablet`
      grid-template-columns: repeat(2, 1fr);
    `}

    ${media.phone`
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 4rem;
    `}
  }
  ${media.tablet`
    padding: 32px;
  `}
`;

const TITLE = 'News';

type NewsProps = {
  allPosts: PostType[];
};

const News = ({ allPosts }: NewsProps) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <DesktopWindow title={TITLE}>
      <Head title={TITLE} />
      <Container>
        <h1
          css={css`
            color: #fff;
          `}
        >
          News
        </h1>
        {heroPost && (
          <PostPreview
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && (
          <section>
            <h4
              css={css`
                color: #fff;
                margin: 20px 0;
              `}
            >
              All News
            </h4>
            <div className="newsGrid">
              {morePosts.map(post => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </DesktopWindow>
  );
};

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

  return {
    props: { allPosts },
  };
};

export default News;
