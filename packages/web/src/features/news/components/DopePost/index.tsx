import styled from '@emotion/styled';
import { media } from 'ui/styles/mixins';
import DopePostHeader from 'features/news/components/DopePostHeader';
import DopePostBody from 'features/news/components/DopePostBody';
import { DopePostType } from 'features/news/types';

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
  post: DopePostType;
};

const DopePost = ({ post }: DopePostProps) => {
  const { description, location, $paper, ...postBodyProps } = post;
  return (
    <Container>
      <Article>
        <DopePostHeader
          description={post.description}
          location={post.location}
          date={post.date}
          $paper={$paper}
        />
        <DopePostBody {...postBodyProps} />
      </Article>
    </Container>
  );
};

export default DopePost;
