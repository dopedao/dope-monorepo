/* eslint-disable @next/next/no-img-element */
import { AspectRatio } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { hexColorToBase16 } from 'utils/utils';
import { DEFAULT_BG_COLORS } from 'utils/HustlerConfig';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';
import { useHustler, useSwapMeet } from 'hooks/contracts';

type Metadata = {
  image: string;
};

const RenderDope = ({ itemIds }: { itemIds?: bigint[] }) => {
  const bgColor = DEFAULT_BG_COLORS[1];
  const [json, setJson] = useState<Metadata>();
  const [itemRles, setItemRles] = useState<string[]>([]);

  const swapmeet = useSwapMeet();
  const hustlers = useHustler();

  useEffect(() => {
    const sexIndex = 0;
    if (itemIds) {
      Promise.all(itemIds.map(id => swapmeet.tokenRle(id, sexIndex))).then(setItemRles);
    }
  }, [itemIds, swapmeet]);

  useEffect(() => {
    if (hustlers && itemRles.length > 0) {
      const hustlerShadowHex = '0x0036283818022b01000d2b0500092b0200';
      const drugShadowHex = '0x00362f3729062b';
      const bodyHex =
        '0x000927361907000344040006000544030006000544030006000544030006000544030007000444030007000344040007000244050004000744030002000b44010001000d4401000d4401000d440e440e44024401000b44024401000b44024401000b44024401000b44024401000b44024401000b44024401000b44024401000b44024401000b440c440100014402440100034403000444010003000344030003440200030003440300034402000300034403000344020003000344030003440200030003440300034402000300034403000344020003000344030003440200030003440300034402000300024404000244030003000244040002440300030002440400024403000300024404000244030003000244040002440300030002440400024403000300024404000244030003000244040002440300030002440400024403000300024404000344020003000344030004440100';
      hustlers
        .render(
          '',
          '',
          160,
          hexColorToBase16(bgColor),
          hexColorToBase16(bgColor),
          [0, 0, 0, 0],
          [hustlerShadowHex, drugShadowHex, bodyHex, ...itemRles],
        )
        .then(meta => {
          meta = meta.replace('data:application/json;base64,', '');
          meta = Buffer.from(meta, 'base64').toString();
          const decoded = JSON.parse(meta);
          setJson(decoded as Metadata);
        });
    }
  }, [hustlers, itemRles, bgColor]);

  return (
    <AspectRatio
      ratio={1}
      css={css`
        height: 100%;
        overflow: hidden;
        background: ${bgColor};
      `}
    >
      {!json ? <LoadingBlockSquareCentered /> : <img src={json.image} alt="" />}
    </AspectRatio>
  );
};

export default RenderDope;
