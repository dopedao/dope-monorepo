import { FC, useMemo } from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { Item, Maybe, useInfiniteProfileGearQuery, WalletItems } from 'generated/graphql';
import CardContainer from './CardContainer';
import GearCard from './GearCard';
import ItemCount from './ItemCount';
import LoadingBlock from 'components/LoadingBlock';
import SectionContent from './SectionContent';
import SectionHeader from './SectionHeader';

type ProfileItem = Pick<WalletItems, 'id' | 'balance'> & {
  item: Pick<Item, 'id' | 'count' | 'fullname' | 'name' | 'svg' | 'suffix' | 'type'> & {
    base?: Maybe<Pick<Item, 'svg'>>;
  };
};

type GearData = {
  walletItems: ProfileItem[];
  totalCount: number;
};

const GearWrapper = ({searchValue}: {searchValue: string}) => {
  const { account } = useWeb3React();

  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteProfileGearQuery(
    {
      where: {
        hasWalletWith: [{ id: account }],
        balanceGT: '0',
        hasItemWith: [{
          nameContains: searchValue
        }]
      },
      first: 50,
    },
    {
      getNextPageParam: lastPage => {
        if (lastPage.walletItems.pageInfo.hasNextPage) {
          return {
            after: lastPage.walletItems.pageInfo.endCursor,
          };
        }
        return false;
      },
    },
  );

  const gearData: GearData = useMemo(() => {
    const defaultValue = { walletItems: [], totalCount: 0 };

    if (!data?.pages) return defaultValue;

    return data.pages.reduce((result, page) => {
      if (!page.walletItems.edges) return result;

      const { totalCount } = page.walletItems;

      return {
        totalCount,
        walletItems: [
          ...result.walletItems,
          ...page.walletItems.edges.reduce((result, edge) => {
            if (!edge?.node) return result;

            return [...result, edge.node];
          }, [] as ProfileItem[]),
        ],
      };
    }, defaultValue as GearData);
  }, [data]);

  return (
    <>
      <SectionHeader>
        <HStack alignContent="center" justifyContent="space-between" width="100%" marginRight="8px">
          <span>Gear</span>
          <ItemCount count={gearData.totalCount} />
        </HStack>
      </SectionHeader>
      <SectionContent
        isFetching={isFetching && !gearData.walletItems.length}
        minH={isFetching ? 200 : 0}
      >
        {gearData.walletItems.length ? (
          <CardContainer>
            {gearData.walletItems.map(walletItem => {
              return (
                <GearCard
                  key={walletItem.id}
                  item={walletItem.item}
                  balance={walletItem.balance}
                  showEquipFooter
                />
              );
            })}
            {isFetching && gearData.walletItems.length && <LoadingBlock maxRows={1} />}
            {hasNextPage && <Button onClick={() => fetchNextPage()}>Load more</Button>}
          </CardContainer>
        ) : (
          <span>No Gear found</span>
        )}
      </SectionContent>
    </>
  );
};

export default GearWrapper;
