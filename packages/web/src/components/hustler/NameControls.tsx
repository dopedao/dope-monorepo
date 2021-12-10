import { useDebounce } from 'usehooks-ts';
import { useState, useEffect } from 'react';
import { Input, HStack, FormControl, FormLabel, Switch, Stack } from '@chakra-ui/react';
import { FormErrorMessage } from '@chakra-ui/form-control';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';

const NAME_MAX_LENGTH = 20;
const FIELD_SPACING = '16px';

const NameControls = ({ config, makeVarConfig }: ConfigureHustlerProps) => {
  const [errorName, setErrorName] = useState<string | undefined>(undefined);
  const [hustlerName, setHustlerName] = useState(config.name ?? '');
  const [nameFieldDirty, setNameFieldDirty] = useState(false);
  const debouncedHustlerName = useDebounce<string>(hustlerName, 250);

  const validateName = (value: string) => {
    if (!value) {
      setErrorName('Name is required');
    } else if (value.length > NAME_MAX_LENGTH) {
      setErrorName('Name too long');
    }
  };

  useEffect(() => {
    // Set from typing
    if (nameFieldDirty && config.name !== debouncedHustlerName) {
      if (makeVarConfig) {
        makeVarConfig({ ...config, name: debouncedHustlerName });
      }
      setNameFieldDirty(false);
      // Set from randomize or external change
    } else if (!nameFieldDirty && config.name !== debouncedHustlerName) {
      setHustlerName(config.name ?? '');
    }
  }, [debouncedHustlerName, config, nameFieldDirty, makeVarConfig]);

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
                  validateName(e.target.value);
                  setHustlerName(e.currentTarget.value);
                }}
              />
              {errorName && <FormErrorMessage>{errorName}</FormErrorMessage>}
            </FormControl>
            <FormControl display="flex" alignItems="center" verticalAlign="center">
              <Switch
                id="render-name"
                isChecked={config.renderName}
                onChange={e => {
                  if (makeVarConfig) makeVarConfig({ ...config, renderName: e.target.checked });
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
