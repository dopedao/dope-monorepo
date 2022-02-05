import styled from '@emotion/styled';
import DesktopWindow from 'components/DesktopWindow';
import { PostType } from 'features/news/types';
import DopeNewsCast from 'features/news/components/DopeNewsCast';

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const NewsWindow = ({ allPosts }: {allPosts: PostType[]}) => (
  <DesktopWindow title="The Daily Dope">
    <Container>
      <DopeNewsCast posts={allPosts} />
    </Container>
  </DesktopWindow>
);

export default NewsWindow;
