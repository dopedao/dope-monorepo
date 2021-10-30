import { useRouter } from 'next/router';
import { SwapMeet__factory } from '@dopewars/contracts';
import { useEffect, useMemo, useState } from 'react';
import { BigNumber, providers } from 'ethers';

import { NETWORK } from 'src/constants';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import RenderFromLootId from 'components/hustler/RenderFromLootId';
import { useWeb3React } from '@web3-react/core';
import { useWalletQuery } from 'src/generated/graphql';
import Container from 'components/Container';
import LoadingBlock from 'components/LoadingBlock';

const HustlerFromLoot = () => {
  const router = useRouter();
  const { id } = router.query;
  const { account } = useWeb3React();
  const { data, loading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });

  return (
    <AppWindow padBody={false} balance={data?.wallet?.paper} loadingBalance={loading}>
      <Head title="Hustler Preview" />
      {id && <RenderFromLootId id={id as string} />}
    </AppWindow>
  );
};

export default HustlerFromLoot;
