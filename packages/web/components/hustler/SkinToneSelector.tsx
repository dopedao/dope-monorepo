import { css } from '@emotion/react';
import { HustlerInitConfig } from '../../src/HustlerInitiation';
import { useRadioGroup } from '@chakra-ui/radio';
import { useReactiveVar } from '@apollo/client';
import PanelBody from '../PanelBody';
import PanelContainer from '../PanelContainer';
import PanelTitleBar from '../PanelTitleBar';
import SkinToneRadio from './SkinToneRadio';

// From lightest to darkest
const SKIN_TONE_COLORS = [
  '#FFD99C',
  '#E6A46E',
  '#CC8850',
  '#AE6C37',
  '#983B0F',
  // Alien for OGs only
  '#77F8F8'
];

const SkinToneSelector = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "skintone",
    defaultValue: 0,
    onChange: (value) => HustlerInitConfig({ ...hustlerConfig, body: parseInt(value) }),
    value: hustlerConfig.body,
  })
  const group = getRootProps();

  return (
    <PanelContainer>
      <PanelTitleBar>Skin Tone</PanelTitleBar>
      <PanelBody css={css`display:flex;gap:16px;`} {...group}>
        { SKIN_TONE_COLORS.map((color, index) => {
          return <SkinToneRadio 
            {...getRadioProps({ value: index })}
            value={index}
            key={index} 
            color={color} 
          />
        })}
      </PanelBody>
    </PanelContainer>
  );
}

export default SkinToneSelector;
