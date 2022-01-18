import { useEffect, useState, useMemo } from 'react';
import { Stack, HStack, Button } from '@chakra-ui/react';
import {
  DEFAULT_BG_COLORS,
  DEFAULT_TEXT_COLORS,
  SKIN_TONE_COLORS,
  ZOOM_WINDOWS,
} from 'utils/HustlerConfig';
import HairSelector from 'components/hustler/HairSelector';
import NameControls from 'components/hustler/NameControls';
import SexSelector from 'components/hustler/SexSelector';
import PanelColorSelector from 'components/PanelColorSelector';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';
import styled from '@emotion/styled';
import { randomizeHustlerAttributes } from 'utils/HustlerConfig';
import { useRouter } from 'next/router';
import { useOptimism } from 'hooks/web3';
import { useWeb3React } from '@web3-react/core';
import { NETWORK } from 'utils/constants';
import { Hustler__factory } from '@dopewars/contracts';
import { BigNumber } from '@ethersproject/bignumber';

const ControlsWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid #000;
  border-left: none;
`;

const ControlsBody = styled.div`
  padding: 16px;
`;

const PanelFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #dededd;
  border-top: 2px solid #000;
  padding: 14px;
  div {
    flex-grow: 1;
  }
  * > button {
    margin-right: 10px;
    &:last-of-type {
      margin: 0;
    }
  }
  @media (max-width: 768px) {
    button {
      width: 100%;
      margin: 0 0 14px 0;
    }
  }
`;

const ConfigurationControls = ({
  config,
  setHustlerConfig,
  isCustomize,
  goBackToInitialStep,
}: ConfigureHustlerProps) => {
  const [showTextColor, setShowTextColor] = useState(false);
  const [showNameControls, setShowNameControls] = useState(false);
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
    setShowNameControls(config.zoomWindow === ZOOM_WINDOWS[0]);
  }, [config]);

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
      try {
        const transaction = await hustlers.setMetadata(BigNumber.from(dopeId), {
          name: setname,
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
          pathname: '/hustlers',
          search: `?c=true`,
        });
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <ControlsWrapper>
      <ControlsBody>
        <Stack spacing={4}>
          {/* Title controls only make sense when zoomed out fully */}
          {showNameControls && <NameControls config={config} setHustlerConfig={setHustlerConfig} />}
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
        <HStack mt={0} justify="flex-end" flexWrap="wrap">
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
            <Button
              type="button"
              onClick={goBackToInitialStep}
              variant="primary"
              isLoading={loading}
              loadingText="Processing..."
            >
              Finish Configuration
            </Button>
          )}
        </HStack>
      </PanelFooter>
    </ControlsWrapper>
  );
};

export default ConfigurationControls;
