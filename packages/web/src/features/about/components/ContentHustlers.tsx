import MarkdownText from 'components/MarkdownText';
import { Image } from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { css } from '@emotion/react';
import { Box } from '@chakra-ui/react';

const ContentHustlers = () => {
  const content = `
## Get in the game with a Hustler

Don't confuse Hustlers with basic "PFP" projects. Hustlers are fully-configurable characters that can be upgraded by acquiring Dope Gear NFTs and playing our upcoming games.

Hustlers unlock multiple game experiences. Better equipped Hustlers have higher chances of winning.

[More about Hustlers on our Player's Guide.](https://dope-wars.notion.site/Hustler-Guide-ad81eb1129c2405f8168177ba99774cf)
  `;
  return (
    <>
      <Image
        src="/images/hustler/hustler_about_banner.svg"
        alt="Hustlers are your character in Dope Wars"
      />
      <Box
        pb="3em"
        css={css`
          .markdown {
            padding-bottom: 0px !important;
          }
        `}
      >
        <MarkdownText text={content} />
      </Box>
    </>
  );
};

export default ContentHustlers;
