import { useEffect } from 'react';
import { StepsProps } from 'features/hustlers/modules/Steps';
import Head from 'components/Head';
import router from 'next/router';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';

const Finalize = ({ hustlerConfig }: StepsProps) => {
  useEffect(() => {
    router.replace('/hustlers/mint-success');
  }, []);

  return <>
    <Head title="Bridging Hustler to Optimism" />
    <StackedResponsiveContainer>
    </StackedResponsiveContainer>
  </>;
};

export default Finalize;
