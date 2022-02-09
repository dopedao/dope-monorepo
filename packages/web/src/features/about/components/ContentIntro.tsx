import MarkdownText from "components/MarkdownText";
const ContentIntro = () => {
  const content = `
Dope Wars is a fully decentralized, community driven, play-to-earn gaming metaverse project inspired by hip-hop culture. Our unique fully-customizable avatars in web3 stand for the values and principles we stand for with our carbon avatars.

We're bootstrapping a modern-day GTA-inspired metaverse and series of games built by our decentralized game studio on the Ethereum blockchain, [inspired by the classic Drugwars game](https://www.youtube.com/watch?v=3rg7rOfcdo8) that many of us played growing up.

Our open environment allows developers and contributors to produce their own limitless games for the Dope Wars NFT holders.

Dope Wars is also an ongoing NFT art project and experiment in decentralized project finance and governance using a [DAO](https://ethereum.org/en/dao/). We have no VC funding. All of our treasury's revenue comes from royalties of NFT sales.
  `
  return <MarkdownText text={content} />
};

export default ContentIntro;
