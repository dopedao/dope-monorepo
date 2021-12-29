import styled from '@emotion/styled';
import DesktopWindow from 'components/DesktopWindow';
import Head from 'components/Head';
import { PostType } from 'features/news/types';
import { media } from 'ui/styles/mixins';
import { getAllPosts } from 'utils/lib';
import DopeNewsCast from 'features/news/components/DopeNewsCast';

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

const News = ({ allPosts }: NewsProps) => (
  <DesktopWindow title={TITLE}>
    <Head title={TITLE} />
    <Container>
      <DopeNewsCast posts={allPosts} />
    </Container>
  </DesktopWindow>
);

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'coverImageText',
    'excerpt',
    'location',
    'description',
  ]);

  return {
    props: { allPosts },
  };
};

export default News;
