import { Box } from '@chakra-ui/react';
import { StepsProps } from 'features/hustlers/modules/Steps';
import Head from 'components/Head';
import HustlerPanel from 'components/hustler/HustlerPanel';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import ApprovePanelOwnedDope from 'features/hustlers/components/ApprovePanelOwnedDope';
import ApprovePanelQuickBuy from 'features/hustlers/components/ApprovePanelQuickBuy';

import useHustler from 'features/hustlers/hooks/useHustler';

const Approve = ({ hustlerConfig, setHustlerConfig }: StepsProps) => {
  const hustler = useHustler();

  return (
    <>
      <Head title="Approve spend" />
      <StackedResponsiveContainer>
        <Box flex="2 !important">
          <HustlerPanel
            hustlerConfig={hustlerConfig}
          />
        </Box>
        {hustler.isQuickBuy &&
          <ApprovePanelQuickBuy 
            hustlerConfig={hustlerConfig} 
            setHustlerConfig={setHustlerConfig} 
          />
        }
        {!hustler.isQuickBuy &&
          <ApprovePanelOwnedDope 
            hustlerConfig={hustlerConfig} 
            setHustlerConfig={setHustlerConfig} 
          />
        }
      </StackedResponsiveContainer>
    </>
  );
};

export default Approve;
