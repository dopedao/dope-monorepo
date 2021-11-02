import { AspectRatio } from '@chakra-ui/layout';
import { BigNumber, providers } from 'ethers';
import { NETWORK } from '../../src/constants';
import { SwapMeet__factory } from '@dopewars/contracts';
import { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import LoadingBlock from '../LoadingBlock';
import RenderFromItemIds from '../../components/hustler/RenderFromItemIds';

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
        <RenderFromItemIds itemIds={itemIds} />
      </AspectRatio>
    );
  } else {
    return <div css={css`padding:16px;`}><LoadingBlock maxRows={10} /></div>;
  }
};

export default RenderFromLootId;
