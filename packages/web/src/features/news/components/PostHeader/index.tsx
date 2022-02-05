import { Box, Text, Stack } from '@chakra-ui/layout';
import { PostType } from 'features/news/types';
import Avatar from 'features/news/components/Avatar';
import Cover from 'features/news/components/Cover';

type PostHeaderProps = Pick<PostType, 'title' | 'coverImage' | 'author' | 'date'>;

const PostHeader = ({ title, coverImage, date, author }: PostHeaderProps) => (
  <Stack direction="column" gap="8px">
    <Box marginBottom="" flex={1}>
      <Text color="black" fontWeight="800" fontSize="3xl" lineHeight="1em">
        {title}
      </Text>
    </Box>
    <Stack direction="row" alignItems="start">
      <Box flex="1">
        <Cover title={title} src={coverImage} />
      </Box>
      <Box flex="1">
        <Avatar name={author.name} picture={author.picture} date={date} />
      </Box>
    </Stack>
  </Stack>
);

export default PostHeader;
