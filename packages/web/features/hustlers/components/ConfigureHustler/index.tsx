import { Button, HStack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from '@ethersproject/bignumber';
import { Hustler__factory } from '@dopewars/contracts';
import { useMemo } from 'react';
import { HustlerCustomization, randomizeHustlerAttributes } from 'src/HustlerConfig';
import { NETWORK } from 'src/constants';
import { switchNetwork, useOptimism } from 'hooks/web3';
import ConfigurationControls from 'components/hustler/ConfigurationControls';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBar from 'components/PanelTitleBar';
import RenderFromLootId from 'components/hustler/RenderFromLootId';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import ZoomControls from 'components/hustler/ZoomControls';

export type ConfigureHustlerProps = {
  config: HustlerCustomization;
  makeVarConfig?: ReactiveVar<HustlerCustomization>;
};

const ConfigureHustler = ({
  config,
  makeVarConfig,
  isCustomize,
}: ConfigureHustlerProps & { isCustomize?: boolean }) => {
  const { chainId } = useOptimism();
  const { library, chainId: web3ReactChainId } = useWeb3React();
  const router = useRouter();

  const hustlers = useMemo(
    () =>
      chainId
        ? Hustler__factory.connect(NETWORK[chainId].contracts.hustlers, library.getSigner())
        : null,
    [chainId, library],
  );

  const customizeHustler = async () => {
    if (web3ReactChainId && chainId !== web3ReactChainId) {
      switchNetwork(10, web3ReactChainId);
    } else {
      return;
    }

    const {
      dopeId,
      body,
      bgColor,
      facialHair,
      hair,
      name,
      renderName,
      sex,
      textColor,
      zoomWindow,
    } = config;

    const setname = name ? name : '';
    const color = '0x' + textColor.slice(1) + 'ff';
    const background = '0x' + bgColor.slice(1) + 'ff';
    const bodyParts: [BigNumber, BigNumber, BigNumber, BigNumber] = [
      sex == 'male' ? BigNumber.from(0) : BigNumber.from(1),
      BigNumber.from(body),
      BigNumber.from(hair),
      sex == 'male' ? BigNumber.from(facialHair) : BigNumber.from(0),
    ];

    let bitoptions = 0;

    if (renderName) {
      // title
      bitoptions += 10;
      // name
      bitoptions += 100;
    }

    const options =
      '0x' +
      parseInt('' + bitoptions, 2)
        .toString(16)
        .padStart(4, '0');

    let bitmask = 11110110;
    if (setname.length > 0) {
      bitmask += 1;
    }

    if (zoomWindow[0].gt(0) || zoomWindow[0].gt(1) || zoomWindow[0].gt(2) || zoomWindow[0].gt(3)) {
      bitmask += 1000;
    }

    const mask =
      '0x' +
      parseInt('' + bitmask, 2)
        .toString(16)
        .padStart(4, '0');

    if (hustlers) {
      await hustlers.setMetadata(
        BigNumber.from(dopeId),
        setname,
        color,
        background,
        options,
        zoomWindow,
        bodyParts,
        mask,
      );

      router.replace('/hustlers/mint-success');
    }
  };

  return (
    <StackedResponsiveContainer>
      <div>
        <ConfigurationControls config={config} makeVarConfig={makeVarConfig} />
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
            {isCustomize ? (
              <Button variant="primary" onClick={customizeHustler}>
                Save Configuration
              </Button>
            ) : (
              <Link href="/hustlers/initiate" passHref>
                <Button variant="primary">Finish Configuration</Button>
              </Link>
            )}
          </HStack>
        </PanelFooter>
      </PanelContainer>
    </StackedResponsiveContainer>
  );
};

export default ConfigureHustler;
