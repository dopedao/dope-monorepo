import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { HustlerCustomization } from 'utils/HustlerConfig';
import { Image } from '@chakra-ui/react';
import { PanelFooter } from 'components/PanelFooter';
import { StepsProps } from 'features/hustlers/modules/Steps';
import ConfigurationControls from 'features/hustlers/components/ConfigurationControls';
import PanelContainer from 'components/PanelContainer';
import RenderFromDopeId from 'features/hustlers/components/RenderFromDopeId';
import RenderFromItemRles from 'features/hustlers/components/RenderFromItemRles';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import styled from '@emotion/styled';
import ZoomControls from 'features/hustlers/components/ZoomControls';
import Link from 'next/link';
import PngDownloadButton from '../PngDownloadButton';

export type ConfigureHustlerProps = Pick<StepsProps, 'setHustlerConfig'> & {
  config: HustlerCustomization;
  ogTitle?: string;
  itemRles?: string[];
  hustlerId?: string;
  handleFinishConfiguration?: () => void;
  isCustomize?: boolean;
};

const HustlerCard = styled.div<{ bgColor?: string }>(props => ({
  // This bg color will have to change once we can configure it
  // It's the default right now for testnet renders.
  backgroundColor: props.bgColor || '',
  margin: '16px 16px 0 16px',
  border: '2px solid #000000',
  borderRadius: '4px',
  height: 'calc(100% - 60px - 16px)',
}));

const ConfigureHustler = ({
  config,
  setHustlerConfig,
  isCustomize,
  ogTitle,
  hustlerId,
  itemRles,
  handleFinishConfiguration,
}: ConfigureHustlerProps) => {
  return (
    <StackedResponsiveContainer>
      <PanelContainer
        css={css`
          min-height: 500px;
          background-color: var(--gray-00);
          gap: 16px;
          flex: 2 !important;
        `}
      >
        <HustlerCard bgColor={config.bgColor}>
          {isCustomize && itemRles ? (
            <RenderFromItemRles
              bgColor={config.bgColor}
              body={config.body}
              facialHair={config.facialHair}
              hair={config.hair}
              itemRles={itemRles}
              name={config.name}
              renderName={config.renderName}
              sex={config.sex}
              textColor={config.textColor}
              zoomWindow={config.zoomWindow}
              ogTitle={ogTitle}
              dopeId={config.dopeId}
              showVehicle={config.showVehicle}
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
              showVehicle={config.showVehicle}
            />
          )}
        </HustlerCard>
        <PanelFooter>
          {isCustomize && itemRles && (
            <>
              <PngDownloadButton hustlerConfig={config} />
            </>
          )}
          <ZoomControls config={config} setHustlerConfig={setHustlerConfig} />
        </PanelFooter>
      </PanelContainer>
      <ConfigurationControls
        config={config}
        setHustlerConfig={setHustlerConfig}
        handleFinishConfiguration={handleFinishConfiguration}
        isCustomize={isCustomize}
      />
    </StackedResponsiveContainer>
  );
};

export default ConfigureHustler;
