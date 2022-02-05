import styled from '@emotion/styled';

type PostBodyProps = {
  content: string;
};

const TextBody = styled.div`
  background-color: var(--gray-00);
  height: 100%;
  overflow: auto;
  padding: 32px;
  font-size: 1.125em;
  p,
  div,
  h2,
  h3,
  h4,
  em,
  strong,
  bold,
  ul,
  li,
  a {
    font-family: Courier, monospace !important;
  }

  h2,
  h3,
  h4 {
    font-weight: 600;
  }
  h2,
  h3 {
    margin-top: 32px;
    margin-bottom: 16px;
  }
  h4 {
    margin-bottom: 8px;
  }
  img[src*='#float-left'] {
    width: 50%;
    float: left;
    margin: 16px;
    margin-left: 0;
  }
  img[src*='#full-bleed'] {
    width: 100%;
    margin-bottom: 16px;
    margin-top: 16px;
  }
  hr {
    border-top: 2px dashed #bfb9bd;
    margin-top: 32px;
    margin-bottom: 32px;
  }
  ul {
    list-style-type: square;
    margin-left: 1.5em;
  }
`;

const PostBody = ({ content }: PostBodyProps) => (
  <TextBody className="markdownContainer">
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </TextBody>
);

export default PostBody;
