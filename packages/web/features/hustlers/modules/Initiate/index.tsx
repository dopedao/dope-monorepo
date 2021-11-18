import { css } from '@emotion/react';
import { StepsProps } from 'features/hustlers/modules/Steps';
import Head from 'components/Head';
import InitiationFooter from 'components/hustler/InitiationFooter';
import InitiationInfo from 'components/hustler/InitiationInfo';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import RenderFromLootId from 'components/hustler/RenderFromLootId';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';

const Initiate = ({ hustlerConfig }: StepsProps) => (
  <>
    <Head title="Initiate Your Hustler" />
    <StackedResponsiveContainer>
      <PanelContainer
        css={css`
          min-height: 400px;
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
  </>
);

export default Initiate;
