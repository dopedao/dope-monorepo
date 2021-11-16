import { Button, HStack, Stack } from '@chakra-ui/react';
import { useMemo, useCallback } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  return (
    <Formik
      initialValues={ {...hustlerConfig} }
      onSubmit={async (values: HustlerCustomization, actions) => {
        router.replace('/hustlers/initiate');
      }}
    >
      {props => (
        <Form>
          <Stack spacing={4}>
            <NameColorTitleControls formikChangeHandler={props.handleChange} />
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
