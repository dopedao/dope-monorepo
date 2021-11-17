import { HustlerCustomization } from 'src/HustlerConfig';
import useHustler from 'features/hustlers/hooks/useHustler';
import Customize from 'features/hustlers/modules/Customize';
import Approve from 'features/hustlers/modules/Approve';
import Finalize from 'features/hustlers/modules/Finalize';
import Stepper from 'features/hustlers/components/Stepper';
import { HustlerContainer } from './styles';

export type StepsProps = {
  hustlerConfig: HustlerCustomization;
  id?: string | string[] | undefined;
};

const Steps = ({ hustlerConfig, id }: StepsProps) => {
  const hustler = useHustler();

  const stepToRender = () => {
    switch (hustler.currentStep) {
      case 0:
        return <Customize hustlerConfig={hustlerConfig} id={id} />;
      case 1:
        return <Approve />;
      case 2:
        return <Finalize />;
      default:
        return <Customize hustlerConfig={hustlerConfig} id={id} />;
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
