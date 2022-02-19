import styled from '@emotion/styled';
import { PageWrapper } from 'ui/styles/components';
import Head from 'components/Head';
import AboutWindow from 'features/about/components/AboutWindow';
import Cookies from 'js-cookie';
import BannerBaronAuction from 'components/banners/BannerBaronAuction';
import DesktopWindow from 'components/DesktopWindow';
// import NewsWindow from 'features/news/components/NewsWindow';
// import { PostType } from 'features/news/types';
// import { getAllPosts } from 'utils/lib';

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;

// const IndexPage = ({ allPosts }: { allPosts: PostType[] }) => {
const IndexPage = () => {
  return (
    <IndexWrapper>
      <Head />
      {/* {Cookies.get('aboutWindowVisible') !== 'false' && (
        <AboutWindow
          posX={64}
          posY={-16}
          onClose={() => Cookies.set('aboutWindowVisible', 'false', { expires: 3 })}
        />
      )} */}
      {/* {Cookies.get('newsWindowVisible') !== 'false' && (
        <NewsWindow
          allPosts={allPosts}
          posX={0}
          posY={32}
          onClose={() => Cookies.set('newsWindowVisible', 'false', { expires: 3 })}
        />
      )} */}
      {Cookies.get('bannerVisible') !== 'false' && (
        <DesktopWindow
          title="…"
          background="#053c6e"
          width="800px"
          height="auto !important"
          hideWalletAddress
          posX={0}
          posY={44}
          scrollable
          onClose={() => Cookies.set('bannerVisible', 'false', { expires: 3 })}
        >
          <BannerBaronAuction hideBorderBottom />
        </DesktopWindow>
      )}
      
    </IndexWrapper>
  );
};
export default IndexPage;

// Server-side rendered with Next.js so that
// we gather our news posts from the filesystem on server.
// export const getStaticProps = async () => {
//   const allPosts = getAllPosts([
//     'title',
//     'date',
//     'slug',
//     'author',
//     'coverImage',
//     'coverImageText',
//     'excerpt',
//     'location',
//     'description',
//   ]);

//   return {
//     props: { allPosts },
//   };
// };
