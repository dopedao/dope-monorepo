import { Button, HStack, Stack } from '@chakra-ui/react';
import { useMemo, useCallback } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { Formik, Form } from 'formik';
import {
  HustlerInitConfig,
  randomizeHustlerAttributes,
  HustlerCustomization,
} from 'src/HustlerInitiation';
import { NETWORK } from 'src/constants';
import HairSelector from './HairSelector';
import NameColorTitleControls from './NameColorTitleControls';
import SexSelector from './SexSelector';
import SkinToneSelector from './SkinToneSelector';

const ConfigurationControls = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  return (
    <Formik
      initialValues={ {...hustlerConfig} }
      onSubmit={async (values: HustlerCustomization, actions) => {
        await onSubmit(values);
      }}
    >
      {props => (
        <Form>
          <Stack spacing={4}>
            <NameColorTitleControls />
            <SkinToneSelector />
            <SexSelector />
            <HairSelector />
            <HStack mt={4} justify="end">
              <Button onClick={() => randomizeHustlerAttributes()}>Randomize</Button>
              <Button isLoading={props.isSubmitting} type="submit" variant="primary">
                Finish Configuration
              </Button>
            </HStack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default ConfigurationControls;
