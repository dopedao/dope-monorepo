import styled from '@emotion/styled';
import DesktopWindow from 'components/DesktopWindow';
import { PostType } from 'features/news/types';
import DopeNewsCast from 'features/news/components/DopeNewsCast';
import BannerAirLunarAirDrop from 'features/news/components/BannerLunarAirdrop';
import BannerLunarAirDrop from 'features/news/components/BannerLunarAirdrop';

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

interface NewsWindowProps {
  allPosts: PostType[];
  posX?: number;
  posY?: number;
}

const NewsWindow = ({ allPosts, posX, posY, ...props }: NewsWindowProps) => (
  <DesktopWindow
    title="The Daily Dope"
    width={768}
    posX={posX}
    posY={posY}
    hideWalletAddress
    {...props}
  >
    <Container>
      <BannerLunarAirDrop />
      <DopeNewsCast posts={allPosts} />
    </Container>
  </DesktopWindow>
);

export default NewsWindow;
