import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import MerkleClaim from 'features/airdrops/modules/MerkleClaim';

const ChineseNewYear = () => (
  <AppWindow requiresWalletConnection>
    <Head title="Chinese New Year" />
    <MerkleClaim />
  </AppWindow>
);

export default ChineseNewYear;
