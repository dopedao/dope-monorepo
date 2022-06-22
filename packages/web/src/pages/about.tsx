import Head from 'components/Head';
import AboutWindow from 'features/about/components/AboutWindow';
import DesktopIconList from 'components/DesktopIconList';

export default function About() {
  return (
    <>
      <DesktopIconList />
      <Head title={'About DOPE WARS NFT'} />
      <AboutWindow />
    </>
  );
}
