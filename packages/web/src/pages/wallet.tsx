import { useRouter } from 'next/router';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import DisconnectWallet from 'components/DisconnectWallet';
import DopeWarsExeNav from 'components/DopeWarsExeNav';

const Wallet = () => {
  const router = useRouter();

  const closeApp = () => {
    router.replace('/');
  };

  return (
    <AppWindow requiresWalletConnection={true} padBody={false} navbar={<DopeWarsExeNav />}>
      <Head />
      <DisconnectWallet onClose={() => closeApp()} />
    </AppWindow>
  );
};
export default Wallet;
