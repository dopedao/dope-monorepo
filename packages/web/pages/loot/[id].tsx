import { useRouter } from 'next/router';
import { SwapMeet__factory } from '@dopewars/contracts';
import { useEffect, useMemo, useState } from 'react';
import { BigNumber, providers } from 'ethers';

import { NETWORK } from '../../src/constants';
import AppWindow from '../../components/AppWindow';
import Head from '../../components/Head';
import Render from '../../components/hustler/Render';

const HustlerFromLoot = () => {
  const router = useRouter();
  const { id } = router.query;

  const [itemIds, setItemIds] = useState<BigNumber[]>();
  const [bodyIds, setBodyIds] = useState<string[]>();

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
          // Exclude vehicle
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

  return (
    <AppWindow padBody={false}>
      <Head title="Hustler Preview" />
      {itemIds && <Render itemIds={itemIds} />}
    </AppWindow>
  );
};

export default HustlerFromLoot;
