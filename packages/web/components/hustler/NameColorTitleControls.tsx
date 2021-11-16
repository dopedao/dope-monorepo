import { HustlerInitConfig, HustlerCustomization } from '../../src/HustlerInitiation';
import { useReactiveVar } from '@apollo/client';
import { Input, FormControl, FormLabel, FormErrorMessage, Switch, Stack } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import PanelBody from '../PanelBody';
import PanelContainer from '../PanelContainer';
import PanelTitleBar from '../PanelTitleBar';
import ColorPicker from 'components/ColorPicker';

const NAME_MAX_LENGTH = 9;
const FIELD_SPACING = '16px';

const NameColorTitleControls = ({
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
                  onChange={
                    (e) => { 
                      formikChangeHandler(e);
                      HustlerInitConfig({ ...hustlerConfig, name: field.value }) }
                  }
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="bgColor">
            {({ field, form }: FieldProps) => (
              <FormControl isInvalid={!!form.errors.bgColor && !!form.touched.bgColor}>
                <FormLabel htmlFor="background">Background Color</FormLabel>
                <Input 
                  {...field} 
                  id="bgColor" 
                  placeholder="bgColor" 
                  onChange={
                    (e) => { 
                      formikChangeHandler(e);
                      HustlerInitConfig({ ...hustlerConfig, bgColor: field.value }) }
                  }
                />
                <FormErrorMessage>{form.errors.bgColor}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="textColor">
            {({ field, form }: FieldProps) => (
              <FormControl isInvalid={!!form.errors.textColor && !!form.touched.textColor}>
                <FormLabel htmlFor="color">Text Color</FormLabel>
                <Input 
                  {...field} 
                  id="textColor" 
                  placeholder="textColor" 
                  onChange={
                    (e) => { 
                      formikChangeHandler(e);
                      HustlerInitConfig({ ...hustlerConfig, textColor: field.value }) }
                  }
                />
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
                <Switch 
                  {...field} 
                  id="render-title"
                  onChange={
                    (e) => { 
                      formikChangeHandler(e);
                      HustlerInitConfig({ ...hustlerConfig, renderTitle: field.value }) }
                  }
                />
              </FormControl>
            )}
          </Field>
          <Field name="renderName">
            {({ field }: FieldProps) => (
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="render-name" mb="0">
                  Render name?
                </FormLabel>
                <Switch 
                  {...field} 
                  id="render-name" 
                  onChange={
                    (e) => { 
                      formikChangeHandler(e);
                      HustlerInitConfig({ ...hustlerConfig, renderName: field.value }) }
                  }
                />
              </FormControl>
            )}
          </Field>
        </Stack>
      </PanelBody>
    </PanelContainer>
  );
};

export default NameColorTitleControls;
