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
import { Field, FieldProps } from 'formik';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';

const NAME_MAX_LENGTH = 9;
const FIELD_SPACING = '16px';

const NameControls = ({
  formikChangeHandler,
}: {
  formikChangeHandler: (e: React.ChangeEvent) => void;
}) => {
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
          <Field name="name" validate={validateName}>
            {({ field, form }: FieldProps) => (
              <FormControl mb={2} isInvalid={!!form.errors.name && !!form.touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="name"
                  maxLength={NAME_MAX_LENGTH}
                  onChange={e => {
                    formikChangeHandler(e);
                    HustlerInitConfig({ ...hustlerConfig, name: field.value });
                  }}
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <HStack>
            <Field name="renderTitle">
              {({ field }: FieldProps) => (
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="render-title" mb="0">
                    Show Title?
                  </FormLabel>
                  <Switch
                    {...field}
                    id="render-title"
                    onChange={e => {
                      formikChangeHandler(e);
                      HustlerInitConfig({ ...hustlerConfig, renderTitle: e.target.checked });
                    }}
                  />
                </FormControl>
              )}
            </Field>
            <Field name="renderName">
              {({ field }: FieldProps) => (
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="render-name" mb="0">
                    Show Name?
                  </FormLabel>
                  <Switch
                    {...field}
                    id="render-name"
                    onChange={e => {
                      formikChangeHandler(e);
                      HustlerInitConfig({ ...hustlerConfig, renderName: e.target.checked });
                    }}
                  />
                </FormControl>
              )}
            </Field>
          </HStack>
        </Stack>
      </PanelBody>
    </PanelContainer>
  );
};

export default NameControls;
