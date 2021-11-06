import { BigNumber, providers } from 'ethers';
import { css } from '@emotion/react';
import { HustlerSex, DEFAULT_BG_COLORS } from '../../src/HustlerInitiation';
import { NETWORK } from '../../src/constants';
import LoadingBlock from '../LoadingBlock';
import { SwapMeet__factory, Hustler__factory } from '@dopewars/contracts';
import { useEffect, useMemo, useState } from 'react';
import { hexColorToBase16 } from '../../src/utils';

// then the 2nd arg is the index which corresponds to what they are in the image folders

interface Metadata {
  image: string;
}

interface HustlerRenderProps {
  itemIds: BigNumber[];
  sex?: HustlerSex;
  body?: number;
  hair?: number;
  facialHair?: number;
  bgColor?: string;
}

const RenderFromItemIds = ({ itemIds, sex, body, hair, facialHair, bgColor = DEFAULT_BG_COLORS[0] }: HustlerRenderProps) => {
  const [json, setJson] = useState<Metadata>();
  const [itemRles, setItemRles] = useState<string[]>([]);
  const [bodyRles, setBodyRles] = useState<string[]>([]);
  const [hasRenderedFromChain, setHasRenderedFromChain] = useState(false);

  const provider = useMemo(
    () =>
      new providers.JsonRpcProvider(
        'https://eth-rinkeby.alchemyapi.io/v2/_UcVUJUlskxh3u6aDOeeUgAWkVk4FwZ4',
      ),
    [],
  );

  const swapmeet = useMemo(
    () => SwapMeet__factory.connect(NETWORK[4].contracts.swapmeet, provider),
    [provider],
  );

  const hustlers = useMemo(
    () => Hustler__factory.connect(NETWORK[4].contracts.hustlers, provider),
    [provider],
  );

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
  const getBodyRleParams = () => {
    const bodyParams: [number, number] = [
      (sex && sex == 'female') ? 1 : 0,
      body ?? 0
    ];
    const hairParams: [number, number] = [
      (sex && sex == 'female') ? 3 : 2,
      hair ?? 0
    ];
    const facialHairParams: [number, number] = [
      4, facialHair ?? 0
    ];
    return {bodyParams, hairParams, facialHairParams};
  }

  // facialHair?: number;

  useEffect(() => {
    if (!swapmeet) return;
    setHasRenderedFromChain(false);
    const sexIndex = (sex && sex == 'female') ? 1 : 0;
    Promise.all(itemIds.map(id => swapmeet.tokenRle(id, sexIndex))).then(setItemRles);
  }, [itemIds, swapmeet, sex]);

  useEffect(() => {
    if (!hustlers) return;
    setHasRenderedFromChain(false);
    const {bodyParams, hairParams, facialHairParams} = getBodyRleParams();
    const promises = [
      hustlers.bodyRle(...bodyParams), 
      hustlers.bodyRle(...hairParams)
    ];
    // No female beards for now because they're unsupported
    if (sex == 'male' && facialHair) {
      promises.push(hustlers.bodyRle(...facialHairParams));
    }
    Promise.all(promises).then(setBodyRles);
  }, [hustlers, sex, body, hair, facialHair]);

  useEffect(() => {
    if (hustlers && bodyRles && itemRles) {
      hustlers
        .render('', '', 64, hexColorToBase16(bgColor), '0x202221ff', [0, 0, 0, 0], [...bodyRles, ...itemRles])
        .then(meta => {
          meta = meta.replace('data:application/json;base64,', '');
          meta = Buffer.from(meta, 'base64').toString();
          meta = meta.replace(', "attributes":', '');
          const decoded = JSON.parse(meta);
          setJson(decoded as Metadata);
          setHasRenderedFromChain(true);
        });
    }
  }, [hustlers, itemRles, bodyRles]);

  if (hasRenderedFromChain === false) return <LoadingBlock />;

  return (
    <div
      css={css`
        display: flex;
        flex-align: center;
        justify-content: center;
      `}
    >
      {json && (
        <img
          css={css`
            width: 640px;
            height: 640px;
          `}
          src={json.image}
        ></img>
      )}
    </div>
  );

};

export default RenderFromItemIds;
