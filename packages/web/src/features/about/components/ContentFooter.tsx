import MarkdownText from 'components/MarkdownText';

const ContentFooter = () => {
  const content = `
## FAQ

----

### How does the DAO work?
To fund the DOPE DAO treasury we've established a 5% royalty payment on each sale, held by the DAO until released by community vote.

Community members draft [proposals](https://dope-wars.notion.site/626df3ff9e4d47da98ea23abc4b6e7a7?v=6350c7a1a9ba4a1c953c8cc4f9a0f062) to use these funds on projects that are then voted on by DOPE NFT holders. This governance structure is how we're able to continue building the DOPE WARS ecosystem with a loose collection of shifting contributors.

----

### What is the supply of $PAPER?

The supply of paper is currently fixed at 1.5 billion. In June 2022 [the DAO voted to increase the supply by 500M](https://www.tally.xyz/governance/eip155:1:0xDBd38F7e739709fe5bFaE6cc8eF67C3820830E0C/proposal/30600128298117676277554169874283776405585867552052066919092841814555374554857), which is held in our treasury. This PAPER is being held to incentivize future contributors, and potentially to fund future development in private token sales. When details of the economy in-game and in the broader ecosystem get closer to the end of the design stage the DAO may remove the ability to increase the supply of $PAPER from the contract entirely.

👉 [What WOLF CRYPTO has to say about DOPE WARS + $PAPER](https://wolfcrypto.medium.com/dope-wars-paper-tldr-90d23fa6acb3) 👈

----

### For more
Including how to purchase your first DOPE NFT, how to get involved with the project, or what "the game" will be like

👉 [Please see our Wiki and Players Guide](/wiki)

----

## About this site

Our first project is to provide a portal for the DOPE WARS ecosystem right here. Additional experiences like the game will be hosted here.

You can connect an Ethereum Wallet to see all of the DOPE NFT’s that you have purchased.

[Claim Gear, create a Hustler](https://dope-wars.notion.site/Dope-Wars-Ignition-e92fd2b6efeb4e4991c7df98f5553283), and trade individual Gear with other players to equip your Hustler in our [SWAP MEET](/swap-meet).

----

### Press

- [Starkwhale Podcast](https://soundcloud.com/user-315822963/starkpods-episode-001?si=f667a4b446204c76abe75fc0ad8d6366&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing)  
  02.2022
- [GM or GFM? An insider look into an organic beast: DOPE WARS DAO.](https://medium.com/@Taniela.taki/gm-or-gfm-1f23464f72)  
  12.2021
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
* Blockchain wizardry by [tarrence](https://twitter.com/tarrenceva)
* Starknet gigabrain infrastructure by [perama](https://twitter.com/eth_worm)
* Game Artwork and Maps by [HPMNK](https://twitter.com/HPMNK_One)
* MMORPG game dev by [Larko](https://twitter.com/aym_dm)
* Art direction by [facesof.eth](https://twitter.com/facesOfEth)
* Community, grimey Graff, and island vibes by [Cyberbitz](https://twitter.com/Cyberbitz)
* DOPE TV and DOPE MUSIC produced by [Shecky Green](https://twitter.com/SheckyGreen)
* Chiptunes by [Baron Von Future](https://twitter.com/baronvonfuture)
* Tokenomics by [Winston Wolfe](https://twitter.com/wolfcryptogroup)
* Mugshots by [mboyle](https://twitter.com/mboyle)
* UX Design by [facesof.eth](https://twitter.com/facesOfEth) and [Clicksave](https://twitter.com/click__save)
* Copy for The Daily Dope by [Bikemaker](https://twitter.com/bikemaker)
* DOPE WARS logo by [bestservedbold](https://twitter.com/bstsrvdbld)

----

### Voting

- [On-Chain DAO Governance with Tally](https://www.withtally.com/governance/dopeWars)
- [Heat Check Voting with Snapshot](https://snapshot.org/#/dopedao.eth)    
  `;
  return <MarkdownText text={content} />;
};

export default ContentFooter;
