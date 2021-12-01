import { Stack } from '@chakra-ui/react';
import {
  HustlerInitConfig,
  DEFAULT_BG_COLORS,
  DEFAULT_TEXT_COLORS,
  SKIN_TONE_COLORS,
  ZOOM_WINDOWS,
} from 'src/HustlerConfig';
import { useEffect, useState } from 'react';
import HairSelector from 'components/hustler/HairSelector';
import NameControls from 'components/hustler/NameControls';
import SexSelector from 'components/hustler/SexSelector';
import PanelColorSelector from 'components/PanelColorSelector';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';

const ConfigurationControls = ({ config }: ConfigureHustlerProps) => {
  const [showTextColor, setShowTextColor] = useState(false);
  const [showNameControls, setShowNameControls] = useState(false);

  useEffect(() => {
    setShowTextColor(config.renderName == true);
    setShowNameControls(config.zoomWindow == ZOOM_WINDOWS[0]);
  }, [config]);

  console.log({ config });

  return (
    <>
      <Stack spacing={4}>
        {/* Title controls only make sense when zoomed out fully */}
        {showNameControls && <NameControls config={config} />}

        {showTextColor && (
          <PanelColorSelector
            title="Text Color"
            colors={DEFAULT_TEXT_COLORS}
            value={config.textColor}
            changeCallback={color => {
              HustlerInitConfig({ ...config, textColor: color });
            }}
          />
        )}

        <PanelColorSelector
          title="Background"
          colors={DEFAULT_BG_COLORS}
          value={config.bgColor}
          changeCallback={color => {
            HustlerInitConfig({ ...config, bgColor: color });
          }}
        />

        <PanelColorSelector
          title="Skin Tone"
          colors={SKIN_TONE_COLORS}
          value={SKIN_TONE_COLORS[config.body]}
          changeCallback={color => {
            HustlerInitConfig({
              ...config,
              body: SKIN_TONE_COLORS.findIndex(el => el == color),
            });
          }}
        />

        <SexSelector config={config} />
        <HairSelector config={config} />
      </Stack>
    </>
  );
};

export default ConfigurationControls;
