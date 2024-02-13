import { useState } from 'react';
import { css } from '@emotion/react';
import { getRandomHustler } from 'utils/HustlerConfig';
import { useRadioGroup } from '@chakra-ui/radio';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import PanelColorChipRadio from 'components/PanelColorChipRadio';

// From lightest to darkest
const SKIN_TONE_COLORS = [
  '#FFD99C',
  '#E6A46E',
  '#CC8850',
  '#AE6C37',
  '#983B0F',
  // Alien for OGs only
  '#77F8F8',
];

const SkinToneSelector = () => {
  const [hustlerConfig, setHustlerConfig] = useState(getRandomHustler({}));

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'skintone',
    defaultValue: '0',
    onChange: value => setHustlerConfig({ ...hustlerConfig, body: parseInt(value) }),
    value: hustlerConfig.body.toString(),
  });
  const group = getRootProps();

  return (
    <PanelContainer>
      <PanelTitleBar>Skin Tone</PanelTitleBar>
      <PanelBody
        css={css`
          display: flex;
          gap: 16px;
        `}
        {...group}
      >
        {SKIN_TONE_COLORS.map((color, index) => {
          return (
            <PanelColorChipRadio
              {...getRadioProps({ value: index })}
              value={index.toString()}
              key={index.toString()}
              color={color}
            />
          );
        })}
      </PanelBody>
    </PanelContainer>
  );
};

export default SkinToneSelector;
