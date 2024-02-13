import { Button, Box, Image } from '@chakra-ui/react';
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

const TunnelEntrance = styled.div`
  position: relative;
  background: #353338 url(/images/about/roadmap-entrance.png) bottom / 800px 235px no-repeat;
  height: 225px;
  width: 100%;
  padding: 32px;
  h2 {
    margin: auto;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
    top: 20%;
    width: 85%;
    ${media.tablet`
      top: 25%;
      width: 70%;
    `}
    img {
      image-rendering: pixelated;
      width: 100%;
    }
  }
  ${media.tablet`
    height: 300px;
  `}
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

const ContentRoadmap = () => (
  <Container>
    <TunnelEntrance>
      <h2>
        <Image src="/images/masthead/roadmap.svg" alt="Roadmap" />
      </h2>
    </TunnelEntrance>
    <Road>
      <SectionHeader>Available Now</SectionHeader>
      <RoadmapItem
        title="DOPE NFT"
        imageUrl="/images/about/dope-nft-1.svg"
        imageAlt="Dope NFT #1"
        date="Q3 2021"
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
            <Link href="/swap-meet" passHref target="roadmap">
              BUY DOPE NFT
            </Link>
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="$PAPER"
        imageUrl="/images/about/paper-animate.gif"
        imageAlt="$PAPER ERC20 Token"
        date="Q3 2021"
        complete
      >
        <>
          <p>
            <Link
              href="https://www.coingecko.com/en/coins/dope-wars-paper"
              passHref
              target="coingecko"
            >
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
              target="roadmap"
              passHref
            >
              GET $PAPER
            </Link>
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="Gear"
        imageUrl="/images/about/three-piece-suit.svg"
        imageAlt="Interchangeable"
        date="Q4 2021"
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
            Gear is tradeable on our{' '}
            <Link href="/swap-meet-gear" passHref>
              <a>Swap Meet</a>.
            </Link>
          </p>
          <p>
            <Link
              href="https://qx.app/collection/opt/0x0E55e1913C50e015e0F60386ff56A4Bfb00D7110"
              passHref
              target="roadmap"
            >
              GET GEAR
            </Link>
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="Hustlers"
        imageUrl="/images/about/hustler.svg"
        imageAlt="In-game Hustler Characters"
        date="Q4 2021"
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
            changed at any time using our <Link href="/swap-meet">Swap Meet</Link>.
          </p>
          {/* <p>
            <a href="/mint" target="roadmap">MINT A HUSTLER</a>
          </p> */}
        </>
      </RoadmapItem>
      <RoadmapItem
        title="Mugshots"
        imageUrl="/images/about/roadmap-mugshot-baron.png"
        imageAlt="Dope Wars Mugshot"
        date="Q1 2022"
      >
        <p>
          <Link href="https://community.dopewars.gg/mugshots" passHref>
            Dope Wars Mugshots
          </Link>{' '}
          are photo snapshots of Hustlers from the Dope Wars metaverse represented as ERC-721 tokens
          on Ethereum Mainnet.
        </p>
        <p>
          Our Hustler NFTs are so cutting-edge that apps like OpenSea and Rainbow won&apos;t support
          them for some time. Mugshots are a casual and fun way to bring pictures of your Hustlers
          to Mainnet via a simple NFT token.
        </p>
        <p>
          You can feature your Mugshots in common wallets and websites. Your friends, family, and
          that crush will finally see how gangster NFTs, Dope Wars, and you really are. As Twitter
          and others add verified NFT profile photos you&apos;ll be able to use your Mugshots and
          command internet respect. You can also sell Mugshots of your dopest Hustlers on popular
          exchanges.
        </p>
      </RoadmapItem>
      <RoadmapItem
        title="Lunar New Year Airdrop"
        imageUrl="/images/lunar_new_year_2022/hongbao_animated.gif"
        imageAlt="Free Accessory Airdrop"
        date="Q1 2022"
        complete
      >
        <>
          <p>
            Feb 1st — Feb 15th{' '}
            <Link href="/lunar-new-year">
              we&apos;re celebrating the Lunar New Year with a free Gear Accessory drop from
              Chinatown
            </Link>
            . All Hustlers created before January 31st, 2022 were eligible.
          </p>
          <p>新年好</p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="DOPE Mix Volume 1 by DJ Green Lantern &amp; Original Dope Wars EP"
        imageUrl="/images/news/green-lantern-dope-mix-vol-1.jpeg"
        imageAlt="DOPE Mix Volume 1"
        date="Q1 2022"
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
      <SectionHeader>Coming Next™</SectionHeader>
      <RoadmapItem
        title="WEB3 Integration + More"
        imageReplacement={
          <Box
            background="#767674 url(/images/tile/chainlink.png) center / 512px repeat"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <HustlerSpriteSheetWalk id={getRandomNumber(0, 500).toString()} />
          </Box>
        }
        date=""
      >
        <>
          <p>
            Using your Dope Wars Hustler as an in-game character, jump into the action on{' '}
            <a href="https://www.webb.game/" target="webb">
              Worldwide Webb
            </a>{' '}
            &mdash; an interoperable pixel metaverse.
          </p>
          <p>
            Purchasing a Dope Wars Hustler gives you access to a pluggable game character that we
            are working to place in multiple game environments. Some of those produced by us and
            others that have yet to be dreamed up.
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="Game on Starknet"
        imageUrl="/images/game/classic-mode.png"
        imageAlt="Game on Starknet"
        date=""
      >
        <>
          <p>
            Inspired by the classic games of yesterday, we&apos;re adapting the classic gameplay of
            drug arbitrage and launching it all on the zero-knowledge proof blockchain{' '}
            <a href="https://starkware.co/starknet/">Starknet</a>.
          </p>
          <p>
            <a href="https://github.com/dopedao/ryo" target="github">
              Our giga-brain shadow coder Perama has already made amazing progress on the game
              engine
            </a>{' '}
            which has been under construction for months, and{' '}
            <a
              href="https://www.notion.so/dope-wars/DIP-17-RYO-Dev-Fund-f1648d8befbc4ff394e134a7fed340b6"
              target="wiki"
            >
              co-funded by the StarkWare team
            </a>
            .
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="Swap Meet"
        imageUrl="/images/about/swap-meet-preview.png"
        imageAlt="Swap Meet"
        date=""
      >
        <>
          <p>
            Buy, sell, and trade DOPE, Hustlers, Gear, and more on our Dope Wars Marketplace, or{' '}
            <Link href="/swap-meet">Swap Meet</Link>. Powered by the L2 Optimism network, all
            transactions will happen quickly with almost nothing spent in gas fees.
          </p>
          <p>
            All transactions on our Swap Meet will feed 5% royalties to the DAO treasury, which
            enables us to continue funding this project with no VC investment.
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem title="TURF" imageUrl="/images/about/turf.png" imageAlt="TURF" date="">
        <>
          <p>
            Stake your DOPE and PAPER tokens to earn STREETCRED – then use that to purchase our
            metaverse territories that will help you in game…with your GANG.
          </p>
          <p>
            TURF is a proposed expansion of DOPE and is designed to act as a multi-player location
            lego for the Dope Wars ecosystem. It uses the existing DOPE item locations for Cities,
            while providing more granular locations by also including Districts, Hoods and Plots.
          </p>
          <p>
            <Link
              href="https://www.notion.so/dope-wars/DIP-24-The-Hustle-TURF-10be2b8155004341b13fa3c836d7daf7"
              target="wiki"
            >
              Our proposal allows for enhanced game mechanics
            </Link>{' '}
            and a blueprint of land ownership rights for the Dope Wars Metaverse.
          </p>
        </>
      </RoadmapItem>
    </Road>
  </Container>
);
export default ContentRoadmap;
