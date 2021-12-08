import Steps from 'features/hustlers/modules/Steps';
import HustlerProvider from 'features/hustlers/HustlerProvider';
import AppWindow from 'components/AppWindow';

const InitiatePage = () => (
  <AppWindow
    requiresWalletConnection={true}
    scrollable={true}
    title="Initiate Your Hustler"
    padBody={false}
  >
    <HustlerProvider>
      <Steps />
    </HustlerProvider>
  </AppWindow>
);

export default InitiatePage;
