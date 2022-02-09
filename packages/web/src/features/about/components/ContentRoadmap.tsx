import { css } from "@emotion/react";
import { Box, Image } from "@chakra-ui/react";
import { media } from "ui/styles/mixins";
import RoadmapItem from 'features/about/components/RoadmapItem';
import styled from "@emotion/styled";
import HustlerSpriteSheetWalk from 'components/hustler/HustlerSpriteSheetWalk';
import { getRandomNumber } from "utils/utils";

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
      width:100%;
    }
  }
  ${media.tablet`
    height: 300px;
  `}
`;

const Road = styled.div`
  background: #878E8E url(/images/about/roadmap-tile.png) center / 800px 324px repeat-y;
  min-height: 200px;
  padding: 16px 0px;
`;

const SectionHeader = styled.h3`
  text-transform: uppercase;
  font-size: var(--text-04) !important;
  text-shadow: 4px 4px rgba(0,0,0,0.5);
  color: white;
  margin: 40px 0;
`

const ContentRoadmap = () => (
  <Container>
    <TunnelEntrance>
      <h2>
        <Image 
          src="/images/masthead/roadmap.svg" 
          alt="Roadmap"
        />
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
            <a href="https://opensea.io/collection/dope-v4" target="opensea">8,000 randomized, limited-edition NFT bundles</a> of $PAPER and Gear were released September 2021 during a fair-mint, costing only gas. 
          </p>
          <p>
            The NFT community responded to our new idea of building a hip-hop gaming metaverse from the ground up by funding our project with over $1M USD in royalties over the first few weeks of sales.
          </p>
          <p>
            Each ERC-721 DOPE NFT allows you to build a Hustler character to be used in our upcoming games, and provides an equal Governance Vote on Proposals from the DAO.
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
            <a href="https://www.coingecko.com/en/coins/dope-wars-paper" target="coingecko">PAPER is an Ethereum ERC-20 token</a>, and the in-game currency of Dope Wars.
          </p>
          <p>
            PAPER was originally distributed through a claimable amount of 125,000 per DOPE NFT. Each NFT allows a claim of 125,000 $PAPER once and only once — and regardless of the current holder the NFT does not allow for more than one claim. 
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
            <a href="https://dope-wars.notion.site/Dope-Gear-Guide-bab6001d5af2469f8790d8a1f156b3f4" target="wiki">Gear are interchangeable pieces of equipment</a> that live on the L2 Optimism blockchain as ERC-1155 tokens. They are created by Claiming an original DOPE NFT. This Claim process produces 9 separate NFT items that can be traded and equipped independently of one another, using our custom marketplace for low gas fees.
          </p>
          <p>
            Gear is tradeable on our <a href="/swap-meet-gear">Swap Meet</a> and on 3rd party marketplaces like <a href="https://quixotic.io/collection/opt/0x0E55e1913C50e015e0F60386ff56A4Bfb00D7110" target="quix">Quixotic</a>.
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
            <a href="https://dope-wars.notion.site/dope-wars/Dope-Wiki-e237166bd7e6457babc964d1724befb2#d491a70fab074062b7b3248d6d09c06a" target="wiki">Hustlers</a> are bleeding edge, fully-customizable in-game characters and profile pictures created by Claiming Gear from an original DOPE NFT then minting a Hustler NFT on the Optimism L2 network for low gas fees. All Hustler artwork is stored on the blockchain and can be changed at any time using our <a href="/swap-meet">Swap Meet</a>. 
          </p>
          <p>
            Hustlers will soon be tradeable on our <a href="/swap-meet-hustlers">Swap Meet</a>, but are available now to be traded on <a href="https://quixotic.io/collection/opt/0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E?attributes=&tab=0&query=" target="quix">Quixotic</a>.
          </p>
        </>
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
            Feb 1st — Feb 15th <a href="/lunar-new-year">we&apos;re celebrating the Lunar New Year with a free Gear Accessory drop from Chinatown</a>. All Hustlers created before January 31st, 2022 were eligible.
          </p>
          <p>新年好</p>
        </>
      </RoadmapItem>
      <SectionHeader>Coming Soon™️</SectionHeader>
      <RoadmapItem
        title="Swap Meet"
        imageUrl="/images/about/swap-meet-preview.png"
        imageAlt="In-game Hustler Characters"
        date="Q1 2022"
      >
        <>
          <p>
            Buy, sell, and trade DOPE, Hustlers, Gear, and more on our Dope Wars Marketplace, or <a href="/swap-meet">Swap Meet</a>. Powered by the L2 Optimism network, all transactions will happen quickly with almost nothing spent in gas fees.
          </p>
          <p>
            All transactions on our Swap Meet will feed 5% royalties to the DAO treasury, which enables us to continue funding this project with no VC investment.
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="DOPE Mixtape by DJ Green Lantern &amp; Original Dope Wars EP"
        imageUrl="/images/about/dope-mixtape.png"
        imageAlt="In-game Hustler Characters"
        date="Q1 2022"
      >
        <p>
          <a href="https://twitter.com/DJGREENLANTERN">DJ Green Lantern</a> will release an original hip-hop mixtape specifically made for Dope Wars that will be launched in-game and on Twitch. In addition, a 5-track EP is being produced with top name artists in the rap game; produced by <a href="https://twitter.com/SheckyGreen">Shecky Green</a> of The Source Magazine.
        </p>
      </RoadmapItem>
      <RoadmapItem
        title="WEB3 Integration + More"
        imageReplacement={ 
          <Box 
            background="#767674 url(/images/tile/chainlink.png) center / 512px repeat"
            display="flex" 
            alignItems="center" 
            justifyContent="center"
          >
            <HustlerSpriteSheetWalk id={getRandomNumber(0,500).toString()} /> 
          </Box>
        }
        date="Q1 2022"
      >
        <>
          <p>
            Using your Dope Wars Hustler as an in-game character, jump into the action on <a href="https://www.webb.game/" target="webb">Worldwide Webb</a> – an interoperable pixel metaverse.
          </p>
          <p>
            Purchasing a Dope Wars Hustler gives you access to a pluggable game character that we are working to place in multiple game environments. Some of those produced by us and others that have yet to be dreamed up.
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="TURF"
        imageUrl="/images/about/turf.png"
        imageAlt="In-game Hustler Characters"
        date="Q2 2022"
      >
        <>
          <p>
            Stake your DOPE and PAPER tokens to earn STREETCRED – then use that to purchase our metaverse territories that will help you in game…with your GANG.
          </p>
          <p>
            TURF is a proposed expansion of DOPE and is designed to act as a multi-player location lego for the Dope Wars ecosystem. It uses the existing DOPE item locations for Cities, while providing more granular locations by also including Districts, Hoods and Plots.  
          </p>
          <p>
            <a href="https://www.notion.so/dope-wars/DIP-24-The-Hustle-TURF-10be2b8155004341b13fa3c836d7daf7" target="wiki">Our proposal  allows for enhanced game mechanics</a> and a blueprint of land ownership rights for the Dope Wars Metaverse.
          </p>
        </>
      </RoadmapItem>
      <RoadmapItem
        title="P2E Game on Starknet"
        imageUrl="/images/about/dope-wars-pvp-fight.png"
        imageAlt="Play To Earn Game on Starknet"
        date="Q2-Q4 2022"
      >
        <>
          <p>
            Inspired by the classic games of yesterday, we&apos;re adapting the classic gameplay of drug arbitrage and launching it all on the zero-knowledge proof blockchain <a href="https://starkware.co/starknet/">Starknet</a>.
          </p>
          <p>
            <a href="https://github.com/dopedao/ryo" target="github">Our giga-brain shadow coder Perama has already made amazing progress on the game engine</a> which has been under construction for months, and <a href="https://www.notion.so/dope-wars/DIP-17-RYO-Dev-Fund-f1648d8befbc4ff394e134a7fed340b6" target="wiki">co-funded by the StarkWare team</a>.
          </p>
        </>
      </RoadmapItem>
    </Road>
  </Container>
);
export default ContentRoadmap;
