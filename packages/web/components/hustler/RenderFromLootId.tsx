import { useEffect, useMemo, useState } from 'react';
import { BigNumber, providers } from 'ethers';
import { HustlerSex } from 'src/HustlerInitiation';
import { NETWORK } from 'src/constants';
import { SwapMeet__factory } from '@dopewars/contracts';
import LoadingBlock from 'components/LoadingBlock';
import RenderFromItemIds from 'components/hustler/RenderFromItemIds';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';

export type HustlerRenderProps = {
  id: string;
  sex?: HustlerSex;
  body?: number;
  hair?: number;
  facialHair?: number;
  bgColor?: string;
};

const RenderFromLootId = ({ id, sex, body, hair, facialHair, bgColor }: HustlerRenderProps) => {
  const [itemIds, setItemIds] = useState<BigNumber[]>();

  const provider = useMemo<any>(
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

  useEffect(() => {
    if (swapmeet && id) {
      swapmeet.itemIds(id).then(ids =>
        // Excludes vehicle (2) and orders layers
        setItemIds([ids[6], ids[8], ids[5], ids[1], ids[3], ids[4], ids[7], ids[0]]),
      );
    }
  }, [swapmeet, id]);

  if (itemIds) {
    return (
      <RenderFromItemIds
        itemIds={itemIds}
        sex={sex}
        body={body}
        hair={hair}
        facialHair={facialHair}
        bgColor={bgColor}
      />
    );
  } else {
    return <LoadingBlockSquareCentered />;
  }
};

export default RenderFromLootId;
