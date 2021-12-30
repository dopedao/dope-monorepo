import { useEffect, useState } from 'react';
import { Stack } from '@chakra-ui/react';
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

const ConfigurationControls = ({ config, setHustlerConfig }: ConfigureHustlerProps) => {
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
    </div>
  );
};

export default ConfigurationControls;
