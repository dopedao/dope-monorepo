import { useReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { HustlerInitConfig } from 'src/HustlerConfig';
import { useWalletQuery } from 'src/generated/graphql';
import Steps from 'features/hustlers/modules/Steps';
import HustlerProvider from 'features/hustlers/HustlerProvider';
import AppWindow from 'components/AppWindow';
import LoadingBlock from 'components/LoadingBlock';
import { css } from '@emotion/react';

const InitiatePage = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);
  const { account } = useWeb3React();
  const { data, loading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });

  return (
    <AppWindow
      requiresWalletConnection={true}
      scrollable={true}
      title="Initiate Your Hustler"
      balance={data?.wallet?.paper}
      loadingBalance={loading}
      padBody={false}
    >
      {loading ? (
        <div css={css`padding:32px;`}>
          <LoadingBlock />
        </div>
      ) : (
        <HustlerProvider>
          <Steps hustlerConfig={hustlerConfig} />
        </HustlerProvider>
      )}
    </AppWindow>
  );
};

export default InitiatePage;
