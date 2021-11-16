import {
  Button,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react';

import { useReactiveVar } from '@apollo/client';
import { Formik, Form, Field  } from 'formik';
import ColorPicker from 'components/ColorPicker';
import { useRouter } from 'next/router';
import {
  HustlerInitConfig,
  randomizeHustlerAttributes,
  HustlerCustomization,
  DEFAULT_BG_COLORS,
  DEFAULT_TEXT_COLORS,
} from 'src/HustlerInitiation';
import HairSelector from './HairSelector';
import NameControls from './NameControls';
import SexSelector from './SexSelector';
import SkinToneSelector from './SkinToneSelector';

const ConfigurationControls = () => {
  const router = useRouter();

  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  return (
    <Formik
      initialValues={{ ...hustlerConfig }}
      onSubmit={async (values: HustlerCustomization, actions) => {
        router.replace('/hustlers/initiate');
      }}
    >
      {props => (
        <Form>
          <Stack spacing={4}>
            <NameControls formikChangeHandler={props.handleChange} />

            <HStack>
              <Field name="bgColor">
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={!!form.errors.bgColor && !!form.touched.bgColor}>
                    <FormLabel htmlFor="background">Background Color</FormLabel>
                    <ColorPicker
                      colors={DEFAULT_BG_COLORS}
                      selectedColor={hustlerConfig.bgColor}
                      changeCallback={value =>
                        HustlerInitConfig({ ...hustlerConfig, bgColor: value })
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
                    <ColorPicker
                      colors={DEFAULT_TEXT_COLORS}
                      selectedColor={hustlerConfig.textColor}
                      changeCallback={value =>
                        HustlerInitConfig({ ...hustlerConfig, textColor: value })
                      }
                    />
                    <FormErrorMessage>{form.errors.textColor}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </HStack>

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
