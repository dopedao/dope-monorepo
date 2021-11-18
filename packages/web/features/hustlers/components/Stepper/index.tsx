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

  const handleDisable = (step: number) => {
    switch (step) {
      case 0:
        if (hustler.isCustomizeDone) {
          return false;
        }
      case 1:
        if (hustler.isCustomizeDone) {
          return false;
        }
      case 2:
        if (hustler.isCustomizeDone && hustler.isApprovalDone) {
          return false;
        }
      case 3:
        if (hustler.isCustomizeDone && hustler.isApprovalDone) {
          return false;
        }
      default:
        return true;
    }
  };

  const goToStep = (step: number) => {
    switch (step) {
      case 0:
        if (hustler.isCustomizeDone) {
          return dispatchHustler({ type: 'GO_TO_CUSTOMIZE_STEP' });
        }
      case 1:
        if (hustler.isCustomizeDone) {
          return dispatchHustler({ type: 'GO_TO_APPROVE_STEP' });
        }
      case 2:
        if (hustler.isCustomizeDone && hustler.isApprovalDone) {
          return dispatchHustler({ type: 'GO_TO_APPROVE_STEP' });
        }
      case 3:
        if (hustler.isCustomizeDone && hustler.isApprovalDone) {
          return dispatchHustler({ type: 'GO_TO_APPROVE_STEP' });
        }
      default:
        break;
    }
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
              disabled={handleDisable(step)}
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
