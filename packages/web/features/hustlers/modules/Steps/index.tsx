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
  const hustler = useHustler();

  const stepToRender = () => {
    switch (hustler.currentStep) {
      case 0:
        return <Initiate hustlerConfig={hustlerConfig} />;
      case 1:
        return <Approve />;
      case 2:
        return <Finalize />;
      default:
        return <Initiate hustlerConfig={hustlerConfig} />;
    }
  };

  return (
    <>
      <Stepper />
      <HustlerContainer bgColor={hustlerConfig.bgColor}>{stepToRender()}</HustlerContainer>
    </>
  );
};

export default Steps;
