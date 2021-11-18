import { Button, HStack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Link from 'next/link';
import { useReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { HustlerInitConfig, randomizeHustlerAttributes } from 'src/HustlerConfig';
import AppWindow from 'components/AppWindow';
import ConfigurationControls from 'components/hustler/ConfigurationControls';
import Head from 'components/Head';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBar from 'components/PanelTitleBar';
import RenderFromLootId from 'components/hustler/RenderFromLootId';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import ZoomControls from 'components/hustler/ZoomControls';

const title = 'Hustler Configuration';

const Configure = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);
  const { account } = useWeb3React();
  // const currentTime = new Date();
  // const { chainId } = useWeb3React();
  // const onTestNetOrAfterHustlerLaunch = chainId == 4 || currentTime >= HUSTLER_MINT_TIME;

  return (
    <AppWindow
      requiresWalletConnection={true}
      padBody={false}
      title={title}
    >
      <Head title={title} />
      <StackedResponsiveContainer>
        <div>
          <ConfigurationControls />
        </div>
        <PanelContainer
          css={css`
            min-height: 500px;
            // This bg color will have to change once we can configure it
            // It's the default right now for testnet renders.
            background-color: ${hustlerConfig.bgColor};
          `}
        >
          <PanelTitleBar>DOPE NFT #{hustlerConfig.dopeId}</PanelTitleBar>
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
          <PanelFooter css={css`width:100%;border-top-width:1px;`}>
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
    </AppWindow>
  );
};

export default Configure;
