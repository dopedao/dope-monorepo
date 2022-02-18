import { css } from '@emotion/react';
import { Image } from '@chakra-ui/image';
import { AspectRatio } from '@chakra-ui/layout';

type Metadata = {
  image: string;
  name?: string | null | undefined;
  description?: string;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
};

type HustlerItemProps = {
  data: Metadata;
};

const RenderFromChain = ({ data }: HustlerItemProps) => (
  <AspectRatio ratio={1}>
    <Image
      css={css`
        object-fit: cover;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        image-rendering: pixelated;
      `}
      src={data.image}
      alt={data.name || ''}
    />
  </AspectRatio>
);

export default RenderFromChain;
