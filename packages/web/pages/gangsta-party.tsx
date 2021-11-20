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
import StickyNoteHustlerMint from 'components/StickyNoteHustlerMint';

const HustlerContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
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
      <Head title="DOPE WARS GANGSTA PARTY" />
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
        <WebAmpPlayer />
        <StickyNoteHustlerMint />
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
          <Button variant="primary">Mint a Hustler</Button>
        </Link>
      </HStack>
    </>
  );
};

export default GangstaParty;
