import { useReactiveVar } from '@apollo/client';
import { HustlerInitConfig } from 'src/HustlerConfig';
import Steps from 'features/hustlers/modules/Steps';
import HustlerProvider from 'features/hustlers/HustlerProvider';
import AppWindow from 'components/AppWindow';

const InitiatePage = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  return (
    <AppWindow
      requiresWalletConnection={true}
      scrollable={true}
      title="Initiate Your Hustler"
      padBody={false}
    >
      <HustlerProvider>
        <Steps hustlerConfig={hustlerConfig} />
      </HustlerProvider>
    </AppWindow>
  );
};

export default InitiatePage;
