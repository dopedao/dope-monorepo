import { css } from '@emotion/react';
import { HustlerCustomization } from "src/HustlerConfig";
import PanelContainer from "components/PanelContainer";
import PanelTitleBar from "components/PanelTitleBar";
import RenderFromLootId from "components/hustler/RenderFromLootId";

interface Props {
  hustlerConfig: HustlerCustomization;
  footer?: React.ReactNode;
};

const HustlerPanel = ({hustlerConfig, footer}: Props) => {
  return (
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
      { footer }
    </PanelContainer>
  );
}

export default HustlerPanel;
