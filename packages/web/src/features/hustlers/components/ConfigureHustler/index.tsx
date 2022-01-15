import { css } from '@emotion/react';
import { BigNumber } from '@ethersproject/bignumber';
import { HustlerCustomization } from 'utils/HustlerConfig';
import ConfigurationControls from 'components/hustler/ConfigurationControls';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBar from 'components/PanelTitleBar';
import RenderFromDopeId from 'components/hustler/RenderFromDopeId';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import ZoomControls from 'components/hustler/ZoomControls';
import RenderFromItemIds from 'components/hustler/RenderFromItemIds';
import { StepsProps } from 'features/hustlers/modules/Steps';
import styled from '@emotion/styled';

export type ConfigureHustlerProps = Pick<StepsProps, 'setHustlerConfig'> & {
  config: HustlerCustomization;
  ogTitle?: string;
  itemIds?: BigNumber[];
  goBackToInitialStep?: () => void;
  isCustomize?: boolean;
};

const HustlerCard = styled.div<{ bgColor?: string }>(props => ({
  // This bg color will have to change once we can configure it
  // It's the default right now for testnet renders.
  backgroundColor: props.bgColor || '',
  margin: '16px',
  border: '2px solid #000000',
  borderRadius: '4px',
  height: 'calc(100% - 50px - 44px - 32px)',
}));

const ConfigureHustler = ({
  config,
  setHustlerConfig,
  isCustomize,
  ogTitle,
  itemIds,
  goBackToInitialStep,
}: ConfigureHustlerProps) => {
  return (
    <StackedResponsiveContainer>
      <PanelContainer
        css={css`
          min-height: 500px;
        `}
      >
        <PanelTitleBar>DOPE NFT #{config.dopeId}</PanelTitleBar>
        <HustlerCard bgColor={config.bgColor}>
          {isCustomize && itemIds ? (
            <RenderFromItemIds
              bgColor={config.bgColor}
              body={config.body}
              facialHair={config.facialHair}
              hair={config.hair}
              itemIds={itemIds}
              name={config.name}
              renderName={config.renderName}
              sex={config.sex}
              textColor={config.textColor}
              zoomWindow={config.zoomWindow}
              ogTitle={ogTitle}
              dopeId={config.dopeId}
              resolution={64}
            />
          ) : (
            <RenderFromDopeId
              bgColor={config.bgColor}
              body={config.body}
              facialHair={config.facialHair}
              hair={config.hair}
              id={config.dopeId}
              name={config.name}
              renderName={config.renderName}
              sex={config.sex}
              textColor={config.textColor}
              zoomWindow={config.zoomWindow}
              ogTitle={ogTitle}
              resolution={64}
            />
          )}
        </HustlerCard>
        <PanelFooter
          css={css`
            width: 100%;
            border-top-width: 1px;
            @media (max-width: 960px) {
              display: flex;
              flex-direction: column;
            }
          `}
        >
          <ZoomControls config={config} setHustlerConfig={setHustlerConfig} />
        </PanelFooter>
      </PanelContainer>
      <ConfigurationControls
        config={config}
        setHustlerConfig={setHustlerConfig}
        goBackToInitialStep={goBackToInitialStep}
        isCustomize={isCustomize}
      />
    </StackedResponsiveContainer>
  );
};

export default ConfigureHustler;
