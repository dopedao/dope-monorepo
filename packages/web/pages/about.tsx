import ReactMarkdown from 'react-markdown';
import Head from '../components/Head';
import DesktopWindow from '../components/DesktopWindow';
import styled from '@emotion/styled';

const TextBody = styled.div`
  background-color: #efefee;
  height: 100%;
  overflow: auto;
  padding: 32px;
  font-size: 1.2em;
  h2,
  h3 {
    margin-top: 32px;
    margin-bottom: 16px;
  }
  h4 {
    margin-bottom: 8px;
  }
  em {
    background-color: rgba(255, 252, 63, 0.5);
  }
  img[src*="#float-left"] {
    width:50%;
    float:left;
    margin: 16px;
    margin-left: 0;
  }
  img[src*="#full-bleed"] {
    width: 100%;
    margin-bottom: 16px;
    margin-top: 16px;
  }
  hr {
    border-top: 2px dashed #BFB9BD;
    margin-top: 32px;
    margin-bottom: 32px;
  }
  ul {
    list-style-type: square;
    margin-left: 1.5em;
  }
`;

const AboutContent = `
# What is this?

_Dope Wars is an ongoing NFT art project and experiment in DAO Governance._

The Dope DAO is [producing one of the first play-to-earn crypto games](https://dope-wars.notion.site/DIP-4-RYO-v1-c65d88de9abe49c08afa60d69a6cb1bc) on the Ethereum blockchain, inspired by the classic TI-83 game we played instead of doing math homework.

----

## DOPE NFT

![DOPE LOOT NFT #0001](/images/dope-nft-1.svg#float-left)

DOPE NFTs are bundles of items, with randomized rarity scores. Each DOPE NFT allows you to build a character around a collection of items to be used in game and provides an equal Governance Vote on Proposals from the DAO.


### DAO Governance 
5% of each purchase of a DOPE NFT is deposited into the DOPE DAO treasury. Community members draft [proposals](https://dope-wars.notion.site/626df3ff9e4d47da98ea23abc4b6e7a7?v=6350c7a1a9ba4a1c953c8cc4f9a0f062) to use these funds on projects that are then voted on by DOPE NFT holders. This governance structure is how we're able to continue building the DOPE WARS ecosystem with a loose collection of shifting contributors.

----

## Characters

![Hustlers and Dealers](/images/hustlers.png#full-bleed)

Hustlers and Dealers are created by unbundling your DOPE NFT, equipping them with items, then minting a Hustler NFT with artwork all stored on the Ethereum blockchain. [This proposal passed our second DAO vote](https://dope-wars.notion.site/Pixel-Avatar-Project-0f64bb450aba46cebdced07c63f69bce), and we hope to launch sometime in October 2021.

----

## $PAPER

[$PAPER is an Ethereum token](https://www.coingecko.com/en/coins/dope-wars-paper), and the in-game asset of Dope Wars – our p2e homage of the game we all played on our calculators instead of paying attention in math class.

You can obtain $PAPER by claiming it from an original DOPE NFT, or by swapping for it on a distributed exchange like [Dextools](https://www.dextools.io/app/ether/pair-explorer/0x811f8c60ee1805db7ece0fa3c7b064feba887053).

![PAPER Airdrop](/images/paper-chopper.png#full-bleed)
You are automatically entitled to claim 125,000 $PAPER for each Dope Wars Loot NFT using this [contract address on EtherScan](https://etherscan.io/address/0x7ae1d57b58fa6411f32948314badd83583ee0e8c).

_Each DOPE NFT is able to claim $PAPER only once._

To see if your Dope Wars Loot NFT is eligible please connect your wallet in DOPEWARS.EXE and view your Loot.

----

## DOPEWARS.EXE

Our first project is to provide a portal for the DOPE WARS ecosystem. Additional experiences like the game will be hosted here.

#### Now
You can connect an Ethereum Wallet to see all of the DOPE NFT’s that you have purchased.

#### Soon
Very shortly, you’ll be able to [unbundle your items, create a PFP of your Dope Dealer](https://dope-wars.notion.site/Dope-Wars-Ignition-e92fd2b6efeb4e4991c7df98f5553283), and trade individual items with other players to equip your Dope Dealer in our MARKET.

----

### The DOPE DAO is supported by gamers like you
[Purchase DOPE NFT items on OpenSea](https://opensea.io/collection/dope-v4) to claim your votes on DOPE DAO proposals and play the upcoming game.

----

### More Info

- [Dope DAO Wiki](http://wiki.dopedao.org)
- [DAO Governance with Tally](https://www.withtally.com/governance/dopeWars)

----

### Credits
* Original concept by [Dennison Bertram](https://twitter.com/dennisonbertram) and [tarrence](https://twitter.com/tarrenceva)
* DOPEWARS.EXE produced by [facesof.eth](https://twitter.com/facesOfEth) and [tarrence](https://twitter.com/tarrenceva)
* Character pixel artwork by [Mr Fax](https://twitter.com/Mr_faxu)
* Design and branding by [facesof.eth](https://twitter.com/facesOfEth)
* DOPE WARS logo by [bestservedbold](https://twitter.com/bstsrvdbld)

----

### Press

- [Motherboard / VICE, September 2021](https://www.vice.com/en/article/akgp8e/people-are-spending-millions-of-dollars-on-loot-for-games-that-dont-exist)
- [Collectively Intelligent Podcast, September 2021](https://open.spotify.com/episode/5xOaIJhit7pX25rrvHcQ0z)

`;

export default function About() {
  return (
    <>
      <Head title={'About'} />
      <DesktopWindow title="ABOUT.FAQ" width={640} height={960}>
        <TextBody className="markdownContainer">
          <ReactMarkdown>{AboutContent}</ReactMarkdown>
        </TextBody>
      </DesktopWindow>
    </>
  );
}
