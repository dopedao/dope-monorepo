import styled from '@emotion/styled';
import { PageWrapper } from 'ui/styles/components';
import Head from 'components/Head';
import AboutWindow from 'components/AboutWindow';

// For News
import NewsWindow from 'features/news/components/NewsWindow';
import { PostType } from 'features/news/types';
import { getAllPosts } from 'utils/lib';

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;

const IndexPage = ({ allPosts }: { allPosts: PostType[] }) => {
  return (
    <IndexWrapper>
      <Head />
      {/* <StickyNoteHustlerMint /> */}
      <AboutWindow posX={128} posY={-32} />
      <NewsWindow allPosts={allPosts} posX={0} posY={0} />
    </IndexWrapper>
  );
};
export default IndexPage;

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
