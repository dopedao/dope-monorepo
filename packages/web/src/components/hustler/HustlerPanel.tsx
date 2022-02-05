import { css } from '@emotion/react';
import { HustlerCustomization } from 'utils/HustlerConfig';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import RenderFromDopeId from 'components/hustler/RenderFromDopeId';
import { ZOOM_WINDOWS } from 'utils/HustlerConfig';

interface Props {
  hustlerConfig: HustlerCustomization;
  footer?: React.ReactNode;
}

const HustlerPanel = ({ hustlerConfig, footer }: Props) => {
  return (
    <PanelContainer
      css={css`
        min-height: 400px;
        flex: 1 !important;
        background-color: ${hustlerConfig.bgColor};
      `}
    >
      <PanelTitleBar>Hustler</PanelTitleBar>
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
        zoomWindow={ZOOM_WINDOWS[2]}
        isVehicle={true}
      />
      {footer}
    </PanelContainer>
  );
};

export default HustlerPanel;
