import { BigNumber, constants } from 'ethers';
import { Hustler, Hustler__factory } from '@dopewars/contracts';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Switch,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { useEffect, useMemo, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

import { NETWORK } from '../../src/constants';

interface Values {
  name: string;
  color: string;
  background: string;
  renderTitle: boolean;
  renderName: boolean;
}

const ConfigurationControls = () => {
  const { chainId, library, account } = useWeb3React();

  function validateName(value: string) {
    let error;
    if (!value) {
      error = 'Name is required';
    } else if (value.length > 9) {
      error = 'Name too long';
    }
    return error;
  }

  const hustlers = useMemo(
    () =>
      chainId
        ? Hustler__factory.connect(
            NETWORK[chainId as 1 | 4].contracts.hustlers,
            library.getSigner(),
          )
        : null,
    [chainId],
  );

  const onSubmit = useCallback(
    async (values: Values) => {
      if (!hustlers) return;
      hustlers.setMetadata(
        0,
        values.name,
        values.color,
        values.background,
        '0x00000000',
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        '',
      );
    },
    [hustlers],
  );

  return (
    <Formik
      initialValues={{
        name: '',
        background: '0x5881d4ff',
        color: '0x00000000',
        renderTitle: false,
        renderName: false,
      }}
      onSubmit={async (values: Values, actions) => {
        await onSubmit(values);
      }}
    >
      {props => (
        <Form>
          <Field name="name" validate={validateName}>
            {({ field, form }: FieldProps) => (
              <FormControl isInvalid={!!form.errors.name && !!form.touched.name}>
                <FormLabel htmlFor="name">First name</FormLabel>
                <Input {...field} id="name" placeholder="name" />
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
          <Button mt={4} isLoading={props.isSubmitting} type="submit">
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ConfigurationControls;
