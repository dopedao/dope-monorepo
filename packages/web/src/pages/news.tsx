import styled from '@emotion/styled';
import DesktopWindow from 'components/DesktopWindow';
import Head from 'components/Head';
import { PostType } from 'features/news/types';
import { media } from 'ui/styles/mixins';
import { getAllPosts } from 'utils/lib';
import DopeNewsCast from 'features/news/components/DopeNewsCast';

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const TITLE = 'News';

type NewsProps = {
  allPosts: PostType[];
};

const News = ({ allPosts }: NewsProps) => (
  <DesktopWindow title={TITLE} fullPage>
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
