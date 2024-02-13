import { Box } from '@chakra-ui/react';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';
import { css } from '@emotion/react';
import { FormErrorMessage } from '@chakra-ui/form-control';
import { Input, HStack, FormControl, FormLabel, Checkbox, Stack } from '@chakra-ui/react';
import { useDebounce } from 'usehooks-ts';
import { useState, useEffect } from 'react';

const NAME_MAX_LENGTH = 20;
const FIELD_SPACING = '16px';

const NameControls = ({
  config,
  setHustlerConfig,
  enableNameVisible = false,
}: ConfigureHustlerProps & { enableNameVisible?: boolean }) => {
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
      setHustlerConfig({ ...config, name: debouncedHustlerName });
      setNameFieldDirty(false);
      // Set from randomize or external change
    } else if (!nameFieldDirty && config.name !== debouncedHustlerName) {
      setHustlerName(config.name ?? '');
    }
  }, [debouncedHustlerName, config, nameFieldDirty, setHustlerConfig]);

  return (
    <Box>
      <Stack spacing={FIELD_SPACING} borderBottom="1px solid #EFEFEF" paddingBottom="16px">
        <FormLabel htmlFor="name" color="#000" padding="0" fontSize="14px">
          Name
        </FormLabel>
        <HStack
          display="flex"
          alignItems="center"
          css={css`
            margin-top: unset !important;
          `}
        >
          <FormControl width="70%" mr="27px">
            <Input
              id="name"
              placeholder="name"
              maxLength={NAME_MAX_LENGTH}
              value={hustlerName}
              border="2px"
              fontSize="14px"
              paddingX="14px"
              paddingY="10px"
              rounded="unset"
              onChange={e => {
                setNameFieldDirty(true);
                validateName(e.target.value);
                setHustlerName(e.currentTarget.value);
              }}
            />
            {errorName && <FormErrorMessage>{errorName}</FormErrorMessage>}
          </FormControl>
          <FormControl display="flex" alignItems="center" width="30%">
            {enableNameVisible && (
              <>
                <Checkbox
                  id="render-name"
                  isChecked={config.renderName ?? false}
                  onChange={e => setHustlerConfig({ ...config, renderName: e.target.checked })}
                  colorScheme="whiteAlpha"
                  iconColor="black"
                  borderRadius="10px"
                  sx={{
                    borderColor: '#000',
                    '[data-checked][data-hover]': {
                      borderColor: '#000',
                    },
                    '[data-checked]': {
                      borderColor: '#000 !important',
                    },
                  }}
                />
                <FormLabel htmlFor="render-name" ml="2" mt="2" color="#000">
                  Visible
                </FormLabel>
              </>
            )}
          </FormControl>
        </HStack>
      </Stack>
    </Box>
  );
};

export default NameControls;
