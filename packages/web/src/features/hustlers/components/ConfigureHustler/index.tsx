import { BigNumber } from '@ethersproject/bignumber';
import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { HustlerCustomization } from 'utils/HustlerConfig';
import { Image } from '@chakra-ui/react';
import { PanelFooter } from 'components/PanelFooter';
import { StepsProps } from 'features/hustlers/modules/Steps';
import ConfigurationControls from 'components/hustler/ConfigurationControls';
import PanelContainer from 'components/PanelContainer';
import RenderFromDopeId from 'components/hustler/RenderFromDopeId';
import RenderFromItemIds from 'components/hustler/RenderFromItemIds';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import styled from '@emotion/styled';
import ZoomControls from 'components/hustler/ZoomControls';
import Link from 'next/link';

import svgtopng from './svg-to-png';

export type ConfigureHustlerProps = Pick<StepsProps, 'setHustlerConfig'> & {
  config: HustlerCustomization;
  ogTitle?: string;
  itemIds?: BigNumber[];
  hustlerId?: string;
  goBackToInitialStep?: () => void;
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
  itemIds,
  goBackToInitialStep,
}: ConfigureHustlerProps) => (
  <StackedResponsiveContainer>
    <PanelContainer
      css={css`
        min-height: 500px;
        background-color: var(--gray-00);
        gap: 16px;
      `}
    >
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
            isVehicle={config.isVehicle}
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
            isVehicle={config.isVehicle}
          />
        )}
      </HustlerCard>
      <PanelFooter>
        {isCustomize && itemIds && (
          <>
            <Button
              onClick={() => {
                svgtopng(
                  'svg#dynamicBuiltSvg',
                  `dope-wars-hustler-${config.name?.replace(' ', '_')}`,
                  config.bgColor,
                );
              }}
            >
              <Image src="/images/icon/download.svg" alt="Download" />
            </Button>
            <Link
              href={`https://community.dopewars.gg/collectibles/new?hustler_id=${hustlerId}`}
              passHref
            >
              <a target="rebel">
                <Button>
                  <Image src="/images/icon/camera.svg" alt="Mint a Mugshot" height="40px" />
                </Button>
              </a>
            </Link>
          </>
        )}
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

export default ConfigureHustler;
