import MarkdownText from "components/MarkdownText";

const ContentFooter = () => {
  const content = `
## About this site

Our first project is to provide a portal for the DOPE WARS ecosystem right here. Additional experiences like the game will be hosted here.

You can connect an Ethereum Wallet to see all of the DOPE NFT’s that you have purchased.

[Claim Gear, create a Hustler](https://dope-wars.notion.site/Dope-Wars-Ignition-e92fd2b6efeb4e4991c7df98f5553283), and trade individual Gear with other players to equip your Hustler in our [SWAP MEET](/swap-meet).

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
* Original concept by [Dennison Bertram](https://twitter.com/dennisonbertram)
* DOPEWARS.GG produced by [tarrence](https://twitter.com/tarrenceva) and [facesof.eth](https://twitter.com/facesOfEth)
* Character pixel artwork by [Mr Fax](https://twitter.com/Mr_faxu)
* Game Artwork and Maps by [HPMNK](https://twitter.com/HPMNK_One)
* Blockchain wizardry by [tarrence](https://twitter.com/tarrenceva)
* Starnket gigabrain infrastructure by [perama](https://twitter.com/eth_worm)
* Art direction by [facesof.eth](https://twitter.com/facesOfEth)
* DOPE TV and DOPE MUSIC produced by [Shecky Green](https://twitter.com/SheckyGreen)
* Chiptunes by [Baron Von Future](https://twitter.com/baronvonfuture)
* Dank memes by [M1](https://twitter.com/_541va_)
* Tokenomics by [Winston Wolfe](https://twitter.com/wolfcryptogroup)
* Grimey Graff and island vibes by [Cyberbitz](https://twitter.com/Cyberbitz)
* UX Design by [facesof.eth](https://twitter.com/facesOfEth) and [Clicksave](https://twitter.com/click__save)
* Copy for The Daily Dope by [Bikemaker](https://twitter.com/bikemaker)
* Everything else [Beatws9](https://twitter.com/beatws9)
* DOPE WARS logo by [bestservedbold](https://twitter.com/bstsrvdbld)

----

### Voting

- [On-Chain DAO Governance with Tally](https://www.withtally.com/governance/dopeWars)
- [Heat Check Voting with Snapshot](https://snapshot.org/#/dopedao.eth)    
  `;
  return <MarkdownText text={content} />
}

export default ContentFooter;
