import { Button, HStack, Stack } from '@chakra-ui/react';
import { useMemo, useCallback } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { Formik, Form } from 'formik';
import { Hustler, Hustler__factory } from '@dopewars/contracts';
import { HustlerInitConfig, randomizeHustlerAttributes } from 'src/HustlerInitiation';
import { NETWORK } from 'src/constants';
import HairSelector from './HairSelector';
import NameColorTitleControls from './NameColorTitleControls';
import SexSelector from './SexSelector';
import SkinToneSelector from './SkinToneSelector';

interface Values {
  name: string;
  color: string;
  background: string;
  renderTitle: boolean;
  renderName: boolean;
}

const ConfigurationControls = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);
  const { chainId, library, account } = useWeb3React();

  const hustlers = useMemo(
    () =>
      chainId
        ? Hustler__factory.connect(
            NETWORK[chainId as 1 | 4].contracts.hustlers,
            library.getSigner(),
          )
        : null,
    [chainId, library],
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
