import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';
import Head from 'components/Head';
import DesktopWindow from 'components/DesktopWindow';

const TextBody = styled.div`
  background-color: #efefee;
  height: 100%;
  overflow: auto;
  padding: 32px;
  font-size: 1.125em;
  p,
  div,
  h2,
  h3,
  h4,
  em,
  strong,
  bold,
  ul,
  li,
  a {
    font-family: Courier, monospace !important;
  }

  h2,
  h3,
  h4 {
    font-weight: 600;
  }
  h2,
  h3 {
    margin-top: 32px;
    margin-bottom: 16px;
  }
  h4 {
    margin-bottom: 8px;
  }
  img[src*='#float-left'] {
    width: 50%;
    float: left;
    margin: 16px;
    margin-left: 0;
  }
  img[src*='#full-bleed'] {
    width: 100%;
    margin-bottom: 16px;
    margin-top: 16px;
  }
  hr {
    border-top: 2px dashed #bfb9bd;
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

The DOPE WARS community is [producing one of the first play-to-earn crypto games](https://dope-wars.notion.site/DIP-4-RYO-v1-c65d88de9abe49c08afa60d69a6cb1bc) on the Ethereum and [StarkNet](https://starkware.co/) blockchain, inspired by the classic TI-83 game we played instead of doing math homework.

DOPE WARS is also an ongoing NFT art project and experiment in decentralized project governance using a [DAO](https://ethereum.org/en/dao/).

----

### For detailed information…
…Including how to purchase your first DOPE NFT, how to get involved with the project, or what "the game" will be like
👉 [Please see our Wiki and Players Guide](http://wiki.dopedao.org) 👈

----

## DOPE NFT

![DOPE NFT #0001](/images/dope-nft-1.svg#float-left)

[A limited edition of 8,000 DOPE NFTs were created in September 2021.](https://opensea.io/collection/dope-v4) 

These bundles contain Gear with randomized attributes and rarity scores. Each NFT allows you to build a "Hustler" character to be used in our upcoming games, and provides an equal Governance Vote on Proposals from the DAO.

### Ready to jump in?
[Read this guide to help purchase your first DOPE NFT.](https://dope-wars.notion.site/Swap-Meet-Guide-9d2f661813c44b1dbfe35c49eb89c59b)


### DAO Governance + Compensation
To fund the DOPE DAO treasury we've established a 5% royalty payment on each sale, held by the DAO until released by community vote.

Community members draft [proposals](https://dope-wars.notion.site/626df3ff9e4d47da98ea23abc4b6e7a7?v=6350c7a1a9ba4a1c953c8cc4f9a0f062) to use these funds on projects that are then voted on by DOPE NFT holders. This governance structure is how we're able to continue building the DOPE WARS ecosystem with a loose collection of shifting contributors.

----

## Hustlers

[Learn more about Hustlers on our Wiki.](https://dope-wars.notion.site/dope-wars/Dope-Wiki-e237166bd7e6457babc964d1724befb2#d491a70fab074062b7b3248d6d09c06a)

![Hustlers](/images/hustlers.png#full-bleed)

Hustlers are in-game characters that are created by Claiming Gear from your DOPE NFT, then minting a Hustler NFT with artwork all stored on the Ethereum blockchain. [This proposal passed our second DAO vote](https://dope-wars.notion.site/Pixel-Avatar-Project-0f64bb450aba46cebdced07c63f69bce).


----

## $PAPER

[$PAPER is an Ethereum token](https://www.coingecko.com/en/coins/dope-wars-paper), and the in-game asset of Dope Wars – our p2e homage of the game we all played on our calculators instead of paying attention in math class.

![PAPER Airdrop](/images/paper-chopper.png#full-bleed)

$PAPER was originally distributed through a claimable amount of 125,000 per $DOPE NFT. Each NFT allows a claim of 125,000 $PAPER once and only once – and regardless of the current holder the NFT does not allow for more than one claim. These claims are the only source of $PAPER’s supply currently. 

To see if your DOPE NFT is eligible please connect your wallet in DOPEWARS.EXE and view it. If you need to obtain $PAPER, please do so from a site like [Dextools](https://www.dextools.io/app/ether/pair-explorer/0xad6d2f2cb7bf2c55c7493fd650d3a66a4c72c483).

## What is the supply of $PAPER?

The supply of paper is currently fixed at 1 billion, and while this can be increased with a DAO governance vote – the current consensus is that this won’t be necessary. When details of the economy in-game and in the broader ecosystem get closer to the end of the design stage the DAO may remove the ability to increase the supply of $PAPER from the contract entirely.

👉 [What WOLF CRYPTO has to say about DOPE WARS + $PAPER](https://wolfcrypto.medium.com/dope-wars-paper-tldr-90d23fa6acb3) 👈

----

## DOPEWARS.EXE

Our first project is to provide a portal for the DOPE WARS ecosystem. Additional experiences like the game will be hosted here.

You can connect an Ethereum Wallet to see all of the DOPE NFT’s that you have purchased.

[Claim Gear, create a PFP of your Dope Dealer](https://dope-wars.notion.site/Dope-Wars-Ignition-e92fd2b6efeb4e4991c7df98f5553283), and trade individual items with other players to equip your Dope Dealer in our SWAP MEET.

----

### The DOPE DAO is supported by gamers like you
[Purchase DOPE on OpenSea](https://opensea.io/collection/dope-v4) to claim your votes on DOPE DAO proposals and play the upcoming game.

----

### Press

- [WOLF CRYPTO on DOPE WARS + $PAPER](https://wolfcrypto.medium.com/dope-wars-paper-tldr-90d23fa6acb3)  
  10.2021
- [Motherboard / VICE](https://www.vice.com/en/article/akgp8e/people-are-spending-millions-of-dollars-on-loot-for-games-that-dont-exist)  
09.2021
- [Collectively Intelligent Podcast](https://open.spotify.com/episode/5xOaIJhit7pX25rrvHcQ0z)  
09.2021

----

### Credits
* Original concept by [Dennison Bertram](https://twitter.com/dennisonbertram) and [tarrence](https://twitter.com/tarrenceva)
* DOPEWARS.EXE produced by [facesof.eth](https://twitter.com/facesOfEth) and [tarrence](https://twitter.com/tarrenceva)
* Character pixel artwork by [Mr Fax](https://twitter.com/Mr_faxu)
* Design and branding by [facesof.eth](https://twitter.com/facesOfEth)
* DOPE WARS logo by [bestservedbold](https://twitter.com/bstsrvdbld)
* DOPE TV produced by [Shecky Green](https://twitter.com/SheckyGreen)

----

### Voting

- [On-Chain DAO Governance with Tally](https://www.withtally.com/governance/dopeWars)
- [Heat Check Voting with Snapshot](https://snapshot.org/#/dopedao.eth)

`;

export default function About() {
  return (
    <>
      <Head title={'About DOPE WARS NFT'} />
      <DesktopWindow title="ABOUT.FAQ" width={640} height="90vh">
        <TextBody className="markdownContainer">
          <ReactMarkdown>{AboutContent}</ReactMarkdown>
        </TextBody>
      </DesktopWindow>
    </>
  );
}
