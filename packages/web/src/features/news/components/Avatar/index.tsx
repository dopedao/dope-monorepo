import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';

type AvatarProps = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: AvatarProps) => (
  <Box display="flex" alignItems="center">
    <ChakraAvatar src={picture} alt={name} marginRight="2" />
    <h4>{name}</h4>
  </Box>
);

export default Avatar;
