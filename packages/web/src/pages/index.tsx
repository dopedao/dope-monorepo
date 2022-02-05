import styled from '@emotion/styled';
import { PageWrapper } from 'ui/styles/components';
import Head from 'components/Head';
import AboutWindow from 'components/AboutWindow';

// For News
import NewsWindow from 'features/news/components/NewsWindow';
import { PostType } from 'features/news/types';
import { getAllPosts } from 'utils/lib';
import useBrowserWidth from 'hooks/use-browser-width';
import { getBreakpointWidth } from 'ui/styles/breakpoints';

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;

const IndexPage = ({ allPosts }: {allPosts: PostType[]}) => {
  // Because we're doing some complex positioning and dragging
  // with virtual desktop windows we need to be smart about
  // how we position them to begin with.
  //
  // This helps us get the most accurate results.
  //
  // See `DesktopWindow` and its use of `Draggable` which this
  // interacts with.
  const browserWidth = useBrowserWidth();
  const windowOffset = (() => {
    if (browserWidth >= getBreakpointWidth('laptop')) return 152;
    if (browserWidth >= getBreakpointWidth('tablet')) return 96;
    return 32;
  })();

  return (
    <IndexWrapper>
      <Head />
      {/* <StickyNoteHustlerMint /> */}
      <NewsWindow allPosts={allPosts} posX={windowOffset*2} posY={windowOffset/2}  />
      <AboutWindow posX={windowOffset} posY={windowOffset/16} />
    </IndexWrapper>
  )
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
