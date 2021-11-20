import { HustlerCustomization } from 'src/HustlerConfig';
import useHustler from 'features/hustlers/hooks/useHustler';
import Begin from 'features/hustlers/modules/Begin';
import Approve from 'features/hustlers/modules/Approve';
import Finalize from 'features/hustlers/modules/Finalize';
import Stepper from 'features/hustlers/components/Stepper';
import { HustlerContainer } from './styles';

export type StepsProps = {
  hustlerConfig: HustlerCustomization;
  id?: string | string[] | undefined;
};

const Steps = ({ hustlerConfig }: StepsProps) => {
  const hustler = useHustler();

  const stepToRender = () => {
    switch (hustler.currentStep) {
      case 1:
        return <Approve hustlerConfig={hustlerConfig} />;
      case 2:
        return <Finalize />;
      default:
        return <Begin hustlerConfig={hustlerConfig} />;
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
