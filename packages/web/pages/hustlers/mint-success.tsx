import { AlertIcon, Alert, Box, Button, Image, HStack, Spacer } from '@chakra-ui/react';
import { getRandomNumber } from 'src/utils';
import { useCallback, useEffect, useState } from 'react';
import { media } from 'styles/mixins';
import Head from 'components/Head';
import Link from 'next/link';
import styled from '@emotion/styled';
import WebAmpPlayer from 'components/WebAmpPlayer';
import { useHustler } from 'hooks/contracts';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

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

const MastheadContainer = styled.div`
  position: fixed;
  top: 150%;
  left: 50%;
  transform: translate(-50%, -25%);
  width: 80%;
  display: flex;
  justify-content: center;
  ${media.tablet`
    width: 50%;
  `}
  @keyframes scroll-in {
    0% {
      top: 100%;
      opacity: 1;
    }
    25% {
      top: 75%;
      opacity: 1;
    }
    50% {
      top: 50%;
      opacity: 1;
    }
    75% {
      top: 15%;
      opacity: 1;
    }
    99% {
      top: 15%;
      opacity: 1;
    }
    100% {
      top: 25%;
      opacity: 0;
      display: hidden;
    }
  }
  animation: scroll-in 3s linear 0s;
`;
const AlertContainer = styled.div`
  left: 50%;
  opacity: 0;
  position: fixed;
  top: 15%;
  transform: translate(-50%, -50%);
  width: 80%;
  ${media.tablet`
    width: 50%;
  `}
  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: appear 0.1s linear 3.1s 1 forwards;
`;

const ScreenSaver = styled.div<{ image: string }>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: ${({ image }) =>
    `#000000 url('/images/hustler/${image}') center / cover no-repeat fixed;`};
`;

const MintSuccess = () => {
  const { account } = useWeb3React();
  const [hasTransfered, setHasTransfered] = useState(false);
  const hustler = useHustler();
  const [gangstaParty, setGangstaParty] = useState(false);

  const image = gangstaParty ? 'bridge_with_hustlers.png' : 'bridge_no_hustlers.png';

  const listener = useCallback(() => {
    setHasTransfered(true);
  }, []);

  const filter = hustler.filters.TransferSingle(hustler.address, account) as any;

  useEffect(() => {
    hustler.on(filter, listener);
    return () => {
      hustler.off(filter, listener);
    };
  }, [hustler, listener, filter]);

  return (
    <>
      <Head title="Bridging Hustler to Optimism" />
      <ScreenSaver image={image}>
        {gangstaParty && (
          <>
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
          </>
        )}
        {!gangstaParty && (
          <>
            <MastheadContainer>
              <Image src={randomMast()} alt="Dope." />
            </MastheadContainer>
            <AlertContainer>
              <Alert status="success">
                <div>
                  {hasTransfered ? (
                    <p>Your Hustler has made its way to the Optimism network!</p>
                  ) : (
                    <p>
                      Your Hustler is making their way to the Optimism network.
                      <br />
                      <br />
                      It could take up to 15 minutes for that to happen. In the meantime, lets get
                      it crackin homie…
                    </p>
                  )}
                  <Button
                    onClick={() => {
                      setGangstaParty(true);
                    }}
                  >
                    Gangsta Party
                  </Button>
                </div>
              </Alert>
            </AlertContainer>
          </>
        )}
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
          <Button variant="primary">Mint Another Hustler</Button>
        </Link>
      </HStack>
    </>
  );
};

export default MintSuccess;
