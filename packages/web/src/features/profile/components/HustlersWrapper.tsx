import { Stack, Image, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { FC } from "react"
import { ProfileHustler } from "../types"
import PanelContainer from "components/PanelContainer"
import PanelTitleBarFlex from "components/PanelTitleBarFlex";
import PanelBody from "components/PanelBody";
import { css } from '@emotion/react';
import { HustlerType } from "generated/graphql";

type HustlersWrapperProps = {
  hustlers: ProfileHustler[]
}

const formatType = (type: HustlerType): string => {
  if (type === HustlerType.OriginalGangsta) return "OG"

  return "Hustler"
}

const HustlersWrapper: FC<HustlersWrapperProps> = ({ hustlers }) => {
  return (
    <Wrap>
      {hustlers.map(({ id, name, svg, title, type }) => {
        const formattedType = formatType(type)

        return (
          <WrapItem key={id}>
            <PanelContainer
              css={css`
              width: 320px;
            `}
            >
              <PanelTitleBarFlex
                css={css`
                  height: 40px;
                  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.15);
                `}
              >
                {formattedType} #{id}
              </PanelTitleBarFlex>
              <PanelBody>
                {svg && <Image borderRadius="md" src={svg} />}
                <Stack mt={4}>
                  <Text p={0}>Name: {name}</Text>
                  <Text p={0}>Title: {title}</Text>
                </Stack>
              </PanelBody>
            </PanelContainer>
          </WrapItem>
        )
      })}
    </Wrap>
  )
}

export default HustlersWrapper
