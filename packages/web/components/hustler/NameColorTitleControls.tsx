import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Switch,
  Stack
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import PanelBody from '../PanelBody';
import PanelContainer from '../PanelContainer';
import PanelTitleBar from '../PanelTitleBar';

const NAME_MAX_LENGTH = 9;
const FIELD_SPACING = '16px';

const NameColorTitleControls = () => {

  function validateName(value: string) {
    let error;
    if (!value) {
      error = 'Name is required';
    } else if (value.length > NAME_MAX_LENGTH) {
      error = 'Name too long';
    }
    return error;
  }

  return (
    <PanelContainer>
    <PanelTitleBar>Display</PanelTitleBar>
    <PanelBody><Stack spacing={ FIELD_SPACING }>
      <Field name="name" validate={validateName}>
        {({ field, form }: FieldProps) => (
          <FormControl mb={2} isInvalid={!!form.errors.name && !!form.touched.name}>
            <FormLabel htmlFor="name">First name</FormLabel>
            <Input {...field} id="name" placeholder="name" maxLength={NAME_MAX_LENGTH} />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name="background">
        {({ field, form }: FieldProps) => (
          <FormControl isInvalid={!!form.errors.background && !!form.touched.background}>
            <FormLabel htmlFor="background">Background Color</FormLabel>
            <Input {...field} id="background" placeholder="background" />
            <FormErrorMessage>{form.errors.background}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name="color">
        {({ field, form }: FieldProps) => (
          <FormControl isInvalid={!!form.errors.color && !!form.touched.color}>
            <FormLabel htmlFor="color">Text Color</FormLabel>
            <Input {...field} id="color" placeholder="color" />
            <FormErrorMessage>{form.errors.color}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name="renderTitle">
        {({ field }: FieldProps) => (
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="render-title" mb="0">
              Render title?
            </FormLabel>
            <Switch {...field} id="render-title" />
          </FormControl>
        )}
      </Field>
      <Field name="renderName">
        {({ field }: FieldProps) => (
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="render-name" mb="0">
              Render name?
            </FormLabel>
            <Switch {...field} id="render-name" />
          </FormControl>
        )}
      </Field>
    </Stack></PanelBody>
  </PanelContainer>
  );
}

export default NameColorTitleControls;