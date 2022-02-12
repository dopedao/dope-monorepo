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
    <Head title="Hustlers" />
    <ComingSoonDialog title="We're working on it" icon="construction">
      <p>
        Soon™️ you&apos;ll be able to add new Hustlers to your Squad. Build the biggest crew and get
        ready for Dope Wars on the blockchain.
      </p>
    </ComingSoonDialog>
  </AppWindow>
);

export default SwapMeet;
