import { css } from '@emotion/react';
import MarkdownText from 'components/MarkdownText';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import { Box } from '@chakra-ui/react';

const ContentIntro = () => {
  const content = `
## The evolution of gaming

Dope Wars is a fully decentralized, community driven, gaming metaverse project inspired by hip-hop culture.

### An open source blockchain gaming ecosystem

We're bootstrapping a modern-day GTA-inspired metaverse and series of games built by our decentralized game studio on the Ethereum blockchain, [inspired by the classic Drugwars game](https://www.youtube.com/watch?v=3rg7rOfcdo8) that many of us played growing up.

Our open environment allows developers and contributors to produce their own limitless games for the Dope Wars NFT holders.

### Powered by NFTs

To get in the game, you need a Hustler. Hustlers are configurable NFT characters that can equip and unequip NFT Gear. 

All of these NFTs can be traded on the secondary market. Level your character up, increase their value.

### Decentralized where it counts

Dope Wars is also an experiment in decentralized project finance and governance using a [DAO](https://ethereum.org/en/dao/). We have no VC funding. All of our treasury's revenue comes from royalties of NFT sales.
  `;
  return (
    <StackedResponsiveContainer
      css={css`
        height: auto !important;
        .markdown {
          padding: 0px !important;
        }
      `}
    >
      <Box
        css={css`
          background-image: url(/images/game/map/nyc-hustler-walk.gif);
          background-size: 600%;
        `}
      ></Box>
      <MarkdownText text={content} />
    </StackedResponsiveContainer>
  );
};

export default ContentIntro;
