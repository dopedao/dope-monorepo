import { useWeb3React } from '@web3-react/core';

import Head from '../components/head';
import AppWindow from '../components/AppWindow';

export default function Hustler() {
  const { account } = useWeb3React();

  return (
    <AppWindow requiresWalletConnection={ true }>
      <Head title="Hustler" />
      { account ? 'hustler' : null }
    </AppWindow>
  );
}
