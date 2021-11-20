import { HustlerInitConfig, DEFAULT_BG_COLORS, DEFAULT_TEXT_COLORS } from 'src/HustlerConfig';
import { useDebounce } from 'usehooks-ts';
import { useReactiveVar } from '@apollo/client';
import { useState, useEffect } from 'react';
import {
  Box,
  Input,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Switch,
  Stack,
} from '@chakra-ui/react';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';

const NAME_MAX_LENGTH = 20;
const FIELD_SPACING = '16px';

const NameControls = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  const validateName = (value: string) => {
    let error;
    if (!value) {
      error = 'Name is required';
    } else if (value.length > NAME_MAX_LENGTH) {
      error = 'Name too long';
    }
    return error;
  };

  const [hustlerName, setHustlerName] = useState(hustlerConfig.name ?? '');
  const [nameFieldDirty, setNameFieldDirty] = useState(false);
  const debouncedHustlerName = useDebounce<string>(hustlerName, 250);

  useEffect(() => {
    // Set from typing
    if (nameFieldDirty && hustlerConfig.name !== debouncedHustlerName) {
      HustlerInitConfig({ ...hustlerConfig, name: debouncedHustlerName });
      setNameFieldDirty(false);
    // Set from randomize or external change
    } else if (!nameFieldDirty && hustlerConfig.name !== debouncedHustlerName) {
      setHustlerName(hustlerConfig.name ?? '');
    }
  }, [debouncedHustlerName, hustlerConfig, nameFieldDirty]);

  return (
    <PanelContainer>
      <PanelTitleBar>Display</PanelTitleBar>
      <PanelBody>
        <Stack spacing={FIELD_SPACING}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <HStack>
            <FormControl mb={2}>
              <Input
                id="name"
                placeholder="name"
                maxLength={NAME_MAX_LENGTH}
                value={hustlerName}
                onChange={e => {
                  setNameFieldDirty(true);
                  setHustlerName(e.currentTarget.value)
                }}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" verticalAlign="center">
              <Switch
                id="render-name"
                checked={hustlerConfig.renderName}
                onChange={e => {
                  HustlerInitConfig({ ...hustlerConfig, renderName: e.target.checked });
                }}
              />
              <FormLabel htmlFor="render-name" ml="2" mt="1">
                Visible
              </FormLabel>
            </FormControl>
          </HStack>
        </Stack>
      </PanelBody>
    </PanelContainer>
  );
};

export default NameControls;
