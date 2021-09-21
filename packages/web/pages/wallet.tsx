import AppWindow from '../components/AppWindow';
import Head from '../components/head';
import DisconnectWallet from '../components/DisconnectWallet';
import { useRouter } from 'next/router';

const Wallet = () => {
  const router = useRouter();

  const closeApp = () => {
    router.replace('/');
  };

  return (
    <AppWindow requiresWalletConnection={true} padBody={false}>
      <Head />
      <DisconnectWallet onClose={() => closeApp()} />
    </AppWindow>
  );
};
export default Wallet;
