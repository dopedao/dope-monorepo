import Head from 'components/Head';
import Profile from 'features/profile/components/Profile';
import { SwapMeetContainer } from 'features/swap-meet/components';
import SwapMeet from '.';

const ProfilePage = () => {
  return (
    <SwapMeetContainer scrollable requiresWalletConnection>
      <Head title="YOUR INVENTORY" />
      <Profile />
    </SwapMeetContainer>
  );
};

export default ProfilePage;
