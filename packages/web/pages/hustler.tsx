import { useWeb3React } from '@web3-react/core';
import AppWindow from 'components/AppWindow';
import ComingSoonDialog from 'components/ComingSoonDialog';
import Head from 'components/Head';
import DopeWarsExeNav from 'components/DopeWarsExeNav';

const Hustler = () => (
  <AppWindow padBody={false} navbar={<DopeWarsExeNav />}>
    <Head title="Create Your Hustler" />
    <ComingSoonDialog title="Under Construction">
      <p>
        <a
          className="textLink"
          href="https://dope-wars.notion.site/Dope-Wars-Ignition-e92fd2b6efeb4e4991c7df98f5553283"
        >
          Read the proposal for Dope Wars: Ignition
        </a>
      </p>
    </ComingSoonDialog>
  </AppWindow>
);

export default Hustler;
