import { Dispatch, useState, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ZOOM_WINDOWS, getRandomHustler, HustlerCustomization } from 'utils/HustlerConfig';
import ConfigureHustler from 'features/hustlers/components/ConfigureHustler';
import Approve from 'features/hustlers/modules/Approve';
import Finalize from 'features/hustlers/modules/Finalize';
import useHustler from 'features/hustlers/hooks/useHustler';
import useDispatchHustler from 'features/hustlers/hooks/useDispatchHustler';
import Stepper from 'features/hustlers/components/Stepper';
import HustlerContainer from 'features/hustlers/components/HustlerContainer';
import { Box } from '@chakra-ui/react';

export type StepsProps = {
  hustlerConfig: HustlerCustomization;
  setHustlerConfig: Dispatch<SetStateAction<HustlerCustomization>>;
  id?: string | string[] | undefined;
};

const Steps = () => {
  const router = useRouter();
  const hustler = useHustler();
  const dispatch = useDispatchHustler();
  const [hustlerConfig, setHustlerConfig] = useState(
    getRandomHustler({
      dopeId: String(router.query.id),
      zoomWindow: ZOOM_WINDOWS[2],
      showVehicle: true,
    }),
  );

  const handleFinishConfiguration = () => {
    dispatch({ type: 'GO_TO_APPROVE_STEP' });
  };

  const stepToRender = () => {
    switch (hustler.currentStep) {
      case 1:
        return <Approve hustlerConfig={hustlerConfig} setHustlerConfig={setHustlerConfig} />;
      case 2:
        return <Finalize />;
      default:
        return (
          <ConfigureHustler
            config={hustlerConfig}
            setHustlerConfig={setHustlerConfig}
            handleFinishConfiguration={handleFinishConfiguration}
          />
        );
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <Stepper />
      <HustlerContainer bgColor="transparent">{stepToRender()}</HustlerContainer>
    </Box>
  );
};

export default Steps;
