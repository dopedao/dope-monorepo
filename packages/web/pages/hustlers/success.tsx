import { getRandomNumber } from 'src/utils';
import { Button, Image, HStack, Spacer } from '@chakra-ui/react';
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

const ScreenSaver = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: #000000 url('/images/hustler/bridge_with_hustlers.png') center / cover no-repeat fixed;
`;
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
      top: 50%;
      opacity: 1;
    }
    99% {
      top: 50%;
      opacity: 1;
    }
    100% {
      top: 50%;
      opacity: 0;
      display: hidden;
    }
  }
  animation: scroll-in 3s linear 0s;
`;

const Success = () => {
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  return (
    <>
      <Head title="Bridging Hustler to Optimism" />
      <ScreenSaver>
        <WebAmpPlayer hidden={!showMusicPlayer} />
        <MastheadContainer>
          <Image src={randomMast()} alt="Dope." />
        </MastheadContainer>
      </ScreenSaver>
      <HStack m={4} gridGap={1} bottom={0} right={0} position="absolute" justifyContent="end">
        <Button
          onClick={() => {
            setShowMusicPlayer(true);
          }}
        >
          Gangsta Party
        </Button>
        <Link href="/hustlers/initiate/" passHref>
          <Button>Mint another Hustler</Button>
        </Link>
      </HStack>
    </>
  );
};

export default Success;
