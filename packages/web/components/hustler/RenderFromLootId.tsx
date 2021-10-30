import { SwapMeet__factory } from '@dopewars/contracts';
import { useEffect, useMemo, useState } from 'react';
import { BigNumber, providers } from 'ethers';
import { NETWORK } from '../../src/constants';
import RenderFromItemIds from '../../components/hustler/RenderFromItemIds';
import LoadingBlock from '../LoadingBlock';

const RenderFromLootId = ({id}: {id: string}) => {

  const [itemIds, setItemIds] = useState<BigNumber[]>();
  // const [bodyIds, setBodyIds] = useState<string[]>();

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
        setItemIds([
          ids[0],
          ids[1],
          // Exclude vehicle [2]
          ids[3],
          ids[4],
          ids[5],
          ids[6],
          ids[7],
          ids[8],
        ]),
      );
    }
  }, [swapmeet, id]);

  if (itemIds) {
    return <RenderFromItemIds itemIds={itemIds} />
  } else {
    return <LoadingBlock />;
  }
};

export default RenderFromLootId;
