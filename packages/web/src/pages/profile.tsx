import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Profile from "features/profile/components/Profile";


const ProfilePage = () => (
  <AppWindow requiresWalletConnection padBody={false} navbar={<DopeWarsExeNav />}>
    <Head />
    <Profile />
  </AppWindow>
);

export default ProfilePage;
