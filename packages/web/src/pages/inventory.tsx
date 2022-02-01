import { useRouter } from 'next/router';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Profile from "features/profile/components/Profile";

const ProfilePage = () => {
  const router = useRouter();
  const { section } = router.query;
  return(
    <AppWindow requiresWalletConnection padBody={false} navbar={<DopeWarsExeNav />}>
      <Head />
      <Profile section={section} />
    </AppWindow>
  );
};

export default ProfilePage;
