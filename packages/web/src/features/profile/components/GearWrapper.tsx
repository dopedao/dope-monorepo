import { Box, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { FC } from "react"
import { ProfileGear } from "../types"
import { css } from '@emotion/react';
import PanelContainer from "components/PanelContainer"
import PanelTitleBar from "components/PanelTitleBar";
import PanelBody from "components/PanelBody";

type GearWrapperProps = {
  gear: ProfileGear[]
}

const getOrigin = (suffix?: string | null): string => {
  if (!suffix) return "..."

  const [, origin] = suffix.split("from ")

  return origin
}

const GearWrapper: FC<GearWrapperProps> = ({ gear }) => {
  return (
    <Wrap>
      {gear.map(({ id, item }) => {
        const origin = getOrigin(item.suffix)

        return (
          <WrapItem key={id}>
            <PanelContainer
              css={css`
              width: 320px;
            `}
            >
              <PanelTitleBar
                css={css`
                height: 40px;
              `}
              >
                {item.name}
              </PanelTitleBar>
              <PanelBody>
                {item.svg && <img src={item.svg} />}
                <Text>Type: {item.type}</Text>
                <Text>Origin: {origin}</Text>
                <Text>Title: {item.fullname}</Text>
                <Text>In Stock: {item.count}</Text>
              </PanelBody>
            </PanelContainer>
          </WrapItem>
        )
      })}
    </Wrap>
  )
}

export default GearWrapper
