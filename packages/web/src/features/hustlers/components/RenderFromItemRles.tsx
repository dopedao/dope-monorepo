/* eslint-disable @next/next/no-img-element */
import { AspectRatio } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import { buildSVG } from 'utils/svg-builder';
import { css } from '@emotion/react';
import { HustlerSex, DEFAULT_BG_COLORS, ZoomWindow } from 'utils/HustlerConfig';
import { useEffect, useMemo, useState } from 'react';
import { useHustler } from 'hooks/contracts';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';
import { useBodyPartsQuery } from 'generated/graphql';

export interface HustlerRenderProps {
  bgColor?: string;
  body?: number;
  facialHair?: number;
  hair?: number;
  itemRles: string[];
  name?: string;
  renderName?: boolean;
  sex?: HustlerSex;
  textColor?: string;
  zoomWindow: ZoomWindow;
  ogTitle?: string;
  dopeId?: string;
  showVehicle?: boolean;
}

const RenderFromItemRles = ({
  bgColor = DEFAULT_BG_COLORS[0],
  body,
  facialHair,
  hair,
  itemRles,
  name = '',
  renderName = false,
  sex,
  textColor = '#000000',
  zoomWindow,
  ogTitle,
  dopeId,
  showVehicle = false,
}: HustlerRenderProps) => {
  // 160 / 64 are special numbers inside of the svg builder
  // see that file for more information.
  const resolution = useMemo(() => (showVehicle ? 160 : 64), [showVehicle]);
  const [isLoading, setIsLoading] = useState(true);
  const [bodyRles, setBodyRles] = useState<(string | undefined)[]>([]);

  const {
    data: dbParts,
    isSuccess,
    isError,
  } = useBodyPartsQuery({ first: 200 }, { queryKey: ['bodyParts'] });
  useEffect(() => {
    // Body rles are in our database and it's less expensive than
    // to fetch it from the contract each and every time we render
    // this component.
    const bodyIds: string[] = [];
    const s = (sex ?? 'male').toUpperCase();
    bodyIds.push(`${s}-BODY-${body}`);
    bodyIds.push(`${s}-HAIR-${hair}`);
    bodyIds.push(`${s}-BEARD-${facialHair}`);

    if (isSuccess) {
      setIsLoading(false);
      const parts =
        dbParts.bodyParts.edges
          ?.filter(part => bodyIds.includes(part?.node?.id || ''))
          // Sort by length so we render the body parts in the correct order
          // bodies will always be "longer" than beards and hair,
          // so this will layer them on top
          .sort((a, b) => (b?.node?.rle?.length || 0) - (a?.node?.rle?.length || 0))
          .map(part => part?.node?.rle) || [];
      setBodyRles(parts);
    }
  }, [isSuccess, dbParts, sex, body, hair, facialHair]);

  const svg = useMemo(() => {
    if (bodyRles.length > 0 && itemRles.length > 0) {
      const hustlerShadowHex = '0x0036283818022b01000d2b0500092b0200';
      const drugShadowHex = '0x00362f3729062b';

      const title = renderName && ogTitle && Number(dopeId) < 500 ? ogTitle : '';
      const subtitle = renderName ? name : '';

      let rles = [hustlerShadowHex, drugShadowHex, ...bodyRles, ...itemRles];

      // remove vehicle rle
      const vRle = rles.splice(rles.length - 1, 1);
      // put at the beginning of the stack so it renders in the background fully
      // starting at viewbox 0,0
      if (showVehicle) {
        rles = [...vRle, ...rles];
      }
      return buildSVG(rles, bgColor, textColor, title, subtitle, zoomWindow, resolution);
    }
  }, [
    itemRles,
    bodyRles,
    name,
    textColor,
    bgColor,
    renderName,
    zoomWindow,
    ogTitle,
    dopeId,
    showVehicle,
    resolution,
  ]);
  return (
    // Need to set overflow hidden so whole container doesn't scroll
    // and cause flexbox layout to shift.
    <AspectRatio
      ratio={1}
      css={css`
        height: 100%;
        width: 100%;
        overflow: hidden;
        svg {
          width: 100%;
          height: auto;
        }
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {!svg || isLoading ? (
        <LoadingBlockSquareCentered />
      ) : (
        <Box dangerouslySetInnerHTML={{ __html: svg }} />
      )}
    </AspectRatio>
  );
};

export default RenderFromItemRles;
