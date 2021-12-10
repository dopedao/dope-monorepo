import LoadingBlock from './LoadingBlock';
import { AspectRatio } from '@chakra-ui/layout';

const LoadingBlockSquareCentered = () => {
  return (
    <AspectRatio ratio={1}>
      <LoadingBlock maxRows={5} />
    </AspectRatio>
  );
};
export default LoadingBlockSquareCentered;
