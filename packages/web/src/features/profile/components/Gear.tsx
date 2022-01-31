import { HStack, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { ProfileGear } from "../types"
import PanelBody from "components/PanelBody";
import { useProfileGearQuery } from "generated/graphql";
import SectionHeader from "./SectionHeader";
import ItemCount from "./ItemCount";
import SectionContent from "./SectionContent";
import { useWeb3React } from "@web3-react/core";
import ProfileCard from "./ProfileCard";
import ProfileCardHeader from "./ProfileCardHeader";

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
          <span>Hustlers</span>
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
                      {item.svg && <img src={item.svg} />}
                      <Text>Type: {item.type}</Text>
                      <Text>Origin: {origin}</Text>
                      <Text>Title: {item.fullname}</Text>
                      <Text>In Stock: {item.count}</Text>
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
