import { HustlerInitConfig, DEFAULT_BG_COLORS, DEFAULT_TEXT_COLORS } from 'src/HustlerConfig';
import { useReactiveVar } from '@apollo/client';
import {
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

const NAME_MAX_LENGTH = 9;
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

  return (
    <PanelContainer>
      <PanelTitleBar>Display</PanelTitleBar>
      <PanelBody>
        <Stack spacing={FIELD_SPACING}>
          <FormControl mb={2}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              placeholder="name"
              maxLength={NAME_MAX_LENGTH}
              value={hustlerConfig.name}
              onChange={e => {
                HustlerInitConfig({ ...hustlerConfig, name: e.currentTarget.value });
              }}
            />
          </FormControl>
          <HStack>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="render-title" mb="0">
                Show Title?
              </FormLabel>
              <Switch
                id="render-title"
                checked={hustlerConfig.renderTitle}
                onChange={e => {
                  HustlerInitConfig({ ...hustlerConfig, renderTitle: e.target.checked });
                }}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="render-name" mb="0">
                Show Name?
              </FormLabel>
              <Switch
                id="render-name"
                checked={hustlerConfig.renderName}
                onChange={e => {
                  HustlerInitConfig({ ...hustlerConfig, renderName: e.target.checked });
                }}
              />
            </FormControl>
          </HStack>
        </Stack>
      </PanelBody>
    </PanelContainer>
  );
};

export default NameControls;
