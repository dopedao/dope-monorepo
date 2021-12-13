import { useMemo, useState } from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { ReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from '@ethersproject/bignumber';
import { Hustler__factory } from '@dopewars/contracts';
import { HustlerCustomization, randomizeHustlerAttributes } from 'utils/HustlerConfig';
import { NETWORK } from 'utils/constants';
import { useOptimism } from 'hooks/web3';
import ConfigurationControls from 'components/hustler/ConfigurationControls';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBar from 'components/PanelTitleBar';
import RenderFromDopeId from 'components/hustler/RenderFromDopeId';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import ZoomControls from 'components/hustler/ZoomControls';
import Spinner from 'ui/svg/Spinner';
import RenderFromItemIds from 'components/hustler/RenderFromItemIds';

export type ConfigureHustlerProps = {
  config: HustlerCustomization;
  makeVarConfig?: ReactiveVar<HustlerCustomization>;
  ogTitle?: string;
  itemIds?: BigNumber[];
  goBackToInitialStep?: () => void;
};

const ConfigureHustler = ({
  config,
  makeVarConfig,
  isCustomize,
  ogTitle,
  itemIds,
  goBackToInitialStep,
}: ConfigureHustlerProps & { isCustomize?: boolean }) => {
  const [loading, setLoading] = useState(false);
  const { chainId } = useOptimism();
  const { library, chainId: web3ReactChainId } = useWeb3React();

  const hustlers = useMemo(
    () =>
      chainId
        ? Hustler__factory.connect(NETWORK[chainId].contracts.hustlers, library.getSigner())
        : null,
    [chainId, library],
  );

  const customizeHustler = async () => {
    setLoading(true);
    if (web3ReactChainId && web3ReactChainId !== chainId) {
      setLoading(false);
      return alert('You must be on the Optimistic network to customize your Hustler.');
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
      await hustlers.setMetadata(BigNumber.from(dopeId), {
        name: setname,
        color,
        background,
        options,
        viewbox: zoomWindow,
        body: bodyParts,
        mask,
        order: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      });
    }
    setLoading(false);
  };

  return (
    <StackedResponsiveContainer>
      <ConfigurationControls config={config} makeVarConfig={makeVarConfig} />
      <PanelContainer
        css={css`
          min-height: 500px;
          // This bg color will have to change once we can configure it
          // It's the default right now for testnet renders.
          background-color: ${config.bgColor};
        `}
      >
        <PanelTitleBar>DOPE NFT #{config.dopeId}</PanelTitleBar>
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
          />
        )}
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
          <ZoomControls config={config} makeVarConfig={makeVarConfig} />
          <HStack mt={0} justify="end">
            <Button onClick={() => randomizeHustlerAttributes(config.dopeId, makeVarConfig)}>
              Randomize
            </Button>
            {isCustomize ? (
              <Button
                type="button"
                variant="primary"
                onClick={customizeHustler}
                isLoading={loading}
                width="173.59px"
              >
                {loading ? <Spinner /> : 'Save Configuration'}
              </Button>
            ) : (
              <Button type="button" onClick={goBackToInitialStep} variant="primary">
                Finish Configuration
              </Button>
            )}
          </HStack>
        </PanelFooter>
      </PanelContainer>
    </StackedResponsiveContainer>
  );
};

export default ConfigureHustler;
