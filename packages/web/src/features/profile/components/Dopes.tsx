import { FC, useMemo } from "react"
import { HStack, Image, Stack, Wrap, WrapItem } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core";

import PanelBody from "components/PanelBody";
import { Dope, Item, useProfileDopesQuery } from "generated/graphql"

import DopePreview from "./DopePreview";
import ProfileCard from "./ProfileCard";
import SectionContent from "./SectionContent";
import ProfileCardHeader from "./ProfileCardHeader";
import SectionHeader from "./SectionHeader";
import ItemCount from "./ItemCount";

type ProfileDope = Pick<Dope, "id" | "claimed" | "opened" | "rank" | "score"> & {
  items: Pick<Item, "id" | "tier">[]
}

const Dopes: FC = () => {
  const { account } = useWeb3React()

  const { data, isFetching } = useProfileDopesQuery({
    where: {
      id: account,
    },
  })

  const dopes = useMemo(() => {
    if (!data?.wallets.edges) return []

    return data.wallets.edges?.reduce((result, edge) => {
      if (!edge?.node?.dopes) return result

      const { dopes } = edge.node

      return [...result, ...dopes]
    }, [] as ProfileDope[])
  }, [data])

  return (
    <>
      <SectionHeader>
        <HStack>
          <span>Dopes</span>
          <ItemCount count={dopes.length} />
        </HStack>
      </SectionHeader>
      <SectionContent isFetching={isFetching} minH={isFetching ? 200 : 0}>
        {dopes.length ? (
          <Wrap>
            {dopes.map((dope) => {
              return (
                <WrapItem key={dope.id}>
                  <ProfileCard>
                    <ProfileCardHeader>
                      #{dope.id}
                    </ProfileCardHeader>
                    <PanelBody>
                      <Stack>
                        <DopePreview dope={dope} />
                        <DopeStatuses dope={dope} />
                      </Stack>
                    </PanelBody>
                  </ProfileCard>
                </WrapItem>
              )
            })}
          </Wrap>
        ) : (
          <span>This wallet does not have any Dope</span>
        )}
      </SectionContent>
    </>
  )
}

export default Dopes

type DopeStatuesProps = {
  dope: Pick<Dope, "claimed" | "opened">
}

const GREEN = "#9BFFCB"
const GRAY = "#DEDEDD"

const getDopeStatusBackground = (success: boolean): string => {
  if (success) return GREEN

  return GRAY
}

const getDopeStatusIconSrc = (success: boolean): string => {
  if (success) return "/images/icon/check-sm.svg"

  return "/images/icon/circle-slash.svg"
}

const DopeStatuses: FC<DopeStatuesProps> = ({ dope }) => {
  const { claimed, opened } = dope

  const paperBackground = getDopeStatusBackground(claimed)
  const paperIconSrc = getDopeStatusIconSrc(claimed)

  const gearBackground = getDopeStatusBackground(opened)
  const gearIconSrc = getDopeStatusIconSrc(opened)

  return (
    <Stack>
      <HStack background={paperBackground} borderRadius="sm" p={2}>
        <Image src={paperIconSrc} />
        <span>{claimed ? "Contains $Paper" : "Does not contain $Paper"}</span>
      </HStack>
      <HStack background={gearBackground} borderRadius="sm" p={2}>
        <Image src={gearIconSrc} />
        <span>{opened ? "Has Dope Gear" : "Does not have Dope Gear"}</span>
      </HStack>
    </Stack>
  )
}
