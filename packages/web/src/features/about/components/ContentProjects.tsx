import { Button, Box, Image, Heading } from '@chakra-ui/react';
import { media } from 'ui/styles/mixins';
import RoadmapItem from 'features/about/components/RoadmapItem';
import styled from '@emotion/styled';
import HustlerSpriteSheetWalk from 'features/hustlers/components/HustlerSpriteSheetWalk';
import { getRandomNumber } from 'utils/utils';
import Link from 'next/link';

const Container = styled.div`
  background: var(--gray-800);
  width: 100%;
  color: var(--gray-00);
  h2,
  h3,
  h4 {
    font-weight: 600;
    padding: 0px 32px;
  }
  h2 {
    font-size: var(--text-04) !important;
    text-transform: uppercase;
  }
  * {
    // font-family: Courier, monospace !important;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Road = styled.div`
  background: #878e8e url(/images/about/roadmap-tile.png) center / 800px 324px repeat;
  min-height: 200px;
  padding: 16px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
`;

const SectionHeader = styled.h3`
  text-transform: uppercase;
  font-size: var(--text-04) !important;
  text-shadow: 4px 4px rgba(0, 0, 0, 0.5);
  color: white;
  margin: 40px 0;
`;

const ContentProjects = () => (
  <Container>
    <Box p="4em 2em">
      <Heading>Projects</Heading>
    </Box>
    <Road>
      <RoadmapItem
        title="DOPE NFT"
        imageUrl="/images/about/dope-nft-1.svg"
        imageAlt="Dope NFT #1"
        complete
      >
        <>
          <p>
            <Link href="https://opensea.io/collection/dope-v4" passHref target="opensea">
              8,000 randomized, limited-edition NFT bundles
            </Link>{' '}
            of $PAPER and Gear were released September 2021 during a fair-mint, costing only gas.
          </p>
          <p>
            The NFT community responded to our new idea of building a hip-hop gaming metaverse from
            the ground up by funding our project with over $1M USD in royalties over the first few
            weeks of sales.
          </p>
          <p>
            Each ERC-721 DOPE NFT allows you to build a Hustler character to be used in our upcoming
            games, and provides an equal Governance Vote on Proposals from the DAO.
          </p>
          <p>
            <Link href="/swap-meet" passHref>
              <Button>BUY DOPE NFT</Button>
            </Link>
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="$PAPER"
        imageUrl="/images/about/paper-animate.gif"
        imageAlt="$PAPER ERC20 Token"
        complete
      >
        <>
          <p>
            <Link href="https://www.coingecko.com/en/coins/dope-wars-paper" target="coingecko">
              PAPER is an Ethereum ERC-20 token
            </Link>{' '}
            , and the in-game currency of Dope Wars.
          </p>
          <p>
            PAPER was originally distributed through a claimable amount of 125,000 per DOPE NFT.
            Each NFT allows a claim of 125,000 $PAPER once and only once — and regardless of the
            current holder the NFT does not allow for more than one claim.
          </p>
          <p>
            <Link
              href="https://www.dextools.io/app/ether/pair-explorer/0xad6d2f2cb7bf2c55c7493fd650d3a66a4c72c483"
              passHref
            >
              <Button>GET $PAPER</Button>
            </Link>
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="Gear"
        imageUrl="/images/about/three-piece-suit.svg"
        imageAlt="Interchangeable"
        complete
      >
        <>
          <p>
            <a
              href="https://dope-wars.notion.site/Dope-Gear-Guide-bab6001d5af2469f8790d8a1f156b3f4"
              target="wiki"
            >
              Gear are interchangeable pieces of equipment
            </a>{' '}
            that live on the L2 Optimism blockchain as ERC-1155 tokens. They are created by Claiming
            an original DOPE NFT. This Claim process produces 9 separate NFT items that can be
            traded and equipped independently of one another, using our custom marketplace for low
            gas fees.
          </p>
          <p>
            Gear is tradeable on our <Link href="/swap-meet-gear">Swap Meet</Link>
          </p>
          <p>
            <Link href="/swap-meet/gear" passHref>
              <Button>GET GEAR</Button>
            </Link>
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="Hustlers"
        imageUrl="/images/about/hustler.svg"
        imageAlt="In-game Hustler Characters"
        complete
      >
        <>
          <p>
            <Link
              href="https://dope-wars.notion.site/dope-wars/Dope-Wiki-e237166bd7e6457babc964d1724befb2#d491a70fab074062b7b3248d6d09c06a"
              target="wiki"
              passHref
            >
              Hustlers
            </Link>{' '}
            are bleeding edge, fully-customizable in-game characters and profile pictures created by
            Claiming Gear from an original DOPE NFT then minting a Hustler NFT on the Optimism L2
            network for low gas fees. All Hustler artwork is stored on the blockchain and can be
            changed at any time using our <Link href="/swap-meet/hustlers">Swap Meet</Link>.
          </p>
          <p>
            <Link href="/swap-meet/hustlers">
              <Button>BUY A HUSTLER</Button>
            </Link>
          </p>
          <p>
            <Link href="/mint">
              <Button>MINT A HUSTLER</Button>
            </Link>
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="DOPE Mix Volume 1 by DJ Green Lantern &amp; Original Dope Wars EP"
        imageUrl="/images/news/green-lantern-dope-mix-vol-1.jpeg"
        imageAlt="DOPE Mix Volume 1"
        complete
      >
        <p>
          The world famous <a href="https://twitter.com/DJGREENLANTERN">DJ Green Lantern</a> dropped
          an exclusive original, certified hip-hop mix specifically made for Dope Wars that was
          launched in-game and streamed live on Twitch.
        </p>
        <p>
          Currently, an original music EP is being produced with top name artists in the rap game
          with help from DOPE DAO member <a href="https://twitter.com/SheckyGreen">Shecky Green</a>{' '}
          of The Source Magazine.
        </p>
        <p>
          <a
            href="https://soundcloud.com/djgreenlantern/dj-green-lantern-dope-wars-mix"
            target="roadmap"
          >
            LISTEN TO THE MIX
          </a>
        </p>
      </RoadmapItem>
    </Road>
  </Container>
);
export default ContentProjects;
