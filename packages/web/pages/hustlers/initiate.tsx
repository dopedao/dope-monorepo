import { useMemo } from 'react';
import { makeVar, useReactiveVar } from '@apollo/client';
import { getRandomHustler, HustlerInitConfig } from 'src/HustlerConfig';
import Steps from 'features/hustlers/modules/Steps';
import HustlerProvider from 'features/hustlers/HustlerProvider';
import AppWindow from 'components/AppWindow';

const InitiatePage = () => {
  const makeVarConfig = useMemo(() => makeVar(getRandomHustler({})), []);

  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  return (
    <AppWindow
      requiresWalletConnection={true}
      scrollable={true}
      title="Initiate Your Hustler"
      padBody={false}
    >
      <HustlerProvider>
        <Steps hustlerConfig={hustlerConfig} makeVarConfig={makeVarConfig} />
      </HustlerProvider>
    </AppWindow>
  );
};

export default InitiatePage;
