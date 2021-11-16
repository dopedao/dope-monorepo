import { css } from '@emotion/react';
import { useReactiveVar } from '@apollo/client';
import { HustlerInitConfig } from 'src/HustlerInitiation';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import InitiationFooter from 'components/hustler/InitiationFooter';
import InitiationInfo from 'components/hustler/InitiationInfo';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import RenderFromLootId from 'components/hustler/RenderFromLootId';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';

const Initiate = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  return (
    <AppWindow requiresWalletConnection={true} scrollable={true}>
      <Head title="Initiate New Hustler" />
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
            id={hustlerConfig.dopeId}
            sex={hustlerConfig.sex}
            body={hustlerConfig.body}
            hair={hustlerConfig.hair}
            facialHair={hustlerConfig.facialHair}
            bgColor={hustlerConfig.bgColor}
          />
          <InitiationFooter />
        </PanelContainer>
        <InitiationInfo />
      </StackedResponsiveContainer>
    </AppWindow>
  );
};

export default Initiate;
