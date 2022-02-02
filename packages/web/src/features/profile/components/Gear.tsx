import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, HStack, Image, Stack, Select } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { utils } from 'ethers';
import PanelBody from 'components/PanelBody';
import {
  Item,
  Maybe,
  useHustlersWalletQuery,
  useInfiniteProfileGearQuery,
  WalletItems,
} from 'generated/graphql';

import { css } from '@emotion/react';
import ItemCount from './ItemCount';
import ProfileCard from './ProfileCard';
import ProfileCardHeader from './ProfileCardHeader';
import SectionContent from './SectionContent';
import SectionHeader from './SectionHeader';
import CardContainer from './CardContainer';
import LoadingBlock from 'components/LoadingBlock';
import PanelFooter from 'components/PanelFooter';
import { useSwapMeet } from 'hooks/contracts';
import { NETWORK } from 'utils/constants';
import { useOptimism } from 'hooks/web3';

type ProfileItem = Pick<WalletItems, 'id' | 'balance'> & {
  item: Pick<Item, 'id' | 'count' | 'fullname' | 'name' | 'svg' | 'suffix' | 'type'> & {
    base?: Maybe<Pick<Item, 'svg'>>;
  };
};

type GearData = {
  walletItems: ProfileItem[];
  totalCount: number;
};

const getOrigin = (suffix?: string | null): string => {
  if (!suffix) return '...';

  const [, origin] = suffix.split('from ');

  return origin;
};

const getImageSrc = (walletItem: ProfileItem): string => {
  return walletItem.item.svg || walletItem.item.base?.svg || '';
};

const GearFooter = ({ id }: { id: string }) => {
  const { account } = useWeb3React();
  const { chainId } = useOptimism();
  const [selected, setSelected] = useState<string>();
  const { data, isFetching: loading } = useHustlersWalletQuery(
    {
      where: {
        id: account,
      },
    },
    {
      enabled: !!account,
    },
  );
  const swapmeet = useSwapMeet();

  useEffect(() => {
    if (
      data &&
      data.wallets.edges &&
      data.wallets.edges[0] &&
      data.wallets.edges[0].node &&
      data.wallets.edges[0].node.hustlers.length > 0
    ) {
      setSelected(data.wallets.edges[0].node.hustlers[0].id);
    }
  }, [data]);

  const equip = useCallback(() => {
    const sig = '0xbe3d1e89';
    const abi = new utils.AbiCoder();
    swapmeet.safeTransferFrom(
      account!,
      NETWORK[chainId].contracts.hustlers,
      id,
      1,
      abi.encode(['bytes4', 'uint256'], [sig, selected]),
    );
  }, [account, swapmeet, chainId, id, selected]);

  return (
    <PanelFooter>
      <Select
        size="sm"
        variant="filterBar"
        onChange={({ target }) => setSelected(target.value)}
        value={selected}
      >
        <option disabled>Equip to…</option>
        {data?.wallets.edges![0]?.node?.hustlers.map(({ id, title, name }) => (
          <option key={id} value={id}>
            {title} {name}
          </option>
        ))}
      </Select>
      <Button variant="primary" disabled={!selected} onClick={equip}>
        Equip
      </Button>
    </PanelFooter>
  );
};

const GearWrapper: FC = () => {
  const { account } = useWeb3React();

  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteProfileGearQuery(
    {
      where: {
        hasWalletWith: [{ id: account }],
        balanceGT: '0',
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
              const origin = getOrigin(walletItem.item.suffix);
              const imageSrc = getImageSrc(walletItem);

              return (
                <ProfileCard key={walletItem.item.id}>
                  <ProfileCardHeader>
                    <div>{walletItem.item.name}</div>
                    <div
                      css={css`
                        padding-right: 16px;
                        color: var(--gray-500);
                      `}
                      title="You have this many in inventory"
                    >
                      x{walletItem.balance}
                    </div>
                  </ProfileCardHeader>
                  <PanelBody>
                    <Stack>
                      <Image borderRadius="md" src={imageSrc} alt={walletItem.item.name} />
                      <span>Type: {walletItem.item.type}</span>
                      <span>Origin: {origin}</span>
                      <span
                        css={css`
                          height: 2.5em;
                        `}
                      >
                        Title: {walletItem.item.fullname}
                      </span>
                    </Stack>
                  </PanelBody>
                  <GearFooter id={walletItem.item.id} />
                </ProfileCard>
              );
            })}
            {isFetching && gearData.walletItems.length && <LoadingBlock maxRows={1} />}
            {hasNextPage && <Button onClick={() => fetchNextPage()}>Load more</Button>}
          </CardContainer>
        ) : (
          <span>This wallet does not have any Gear</span>
        )}
      </SectionContent>
    </>
  );
};

export default GearWrapper;
