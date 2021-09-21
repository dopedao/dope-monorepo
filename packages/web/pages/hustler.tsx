import { useWeb3React } from '@web3-react/core';
import AppWindow from '../components/AppWindow';
import Head from '../components/Head';

export default function Hustler() {
  const { account } = useWeb3React();

  return (
    <AppWindow requiresWalletConnection={true}>
      <Head title="Hustler" />
      {account ? 'hustler' : null}
    </AppWindow>
  );
}
