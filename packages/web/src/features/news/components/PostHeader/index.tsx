import { Box, Text } from '@chakra-ui/layout';
import { PostType } from 'features/news/types';
import Avatar from 'features/news/components/Avatar';
import DateFormatter from 'features/news/components/DateFormatter';
import Cover from 'features/news/components/Cover';

type PostHeaderProps = Pick<PostType, 'title' | 'coverImage' | 'author' | 'date'>;

const PostHeader = ({ title, coverImage, date, author }: PostHeaderProps) => (
  <>
    <Text color="whiteAlpha.900" fontWeight="800" fontSize="6xl">
      {title}
    </Text>
    <Box marginBottom="8px">
      <Cover title={title} src={coverImage} />
    </Box>
    <Box marginY="5" color="whiteAlpha.900">
      <Avatar name={author.name} picture={author.picture} />
      <div className="mb-6 text-lg">
        <DateFormatter dateString={date} />
      </div>
    </Box>
  </>
);

export default PostHeader;
