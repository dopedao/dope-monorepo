import { Button, HStack, Stack } from '@chakra-ui/react';
import { useReactiveVar } from '@apollo/client';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import {
  HustlerInitConfig,
  randomizeHustlerAttributes,
  HustlerCustomization,
  DEFAULT_BG_COLORS,
  DEFAULT_TEXT_COLORS,
  SKIN_TONE_COLORS,
} from 'src/HustlerConfig';
import { useEffect, useState } from 'react';
import HairSelector from './HairSelector';
import NameControls from './NameControls';
import SexSelector from './SexSelector';
// import SkinToneSelector from './SkinToneSelector';
import PanelColorSelector from 'components/PanelColorSelector';

const ConfigurationControls = () => {
  const router = useRouter();
  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  const [showTextColor, setShowTextColor] = useState(false);

  useEffect(() => {
    setShowTextColor(hustlerConfig.renderName == true || hustlerConfig.renderTitle == true);
    console.log(hustlerConfig.renderName == true || hustlerConfig.renderTitle == true);
  }, [hustlerConfig]);

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

            <PanelColorSelector
              title="Background"
              colors={DEFAULT_BG_COLORS}
              value={hustlerConfig.bgColor}
              changeCallback={color => {
                HustlerInitConfig({ ...hustlerConfig, bgColor: color });
              }}
            />

            {showTextColor && (
              <PanelColorSelector
                title="Text Color"
                colors={DEFAULT_TEXT_COLORS}
                value={hustlerConfig.textColor}
                changeCallback={color => {
                  HustlerInitConfig({ ...hustlerConfig, textColor: color });
                }}
              />
            )}

            <PanelColorSelector
              title="Skin Tone"
              colors={SKIN_TONE_COLORS}
              value={SKIN_TONE_COLORS[hustlerConfig.body]}
              changeCallback={color => {
                HustlerInitConfig({
                  ...hustlerConfig,
                  body: SKIN_TONE_COLORS.findIndex(el => el == color),
                });
              }}
            />

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
