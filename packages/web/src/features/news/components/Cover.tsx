import { Image } from '@chakra-ui/image';
import { css } from '@emotion/react';
import Link from 'next/link';
import { Box } from '@chakra-ui/react';

type CoverProps = {
  title: string;
  src: string;
  slug?: string;
};

const Cover = ({ title, src, slug }: CoverProps) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      css={css`
        filter: saturate(0);
        cursor: pointer;
        cursor: hand;
      `}
    />
  );

  return (
    <Box className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </Box>
  );
};

export default Cover;
