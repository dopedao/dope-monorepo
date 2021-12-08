import { useMemo } from 'react';
import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client';
import { getRandomHustler, HustlerCustomization } from 'src/HustlerConfig';
import ConfigureHustler from 'features/hustlers/components/ConfigureHustler';
import useHustler from 'features/hustlers/hooks/useHustler';
import useDispatchHustler from 'features/hustlers/hooks/useDispatchHustler';
import Begin from 'features/hustlers/modules/Begin';
import Approve from 'features/hustlers/modules/Approve';
import Finalize from 'features/hustlers/modules/Finalize';
import Stepper from 'features/hustlers/components/Stepper';
import { HustlerContainer } from './styles';

export type StepsProps = {
  hustlerConfig: HustlerCustomization;
  makeVarConfig?: ReactiveVar<HustlerCustomization>;
  id?: string | string[] | undefined;
};

const Steps = () => {
  const hustler = useHustler();
  const dispatch = useDispatchHustler();
  const makeVarConfig = useMemo(() => makeVar(getRandomHustler({})), []);
  const hustlerConfig = useReactiveVar(makeVarConfig);

  const goBackToInitialStep = () => {
    dispatch({ type: 'GO_TO_APPROVE_STEP' });
  };

  const stepToRender = () => {
    switch (hustler.currentStep) {
      case 1:
        return <Approve hustlerConfig={hustlerConfig} makeVarConfig={makeVarConfig} />;
      case 1.5:
        return (
          <ConfigureHustler
            config={hustlerConfig}
            makeVarConfig={makeVarConfig}
            goBackToInitialStep={goBackToInitialStep}
          />
        );
      case 2:
        return <Finalize />;
      default:
        return <Begin hustlerConfig={hustlerConfig} makeVarConfig={makeVarConfig} />;
    }
  };

  return (
    <>
      <Stepper />
      <HustlerContainer>{stepToRender()}</HustlerContainer>
    </>
  );
};

export default Steps;
