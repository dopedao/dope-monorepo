/* eslint-disable @next/next/no-img-element */
import { AspectRatio } from '@chakra-ui/layout';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { hexColorToBase16 } from 'src/utils';
import { DEFAULT_BG_COLORS, ZoomWindow, ZOOM_WINDOWS } from 'src/HustlerConfig';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';
import { useHustler, useSwapMeet } from 'hooks/contracts';

type Metadata = {
  image: string;
};

export interface HustlerRenderProps {
  itemIds: BigNumber[];
  zoomWindow?: ZoomWindow;
}

const RenderLoot = ({
  itemIds,
  zoomWindow = ZOOM_WINDOWS[0],
}: HustlerRenderProps) => {
  const bgColor = DEFAULT_BG_COLORS[0]
  const [json, setJson] = useState<Metadata>();
  const [itemRles, setItemRles] = useState<string[]>([]);
  const [bodyRles, setBodyRles] = useState<string[]>([]);
  const [hasRenderedFromChain, setHasRenderedFromChain] = useState(false);

  const swapmeet = useSwapMeet();
  const hustlers = useHustler();

  useEffect(() => {
    setHasRenderedFromChain(false);
    const sexIndex = 0;
    Promise.all(itemIds.map(id => swapmeet.tokenRle(id, sexIndex))).then(setItemRles);
  }, [itemIds, swapmeet]);

  useEffect(() => {
    /**
     * Maps our understanding of layers to what's in the smart contract
     * Generates parameters we can then spread and assign to hustlers.bodyRle
     * which returns SVG layer to render from the blockchain.
     *
     * 0: male body
     * 1: female body
     * 2: male hair
     * 3: female hair
     * 4: beards
     */
    const bodyParams: [number, number] = [0, 0];
    const hairParams: [number, number] = [2, 0];
    const facialHairParams: [number, number] = [4, 0];

    if (!hustlers) return;
    setHasRenderedFromChain(false);
    const promises = [hustlers.bodyRle(...bodyParams), hustlers.bodyRle(...hairParams), hustlers.bodyRle(...facialHairParams)];
    Promise.all(promises).then(setBodyRles);
  }, [hustlers]);

  useEffect(() => {
    if (hustlers && bodyRles && itemRles) {
      setHasRenderedFromChain(false);
      const hustlerShadowHex = '0x0036283818022b01000d2b0500092b0200';
      const drugShadowHex = '0x00362f3729062b';
      const bodyHex = '0x000927361907000344040006000544030006000544030006000544030006000544030007000444030007000344040007000244050004000744030002000b44010001000d4401000d4401000d440e440e44024401000b44024401000b44024401000b44024401000b44024401000b44024401000b44024401000b44024401000b44024401000b440c440100014402440100034403000444010003000344030003440200030003440300034402000300034403000344020003000344030003440200030003440300034402000300034403000344020003000344030003440200030003440300034402000300024404000244030003000244040002440300030002440400024403000300024404000244030003000244040002440300030002440400024403000300024404000244030003000244040002440300030002440400024403000300024404000344020003000344030004440100';
      hustlers
        .render(
          '', // title
          '', // subtitle – should this be "name" ?
          64,
          hexColorToBase16(bgColor),
          hexColorToBase16(bgColor),
          zoomWindow,
          [hustlerShadowHex, drugShadowHex, bodyHex, ...itemRles],
        )
        .then(meta => {
          meta = meta.replace('data:application/json;base64,', '');
          meta = Buffer.from(meta, 'base64').toString();
          const decoded = JSON.parse(meta);
          setJson(decoded as Metadata);
          setHasRenderedFromChain(true);
        });
    }
  }, [swapmeet, hustlers, itemRles, bodyRles, bgColor, zoomWindow]);

  if (!hasRenderedFromChain) return <LoadingBlockSquareCentered />;

  return (
    // Need to set overflow hidden so whole container doesn't scroll
    // and cause flexbox layout to shift.
    <AspectRatio
      ratio={1}
      css={css`
        overflow: hidden;
      `}
    >
      {json && <img src={json.image} alt="" />}
    </AspectRatio>
  );
};

export default RenderLoot;
