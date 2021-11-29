import { useReactiveVar } from '@apollo/client';
import { HustlerInitConfig } from 'src/HustlerConfig';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import ConfigureHustler from 'features/hustlers/components/ConfigureHustler';

const TITLE = 'Hustler Configuration';

const Configure = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  return (
    <AppWindow requiresWalletConnection={true} padBody={false} title={TITLE}>
      <Head title={TITLE} />
      <ConfigureHustler config={hustlerConfig} />
    </AppWindow>
  );
};

export default Configure;
