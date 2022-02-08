import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';

const MarkdownDiv = styled.div`
  background-color: var(--gray-00);
  overflow-y: scroll;
  padding: 32px;
  padding-bottom: 0;
  font-size: 1.125em;
  width: 100%;
  justify-content: center;
  .markdown {
    max-width: 680px;
  }
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

  a {
    text-decoration: underline !important;
    color: var(--primary) !important;
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

const MarkdownText = ({text, css}: {text: string, css?: string}) => (
  <MarkdownDiv css={css}>
    <ReactMarkdown>
      {text}
    </ReactMarkdown>
  </MarkdownDiv>
);

export default MarkdownText;
