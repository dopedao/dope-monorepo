import { Dispatch, useState, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { getRandomHustler, HustlerCustomization } from 'utils/HustlerConfig';
import ConfigureHustler from 'features/hustlers/components/ConfigureHustler';
import useHustler from 'features/hustlers/hooks/useHustler';
import useDispatchHustler from 'features/hustlers/hooks/useDispatchHustler';
import Begin from 'features/hustlers/modules/Begin';
import Approve from 'features/hustlers/modules/Approve';
import Finalize from 'features/hustlers/modules/Finalize';
import Stepper from 'features/hustlers/components/Stepper';
import HustlerContainer from 'components/hustler/HustlerContainer';

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
      dopeId: String(router.query.id) || '1',
    }),
  );

  const goBackToInitialStep = () => {
    dispatch({ type: 'GO_TO_APPROVE_STEP' });
  };

  const stepToRender = () => {
    switch (hustler.currentStep) {
      case 1:
        return <Approve hustlerConfig={hustlerConfig} setHustlerConfig={setHustlerConfig} />;
      case 1.5:
        return (
          <ConfigureHustler
            config={hustlerConfig}
            setHustlerConfig={setHustlerConfig}
            goBackToInitialStep={goBackToInitialStep}
          />
        );
      case 2:
        return <Finalize />;
      default:
        return <Begin hustlerConfig={hustlerConfig} setHustlerConfig={setHustlerConfig} />;
    }
  };

  return (
    <>
      <Stepper />
      <HustlerContainer bgColor="transparent">{stepToRender()}</HustlerContainer>
    </>
  );
};

export default Steps;
