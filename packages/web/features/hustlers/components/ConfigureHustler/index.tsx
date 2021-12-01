import { Button, HStack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Link from 'next/link';
import { HustlerCustomization, randomizeHustlerAttributes } from 'src/HustlerConfig';
import ConfigurationControls from 'components/hustler/ConfigurationControls';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBar from 'components/PanelTitleBar';
import RenderFromLootId from 'components/hustler/RenderFromLootId';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import ZoomControls from 'components/hustler/ZoomControls';

export type ConfigureHustlerProps = {
  config: HustlerCustomization;
};

const ConfigureHustler = ({ config }: ConfigureHustlerProps) => (
  <StackedResponsiveContainer>
    <div>
      <ConfigurationControls config={config} />
    </div>
    <PanelContainer
      css={css`
        min-height: 500px;
        // This bg color will have to change once we can configure it
        // It's the default right now for testnet renders.
        background-color: ${config.bgColor};
      `}
    >
      <PanelTitleBar>DOPE NFT #{config.dopeId}</PanelTitleBar>
      <RenderFromLootId
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
      />
      <PanelFooter
        css={css`
          width: 100%;
          border-top-width: 1px;
        `}
      >
        <ZoomControls />
        <HStack mt={0} justify="end">
          <Button onClick={() => randomizeHustlerAttributes()}>Randomize</Button>
          <Link href="/hustlers/initiate" passHref>
            <Button variant="primary">Finish Configuration</Button>
          </Link>
        </HStack>
      </PanelFooter>
    </PanelContainer>
  </StackedResponsiveContainer>
);

export default ConfigureHustler;
