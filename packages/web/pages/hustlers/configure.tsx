import { css } from '@emotion/react';
import { useReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { HustlerInitConfig } from 'src/HustlerConfig';
import { useWalletQuery } from 'src/generated/graphql';
// import { HUSTLER_MINT_TIME } from 'src/constants';
import AppWindow from 'components/AppWindow';
import ConfigurationControls from 'components/hustler/ConfigurationControls';
import Head from 'components/Head';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import RenderFromLootId from 'components/hustler/RenderFromLootId';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';

const Hustler = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);
  const { account } = useWeb3React();
  const { data, loading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });
  // const currentTime = new Date();
  // const { chainId } = useWeb3React();
  // const onTestNetOrAfterHustlerLaunch = chainId == 4 || currentTime >= HUSTLER_MINT_TIME;

  return (
    <AppWindow
      requiresWalletConnection={true}
      balance={data?.wallet?.paper}
      loadingBalance={loading}
    >
      <Head title="Create Your Hustler" />
      <StackedResponsiveContainer>
        <PanelContainer
          css={css`
            min-height: 500px;
            // This bg color will have to change once we can configure it
            // It's the default right now for testnet renders.
            background-color: ${hustlerConfig.bgColor};
          `}
        >
          <PanelTitleBar>DOPE NFT #{hustlerConfig.dopeId}</PanelTitleBar>
          <RenderFromLootId
            bgColor={hustlerConfig.bgColor}
            body={hustlerConfig.body}
            facialHair={hustlerConfig.facialHair}
            hair={hustlerConfig.hair}
            id={hustlerConfig.dopeId}
            name={hustlerConfig.name}
            renderName={hustlerConfig.renderName}
            renderTitle={hustlerConfig.renderTitle}
            sex={hustlerConfig.sex}
            textColor={hustlerConfig.textColor}
          />
          <div></div>
        </PanelContainer>
        <div>
          <ConfigurationControls />
        </div>
      </StackedResponsiveContainer>
    </AppWindow>
  );
};

export default Hustler;
