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
`;

const AboutContent = `
# What is this?

_Dope Wars is an NFT project and an experiment in DAO Governance._

The Dope DAO is producing one of the first play-to-earn crypto games on the Ethereum blockchain, inspired by the classic TI-83 game we played instead of doing math homework.

## DOPE NFT

![DOPE LOOT NFT #0001](/images/dope-nft-1.svg#float-left)

DOPE NFTs are bundles of items, with randomized rarity scores.

Each DOPE NFT allows you to build a character around a collection of items to be used in game. Each DOPE NFT also provides an equal Governance Vote on Proposals from the DAO.

----

## Characters

![Hustlers and Dealers](/images/hustlers.png#full-bleed)

Hustlers and Dealers are created by unbundling your DOPE NFT, equipping them with items, then minting a Hustler NFT with artwork all stored on the Ethereum blockchain. [This proposal passed our DAO vote](https://dope-wars.notion.site/Pixel-Avatar-Project-0f64bb450aba46cebdced07c63f69bce), and we hope to launch sometime in October 2021.

----

## $PAPER

![PAPER Airdrop](/images/paper-chopper.png#full-bleed)
You are automatically entitled to claim 125,000 $PAPER for each Dope Wars Loot NFT using [contract address on EtherScan](https://etherscan.io/address/0x7ae1d57b58fa6411f32948314badd83583ee0e8c). 

_Each DOPE NFT is able to claim only once._

To see if your Dope Wars Loot NFT is eligible please [use the claim check tool available here](https://dwlclaimcheck.surge.sh/).

**What is the point of $PAPER?**

$PAPER is the in-game asset of Dope Wars, our p2e homage of the game we all played on our TI-85 calculators instead of paying attention in math class. Because we don't know how much $PAPER will be needed in the game economy, there is no fixed supply of $PAPER.  

After all, Dope Wars takes place in a world post-1971, so a fixed monetary supply wouldn't really be accurate nor work for the fast-paced, high-action world of DOPE.  Dope DAO will be our Federal Reserve.

----

### Currently… 
You can connect an Ethereum Wallet to see all of the DOPE NFT’s that you have purchased.

----

### Soon…
You’ll be able to [unbundle your items, create a PFP of your Dope Dealer](https://dope-wars.notion.site/Dope-Wars-Ignition-e92fd2b6efeb4e4991c7df98f5553283), and trade individual items with other players to equip your Dope Dealer.

----

### The DOPE DAO is supported by gamers like you
5% of each purchase of a DOPE NFT is deposited into our treasury. This allows us to continue improving the DOPE WARS ecosystem.
[Purchase DOPE NFT on OpenSea](https://opensea.io/collection/dope-v4) 

----

### More Info

- [Dope DAO Wiki](http://wiki.dopedao.org)
- [DAO Governance Proposals via Tally](https://www.withtally.com/governance/dopeWars)

----

### Credits
- DOPEWARS.EXE produced by [facesof.eth](https://twitter.com/facesOfEth) and [tarrence](https://twitter.com/tarrenceva)
- Character pixel artwork by [Mr Fax](https://twitter.com/Mr_faxu)
- DOPE WARS logo by [bestservedbold](https://twitter.com/bstsrvdbld)


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
