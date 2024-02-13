import { FC } from 'react';
import { Flex } from '@chakra-ui/react';

type ItemCountProps = {
  count: number;
};

const ItemCount: FC<ItemCountProps> = ({ count }) => {
  return (
    <Flex
      align="center"
      background="var(--gray-100)"
      borderRadius="full"
      color="black"
      height={8}
      justify="center"
      width={8}
      fontSize="xs"
      opacity={count === 0 ? 0 : 1}
    >
      {count}
    </Flex>
  );
};

export default ItemCount;
