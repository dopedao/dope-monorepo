import DopeWarsExeNav from 'components/DopeWarsExeNav';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import MarketList from 'features/swap-meet/modules/MarketList';

const SwapMeet = () => (
  <AppWindow padBody={false} scrollable={false} height="90vh" navbar={<DopeWarsExeNav />}>
    <Head title="SWAP MEET" />
    <MarketList />
  </AppWindow>
);

export default SwapMeet;
