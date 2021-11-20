import { Stack } from '@chakra-ui/react';
import { useReactiveVar } from '@apollo/client';
import {
  HustlerInitConfig,
  DEFAULT_BG_COLORS,
  DEFAULT_TEXT_COLORS,
  SKIN_TONE_COLORS,
  ZOOM_WINDOWS,
} from 'src/HustlerConfig';
import { useEffect, useState } from 'react';
import HairSelector from './HairSelector';
import NameControls from './NameControls';
import SexSelector from './SexSelector';
// import SkinToneSelector from './SkinToneSelector';
import PanelColorSelector from 'components/PanelColorSelector';

const ConfigurationControls = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  const [showTextColor, setShowTextColor] = useState(false);
  const [showNameControls, setShowNameControls] = useState(false);

  useEffect(() => {
    setShowTextColor(hustlerConfig.renderName == true);
    setShowNameControls(hustlerConfig.zoomWindow == ZOOM_WINDOWS[0]);
  }, [hustlerConfig]);

  return (
    <>
      <Stack spacing={4}>
        {/* Title controls only make sense when zoomed out fully */}
        {showNameControls && <NameControls /> }

        {showTextColor && (
          <PanelColorSelector
            title="Text Color"
            colors={DEFAULT_TEXT_COLORS}
            value={hustlerConfig.textColor}
            changeCallback={color => {
              HustlerInitConfig({ ...hustlerConfig, textColor: color });
            }}
          />
        )}

        <PanelColorSelector
          title="Background"
          colors={DEFAULT_BG_COLORS}
          value={hustlerConfig.bgColor}
          changeCallback={color => {
            HustlerInitConfig({ ...hustlerConfig, bgColor: color });
          }}
        />

        <PanelColorSelector
          title="Skin Tone"
          colors={SKIN_TONE_COLORS}
          value={SKIN_TONE_COLORS[hustlerConfig.body]}
          changeCallback={color => {
            HustlerInitConfig({
              ...hustlerConfig,
              body: SKIN_TONE_COLORS.findIndex(el => el == color),
            });
          }}
        />

        <SexSelector />
        <HairSelector />
      </Stack>
    </>
  );
};

export default ConfigurationControls;
