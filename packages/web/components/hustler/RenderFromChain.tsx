import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Image } from "@chakra-ui/image";

const HustlerWrapper = styled.div`
display: flex;
flex-direction: column;
height: 100%;
background-color: rgb(255, 255, 255);
border: 1px solid rgb(229, 232, 235);
border-radius: 2px;
position: relative;
z-index: 2;
overflow: hidden;
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
            object-fit: contain;
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
            border-radius: 0px;
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
      padding: 12px;
    `}
  >
    <h4
      css={css`
        margin: unset;
        padding: unset;
        color: #000;
        font-size: 16px;
      `}
    >
      {data.name}
    </h4>
    <p
      css={css`
        margin: unset;
        padding: unset;
        color: #1b1b1b;
        font-size: 12px;
      `}
    >
      {data.description}
    </p>
  </div>
</HustlerWrapper>
);

export default RenderFromChain;
