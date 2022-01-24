import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import DopeDetails from 'features/dope/modules/DopeDetails';

const DopeWindow = () => (
  <AppWindow requiresWalletConnection navbar={<DopeWarsExeNav />}>
    <Head />
    <DopeDetails />
  </AppWindow>
);

export default DopeWindow;
