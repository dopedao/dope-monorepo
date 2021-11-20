import { AlertIcon, Alert, Box, Button, Image, HStack, Spacer } from '@chakra-ui/react';
import { getRandomNumber } from 'src/utils';
import { media } from 'styles/mixins';
import Head from 'components/Head';
import Link from 'next/link';
import styled from '@emotion/styled';
import WebAmpPlayer from 'components/WebAmpPlayer';
import { useWeb3React } from '@web3-react/core';
import { useAllHustlersQuery } from 'src/generated/graphql';
import { useOptimismClient } from 'components/EthereumApolloProvider';
import RenderFromChain from 'components/hustler/RenderFromChain';

const MASTHEADS = [
  'dope.svg',
  'hell-yeah.svg',
  'success.svg',
  'wagmi.svg',
  'GM.svg',
  'paper-gang.svg',
];

const randomMast = () => {
  const path = '/images/masthead/';
  return path + MASTHEADS[getRandomNumber(0, MASTHEADS.length - 1)];
};

const PLUGS = [
  {
    link: 'https://twitter.com/Mr_faxu',
    name: 'Mr Fax',
    prefix: 'Shadowy Superpixeler',
  },
  {
    link: 'https://twitter.com/baronvonfuture',
    name: 'Bobby Shields',
    prefix: 'Chiptune Virtuoso',
  },
  {
    link: 'https://twitter.com/BrianDShields',
    name: 'Penguin',
    suffix: 'The Wizard',
  },
  {
    link: 'https://twitter.com/SheckyGreen',
    name: 'Shecky Green',
    prefix: 'The Source',
  },
  {
    link: 'https://twitter.com/DennisonBertram',
    name: 'Dennison Bertram',
    prefix: 'The Godfather',
  },
  {
    link: 'https://twitter.com/tarrenceva',
    name: 'Tarrence',
    suffix: 'The Don',
  },
  {
    link: 'https://twitter.com/facesOfEth',
    name: 'Faces of ETH',
    prefix: 'Faceless',
  },
  {
    link: 'https://twitter.com/bstsrvdbld',
    name: 'BestServedBold',
    prefix: 'One Hitter Quitter',
  },
  {
    link: 'https://twitter.com/eth_worm',
    name: 'Perama',
    suffix: 'The ETH Worm',
  },
  {
    link: 'https://twitter.com/bellgloom',
    name: 'Bellgloom',
    prefix: 'The Last Word',
  },
  {
    link: 'https://twitter.com/_541va_',
    name: 'M1',
    prefix: 'Stickman',
  },
  {
    link: 'https://twitter.com/smakosh',
    name: 'Smakosh',
    suffix: 'The Kid',
  },
];
const PlugContainer = styled.div`
  position: fixed;
  top: 80%;
  left: 50%;
  width: 90%;
  transform: translate(-50%, 0%);
  color: white;
  ${media.tablet`
    width: 50%;
  `}
  img, ul li {
    margin-bottom: 7.25em;
    ${media.tablet`
      margin-bottom: 15em;
    `}
  }
  ul li {
    font-size: 1.25em;
    background-color: rgba(255, 255, 255, 0.125);
    text-align: center;
  }
  a {
    display: block;
    padding: 1em;
  }
  .prefix,
  .suffix {
    color: #fdff6e;
    font-size: 0.9em;
  }
  opacity: 0;
  @keyframes scroll-in {
    0% {
      top: 80%;
      opacity: 1;
    }
    100% {
      top: -200em;
      opacity: 1;
    }
  }
  animation: scroll-in 60s linear 2s;
`;


const HustlerContainer = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  padding: 32px 16px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  .hustlerGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-column-gap: 32px;
    grid-row-gap: 64px;
  }
  ${media.tablet`
    padding: 32px;
  `}
`;

const ScreenSaver = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: rgba(0,0,0,0.5) url('/images/tile/brick-black.png') center/25% fixed;
`;


const GangstaParty = () => {
  const { account } = useWeb3React();
  const client = useOptimismClient();
  const { data, loading } = useAllHustlersQuery({client});

  return (
    <>
      <Head title="Bridging Hustler to Optimism" />
      <ScreenSaver>
        <HustlerContainer>
          CHECK ONE TWO
          {!loading && data?.hustlers && data?.hustlers.length > 0 && (
            <div className="hustlerGrid">
              {data.hustlers.map(({ id, data }) => {
                let meta = data.replace('data:application/json;base64,', '');
                meta = Buffer.from(meta, 'base64').toString();
                const decoded = JSON.parse(meta);
                return <RenderFromChain data={decoded} id={id} key={id} />;
              })}
            </div>
          )}
        </HustlerContainer>
        <PlugContainer>
          <Image src="/images/masthead/ogs.svg" alt="DOPE OGS" />
          <ul>
            {PLUGS.sort(() => Math.random() - 0.5).map((plug, index) => {
              return (
                <li key={`plug-${index}`}>
                  <a href={plug.link} target={plug.name}>
                    {plug.prefix ? <div className="prefix">&quot;{plug.prefix}&quot;</div> : ''}
                    {plug.name}
                    {plug.suffix ? <div className="suffix">&quot;{plug.suffix}&quot;</div> : ''}
                  </a>
                </li>
              );
            })}
          </ul>
        </PlugContainer>
        <WebAmpPlayer />
      </ScreenSaver>
      <HStack
        m={4}
        gridGap={1}
        bottom={0}
        right={0}
        position="absolute"
        width="100%"
        justifyContent="end"
      >
        <Link href="/hustlers" passHref>
          <a target="your-squad" rel="noreferrer">
            <Button>Peep Your Squad</Button>
          </a>
        </Link>
        <Link href="/hustlers/initiate/" passHref>
          <Button variant="primary">Mint A Hustler</Button>
        </Link>
      </HStack>
    </>
  );
};

export default GangstaParty;
