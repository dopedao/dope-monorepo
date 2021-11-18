import { css } from '@emotion/react';
import { useReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { HustlerInitConfig } from 'src/HustlerConfig';
import { useWalletQuery } from 'src/generated/graphql';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import InitiationFooter from 'components/hustler/InitiationFooter';
import InitiationInfo from 'components/hustler/InitiationInfo';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import RenderFromLootId from 'components/hustler/RenderFromLootId';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';

const title = 'Initiate Your Hustler';

const Initiate = () => {
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
      title={title}
      balance={data?.wallet?.paper}
      loadingBalance={loading}
    >
      <Head title={title} />
      <StackedResponsiveContainer>
        <PanelContainer
          css={css`
            min-height: 400px;
            // This bg color will have to change once we can configure it
            // It's the default right now for testnet renders.
            background-color: ${hustlerConfig.bgColor};
          `}
        >
          <PanelTitleBar>Hustler</PanelTitleBar>
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
            zoomWindow={hustlerConfig.zoomWindow}
          />
          <InitiationFooter />
        </PanelContainer>
        <InitiationInfo />
      </StackedResponsiveContainer>
    </AppWindow>
  );
};

export default Initiate;
