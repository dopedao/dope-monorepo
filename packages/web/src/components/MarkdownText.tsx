import ReactMarkdown from 'react-markdown';
import { Box } from '@chakra-ui/react';

const MarkdownText = ({ text }: { text: string }) => (
  <Box className="markdown">
    <ReactMarkdown linkTarget="_blank">{text}</ReactMarkdown>
  </Box>
);

export default MarkdownText;
