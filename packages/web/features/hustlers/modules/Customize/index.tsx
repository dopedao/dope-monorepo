import { css } from '@emotion/react';
import { StepsProps } from 'features/hustlers/modules/Steps';
import Head from 'components/Head';
import InitiationFooter from 'components/hustler/InitiationFooter';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import RenderFromLootId from 'components/hustler/RenderFromLootId';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';

const Customize = ({ hustlerConfig }: StepsProps) => (
  <>
    <Head title="Customize" />
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
    </StackedResponsiveContainer>
  </>
);

export default Customize;
