import Steps from 'features/hustlers/modules/Steps';
import HustlerProvider from 'features/hustlers/HustlerProvider';
import AppWindowEthereum from 'components/AppWindowEthereum';

const InitiatePage = () => (
  <AppWindowEthereum
    requiresWalletConnection={true}
    scrollable={true}
    title="Initiate Your Hustler"
    padBody={false}
  >
    <HustlerProvider>
      <Steps />
    </HustlerProvider>
  </AppWindowEthereum>
);

export default InitiatePage;
