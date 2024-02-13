import useHustler from 'features/hustlers/hooks/useHustler';
import useDispatchHustler from 'features/hustlers/hooks/useDispatchHustler';
import ChevronRight from 'ui/svg/ChevronRight';
import { StepContainer, Item, Button } from './styles';

const STEPS = [
  {
    step: 0,
    title: 'Customize',
  },
  {
    step: 1,
    title: 'Mint',
  },
  {
    step: 2,
    title: 'Party',
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
      default:
        break;
    }
  };

  return (
    <StepContainer>
      {STEPS.map(({ step, title }, i) => (
        <>
          <Item key={`item-${step.toString}`}>
            <Button
              type="button"
              onClick={() => goToStep(step)}
              isActive={hustler.currentStep === step}
              disabled={handleDisable(step)}
            >
              {title}
            </Button>
          </Item>
          {step < 2 && <ChevronRight key={`chevron-${step.toString}`} />}
        </>
      ))}
    </StepContainer>
  );
};

export default Stepper;
