import { StepsProps } from 'features/hustlers/modules/Steps';
import Head from 'components/Head';
import HustlerPanel from 'components/hustler/HustlerPanel';
import InitiationInfo from 'components/hustler/InitiationInfo';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import InitiationFooterDopeContent from 'components/hustler/InitiationFooterDopeContent';

const Begin = ({ hustlerConfig, setHustlerConfig }: StepsProps) => (
  <>
    <Head title="Initiate Your Hustler" />
    <StackedResponsiveContainer>
      <InitiationInfo />
      <HustlerPanel
        hustlerConfig={hustlerConfig}
        footer={
          <InitiationFooterDopeContent
            hustlerConfig={hustlerConfig}
            setHustlerConfig={setHustlerConfig}
          />
        }
      />
    </StackedResponsiveContainer>
  </>
);

export default Begin;
