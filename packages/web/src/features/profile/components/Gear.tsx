import { FC, useMemo } from "react"
import { Button, HStack, Image, Stack } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core";

import PanelBody from "components/PanelBody";
import { Item, Maybe, useInfiniteProfileGearQuery, WalletItems } from "generated/graphql";

import { css } from "@emotion/react";
import ItemCount from "./ItemCount";
import ProfileCard from "./ProfileCard";
import ProfileCardHeader from "./ProfileCardHeader";
import SectionContent from "./SectionContent";
import SectionHeader from "./SectionHeader";
import CardContainer from "./CardContainer";
import LoadingBlock from "components/LoadingBlock";

type ProfileItem = Pick<Item, "id" | "count" | "fullname" | "name" | "svg" | "suffix" | "type"> & {
  base?: Maybe<Pick<Item, "svg">>
}

type GearData = {
  items: ProfileItem[]
  totalCount: number
}

const getOrigin = (suffix?: string | null): string => {
  if (!suffix) return "..."

  const [, origin] = suffix.split("from ")

  return origin
}

const getImageSrc = (item: ProfileItem): string => {
  return item.svg || item.base?.svg || ""
}

const GearWrapper: FC = () => {
  const { account } = useWeb3React()

  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteProfileGearQuery({
    where: {
      hasWalletsWith: [{
        hasWalletWith: [{
          id: account,
        }],
      }],
    },
    first: 50,
  }, {
    getNextPageParam: lastPage => {
      if (lastPage.items.pageInfo.hasNextPage) {
        return {
          after: lastPage.items.pageInfo.endCursor,
        };
      }
      return false;
    },
  })

  const gearData: GearData = useMemo(() => {
    const defaultValue = { items: [], totalCount: 0 }

    if (!data?.pages) return defaultValue

    return data.pages.reduce((result, page) => {
      if (!page.items.edges) return result

      const { totalCount } = page.items

      return {
        totalCount,
        items: [
          ...result.items,
          ...page.items.edges.reduce((result, edge) => {
            if (!edge?.node) return result

            return [...result, edge.node]
          }, [] as ProfileItem[])
        ]
      }
    }, defaultValue as GearData)
  }, [data])

  return (
    <>
      <SectionHeader>
        <HStack>
          <span>Gear</span>
          <ItemCount count={gearData.totalCount} />
        </HStack>
      </SectionHeader>
      <SectionContent
        isFetching={isFetching && !gearData.items.length}
        minH={isFetching ? 200 : 0}
      >
        {gearData.items.length ? (
          <CardContainer>
            {gearData.items.map((item) => {
              const origin = getOrigin(item.suffix)
              const imageSrc = getImageSrc(item)

              return (
                <ProfileCard key={item.id}>
                  <ProfileCardHeader>
                    {item.name}
                  </ProfileCardHeader>
                  <PanelBody>
                    <Stack>
                      <Image borderRadius="md" src={imageSrc} />
                      <span>Type: {item.type}</span>
                      <span>Origin: {origin}</span>
                      <span css={css`height:2.5em`}>Title: {item.fullname}</span>
                      {/* <span>In Stock: {item.count}</span> */}
                    </Stack>
                  </PanelBody>
                </ProfileCard>
              )
            })}
            {isFetching && gearData.items.length && <LoadingBlock maxRows={1} />}
            {hasNextPage && <Button onClick={() => fetchNextPage()}>Load more</Button>}
          </CardContainer>
        ) : (
          <span>This wallet does not have any Gear</span>
        )}
      </SectionContent>
    </>
  )
}

export default GearWrapper
