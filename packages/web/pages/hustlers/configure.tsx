import AppWindow from '../../components/AppWindow';
import Head from '../../components/Head';
import Configuration from '../../components/hustler/Configuration';

const Hustler = () => {
  return (
    <AppWindow requiresWalletConnection={true}>
      <Head title="Create Your Hustler" />
      <Configuration />
      {/* <ComingSoonDialog title="Under Construction">
        <p>
          <a
            className="textLink"
            href="https://dope-wars.notion.site/Dope-Wars-Ignition-e92fd2b6efeb4e4991c7df98f5553283"
          >
            Read the proposal for Dope Wars: Ignition
          </a>
        </p>
      </ComingSoonDialog> */}
    </AppWindow>
  );
};
2;

export default Hustler;
