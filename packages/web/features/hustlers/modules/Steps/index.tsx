import { HustlerCustomization } from 'src/HustlerConfig';
import useHustler from 'features/hustlers/hooks/useHustler';
import Initiate from 'features/hustlers/modules/Initiate';
// import Customize from 'features/hustlers/modules/Customize';
import Approve from 'features/hustlers/modules/Approve';
import Finalize from 'features/hustlers/modules/Finalize';
import Stepper from 'features/hustlers/components/Stepper';
import { HustlerContainer } from './styles';

export type StepsProps = {
  hustlerConfig: HustlerCustomization;
  id?: string | string[] | undefined;
};

const Steps = ({ hustlerConfig }: StepsProps) => {
  console.log(hustlerConfig);
  const hustler = useHustler();

  const stepToRender = () => {
    switch (hustler.currentStep) {
      case 1:
        return <Approve hustlerConfig={hustlerConfig} />;
      case 2:
        return <Finalize hustlerConfig={hustlerConfig} />;
      default:
        return <Initiate hustlerConfig={hustlerConfig} />;
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
