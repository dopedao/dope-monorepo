import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Profile from 'features/profile/components/Profile';
import DesktopIconList from 'components/DesktopIconList';

const ProfilePage = () => {
  return (
    <>
      <DesktopIconList />
      <AppWindow padBody={false} scrollable navbar={<DopeWarsExeNav />} requiresWalletConnection>
        <Head title="YOUR INVENTORY" />
        <Profile />
      </AppWindow>
    </>
  );
};

export default ProfilePage;
