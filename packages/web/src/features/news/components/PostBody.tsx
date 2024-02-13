import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';

type PostBodyProps = {
  content: string;
};

const PostBody = ({ content }: PostBodyProps) => (
  <Box className="markdownContainer markdown">
    <Box dangerouslySetInnerHTML={{ __html: content }} />
  </Box>
);

export default PostBody;
