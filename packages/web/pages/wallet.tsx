import AppWindow from '../components/AppWindow';
import Head from '../components/Head';
import DisconnectWallet from '../components/DisconnectWallet';
import DopeWarsExeNav from '../components/DopeWarsExeNav';
import { useRouter } from 'next/router';

const Wallet = () => {
  const router = useRouter();

  const closeApp = () => {
    router.replace('/');
  };

  return (
    <AppWindow 
      navbar={<DopeWarsExeNav />}
      requiresWalletConnection={true}
      padBody={false}
    >
      <Head />
      <DisconnectWallet onClose={() => closeApp()} />
    </AppWindow>
  );
};
export default Wallet;
