import AppWindow from 'components/AppWindow';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import DesktopIconList from 'components/DesktopIconList';

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
  requiresWalletConnection?: boolean;
};

export const SwapMeetContainer = ({
  children,
  scrollable = false,
  requiresWalletConnection = false,
}: Props) => {
  return (
    <>
      <DesktopIconList />
      <AppWindow
        padBody={false}
        scrollable={scrollable}
        requiresWalletConnection={requiresWalletConnection}
        navbar={<DopeWarsExeNav />}
      >
        {children}
      </AppWindow>
    </>
  );
};
