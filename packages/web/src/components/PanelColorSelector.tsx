import { css } from '@emotion/react';
import { useRadioGroup } from '@chakra-ui/radio';
import PanelColorChipRadio from 'components/PanelColorChipRadio';
import { Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--text-00);
  text-align: center;
  margin-bottom: 16px;
`;

interface ColorSelectorProps {
  changeCallback?(value: string): void;
  colors: string[];
  title: string;
  value?: string;
  dopeId?: string;
}

const PanelColorSelector = ({
  changeCallback,
  colors,
  title,
  value,
  dopeId,
}: ColorSelectorProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: title.replace(' ', '-'),
    defaultValue: '0',
    onChange: value => changeCallback?.(value),
    value: value,
  });
  const group = getRootProps();

  return (
    <Box>
      <Header>
        <h4>{title}</h4>
      </Header>
      <Box
        borderBottom="1px solid #EFEFEF"
        paddingBottom="16px"
        css={css`
          display: flex;
          gap: 16px;
        `}
        {...group}
      >
        {colors
          .filter(color => {
            if (dopeId && Number(dopeId) < 500) {
              return color;
            }
            return color !== '#77F8F8';
          })
          .map((color, index) => (
            <PanelColorChipRadio
              {...getRadioProps({ value: color })}
              value={color}
              key={color}
              color={color}
            />
          ))}
      </Box>
    </Box>
  );
};

export default PanelColorSelector;
