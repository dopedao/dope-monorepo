import { css } from '@emotion/react';
import { useRadioGroup } from '@chakra-ui/radio';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import PanelColorChipRadio from 'components/PanelColorChipRadio';

interface ColorSelectorProps {
  changeCallback?(value: string): void;
  colors: string[];
  title: string;
  value?: string;
}

const PanelColorSelector = ({ changeCallback, colors, title, value }: ColorSelectorProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: title.replace(' ', '-'),
    defaultValue: 0,
    onChange: value => changeCallback && changeCallback(value),
    value: value,
  });
  const group = getRootProps();

  return (
    <PanelContainer>
      <PanelTitleBar>{title}</PanelTitleBar>
      <PanelBody
        css={css`
          display: flex;
          gap: 16px;
        `}
        {...group}
      >
        {colors.map((color, index) => {
          return (
            <PanelColorChipRadio
              {...getRadioProps({ value: color })}
              value={color}
              key={index}
              color={color}
            />
          );
        })}
      </PanelBody>
    </PanelContainer>
  );
};

export default PanelColorSelector;
