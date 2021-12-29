import styled from '@emotion/styled';
import { media } from 'ui/styles/mixins';
import DopePostHeader from 'features/news/components/DopePostHeader';
import DopePostBody from 'features/news/components/DopePostBody';
import { PostType } from 'features/news/types';

const Container = styled.div`
  background: #fff;
  min-height: 100vh;
`;

const Article = styled.div`
  margin: 0 auto;
  max-width: var(--content-width-md);
  padding: 20px;
  ${media.phone`
    padding: 12px;
  `}
`;

type DopePostProps = {
  location?: string;
  date?: string;
  description?: string;
  posts: PostType[];
};

const DopeNewsCast = ({ description, location, date, posts }: DopePostProps) => {
  return (
    <Container>
      <Article>
        <DopePostHeader description={description} location={location} date={date} />
        <DopePostBody posts={posts} />
      </Article>
    </Container>
  );
};

export default DopeNewsCast;
