import { useEffect, useState } from 'react';
import { Stack } from '@chakra-ui/react';
import {
  HustlerInitConfig,
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

const ConfigurationControls = ({ config, makeVarConfig }: ConfigureHustlerProps) => {
  const [showTextColor, setShowTextColor] = useState(false);
  const [showNameControls, setShowNameControls] = useState(false);

  useEffect(() => {
    setShowTextColor(config.renderName === true);
    setShowNameControls(config.zoomWindow === ZOOM_WINDOWS[0]);
  }, [config]);

  return (
    <div>
      <Stack spacing={4}>
        {/* Title controls only make sense when zoomed out fully */}
        {showNameControls && <NameControls config={config} makeVarConfig={makeVarConfig} />}
        {showTextColor && (
          <PanelColorSelector
            title="Text Color"
            colors={DEFAULT_TEXT_COLORS}
            value={config.textColor}
            changeCallback={color => {
              makeVarConfig
                ? makeVarConfig({ ...config, textColor: color })
                : HustlerInitConfig({ ...config, textColor: color });
            }}
          />
        )}
        <PanelColorSelector
          title="Background"
          colors={DEFAULT_BG_COLORS}
          value={config.bgColor}
          changeCallback={color => {
            makeVarConfig
              ? makeVarConfig({ ...config, bgColor: color })
              : HustlerInitConfig({ ...config, bgColor: color });
          }}
        />
        <PanelColorSelector
          title="Skin Tone"
          colors={SKIN_TONE_COLORS}
          value={SKIN_TONE_COLORS[config.body]}
          dopeId={config.dopeId}
          changeCallback={color => {
            makeVarConfig
              ? makeVarConfig({ ...config, body: SKIN_TONE_COLORS.findIndex(el => el == color) })
              : HustlerInitConfig({
                  ...config,
                  body: SKIN_TONE_COLORS.findIndex(el => el == color),
                });
          }}
        />
        <SexSelector config={config} makeVarConfig={makeVarConfig} />
        <HairSelector config={config} makeVarConfig={makeVarConfig} />
      </Stack>
    </div>
  );
};

export default ConfigurationControls;
