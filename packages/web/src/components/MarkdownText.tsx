import ReactMarkdown from 'react-markdown';

const MarkdownText = ({ text }: { text: string }) => (
  <div className="markdown">
    <ReactMarkdown linkTarget="_blank">{text}</ReactMarkdown>
  </div>
);

export default MarkdownText;
