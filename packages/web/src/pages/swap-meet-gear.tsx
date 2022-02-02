import DopeWarsExeNav from 'components/DopeWarsExeNav';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import ComingSoonDialog from 'components/ComingSoonDialog';

const SwapMeet = () => (
  <AppWindow 
    padBody={false} 
    scrollable={false} 
    height="90vh" 
    navbar={<DopeWarsExeNav />}
    title="Swap Meet"
  >
    <Head title="SWAP MEET" />
    <ComingSoonDialog title="We're working on it" icon="construction">
      <p>
        Soon™️ you&apos;ll be able to buy, sell, and trade Gear with your homies and the opps. Right here on the Optimism Network for low gas fees. 
      </p>
    </ComingSoonDialog>
  </AppWindow>
);

export default SwapMeet;
