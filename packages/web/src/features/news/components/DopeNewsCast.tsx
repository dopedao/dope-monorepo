import styled from '@emotion/styled';
import { media } from 'ui/styles/mixins';
import NewsHeader from 'features/news/components/NewsHeader';
import NewsBody from 'features/news/components/NewsBody';
import { PostType } from 'features/news/types';
import usePaginatedPosts from 'features/news/hooks/usePaginatedPosts';

const Container = styled.div`
  background: #fff;
  min-height: 100vh;
`;

const Article = styled.div`
  margin: 0 auto;
  max-width: var(--content-width-md);
  padding: 12px;

  ${media.tablet`
   padding: 20px;
  `}
`;

type DopePostProps = {
  location?: string;
  date?: string;
  description?: string;
  posts: PostType[];
};

const DopeNewsCast = ({ description, location, date, posts }: DopePostProps) => {
  const { paginatedPosts, hasMore } = usePaginatedPosts(posts);
  return (
    <Container>
      <Article>
        <NewsHeader description={description} location={location} date={date} />
        <NewsBody posts={paginatedPosts} hasMore={hasMore} />
      </Article>
    </Container>
  );
};

export default DopeNewsCast;
