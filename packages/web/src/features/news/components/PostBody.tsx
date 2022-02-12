import styled from '@emotion/styled';

type PostBodyProps = {
  content: string;
};

const PostBody = ({ content }: PostBodyProps) => (
  <div className="markdownContainer markdown">
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

export default PostBody;
