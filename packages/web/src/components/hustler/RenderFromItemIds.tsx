/* eslint-disable @next/next/no-img-element */
import { AspectRatio } from '@chakra-ui/layout';
import { BigNumber } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { HustlerSex, DEFAULT_BG_COLORS, ZoomWindow } from 'utils/HustlerConfig';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';
import { useHustler, useSwapMeet } from 'hooks/contracts';
import { buildSVG } from 'utils/svg-builder';

export interface HustlerRenderProps {
  bgColor?: string;
  body?: number;
  facialHair?: number;
  hair?: number;
  itemIds: BigNumber[];
  name?: string;
  renderName?: boolean;
  sex?: HustlerSex;
  textColor?: string;
  zoomWindow: ZoomWindow;
  ogTitle?: string;
  dopeId?: string;
  isVehicle?: boolean;
}

const RenderFromItemIds = ({
  bgColor = DEFAULT_BG_COLORS[0],
  body,
  facialHair,
  hair,
  itemIds,
  name = '',
  renderName = false,
  sex,
  textColor = '#000000',
  zoomWindow,
  ogTitle,
  dopeId,
  isVehicle = false,
}: HustlerRenderProps) => {
  const resolution = useMemo(() => (isVehicle ? 160 : 64), [isVehicle]);
  const [itemRles, setItemRles] = useState<string[]>([]);
  const [vehicleRle, setVehicleRle] = useState<string>();
  const [bodyRles, setBodyRles] = useState<string[]>([]);

  const swapmeet = useSwapMeet();
  const hustlers = useHustler();

  useEffect(() => {
    const sexIndex = sex && sex == 'female' ? 1 : 0;
    Promise.all(itemIds.map(id => swapmeet.tokenRle(id, sexIndex))).then(rles => {
      setVehicleRle(rles[0]);
      setItemRles(rles.slice(1));
    });
  }, [itemIds, sex, swapmeet]);

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
    const bodyParams: [number, number] = [sex && sex == 'female' ? 1 : 0, body ?? 0];
    const hairParams: [number, number] = [sex && sex == 'female' ? 3 : 2, hair ?? 0];
    const facialHairParams: [number, number] = [4, facialHair ?? 0];

    if (!hustlers) return;
    // DEBUG INFO for when contract call fails.
    // Was tracking down bug that happens on Rinkeby.
    // console.log('body');
    // console.log(bodyParams);
    // console.log('hair');
    // console.log(hairParams);
    // console.log('facial hair');
    // console.log(facialHairParams);
    const promises = [hustlers.bodyRle(...bodyParams), hustlers.bodyRle(...hairParams)];
    // No female beards for now because they're unsupported
    if (sex == 'male' && facialHair) {
      promises.push(hustlers.bodyRle(...facialHairParams));
    }

    Promise.all(promises).then(setBodyRles);
  }, [hustlers, sex, body, hair, facialHair]);

  const svg = useMemo(() => {
    if (bodyRles.length > 0 && itemRles.length > 0) {
      const hustlerShadowHex = '0x0036283818022b01000d2b0500092b0200';
      const drugShadowHex = '0x00362f3729062b';

      const title = renderName && ogTitle && Number(dopeId) < 500 ? ogTitle : '';
      const subtitle = renderName ? name : '';
      const rles = [hustlerShadowHex, drugShadowHex, ...bodyRles, ...itemRles];

      if (isVehicle && vehicleRle) {
        rles.unshift(vehicleRle);
      }

      return buildSVG(rles, bgColor, textColor, title, subtitle, zoomWindow, resolution);
    }
  }, [
    itemRles,
    vehicleRle,
    bodyRles,
    name,
    textColor,
    bgColor,
    renderName,
    zoomWindow,
    ogTitle,
    dopeId,
    isVehicle,
    resolution,
  ]);

  if (!svg) return <LoadingBlockSquareCentered />;

  return (
    // Need to set overflow hidden so whole container doesn't scroll
    // and cause flexbox layout to shift.
    <AspectRatio
      ratio={1}
      css={css`
        height: 100%;
        overflow: hidden;
        svg {
          width: 100%;
          height: auto;
        }
      `}
    >
      {svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}
    </AspectRatio>
  );
};

export default RenderFromItemIds;
