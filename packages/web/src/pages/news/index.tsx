import styled from '@emotion/styled';
import Head from 'components/Head';
import NewsWindow from 'features/news/components/NewsWindow';
import { PostType } from 'features/news/types';
import { getAllPosts } from 'utils/lib';
import DesktopIconList from 'components/DesktopIconList';

const TITLE = 'The Daily Dope';

const News = ({ allPosts }: { allPosts: PostType[] }) => (
  <>
    <Head title={TITLE} />
    <DesktopIconList />
    <NewsWindow allPosts={allPosts} />
  </>
);
export default News;

// Server-side rendered with Next.js so that
// we gather our news posts from the filesystem on server.
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
