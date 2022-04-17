import DopeWarsExeNav from 'components/DopeWarsExeNav';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import ComingSoonDialog from 'components/ComingSoonDialog';

const SwapMeetTurf = () => (
  <AppWindow
    padBody={false}
    scrollable={false}
    height="90vh"
    navbar={<DopeWarsExeNav />}
    title="Swap Meet"
  >
    <Head title="TURF" />
    <ComingSoonDialog
      title="Turf Coming Soon"
      icon="construction"
      backgroundCss="#000000 url('/images/game/map/nyc-hustler-walk.gif') center bottom / cover no-repeat fixed"
    >
      <p>
        Currently under discussion – TURF is our next step towards evolving the Dope Wars metaverse
        by adding land ownership that affects gameplay.
      </p>
      <p>
        Check out{' '}
        <a
          className="underline"
          href="https://www.notion.so/dope-wars/DIP-24-The-Hustle-TURF-10be2b8155004341b13fa3c836d7daf7"
          target="wiki"
        >
          DIP-24: The Hustle
        </a>
        , and jump into our Discord to discuss it.
      </p>
    </ComingSoonDialog>
  </AppWindow>
);

export default SwapMeetTurf;
