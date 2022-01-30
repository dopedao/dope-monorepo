import { FC, useMemo } from "react"
import { AccordionItem, Box, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { css } from '@emotion/react';

import LoadingBlock from "components/LoadingBlock"
import PanelBody from "components/PanelBody";
import PanelContainer from "components/PanelContainer"
import PanelTitleBarFlex from "components/PanelTitleBarFlex";

import { Dope, Item, useProfileDopesQuery } from "generated/graphql"

import DopePreview from "./DopePreview";

type DopesProps = {

}

type ProfileDope = Pick<Dope, "id" | "claimed" | "opened" | "rank" | "score"> & {
  items: Pick<Item, "id" | "tier">[]
}

const Dopes: FC<DopesProps> = ({

}) => {
  const { data, isFetching } = useProfileDopesQuery({
    where: {
      id: "0xba740c9035fF3c24A69e0df231149c9cd12BAe07",
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

  console.log("dopes", dopes)

  return (
    <Box minH={500}>
      {isFetching && (
        <Box>
          <LoadingBlock maxRows={3} />
        </Box>
      )}
      {!isFetching && data && (
        <Wrap>
          {dopes.map((dope) => {
            return (
              <WrapItem key={dope.id}>
                <PanelContainer
                  css={css`
                  width: 320px;
                `}
                >
                  <PanelTitleBarFlex
                    css={css`
                    height: 40px;
                  `}
                  >
                    #{dope.id}
                  </PanelTitleBarFlex>
                  <PanelBody>
                    <Stack>
                      <DopePreview dope={dope} />
                      <DopeStatuses dope={dope} />
                    </Stack>
                  </PanelBody>
                </PanelContainer>
              </WrapItem>
            )
          })}
        </Wrap>
      )}
    </Box>
  )
}

export default Dopes

type DopeStatuesProps = {
  dope: Pick<Dope, "claimed" | "opened">
}

const DopeStatuses: FC<DopeStatuesProps> = ({ dope }) => {
  const { claimed, opened } = dope

  return (
    <Stack>
      <Box background={claimed ? "#9BFFCB" : "#DEDEDD"} p={2}>
        <Text p={0}>{claimed ? "Contains $Paper" : "Does not contain $Paper"}</Text>
      </Box>
      <Box background={opened ? "#9BFFCB" : "#DEDEDD"} p={2}>
        <Text p={0}>{opened ? "Has Dope Gear" : "Does not have Dope Gear"}</Text>
      </Box>
    </Stack>
  )
}
