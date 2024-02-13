import { useRouter } from 'next/router';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import Account from 'components/web3account/Account';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import DesktopIconList from 'components/DesktopIconList';

const Wallet = () => {
  const router = useRouter();

  const closeApp = () => {
    router.replace('/');
  };

  return (
    <>
      <DesktopIconList />
      <AppWindow requiresWalletConnection={true} padBody={false} navbar={<DopeWarsExeNav />}>
        <Head />
        <Account onClose={() => closeApp()} />
      </AppWindow>
    </>
  );
};
export default Wallet;
