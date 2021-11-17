import useHustler from 'features/hustlers/hooks/useHustler';
import useDispatchHustler from 'features/hustlers/hooks/useDispatchHustler';
import CarretRight from 'svg/CarretRight';
import { Wrapper, Item, Button } from './styles';

const STEPS = [
  {
    step: 0,
    title: 'Customize',
  },
  {
    step: 1,
    title: 'Approve Spend',
  },
  {
    step: 2,
    title: 'Finalize',
  },
];

const Stepper = () => {
  const hustler = useHustler();
  const dispatchHustler = useDispatchHustler();

  const goToStep = (step: number) => {
    dispatchHustler({
      type: 'GO_TO_STEP',
      currentStep: step,
    });
  };

  return (
    <Wrapper>
      {STEPS.map(({ step, title }, i) => (
        <>
          <Item key={i}>
            <Button
              type="button"
              onClick={() => goToStep(step)}
              isActive={hustler.currentStep === step}
            >
              {title}
            </Button>
          </Item>
          {step < 2 && <CarretRight />}
        </>
      ))}
    </Wrapper>
  );
};

export default Stepper;
