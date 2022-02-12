import { FC, useMemo } from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';

import DopeCard from 'features/dope/components/DopeCard';

import { Dope, Item, useInfiniteProfileDopesQuery } from 'generated/graphql';

import CardContainer from './CardContainer';
import SectionContent from './SectionContent';
import SectionHeader from './SectionHeader';
import ItemCount from './ItemCount';
import LoadingBlock from 'components/LoadingBlock';

type ProfileDope = Pick<Dope, 'id' | 'claimed' | 'opened' | 'rank' | 'score'> & {
  items: Pick<Item, 'id' | 'fullname' | 'type' | 'name' | 'tier' | 'greatness' | 'count'>[];
};

type DopeData = {
  dopes: ProfileDope[];
  totalCount: number;
};

const Dopes: FC = () => {
  const { account } = useWeb3React();

  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteProfileDopesQuery(
    {
      where: {
        hasWalletWith: [
          {
            id: account,
          },
        ],
      },
      first: 50,
    },
    {
      getNextPageParam: lastPage => {
        if (lastPage.dopes.pageInfo.hasNextPage) {
          return {
            after: lastPage.dopes.pageInfo.endCursor,
          };
        }
        return false;
      },
    },
  );

  const dopeData: DopeData = useMemo(() => {
    const defaultValue = { dopes: [], totalCount: 0 };

    if (!data?.pages) return defaultValue;

    return data.pages.reduce((result, page) => {
      if (!page.dopes.edges) return result;

      const { totalCount } = page.dopes;

      return {
        totalCount,
        dopes: [
          ...result.dopes,
          ...page.dopes.edges.reduce((result, edge) => {
            if (!edge?.node) return result;

            return [...result, edge.node];
          }, [] as ProfileDope[]),
        ],
      };
    }, defaultValue as DopeData);
  }, [data]);

  return (
    <>
      <SectionHeader>
        <HStack alignContent="center" justifyContent="space-between" width="100%" marginRight="8px">
          <span>DOPE</span>
          <ItemCount count={dopeData.totalCount} />
        </HStack>
      </SectionHeader>
      <SectionContent isFetching={isFetching && !dopeData.dopes.length} minH={isFetching ? 200 : 0}>
        {dopeData.dopes.length ? (
          <>
            <CardContainer>
              {dopeData.dopes.map(dope => (
                <DopeCard key={dope.id} buttonBar="for-owner" dope={dope} />
              ))}
              {isFetching && dopeData.dopes && <LoadingBlock maxRows={1} />}
              {hasNextPage && <Button onClick={() => fetchNextPage()}>Load more</Button>}
            </CardContainer>
          </>
        ) : (
          <span>This wallet does not have any Dope</span>
        )}
      </SectionContent>
    </>
  );
};

export default Dopes;
