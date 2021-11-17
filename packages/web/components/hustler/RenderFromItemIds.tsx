/* eslint-disable @next/next/no-img-element */
import { AspectRatio } from '@chakra-ui/layout';
import { BigNumber, providers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { hexColorToBase16 } from 'src/utils';
import { HustlerSex, DEFAULT_BG_COLORS } from 'src/HustlerConfig';
import { NETWORK } from 'src/constants';
import { SwapMeet__factory, Hustler__factory } from '@dopewars/contracts';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';

type Metadata = {
  image: string;
};

export interface HustlerRenderProps {
  bgColor?: string;
  body?: number;
  facialHair?: number;
  hair?: number;
  itemIds: BigNumber[];
  name?: string;
  renderName?: boolean;
  renderTitle?: boolean;
  sex?: HustlerSex;
  textColor?: string;
}

const RenderFromItemIds = ({
  bgColor = DEFAULT_BG_COLORS[0],
  body,
  facialHair,
  hair,
  itemIds,
  name = '',
  renderName = false,
  renderTitle = false,
  sex,
  textColor = '#000000',
}: HustlerRenderProps) => {
  const [json, setJson] = useState<Metadata>();
  const [itemRles, setItemRles] = useState<string[]>([]);
  const [bodyRles, setBodyRles] = useState<string[]>([]);
  const [hasRenderedFromChain, setHasRenderedFromChain] = useState(false);

  const provider = useMemo<any>(
    () =>
      new providers.JsonRpcProvider(
        'https://opt-kovan.g.alchemy.com/v2/GAJJKOHOzfVI1jmgOf2OcL--sj4Yyedg',
      ),
    [],
  );

  const swapmeet = useMemo(
    () => SwapMeet__factory.connect(NETWORK[69].contracts.swapmeet, provider),
    [provider],
  );

  const hustlers = useMemo(
    () => Hustler__factory.connect(NETWORK[69].contracts.hustlers, provider),
    [provider],
  );

  useEffect(() => {
    setHasRenderedFromChain(false);
    const sexIndex = sex && sex == 'female' ? 1 : 0;
    Promise.all(itemIds.map(id => swapmeet.tokenRle(id, sexIndex))).then(setItemRles);
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
    setHasRenderedFromChain(false);
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

  useEffect(() => {
    if (hustlers && bodyRles && itemRles) {
      setHasRenderedFromChain(false);
      const hustlerShadowHex = '0x0036283818022b01000d2b0500092b0200';
      const drugShadowHex = '0x00362f3729062b';
      hustlers
        .render(
          renderTitle ? name : '', // title
          renderName ? name : '', // subtitle – should this be "name" ?
          64,
          hexColorToBase16(bgColor),
          hexColorToBase16(textColor),
          [0, 0, 0, 0],
          [hustlerShadowHex, drugShadowHex, ...bodyRles, ...itemRles],
        )
        .then(meta => {
          meta = meta.replace('data:application/json;base64,', '');
          meta = Buffer.from(meta, 'base64').toString();
          const decoded = JSON.parse(meta);
          setJson(decoded as Metadata);
          setHasRenderedFromChain(true);
        });
    }
  }, [swapmeet, hustlers, itemRles, bodyRles, name, textColor, bgColor, renderName, renderTitle]);

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

export default RenderFromItemIds;
