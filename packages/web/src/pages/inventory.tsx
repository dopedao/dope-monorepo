import AppWindowOptimism from 'components/AppWindowOptimism';
import Head from 'components/Head';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Profile from 'features/profile/components/Profile';

const ProfilePage = () => {
  return (
    <AppWindowOptimism
      padBody={false}
      navbar={<DopeWarsExeNav hideFilterBar />}
      requiresWalletConnection
    >
      <Head />
      <Profile />
    </AppWindowOptimism>
  );
};

export default ProfilePage;
