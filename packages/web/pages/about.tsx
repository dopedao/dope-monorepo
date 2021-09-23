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
  h1,
  h2,
  h3 {
    margin-top: 16px;
  }
  em {
    background-color: rgba(255, 252, 63, 0.5);
  }
`;

const AboutContent = `
# What is this?

Dope Wars is a NFT project, an experiment in DAO governance, and soon to be one of the first pay-to-earn crypto games on the Ethereum blockchain.

For now, you can connect an Ethereum wallet to see all of the [DOPE NFTs](https://opensea.io/collection/dope-v4) you've purchased.

Soon you'll be able to [unbundle, create a profile picture, and trade individual items](https://dope-wars.notion.site/Dope-Wars-Ignition-e92fd2b6efeb4e4991c7df98f5553283) with other players to equip your Hustler.

_DOPEWARS.EXE is currently in preview mode._

### Links of interest
- [DOPE DAO Wiki](wiki.dopedao.org)
- [Discord](https://discord.gg/6fqqBS7mhY)
- [Twitter](https://twitter.com/theDopeWars)
- [DAO Governance with Tally](https://www.withtally.com/governance/dopeWars)

### DOPEWARS.EXE Producers
- [facesof.eth](https://twitter.com/facesOfEth)
- [tarrence](https://twitter.com/tarrenceva)
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
