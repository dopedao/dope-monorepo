import AppWindowOptimism from 'components/AppWindowOptimism';
import Head from 'components/Head';
import MerkleClaim from 'features/airdrops/modules/MerkleClaim';
import Mint from 'features/airdrops/modules/Mint';

const ChineseNewYear = () => (
  <AppWindowOptimism requiresWalletConnection>
    <Head title="Chinese New Year" />
    <MerkleClaim />
    <Mint />
  </AppWindowOptimism>
);

export default ChineseNewYear;
