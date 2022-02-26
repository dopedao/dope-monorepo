import { useCallback, useEffect, useState, useMemo } from 'react';
import { Stack, HStack, Button } from '@chakra-ui/react';
import {
  DEFAULT_BG_COLORS,
  DEFAULT_TEXT_COLORS,
  SKIN_TONE_COLORS,
  ZOOM_WINDOWS,
} from 'utils/HustlerConfig';
import { BigNumber } from '@ethersproject/bignumber';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';
import { Hustler__factory } from '@dopewars/contracts';
import { NETWORK } from 'utils/constants';
import { randomizeHustlerAttributes } from 'utils/HustlerConfig';
import { useOptimism } from 'hooks/web3';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import HairSelector from 'components/hustler/HairSelector';
import NameControls from 'components/hustler/NameControls';
import PanelColorSelector from 'components/PanelColorSelector';
import PanelFooter from 'components/PanelFooter';
import PanelTitleHeader from 'components/PanelTitleHeader';
import SexSelector from 'components/hustler/SexSelector';
import styled from '@emotion/styled';
import DisconnectAndQuitButton from 'features/hustlers/components/DisconnectAndQuitButton';

const ControlsWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid black;
  position: relative;
  border-radius: 8px;
`;

const ControlsBody = styled.div`
  padding: 16px;
  height: calc(100% - 56px);
  overflow-y: auto;
`;

const ConfigurationControls = ({
  config,
  setHustlerConfig,
  isCustomize,
  handleFinishConfiguration,
}: ConfigureHustlerProps) => {
  const [showTextColor, setShowTextColor] = useState(false);
  const [enableNameVisible, setEnableNameVisible] = useState(false);
  const router = useRouter();
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

  useEffect(() => {
    setShowTextColor(config.renderName === true);
    setEnableNameVisible(config.zoomWindow == ZOOM_WINDOWS[0]);
  }, [config]);

  const customizeHustler = useCallback(async () => {
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
      isVehicle,
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

    if (isVehicle) {
      bitoptions += 1;
    }

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
      try {
        const transaction = await hustlers.setMetadata(BigNumber.from(dopeId), {
          name: setname.replaceAll(`"`, `'`),
          color,
          background,
          options,
          viewbox: zoomWindow,
          body: bodyParts,
          mask,
          order: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
        await transaction.wait();
        setLoading(false);
        router.push({
          pathname: '/inventory',
          search: `?section=Hustlers`,
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  }, [chainId, hustlers, config, router, web3ReactChainId]);

  return (
    <ControlsWrapper>
      <PanelTitleHeader>Customize</PanelTitleHeader>
      <ControlsBody>
        <Stack spacing={4}>
          {/* Title controls only make sense when zoomed out fully */}
          <NameControls
            config={config}
            setHustlerConfig={setHustlerConfig}
            enableNameVisible={enableNameVisible}
          />
          {showTextColor && (
            <PanelColorSelector
              title="Text Color"
              colors={DEFAULT_TEXT_COLORS}
              value={config.textColor}
              changeCallback={color => setHustlerConfig({ ...config, textColor: color })}
            />
          )}
          <PanelColorSelector
            title="Background"
            colors={DEFAULT_BG_COLORS}
            value={config.bgColor}
            changeCallback={color => setHustlerConfig({ ...config, bgColor: color })}
          />
          <PanelColorSelector
            title="Skin Tone"
            colors={SKIN_TONE_COLORS}
            value={SKIN_TONE_COLORS[config.body]}
            dopeId={config.dopeId}
            changeCallback={color =>
              setHustlerConfig({
                ...config,
                body: SKIN_TONE_COLORS.findIndex(el => el == color),
              })
            }
          />
          <SexSelector config={config} setHustlerConfig={setHustlerConfig} />
          <HairSelector config={config} setHustlerConfig={setHustlerConfig} />
        </Stack>
      </ControlsBody>
      <PanelFooter>
        {!isCustomize && <DisconnectAndQuitButton />}
        <div></div>
        <Button onClick={() => randomizeHustlerAttributes(config.dopeId, setHustlerConfig)}>
          Randomize
        </Button>
        {isCustomize ? (
          <Button
            type="button"
            variant="primary"
            onClick={customizeHustler}
            isLoading={loading}
            loadingText="Processing..."
          >
            Save Configuration
          </Button>
        ) : (
          <>
            <Button
              type="button"
              onClick={handleFinishConfiguration}
              variant="primary"
              isLoading={loading}
              loadingText="Processing..."
              // autoFocus
            >
              Finish Configuration
            </Button>
          </>
        )}
      </PanelFooter>
    </ControlsWrapper>
  );
};

export default ConfigurationControls;
