import { StepsProps } from 'features/hustlers/modules/Steps';
import Head from 'components/Head';
import HustlerPanel from 'components/hustler/HustlerPanel';
import InitiationFooter from 'components/hustler/InitiationFooter';
import InitiationInfo from 'components/hustler/InitiationInfo';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';

const Initiate = ({ hustlerConfig }: StepsProps) => (
  <>
    <Head title="Initiate Your Hustler" />
    <StackedResponsiveContainer>
      <InitiationInfo />
      <HustlerPanel hustlerConfig={hustlerConfig} footer={<InitiationFooter />} />
    </StackedResponsiveContainer>
  </>
);

export default Initiate;
