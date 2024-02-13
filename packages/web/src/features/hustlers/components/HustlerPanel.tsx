import { css } from '@emotion/react';
import { HustlerCustomization } from 'utils/HustlerConfig';
import PanelContainer from 'components/PanelContainer';
import PanelTitleHeader from 'components/PanelTitleHeader';
import RenderFromDopeId from 'features/hustlers/components/RenderFromDopeId';

interface Props {
  hustlerConfig: HustlerCustomization;
  footer?: React.ReactNode;
}

const HustlerPanel = ({ hustlerConfig, footer }: Props) => {
  return (
    <PanelContainer
      css={css`
        min-height: 400px;
        height: 100%;
        flex: 1 !important;
        background-color: ${hustlerConfig.bgColor};
      `}
    >
      <PanelTitleHeader>Your New Hustler</PanelTitleHeader>
      <RenderFromDopeId
        bgColor={hustlerConfig.bgColor}
        body={hustlerConfig.body}
        facialHair={hustlerConfig.facialHair}
        hair={hustlerConfig.hair}
        id={hustlerConfig.dopeId}
        name={hustlerConfig.name}
        renderName={hustlerConfig.renderName}
        sex={hustlerConfig.sex}
        textColor={hustlerConfig.textColor}
        zoomWindow={hustlerConfig.zoomWindow}
        showVehicle={hustlerConfig.showVehicle}
      />
      {footer}
    </PanelContainer>
  );
};

export default HustlerPanel;
