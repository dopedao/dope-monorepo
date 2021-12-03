import { useMemo } from 'react';
import { makeVar, useReactiveVar } from '@apollo/client';
import { getRandomHustler } from 'src/HustlerConfig';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import ConfigureHustler from 'features/hustlers/components/ConfigureHustler';

const TITLE = 'Hustler Configuration';

const Configure = () => {
  const makeVarConfig = useMemo(() => makeVar(getRandomHustler({})), []);

  const hustlerConfig = useReactiveVar(makeVarConfig);

  return (
    <AppWindow requiresWalletConnection={true} padBody={false} title={TITLE}>
      <Head title={TITLE} />
      <ConfigureHustler config={hustlerConfig} makeVarConfig={makeVarConfig} />
    </AppWindow>
  );
};

export default Configure;
