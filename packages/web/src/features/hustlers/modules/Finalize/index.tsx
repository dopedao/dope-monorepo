import { useEffect } from 'react';
import Head from 'components/Head';
import { useRouter } from 'next/router';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';

const Finalize = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/hustlers/mint-success');
  }, [router]);

  return (
    <>
      <Head title="Bridging Hustler to Optimism" />
      <StackedResponsiveContainer></StackedResponsiveContainer>
    </>
  );
};

export default Finalize;
