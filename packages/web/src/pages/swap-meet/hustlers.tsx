import { Box } from '@chakra-ui/react';
import { Button, HStack } from '@chakra-ui/react';
import { media } from 'ui/styles/mixins';
import { OrderDirection, useInfiniteAllHustlersQuery } from 'generated/graphql';
import AppWindow from 'components/AppWindow';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Head from 'components/Head';
import HustlerProfileCard from 'components/hustler/HustlerProfileCard';
import InfiniteScroll from 'react-infinite-scroller';
import Link from 'next/link';
import LoadingBlock from 'components/LoadingBlock';
import LoadingState from 'features/swap-meet/components/LoadingState';
import styled from '@emotion/styled';

const Container = styled.div`
  .hustlerGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-column-gap: 32px;
    grid-row-gap: 32px;
  }
  padding: 16px;
  ${media.tablet`
    padding: 32px;
  `}
`;

const SwapMeetHustlers = () => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteAllHustlersQuery(
    {
      first: 18
    },
    {
      getNextPageParam: lastPage => {
        if (lastPage.hustlers.pageInfo.hasNextPage) {
          return {
            first: lastPage.hustlers.pageInfo.endCursor,
          };
        }
        return false;
      },
    },
  );
  const isLoading = status === 'loading';

  return (
    <AppWindow
      padBody={false}
      scrollable={true}
      height="90vh"
      navbar={<DopeWarsExeNav hideFilterBar />}
      title="Swap Meet"
    >
      <Head title="Hustlers" />
      <HStack
        margin="0"
        gridGap={1}
        width="100%"
        justifyContent="start"
        padding="16px"
        background="white"
        borderBottom="2px solid black"
      >
        <Link href="/hustlers/initiate" passHref>
          <Button variant="primary">Mint a Hustler</Button>
        </Link>
        <a href="https://quixotic.io/collection/hustlers?attributes=attribute%3DClass%3AOriginal+Gangsta&query=" target="quix">
          <Button variant="primary">Buy an OG</Button>
        </a>
      </HStack>
      <Box>
        {isLoading ? (
          <LoadingState />
        ) : (
          data && (
            <Container>
              <InfiniteScroll
                pageStart={0}
                loadMore={() =>
                  fetchNextPage({
                    pageParam: {
                      first: 100,
                      after: data?.pages[data.pages.length - 1].hustlers.pageInfo.endCursor,
                    },
                  })
                }
                hasMore={hasNextPage}
                loader={<LoadingBlock key="loading-block-2" />}
                useWindow={false}
                className="dopeGrid"
              >
                <div className="hustlerGrid">
                  {data?.pages.map(group =>
                    group.hustlers.edges!.map(hustler => {
                      if (!hustler?.node!.svg) return null;
                      return <HustlerProfileCard key={hustler.node.id} hustler={hustler.node} />
                    }),
                  )}
                </div>
              </InfiniteScroll>
            </Container>
          )
        )}
      </Box>    
    </AppWindow>
  );
};

export default SwapMeetHustlers;
