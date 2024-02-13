import { useCallback, useEffect, useState, useMemo } from 'react';
import { Box, Stack, HStack, Button } from '@chakra-ui/react';
import {
  DEFAULT_BG_COLORS,
  DEFAULT_TEXT_COLORS,
  SKIN_TONE_COLORS,
  ZOOM_WINDOWS,
} from 'utils/HustlerConfig';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';
import { Hustler__factory } from '@dopewars/contracts';
import { NETWORK } from 'utils/constants';
import { randomizeHustlerAttributes } from 'utils/HustlerConfig';
import { useOptimism } from 'hooks/web3';
import { useRouter } from 'next/router';
import HairSelector from 'features/hustlers/components/HairSelector';
import NameControls from 'features/hustlers/components/NameControls';
import PanelColorSelector from 'components/PanelColorSelector';
import PanelFooter from 'components/PanelFooter';
import PanelTitleHeader from 'components/PanelTitleHeader';
import SexSelector from 'features/hustlers/components/SexSelector';
import styled from '@emotion/styled';
import DisconnectAndQuitButton from 'features/hustlers/components/DisconnectAndQuitButton';
import { useHustler } from 'hooks/contracts';

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
  const hustlers = useHustler();

  useEffect(() => {
    setShowTextColor(config.renderName === true);
    setEnableNameVisible(config.zoomWindow === ZOOM_WINDOWS[0]);
  }, [config]);

  const customizeHustler = useCallback(async () => {
    setLoading(true);
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
      showVehicle,
    } = config;

    const setname = name ? name : '';
    const color = `0x${textColor.slice(1)}ff`;
    const background = `0x${bgColor.slice(1)}ff`;
    const bodyParts: [bigint, bigint, bigint, bigint] = [
      sex === 'male' ? BigInt(0) : BigInt(1),
      BigInt(body),
      BigInt(hair),
      sex === 'male' ? BigInt(facialHair) : BigInt(0),
    ];

    let bitoptions = 0b1000;

    if (showVehicle) {
      bitoptions |= 0b1;
    }

    if (renderName) {
      // title
      bitoptions |= 0b10;
      // name
      bitoptions |= 0b100;
    }

    const options = `0x${bitoptions.toString(16).padStart(4, '0')}`;

    console.log(`Options: ${options}`);

    // Bitmask controls configuration options we're allowed to set
    // in Hustler.sol
    // 0: Name
    // 1: Color
    // 2: Background Color
    // 3: Viewbox
    // 4-7: Bodyparts
    // 8: Layer order
    let bitmask = 0b111110110;

    // If anything in the name box at all, set it
    if (setname.length > 0) {
      bitmask |= 0b1;
    }

    // Viewbox / Zoomwindow
    if (zoomWindow[0] > 0 || zoomWindow[0] > 1 || zoomWindow[0] > 2 || zoomWindow[0] > 3) {
      bitmask |= 0b100;
    }

    const mask = `0x${bitmask.toString(16).padStart(4, '0')}`;

    console.log(bitmask);
    console.log(`bitmask: ${mask}`);

    // ORDER SLOTS order as defined in Components.sol:33
    // const SLOTS = [
    //   'WEAPON', 'CLOTHES', 'VEHICLE', 'WAIST', 'FOOT', 'HAND', 'DRUGS',
    //   'NECK', 'RING', 'ACCESSORY' ];

    // BUG IN SMART CONTRACT!!!
    // Order isn't passed properly in HustlerMetadata.sol:174
    // so this actually has no effect on the outcome of the on-chain image.
    const order = [2, 6, 8, 5, 1, 3, 4, 7, 9, 0].map(i => BigInt(i));

    if (hustlers) {
      try {
        const transaction = await hustlers.setMetadata(BigInt(dopeId), {
          name: setname.replaceAll(`"`, `'`),
          color,
          background,
          options,
          viewbox: zoomWindow,
          body: bodyParts,
          order,
          mask,
        });
        await transaction.wait();
      } catch (error) {
        setLoading(false);
        console.error(error);
        return;
      }
      setLoading(false);
      router.push({
        pathname: '/swap-meet/inventory',
        search: '?section=Hustlers',
      });
    }
  }, [hustlers, config, router]);

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
        <Box />
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
            >
              Finish Config
            </Button>
          </>
        )}
      </PanelFooter>
    </ControlsWrapper>
  );
};

export default ConfigurationControls;
