import MarkdownText from "components/MarkdownText";
const ContentIntro = () => {
  const content = `
Dope Wars is a fully decentralized, community driven, play-to-earn gaming metaverse project inspired by hip-hop culture. We believe in a fully decentralized world and our unique fully-customizable avatars in web3 stand for the values and principles we stand for with our carbon avatars.

We're bootstrapping a modern-day GTA-inspired metaverse and series of games on the Ethereum blockchain, [inspired by the classic Drugwars game](https://www.youtube.com/watch?v=3rg7rOfcdo8) that many of us played through the years – without VC funding.

We're creating an open environment that allows developers and contributors to produce their own limitless games for the Dope Wars NFT holders.

Dope Wars is also an ongoing NFT art project and experiment in decentralized project governance using a [DAO](https://ethereum.org/en/dao/).
  `
  return <MarkdownText text={content} />
};

export default ContentIntro;
