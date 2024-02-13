import { Avatar as ChakraAvatar, Stack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import DateFormatter from 'features/news/components/DateFormatter';

type AvatarProps = {
  name: string;
  picture: string;
  date?: string;
};

const Avatar = ({ name, picture, date }: AvatarProps) => (
  <Box display="flex" alignItems="center" marginLeft="2em" marginTop="2em">
    <ChakraAvatar background="transparent" src={picture} marginRight="2" />
    <Stack gap="0">
      <h4>{name}</h4>
      {date && (
        <Box className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </Box>
      )}
    </Stack>
  </Box>
);

export default Avatar;
