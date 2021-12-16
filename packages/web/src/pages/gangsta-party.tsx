import { Button, HStack } from '@chakra-ui/react';
import { media } from 'ui/styles/mixins';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useWeb3React } from '@web3-react/core';
import { useAllHustlersQuery } from 'generated/graphql';
import Head from 'components/Head';
import InfiniteScroll from 'react-infinite-scroller';
import WebAmpPlayer from 'components/WebAmpPlayer';
import { useOptimismClient } from 'components/EthereumApolloProvider';
import RenderFromChain from 'components/hustler/RenderFromChain';
import StickyNoteHustlerMint from 'components/StickyNoteHustlerMint';
import { useEffect, useMemo, useState } from 'react';
import LoadingBlock from 'components/LoadingBlock';

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
  // @TODO: can we remove this?
  const { account } = useWeb3React();
  const client = useOptimismClient();
  const { data, loading } = useAllHustlersQuery({ client });

  //Amount of hustlers to render
  const PAGE_SIZE = 25;
  let hustlersVisible = PAGE_SIZE;

  const hustlers = useMemo(() => {
    const mappedHustlers = data?.hustlers.map(({ id, data }) => {
      let meta = data.replace('data:application/json;base64,', '');
      meta = Buffer.from(meta, 'base64').toString();
      const decoded = JSON.parse(meta);
      return <RenderFromChain data={decoded} id={id} key={id} />
    });
    return mappedHustlers ?? [];
  }, [data]);

  const [visibleHustlers, setVisibleHustlers] = useState(hustlers.slice(0, hustlersVisible));

  const loadNextPage = (page: number) => {
    hustlersVisible = (page + 1) * PAGE_SIZE;
    console.log(`page: ${page}\nHustlersVisible: ${hustlersVisible}`)
    setVisibleHustlers(hustlers.slice(0, hustlersVisible));
  }

  useEffect(() => {
    hustlersVisible = PAGE_SIZE;
    setVisibleHustlers(hustlers.slice(0, hustlersVisible));
  }, [hustlers])

  return (
    <>
      <Head title="DOPE WARS GANGSTA PARTY" />
      <ScreenSaver>
        {!loading && visibleHustlers.length > 0 && (
          <HustlerContainer>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadNextPage}
              hasMore={hustlers.length > visibleHustlers.length}
              loader={<LoadingBlock key={`loader_${hustlersVisible}`} />}
              useWindow={false}
              className='hustlerGrid'
            >
              {visibleHustlers}
            </InfiniteScroll>
          </HustlerContainer>
        )}
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