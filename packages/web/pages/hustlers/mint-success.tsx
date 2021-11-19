import { getRandomNumber } from 'src/utils';
import { AlertIcon, Alert, Button, Image, HStack, Spacer } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import Head from 'components/Head';
import styled from '@emotion/styled';
import WebAmpPlayer from 'components/WebAmpPlayer';

const MASTHEADS = ['dope.svg', 'hell-yeah.svg', 'success.svg'];

const randomMast = () => {
  const path = '/images/masthead/';
  return path + MASTHEADS[getRandomNumber(0, MASTHEADS.length - 1)];
};

const MastheadContainer = styled.div`
  position: fixed;
  width: 40%;
  top: 150%;
  left: 50%;
  transform: translate(-50%, -50%);
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
      top: 25%;
      opacity: 1;
    }
    99% {
      top: 25%;
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
  position: fixed;
  width: 40%;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  @keyframes appear {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  animation: appear .1s linear 3.1s 1 forwards;
`;


const MintSuccess = () => {
  const [gangstaParty, setGangstaParty] = useState(false);

  const image = gangstaParty ? 'bridge_with_hustlers.png' : 'bridge_no_hustlers.png';

  const ScreenSaver = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: #000000 url('/images/hustler/${image}') center / cover no-repeat fixed;
  `;

  return (
    <>
      <Head title="Bridging Hustler to Optimism" />
      <ScreenSaver>
        <WebAmpPlayer hidden={!gangstaParty} />
        {!gangstaParty && (
          <>
            <MastheadContainer>
              <Image src={randomMast()} alt="Dope." />
            </MastheadContainer>
            <AlertContainer>
              <Alert status="success">
                <div>
                  <p>
                    Your Hustler is making their way to the Optimism network.
                    <br/><br/>
                    It could take up to 15 minutes for that to happen.
                    In the meantime, lets get it crackin…
                  </p>
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
        <Link href="/hustlers/initiate/" passHref>
          <Button>Mint another Hustler</Button>
        </Link>
      </HStack>
    </>
  );
};

export default MintSuccess;
