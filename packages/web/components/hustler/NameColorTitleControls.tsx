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
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input {...field} id="name" placeholder="name" maxLength={NAME_MAX_LENGTH} />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name="bgColor">
        {({ field, form }: FieldProps) => (
          <FormControl isInvalid={!!form.errors.bgColor && !!form.touched.bgColor}>
            <FormLabel htmlFor="background">Background Color</FormLabel>
            <Input {...field} id="bgColor" placeholder="bgColor" />
            <FormErrorMessage>{form.errors.bgColor}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name="textColor">
        {({ field, form }: FieldProps) => (
          <FormControl isInvalid={!!form.errors.textColor && !!form.touched.textColor}>
            <FormLabel htmlFor="color">Text Color</FormLabel>
            <Input {...field} id="textColor" placeholder="textColor" />
            <FormErrorMessage>{form.errors.textColor}</FormErrorMessage>
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