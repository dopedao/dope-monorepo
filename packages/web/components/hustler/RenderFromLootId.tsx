import { AspectRatio } from '@chakra-ui/layout';
import { BigNumber, providers } from 'ethers';
import { css } from '@emotion/react';
import { HustlerSex } from '../../src/HustlerInitiation';
import { NETWORK } from '../../src/constants';
import { SwapMeet__factory } from '@dopewars/contracts';
import { useEffect, useMemo, useState } from 'react';
import LoadingBlock from '../LoadingBlock';
import RenderFromItemIds from '../../components/hustler/RenderFromItemIds';

interface HustlerRenderProps {
  id: string;
  sex?: HustlerSex;
  body?: number;
  hair?: number;
  facialHair?: number;
  bgColor?: string;
}

const RenderFromLootId = (
  {id, sex, body, hair, facialHair, bgColor}: HustlerRenderProps
) => {

  const [itemIds, setItemIds] = useState<BigNumber[]>();

  const provider = useMemo(
    () =>
      new providers.JsonRpcProvider(
        'https://eth-rinkeby.alchemyapi.io/v2/_UcVUJUlskxh3u6aDOeeUgAWkVk4FwZ4',
      ),
    [],
  );

  const swapmeet = useMemo(
    () => SwapMeet__factory.connect(NETWORK[4].contracts.swapmeet, provider),
    [],
  );

  useEffect(() => {
    if (swapmeet && id) {
      swapmeet.itemIds(id as string).then(ids =>
        // Excludes vehicle (2) and orders layers
        setItemIds([
          ids[6],
          ids[8],
          ids[5],
          ids[1],
          ids[3],
          ids[4],
          ids[7],
          ids[0],
        ]),
      );
    }
  }, [swapmeet, id]);

  if (itemIds) {
    return (
      <AspectRatio ratio={1}>
        <RenderFromItemIds 
          itemIds={itemIds} 
          sex={sex}
          body={body}
          hair={hair}
          facialHair={facialHair}
          bgColor={bgColor}
        />
      </AspectRatio>
    );
  } else {
    return (
      <div css={css`
        padding:16px;
        display: flex;
        flex-align: center;
        justify-content: center;
      `}>
        <LoadingBlock maxRows={10} />
      </div>
    );
  }
};

export default RenderFromLootId;
