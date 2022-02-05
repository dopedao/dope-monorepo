import { Box, Text, Stack } from '@chakra-ui/layout';
import { PostType } from 'features/news/types';
import Avatar from 'features/news/components/Avatar';
import Cover from 'features/news/components/Cover';

type PostHeaderProps = Pick<PostType, 'title' | 'coverImage' | 'author' | 'date'>;

const PostHeader = ({ title, coverImage, date, author }: PostHeaderProps) => (
  <Stack direction="row" gap="16px">
    <Box marginBottom="8px" flex={1}>
      <Cover title={title} src={coverImage} />
    </Box>
    <Stack flex="2">
      <Text color="black" fontWeight="800" fontSize="6xl" lineHeight="1em">
        {title}
      </Text>
      <Avatar name={author.name} picture={author.picture} date={date} />
    </Stack>
  </Stack>
);

export default PostHeader;
