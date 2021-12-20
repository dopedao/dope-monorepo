import { Button, HStack } from '@chakra-ui/react';
import { media } from 'ui/styles/mixins';
import Link from 'next/link';
import styled from '@emotion/styled';
import Head from 'components/Head';
import InfiniteScroll from 'react-infinite-scroller';
import WebAmpPlayer from 'components/WebAmpPlayer';
import { useHustlerPaginationClient } from 'components/EthereumApolloProvider';
import RenderFromChain from 'components/hustler/RenderFromChain';
import { useMemo } from 'react';
import LoadingBlock from 'components/LoadingBlock';
import StickyNoteHustlerMint from 'components/StickyNoteHustlerMint';
import { useAllHustlersQuery } from 'generated/graphql';

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
  background: rgba(0, 0, 0, 0.5) url('/images/tile/brick-black.png') center/25% fixed;
`;

const GangstaParty = () => {
  //Amount of hustlers to render per page
  const PAGE_SIZE = 75;

  const client = useHustlerPaginationClient();
  const { data, fetchMore } = useAllHustlersQuery({ variables: { first: PAGE_SIZE, skip: 0 }, client, notifyOnNetworkStatusChange: true });

  const hustlers = useMemo(() => {
      const mappedHustlers = data?.hustlers.map(({ id, data }) => {
        let meta = data.replace('data:application/json;base64,', '');
        meta = Buffer.from(meta, 'base64').toString();
        const decoded = JSON.parse(meta);
        return <RenderFromChain data={decoded} id={id} key={id} />
      })
      return mappedHustlers ?? [];
  }, [data]);

  return (
    <>
      <Head title="DOPE WARS GANGSTA PARTY" />
      <ScreenSaver>
        {data &&(
          <HustlerContainer>
            <InfiniteScroll
              pageStart={0}
              hasMore={ 8000 > data.hustlers.length}
              loadMore={() => { fetchMore({ variables: { skip: data.hustlers.length } })}}
              loader={<LoadingBlock key={`loader_${data.hustlers.length}`} />}
              useWindow={false}
              className='hustlerGrid'
            >
              {hustlers}
            </InfiniteScroll>
          </HustlerContainer>
        )}
        <WebAmpPlayer />
        <StickyNoteHustlerMint />
      </ScreenSaver><HStack
        m={4}
        gridGap={1}
        bottom={0}
        right={0}
        position="absolute"
        width="100%"
        justifyContent="end"
      >
        <Link href="/" passHref>
          <Button>Back to DOPE WARS</Button>
        </Link>
        <Link href="/hustlers" passHref>
          <Button>Peep Your Squad</Button>
        </Link>
        <Link href="/dope" passHref>
          <Button variant="primary">Initiate a Hustler</Button>
        </Link>
      </HStack>
    </>
  );
};

export default GangstaParty;