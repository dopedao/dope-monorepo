import { Box } from '@chakra-ui/react';
import { StepsProps } from 'features/hustlers/modules/Steps';
import Head from 'components/Head';
import HustlerPanel from 'features/hustlers/components/HustlerPanel';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import ApprovePanelOwnedDope from 'features/hustlers/components/ApprovePanelOwnedDope';

import useHustler from 'features/hustlers/hooks/useHustler';

const Approve = ({ hustlerConfig, setHustlerConfig }: StepsProps) => {
  const hustler = useHustler();

  return (
    <>
      <Head title="Approve spend" />
      <StackedResponsiveContainer>
        <Box flex="2 !important">
          <HustlerPanel hustlerConfig={hustlerConfig} />
        </Box>
        <ApprovePanelOwnedDope hustlerConfig={hustlerConfig} setHustlerConfig={setHustlerConfig} />
      </StackedResponsiveContainer>
    </>
  );
};

export default Approve;
