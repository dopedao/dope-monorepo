import { FC, useMemo } from "react"
import { HStack, Image, Stack, Wrap, WrapItem } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core";

import PanelBody from "components/PanelBody";
import { Item, useProfileGearQuery, WalletItems } from "generated/graphql";

import ItemCount from "./ItemCount";
import ProfileCard from "./ProfileCard";
import ProfileCardHeader from "./ProfileCardHeader";
import SectionContent from "./SectionContent";
import SectionHeader from "./SectionHeader";

type ProfileGear = Pick<WalletItems, "id"> & {
  item: Pick<Item, "id" | "count" | "fullname" | "name" | "svg" | "suffix" | "type">
}

const getOrigin = (suffix?: string | null): string => {
  if (!suffix) return "..."

  const [, origin] = suffix.split("from ")

  return origin
}

const GearWrapper: FC = () => {
  const { account } = useWeb3React()

  const { data, isFetching } = useProfileGearQuery({
    where: {
      id: account,
    },
  })

  const gear = useMemo(() => {
    if (!data?.wallets.edges) return []

    return data.wallets.edges?.reduce((result, edge) => {
      if (!edge?.node?.items) return result

      const { items } = edge.node

      return [...result, ...items]
    }, [] as ProfileGear[])
  }, [data])

  return (
    <>
      <SectionHeader>
        <HStack>
          <span>Gear</span>
          <ItemCount count={gear.length} />
        </HStack>
      </SectionHeader>
      <SectionContent isFetching={isFetching} minH={isFetching ? 200 : 0}>
        {gear.length ? (
          <Wrap>
            {gear.map(({ id, item }) => {
              const origin = getOrigin(item.suffix)

              return (
                <WrapItem key={id}>
                  <ProfileCard>
                    <ProfileCardHeader>
                      {item.name}
                    </ProfileCardHeader>
                    <PanelBody>
                      <Stack>
                        {item.svg && <Image borderRadius="md" src={item.svg} />}
                        <span>Type: {item.type}</span>
                        <span>Origin: {origin}</span>
                        <span>Title: {item.fullname}</span>
                        <span>In Stock: {item.count}</span>
                      </Stack>
                    </PanelBody>
                  </ProfileCard>
                </WrapItem>
              )
            })}
          </Wrap>
        ) : (
          <span>This wallet does not have any Gear</span>
        )}
      </SectionContent>
    </>
  )
}

export default GearWrapper
