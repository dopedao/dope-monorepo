import { Button, HStack } from '@chakra-ui/react';
import { media } from 'ui/styles/mixins';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useInfiniteAllHustlersQuery } from 'generated/graphql';
import Head from 'components/Head';
import InfiniteScroll from 'react-infinite-scroller';
import WebAmpPlayer from 'components/WebAmpPlayer';
import RenderFromChain from 'components/hustler/RenderFromChain';
import LoadingBlock from 'components/LoadingBlock';
import LoadingState from 'features/swap-meet/components/LoadingState';

const Container = styled.div`
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
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteAllHustlersQuery(
    {
      first: 100,
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
    <>
      <Head title="DOPE WARS GANGSTA PARTY" />
      <ScreenSaver>
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
                      if (!hustler?.node!.svg) {
                        return null;
                      }

                      return (
                        <RenderFromChain
                          data={{
                            image: hustler.node.svg,
                            name: hustler.node.name,
                          }}
                          id={hustler.node.id}
                          key={hustler.node.id}
                        />
                      );
                    }),
                  )}
                </div>
              </InfiniteScroll>
            </Container>
          )
        )}
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
        <Link href="/" passHref>
          <Button>Back to DOPE WARS</Button>
        </Link>
        <Link href="/inventory" passHref>
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
