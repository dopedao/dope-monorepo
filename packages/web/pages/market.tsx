import AppWindow from '../components/AppWindow';
import ComingSoonDialog from '../components/ComingSoonDialog';
import Head from '../components/Head';

export default function Market() {
  return (
    <AppWindow padBody={false}>
      <Head title="Dope Wars Market" />
      <ComingSoonDialog title="Coming Soon…">
        <p>
          Soon you'll be able to see all DOPE LOOT NFT items listed on OpenSea, if they still have
          $PAPER, and if they are bundled, or unbundled.
        </p>
      </ComingSoonDialog>
    </AppWindow>
  );
}
