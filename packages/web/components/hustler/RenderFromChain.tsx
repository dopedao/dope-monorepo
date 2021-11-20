import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Image } from "@chakra-ui/image";

const HustlerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  text-align:center;
`;

type Metadata = {
image: string;
name?: string;
description?: string;
attributes?: {
  trait_type: string;
  value: string;
}[];
};

type HustlerItemProps = {
  data: Metadata;
};

const RenderFromChain = ({ data }: HustlerItemProps) => (
<HustlerWrapper>
  <div
    css={css`
      min-height: inherit;
      height: 100%;
      width: 100%;
    `}
  >
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        min-height: inherit;
        width: 100%;
        position: relative;
        border-radius: inherit;
      `}
    >
      <div
        css={css`
          align-items: center;
          display: flex;
          justify-content: center;
          max-height: 100%;
          max-width: 100%;
          overflow: hidden;
          position: relative;
          height: 100%;
          width: 290px;
        `}
      >
        <Image
          css={css`
            object-fit: cover;
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
          `}
          src={data.image}
          alt={data.name}
        />
      </div>
    </div>
  </div>
  <div
    css={css`
      justify-content: space-between;
      display: flex;
      flex-direction: column;
    `}
  >
    <h4
      css={css`
        margin: unset;
        padding: unset;
        font-size: 1em;
        padding: .25em;
        color: #ffffff;
        text-align: center;
      `}
    >
      {data.name}
    </h4>
  </div>
</HustlerWrapper>
);

export default RenderFromChain;
